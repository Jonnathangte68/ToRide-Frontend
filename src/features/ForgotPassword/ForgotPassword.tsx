import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import ForgotPassword from "./ForgotPasswordScreen";
import "./style.css"

const ForgotPasswordScreen = (props: any) => {
  return (
    <PublicAuth>
        <ForgotPassword 
          onDisplayAlert={props?.onDisplayAlert}
          onDisplayError={props?.onDisplayError}
        />
    </PublicAuth>
  )
}

export default ForgotPasswordScreen;
