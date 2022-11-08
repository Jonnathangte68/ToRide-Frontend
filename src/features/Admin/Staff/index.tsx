import React from "react";
import RequireAuth from "../../../features/Auth/RequireAuth";
import StaffManage from "./StaffManage/Staff";

export default function Students(props: any) {
  return (
    <RequireAuth>
        <StaffManage {...props} />
    </RequireAuth>
  )
}
