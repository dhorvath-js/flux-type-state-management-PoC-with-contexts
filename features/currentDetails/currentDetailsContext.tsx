import React, { FC, ReactNode, useContext, useReducer } from "react";
import { fetchQuestions } from "./questionAPI";

export type CurrentDetailsStateStatus = "idle" | "loading" | "failed";

export type Question = { question: string; type: "text" | "number" };

export interface CurrentDetailsState {
  questions: Question[];
  status: CurrentDetailsStateStatus;
}

const initialState: CurrentDetailsState = {
  questions: [],
  status: "idle",
};

type CurrentDetailsContextValue = {
  questions: Question[];
  status: CurrentDetailsStateStatus;
  dispatch: Function;
};

export const CurrentDetailsContext =
  React.createContext<CurrentDetailsContextValue>({
    ...initialState,
    dispatch: () => {},
  });

type Reducer<S, A> = (prevState: S, action: A) => S;

/* ACTIONS */
enum ACTIONS {
  SET_LOADING_STATE = "SET_LOADING_STATE",
  ADD_QUESTION = "ADD_QUESTION",
  SET_QUESTIONS = "SET_QUESTIONS",
}

type Action =
  | { type: ACTIONS.SET_LOADING_STATE; payload: CurrentDetailsStateStatus }
  | { type: ACTIONS.ADD_QUESTION; payload: Question }
  | { type: ACTIONS.SET_QUESTIONS; payload: Question[] };

/* REDUCER */
const reducer: Reducer<CurrentDetailsState, Action> = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING_STATE:
      return { ...state, status: action.payload };
    case ACTIONS.ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };
    case ACTIONS.SET_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

/* ACTION CREATORS */
export const setLoadingState = (status: CurrentDetailsStateStatus) => ({
  type: ACTIONS.SET_LOADING_STATE,
  payload: status,
});

export const addQuestion = (question: Question) => ({
  type: ACTIONS.ADD_QUESTION,
  payload: question,
});

export const setQuestions = (questions: Question[]) => ({
  type: ACTIONS.SET_QUESTIONS,
  payload: questions,
});

const CurrentDetailsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CurrentDetailsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CurrentDetailsContext.Provider>
  );
};

export default CurrentDetailsContextProvider;

export const useCurrentDetailsContext = () => {
  const { status, questions, dispatch } =
    useContext<CurrentDetailsContextValue>(CurrentDetailsContext);

  return { status, questions, dispatch };
};

export const getQuestionsAsync = async (dispatch: Function) => {
  try {
    dispatch(setLoadingState("loading"));
    const { data: questions } = await fetchQuestions();
    dispatch(setQuestions(questions));
    dispatch(setLoadingState("idle"));
  } catch (e) {
    dispatch(setLoadingState("failed"));
  }
};
