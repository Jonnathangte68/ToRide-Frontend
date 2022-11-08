import React from "react"
import PublicAuth from "../Auth/PublicAuth";
import LandingScreen from "./LandingScreens";
import "./style.css"

const SignInScreen = () => {
  return (
    <PublicAuth>
        <LandingScreen />
    </PublicAuth>
  )
}

export default SignInScreen;
