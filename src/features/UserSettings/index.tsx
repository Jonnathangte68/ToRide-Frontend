import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import EditProfile from "./EditProfile/EditProfile";

export default function UserSettings() {
  return (
    <RequireAuth>
        <EditProfile />
    </RequireAuth>
  )
}
