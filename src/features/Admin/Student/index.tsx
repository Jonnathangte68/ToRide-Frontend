import React from "react";
import RequireAuth from "../../../features/Auth/RequireAuth";
import ManageStudents from "./ManageStudents/ManageStudents";

export default function Students(props: any) {
  return (
    <RequireAuth>
        <ManageStudents {...props} />
    </RequireAuth>
  )
}
