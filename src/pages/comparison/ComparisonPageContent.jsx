import React, { useEffect, useRef, useState } from "react";
import { Carousel, Typography } from "antd";
import ElectricityImportsBarChart from "./ElectricityImportsBarChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";
import MultiAreaChart from "@/components/MultiAreaChart";
import { SankyChartControls } from '../detail/SankyChartControls';
import { scenarioKeyToTitleMap } from "@/constants/scenarioKeyToTitleMap";
import styles from "./ComparisonPageContent.module.css";
import { EnergyUseSankyChart } from "../detail/EnergyUseSankyChart";
import { ChartRow } from "../../components/ChartRow";

const ComparisonPageContent = ({ slideKey: slideIndex, scenarioData }) => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");
  const ref = useRef();

  useEffect(() => {
    ref.current && ref.current.goTo(slideIndex);
  }, [slideIndex]);

  return (
    <div className={styles.container}>
      <Carousel ref={ref} dots={false}>
        <section>
          <ElectricityImportsBarChart scenarioData={scenarioData} />
        </section>
        <section>
          <ChartRow>
            {scenarioData.map((scenario) => (
              <PolarChart
                key={scenario.name}
                title={scenarioKeyToTitleMap[scenario.name] ?? scenario.name}
                scenario={formatWinterSummerComparison(scenario)}
              />
            ))}
          </ChartRow>
        </section>
        <section>
          <MultiAreaChart scenarios={scenarioData} />
        </section>
        <section>
          <SankyChartControls
            scenarioData={scenarioData}
            timeOfYear={timeOfYear}
            setTimeOfYear={setTimeOfYear}
          />
          <ChartRow>
            {scenarioData.map((scenario) => (
              <EnergyUseSankyChart
                scenarioData={scenario}
                timeOfYear={timeOfYear}
              />
            ))}
          </ChartRow>
        </section>
      </Carousel>
    </div>
  );
};

export default ComparisonPageContent;
