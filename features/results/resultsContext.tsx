import React, { FC, ReactNode, useContext, useReducer } from "react";
import { fetchTariffs } from "./resultsAPI";

export type ResultsStateStatus = "idle" | "loading" | "failed";

export interface ResultsState {
  tariffs: number[];
  status: ResultsStateStatus;
}

const initialState: ResultsState = {
  tariffs: [],
  status: "idle",
};

type ResultsContextValue = {
  tariffs: number[];
  status: ResultsStateStatus;
  dispatch: Function;
};

export const ResultsContext = React.createContext<ResultsContextValue>({
  ...initialState,
  dispatch: () => {},
});

type Reducer<S, A> = (prevState: S, action: A) => S;

/* ACTIONS */
enum ACTIONS {
  SET_LOADING_STATE = "SET_LOADING_STATE",
  ADD_TARIFF = "ADD_TARIFF",
  SET_TARIFFS = "SET_TARIFFS",
}

type Action =
  | { type: ACTIONS.SET_LOADING_STATE; payload: ResultsStateStatus }
  | { type: ACTIONS.ADD_TARIFF; payload: number }
  | { type: ACTIONS.SET_TARIFFS; payload: number[] };

/* REDUCER */
const reducer: Reducer<ResultsState, Action> = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING_STATE:
      return { ...state, status: action.payload };
    case ACTIONS.ADD_TARIFF:
      return { ...state, tariffs: [...state.tariffs, action.payload] };
    case ACTIONS.SET_TARIFFS:
      return { ...state, tariffs: action.payload };
    default:
      return state;
  }
};

/* ACTION CREATORS */
export const setLoadingState = (status: ResultsStateStatus) => ({
  type: ACTIONS.SET_LOADING_STATE,
  payload: status,
});

export const addTariff = (tariff: number) => ({
  type: ACTIONS.ADD_TARIFF,
  payload: tariff,
});

export const setTariffs = (tariffs: number[]) => ({
  type: ACTIONS.SET_TARIFFS,
  payload: tariffs,
});

const ResultContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ResultsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultContextProvider;

export const useResultsContext = () => {
  const { status, tariffs, dispatch } =
    useContext<ResultsContextValue>(ResultsContext);

  return { status, tariffs, dispatch };
};

export const getTariffsAsync = async (dispatch: Function) => {
  try {
    dispatch(setLoadingState("loading"));
    const { data: tariffs } = await fetchTariffs();
    dispatch(setTariffs(tariffs));
    dispatch(setLoadingState("idle"));
  } catch (e) {
    dispatch(setLoadingState("failed"));
  }
};
