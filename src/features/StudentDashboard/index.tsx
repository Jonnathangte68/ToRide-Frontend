import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import DashboardScreen from "./DashboardScreen";

export default function StudentDashboard() {
  return (
    <RequireAuth>
        <DashboardScreen />
    </RequireAuth>
  )
}
