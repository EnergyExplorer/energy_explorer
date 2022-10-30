import React, { useEffect, useRef } from "react";
import { Carousel } from "antd";
import ElectricityImportsBarChart from "./ElectricityImportsBarChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";
import MultiAreaChart from "@/components/MultiAreaChart";
import scenarioTitles from "@/scenarioTitleMap.json";

import styles from "./ComparisonPageContent.module.css";

const ComparisonPageContent = ({ slideKey: slideIndex, scenarioData }) => {
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
          <div className={styles["chart-section"]}>
            {scenarioData.map((scenario) => (
              <PolarChart
                key={scenario.name}
                title={scenarioTitles[scenario.name] ?? scenario.name}
                scenario={formatWinterSummerComparison(scenarioData[0])}
              />
            ))}
          </div>
        </section>
        <section>
          <MultiAreaChart scenarios={scenarioData} />
        </section>
      </Carousel>
    </div>
  );
};

export default ComparisonPageContent;
