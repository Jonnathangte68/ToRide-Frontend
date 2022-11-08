import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import StudentRegisterScreen from "./StudentRegisterScreen";
import "./style.css"

const StudentRegister = () => {
  return (
    <PublicAuth>
        <StudentRegisterScreen />
    </PublicAuth>
  )
}

export default StudentRegister;
