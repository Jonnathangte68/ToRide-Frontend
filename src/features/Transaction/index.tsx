import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import TransactionHistoryDashboardScreen from "./TransactionHistory/TransactionHistoryDashboardScreen";

export default function Transaction() {
  return (
    <RequireAuth>
        <TransactionHistoryDashboardScreen />
    </RequireAuth>
  )
}
