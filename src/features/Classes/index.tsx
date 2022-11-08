import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import ClassScreen from "./ClassScreen/ClassScreen";

export default function Classes(props: any) {
  return (
    <RequireAuth>
        <ClassScreen {...props} />
    </RequireAuth>
  )
}
