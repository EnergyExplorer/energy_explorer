import { createSearchQuery } from "./utils/createSearchQuery";

export const appBaseRoute = "/app";

export const routes = {
  home: "/",
  scenario: "/scenario/:id",

  /**
   * We limit the comparison of scenarios to 3
   * @param {Object} scenarios - The employee who is responsible for the project.
   * @param {string} employee.scenario_0 - Scenario 1 ID
   * @param {string} employee.scenario_1 - Scenario 2 ID
   * @param {string} employee.scenario_2 - Scenario 3 ID
   */
  comparison: scenarios => `/comparison${createSearchQuery(scenarios)}`
};
