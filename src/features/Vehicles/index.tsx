import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import VehicleScreen from "./VehicleScreen/VehicleScreen";

export default function Vehicles(props: any) {
  return (
    <RequireAuth>
        <VehicleScreen {...props} />
    </RequireAuth>
  )
}
