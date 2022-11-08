import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import OwnerRegisterScreen from "./OwnerRegisterScreen";
import "./style.css"

const OwnerRegister = (props: any) => {
  return (
    <PublicAuth>
        <OwnerRegisterScreen
          onDisplayAlert={props?.onDisplayAlert}
          onDisplayError={props?.onDisplayError}
        />
    </PublicAuth>
  )
}

export default OwnerRegister;
