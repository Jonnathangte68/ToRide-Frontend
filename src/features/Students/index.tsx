import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import ManageStudents from "./ManageStudents/ManageStudents";

export default function Students(props: any) {
  return (
    <RequireAuth>
        <ManageStudents {...props} />
    </RequireAuth>
  )
}
