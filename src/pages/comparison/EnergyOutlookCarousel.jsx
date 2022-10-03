import React, { useRef, useEffect } from 'react'
import { Carousel } from 'antd'
import ElectricityImportsBarChart from "./ElectricityImportsBarChart";
import PolarChart, { formatWinterSummerComparison } from "../../components/PolarChart";
import AreaChart, { formatMonthlyEnergyMix } from "../../components/AreaChart";

const EnergyOutlookCarousel = ({
  scenarioData,
  slideIndex,
  focusedScenario
}) => {
  const ref = useRef()

  useEffect(() => {
    ref.current && ref.current.goTo(slideIndex)
  }, [slideIndex])

  return (
    <Carousel ref={ref} dots={false}>
      <div>
        <ElectricityImportsBarChart scenarioData={scenarioData}/>
      </div>
      <div>
        <PolarChart scenario={formatWinterSummerComparison(focusedScenario)}/>
      </div>
      <div>
        <AreaChart
          scenarioData={scenarioData}
          series={formatMonthlyEnergyMix(focusedScenario)}
        />
      </div>
    </Carousel>
  )
}

export default EnergyOutlookCarousel
