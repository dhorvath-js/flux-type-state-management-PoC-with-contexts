import type { NextPage } from "next";
import ResultContextProvider from "../features/results/resultsContext";
import Tariffs from "../features/results/tariffs";

const ResultsPage: NextPage = () => {
  return (
    <ResultContextProvider>
      <h1>Results Page</h1>
      <Tariffs />
    </ResultContextProvider>
  );
};

export default ResultsPage;
