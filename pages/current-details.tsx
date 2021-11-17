import type { NextPage } from "next";
import { useEffect } from "react";
import CurrentDetailsContextProvider from "../features/currentDetails/currentDetailsContext";
import Questions from "../features/currentDetails/Questions";

const CurrentDetailsPage: NextPage = () => {
  return (
    <CurrentDetailsContextProvider>
      <h1>Current Details</h1>
      <Questions />
    </CurrentDetailsContextProvider>
  );
};

export default CurrentDetailsPage;
