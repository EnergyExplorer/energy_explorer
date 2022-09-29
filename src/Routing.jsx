import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/detail/DetailPage";
import { routes } from "./routes";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import ComparisonPage from "./pages/comparison/ComparisonPage";
import ComparisonDemoPage from "./pages/comparison-demo/ComparisonDemoPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.scenario} element={<DetailPage />} />
        <Route path={routes.comparison()} element={<ComparisonPage />} />
        <Route path={routes.comparison_demo} element={<ComparisonDemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
