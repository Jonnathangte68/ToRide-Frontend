import React from "react"
import RequireAuth from "../Auth/RequireAuth";
import CertificateScreen from "./CentificateScreen/CertificateScreen";

export default function Certificate() {
  return (
    <RequireAuth>
        <CertificateScreen />
    </RequireAuth>
  )
}
