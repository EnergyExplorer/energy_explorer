import React, { useRef, useEffect } from "react";
import { Carousel } from "antd";
import ElectricityImportsBarChart from "./ElectricityImportsBarChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";
import AreaChart, { formatMonthlyEnergyMix } from "../../components/AreaChart";

const EnergyOutlookCarousel = ({ scenarioData, slideIndex }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current && ref.current.goTo(slideIndex);
  }, [slideIndex]);

  return (
    <Carousel ref={ref} dots={false}>
      <div>
        <ElectricityImportsBarChart scenarioData={scenarioData} />
      </div>
      <div>
        <PolarChart scenario={formatWinterSummerComparison(scenarioData[0])} />
        <PolarChart scenario={formatWinterSummerComparison(scenarioData[1])} />
        <PolarChart scenario={formatWinterSummerComparison(scenarioData[2])} />
      </div>
      <div>
        <AreaChart
          scenarioData={scenarioData}
          series={formatMonthlyEnergyMix(scenarioData[0])}
        />
        <AreaChart
          scenarioData={scenarioData}
          series={formatMonthlyEnergyMix(scenarioData[1])}
        />
        <AreaChart
          scenarioData={scenarioData}
          series={formatMonthlyEnergyMix(scenarioData[2])}
        />
      </div>
    </Carousel>
  );
};

export default EnergyOutlookCarousel;
