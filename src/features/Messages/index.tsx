import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import MessageDashboard from "./MessageDashboard/MessageDashboard";

export default function Transaction() {
  return (
    <RequireAuth>
        <MessageDashboard />
    </RequireAuth>
  )
}
