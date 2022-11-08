import React from "react";
import RequireAuth from "../../../features/Auth/RequireAuth";
import ClassScreen from "./ClassScreen/ClassScreen";

export default function Classes(props: any) {
  return (
    <RequireAuth>
      <ClassScreen {...props} />
    </RequireAuth>
  )
}
