import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSearchQuery } from "../utils/url";

export const useComparisonScenarios = () => {
  const { search } = useLocation()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    const { scenario_0, scenario_1, scenario_2 } = getSearchQuery(search)
    setSelectedRowKeys([scenario_0, scenario_1, scenario_2].filter(sce => sce))
  }, [])

  return {
    selectedRowKeys,
    setSelectedRowKeys
  }
}
