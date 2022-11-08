import React, { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks";
import RequireAuth from "../Auth/RequireAuth";
import SimulatorScreen from "./SimulatorScreen/SimulatorScreen";
import { fetchAllSimulators } from "./simulatorSlice";

export default function Simulator() {
  const dispatch = useAppDispatch();
  // const simulators = useAppSelector((state) => state.simulator.simulators);

  const simulators  = [{
    id: 1,
    name: 'Simulator 1.1',
    date_start: '5 Oct, 2021',
    location: "Mall of Helsinki",
    status: 'Created'
  }];

  useEffect(() => {
    dispatch(fetchAllSimulators());
    //eslint-disable-next-line
  }, []);
  
  return (
    <RequireAuth>
        <SimulatorScreen simulatorList={simulators} />
    </RequireAuth>
  )
}
