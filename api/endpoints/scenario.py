import os
import json
import pandas
from fastapi import APIRouter, UploadFile
from importer import main
from io import BytesIO
from constants.electricity_source_order import electricity_source_order

router = APIRouter(
    tags=[],
    responses={404: {"description": "Not found"}},
)

scenario_db = {}

@router.get("")
@router.get("/")
def list_scenarios():
    load_scenarios()
    scenarios = [
        {
            **format_scenario_totals(scenario),
            **{ "key": scenario["name"], "name": scenario["name"] }
        } for scenario in scenario_db.values()
    ]
    return scenarios


@router.get("/{id}")
def get_scenario(id):
    load_scenarios()
    return format_scenario(scenario_db.get(id))

def format_scenario(scenario):
    energy_sources = format_energy_sources(scenario["data"]["energySources"])
    print('then here ', energy_sources)
    data = scenario["data"]
    return {
        "key": scenario["key"],
        "name": scenario["name"],
        "data": { **data, "energySources": energy_sources }
    }

def format_energy_sources(energy_sources):
    # Currently, only electricity sources have been ordered by the data team.
    # However, even if all apparently known sources were to be defined, some
    # unknown sources may still be added to the imported excel.
    # Therefore the ordered sources list and the sources list from the data set
    # should be merged, then filtered so that the list contains only energy
    # sources with data, while the right source order is maintained.
    sources_ordered = electricity_source_order.copy()
    for source in energy_sources:
        if source not in sources_ordered:
            sources_ordered.append(source)

    return [s for s in sources_ordered if s in energy_sources]

def format_scenario_totals(scenario):
    total = calculate_total_energy(scenario)

    imports = calculate_imported_energy(scenario)
    domestic = 1 - (imports / total)

    return {
        "co2": scenario["data"]["CO2|Total"]["value"],
        "cost": scenario["data"]["Costs|System cost"]["value"],
        "domestic": domestic,
        "total": total,
    }


def calculate_total_energy(scenario):
    total = 0
    for key in scenario["data"]["energySources"]:
        if len(key.split("|")) == 2 and key.endswith("|Total") and key != "CO2|Total":
            total += scenario["data"][key]["yearValue"]

    return total


def calculate_imported_energy(scenario):
    is_imported = (
        lambda source: source.endswith("|Gas")
        or source.endswith("|Oil")
        or source.endswith("|Coal")
    )
    imports = scenario["data"]["Electricity|Imports"]["yearValue"]
    for key in scenario["data"]["energySources"]:
        if is_imported(key):
            imports += scenario["data"][key]["yearValue"]
    return imports


def load_scenarios():
    global scenario_db
    if len(scenario_db) != 0:
        return
    scenario_files = [
        filename for filename in os.listdir("./data") if filename.endswith(".json")
    ]
    for scenario in scenario_files:
        scenario_info = format_json_scenario(scenario)
        scenario_db[scenario_info["key"]] = scenario_info



def format_json_scenario(scenario_json):
    with open(f"data/{scenario_json}", "r") as json_file:
        scenario = json.load(json_file)
        scenario["key"] = scenario["name"]
        return scenario


def format_csv_scenario(scenario_csv):
    df = pandas.read_csv(f"data/{scenario_csv}", header=None)
    print(df)
    print(df[df[0] == "Electricity|Imports"].squeeze()[1:])
    name = scenario_csv.replace(".csv", "")
    return {
        "key": name,
        "name": f"Scenario {name}",
        "co2": df[df[0] == "CO2|Total"].squeeze().iloc[1],
        "cost": df[df[0] == "Costs|System cost"].squeeze().iloc[1],
        "domestic": pandas.to_numeric(
            df[df[0] == "Electricity|Imports"].squeeze()[1:], errors="ignore"
        ).sum(),
    }

@router.post("/upload")
def upload_file(file: UploadFile):
    print('Type of file is %s' % (type(file)))
    print(f"Processing {os.path.basename(file.filename)}")
    contents = file.file.read()
    data = BytesIO(contents)
    all_scenarios = pandas.read_csv(data)
    data.close()
    file.file.close()
    if not isinstance(all_scenarios, pandas.DataFrame):
        print(f"File {file.filename} could not be parsed")
        return
    for (scenario, year), data in all_scenarios.groupby(["scenario", "year"]):
        main.import_scenario(scenario, year, data.iloc[:, 2:])
