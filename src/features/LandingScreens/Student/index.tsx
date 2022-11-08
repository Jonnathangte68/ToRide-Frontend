import React from "react"
import PublicAuth from "../../Auth/PublicAuth";
import LandingScreen from "./LandingScreen";
import "../style.css";

const LandingScreenStudent = () => {
  return (
    <PublicAuth>
        <LandingScreen />
    </PublicAuth>
  )
}

export default LandingScreenStudent;
