import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import SignIn from "./SignInScreen";
import "./style.css"

const SignInScreen = (props: any) => {
  return (
    <PublicAuth>
        <SignIn 
          onDisplayAlert={props?.onDisplayAlert}
          onDisplayError={props?.onDisplayError}
        />
    </PublicAuth>
  )
}

export default SignInScreen;
