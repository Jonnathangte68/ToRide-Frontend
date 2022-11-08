import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import ChangePassword from "./ChangePassword";
import "./style.css"

const ChangePasswordScreen = (props: any) => {
  return (
    <PublicAuth>
        <ChangePassword 
          onDisplayAlert={props?.onDisplayAlert}
          onDisplayError={props?.onDisplayError}
        />
    </PublicAuth>
  )
}

export default ChangePasswordScreen;
