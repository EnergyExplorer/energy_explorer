# Energy Explorer

## Introduction

### The problem

Currently, results from energy scenarios are presented in research papers or
individual webpages. This makes it close to impossible for policy makers to get
the full picture and understand the features of the net-zero Switzerland. How
can policy-makers take decisions based on model-driven energy scenarios?

### The goal
Develop a decision-making tool to allow policy makers to explore and compare
multiple energy scenarios. The tool should visualise for each scenario key
indicators and energy sources/carriers.

This tool was developed at the [Energy Data Hackdays
2022](https://energydatahackdays.ch/) on the 16th-17th of September 2022 in
Brugg.
This is the solution to challenge 07: [Alternative pathways to net
zero](https://hack.opendata.ch/project/846).


## Roadmap
To be discussed and solidified.
Until November 2022, we would like to add new features to help policymakers with
the help of our main stakeholders and direction from the project founder,
Adriana Carpucci. The features we have discussed include:

[] An overview where the user can easily compare all key indicators between
many scenarios.
[] A page where the user can compare up to three scenarios in detail.
[] Add an import page for the user to easily add new scenarios

Out of technical discussions, we would like to:

[] Move from CSV files to a NoSQL document database
[] Improve the deployment mechanism

## Badges
[Sheild coming soon...](https://shields.io/category/build)

## Visuals
GIF demo coming soon...

## Frontend application

The project is divided in two parts, a frontend application and an API.

### Overview

The frontend is a React application that uses the
[highcharts](https://www.highcharts.com/) library for the graphs. It is uses
[Vite](https://vitejs.dev) for building the project.

### Installing

[NodeJS version 16](https://nodejs.org/en/download/) or following is required to
run the project locally. To install the dependencies run:

```bash
$ npm install
```

Once the dependencies are installed, the project can be run locally with:

```bash
$ npm run dev
```

The web server is running on `http://localhost:5173` and changes to the sources
files will be immediately reflected.

The API is required to run to be able to use the application. By default it
will try to reach the API on `http://localhost:8000`, but the API endpoint can
be controlled through the `VITE_API_HOST` environment variable. For example to
use the API deployed at `https://energy-explorer-api-ij67sr2isq-oa.a.run.app`:

```bash
$ env VITE_API_HOST="https://energy-explorer-api-ij67sr2isq-oa.a.run.app" npm run dev
```


## API backend

The API backend is a Python application written with
[FastAPI](https://fastapi.tiangolo.com/) and
[Pandas](https://pandas.pydata.org/). The dependencies are managed through
[Poetry](https://python-poetry.org/).

### Running the docker image

The API can be run through Docker without having to install any of the
dependencies on the local machine. The simplest way to start the API is through
`docker-compose`:

```bash
$ docker-compose up
```

The API will be accessible on port `8000`, for example:

```bash
curl http://localhost:8000/scenarios
```

### Installing and running the python application locally

#### Poetry
To install the necessary dependencies and run the application locally, Poetry
must be installed on the machine. Depending on the operating system, it could
be available as a system package (i.e.: On Mac OS with `brew` it is possible to
install poetry with `brew install poetry`).

If not, poetry is provided with an installer:

```bash
$ curl -sSL https://install.python-poetry.org | python3 -
```

Alternatively, poetry can be installed with `pip`, ideally within an
[virtual environment](https://docs.python.org/3/library/venv.html):

```bash
$ pip install -U pip setuptools && pip install poetry
```

Check the [documentation](https://python-poetry.org/docs/#installation) for further details.

#### Dependencies

Once poetry is installed, the project dependencies can be installed with:

```bash
$ cd api && poetry install
```

#### Running the API

To run the application we use `uvicorn`:

```bash
# You need to be in the `api` directory.
$ poetry run uvicorn main:app --reload
```

The application will be accessible from `localhost:8000`.

### Importing scenarios

To import scenarios you need to install the dependencies with Poetry, as
outlined above.

To import a CSV file, it needs to be saved in the `data/import` directory.
Once it's there, all the files in the directory will be imported by running:

```bash
# You need to be in the `api` directory.
$ poetry run import
```

You should get an output for each file and scenario that gets imported:


```bash
$ poetry run import
Processing newScenarios.csv
	Importing scenario: co2--5_ elec_imports_2050
	Importing scenario: co2--5_no_elec_imports_2050
	Importing scenario: co2-0_ elec_imports_2050
	Importing scenario: co2-0_no_elec_imports_2020
	Importing scenario: co2-0_no_elec_imports_2050
	Importing scenario: co2-10_ elec_imports_2050
	Importing scenario: co2-10_no_elec_imports_2050
	Importing scenario: co2-15_ elec_imports_2050
	Importing scenario: co2-15_no_elec_imports_2050
	Importing scenario: co2-20_ elec_imports_2050
	Importing scenario: co2-20_no_elec_imports_2050
	Importing scenario: co2-25_ elec_imports_2050
	Importing scenario: co2-25_no_elec_imports_2050
	Importing scenario: co2-5_ elec_imports_2050
	Importing scenario: co2-5_no_elec_imports_2050
```

To publish the newly imported scenarios, just commit and push the files:

```bash
$ git add data/
$ git commit -m 'Added scenarios for <short description of scenarios>'
$ git push
```

#### CSV format

The CSV should follow the same format as the `data/import/newScenarios.csv`
file already present. In particular:

 * The first row should contain the column names
 * The first column must be named `scenario`
 * The second column must be named `year`
 * The third column must be named `index`
 * There should be 192 columns with values (whose names don't matter), 8
   columns per day, 2 days per month, per 12 months.
 * Rows that represent a yearly value only, must have the yearly value in the
   fourth column and the remaining 191 must be empty.

**Please note**: If multiple scenarios have the same name and year, only the
last processed scenario in the last processed file will be output. Ensure
unique scenario names and year across files.


## Contributing
Pull requests are welcome. However conventions and styles that have been setup
already must be respected throughout your development cycle:

1. There should be a ticket to do from the
[Github project board](https://github.com/orgs/EnergyExplorer/projects/1/views/1)
or an open issue.
2. Follow the spec for [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
3. Keep PRs small and digestable. Chain PRs when making large changes to avoid
large PRs.
4. Update tests when they exist to prevent bugs creeping in.
5. Create and update documentation.

## Authors
Adriana Marcucci, Stephane Bisinger and Robert Stanton

## License
[MIT](https://choosealicense.com/licenses/mit/)
