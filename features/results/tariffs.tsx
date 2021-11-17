import { useEffect } from "react";
import {
  addTariff,
  getTariffsAsync,
  useResultsContext,
} from "./resultsContext";

const Tariffs = () => {
  const { status, tariffs, dispatch } = useResultsContext();

  useEffect(() => {
    getTariffsAsync(dispatch);
  }, []);

  if (status === "loading") {
    return <h1>Loading tariffs...</h1>;
  }

  return (
    <div>
      <h1>Tariffs</h1>
      <ul>
        {tariffs.map((t, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(addTariff(t));
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tariffs;
