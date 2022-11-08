import * as React from "react";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import AlertComponent from "./components/Alert";
import Certificate from "./features/Certificate";
import ChangePassword from "./features/ChangePassword";
import Classes from "./features/Classes";
// @ts-ignore
import Dashboard from "./features/Dashboard";
import { fetchImageVault } from "./features/Demo/demoSlice";
import ForgotPassword from "./features/ForgotPassword/ForgotPassword";
import LandingScreenStudent from "./features/LandingScreens/Student";
import Location from "./features/Location";
import Messages from "./features/Messages";
import NotFound from "./features/NotFound";
import OwnerRegister from "./features/OwnerRegister";
import OwnerRegisterSuccess from "./features/OwnerRegister/OwnerRegisterSuccess/OwnerRegisterSuccess";
import OwnerRegisterVerifyEmailAccount from "./features/OwnerRegister/OwnerRegisterVerifyEmailAccount/OwnerRegisterVerifyEmailAccount";
import OwnerAccountSetup from "./features/SetUpAccountOwner";
import SignInScreen from "./features/SignIn";
import Simulator from "./features/Simulator";
import Staff from "./features/Staff";
import StudentCalendars from "./features/StudentCalendars";
import StudentClasses from "./features/StudentClasses";
import StudentDashboard from "./features/StudentDashboard";
import StudentProfile from "./features/StudentProfile";
import StudentEmailVerification from "./features/StudentRegister/StudentEmailVerification";
import StudentRegisterScreen from "./features/StudentRegister/StudentRegisterScreen";
import StudentRegisterSuccess from "./features/StudentRegister/StudentRegisterSuccess/StudentRegisterSuccess";
import StudentRegisterVerifyEmailAccount from "./features/StudentRegister/StudentRegisterVerifyPhone/StudentRegisterVerifyPhone";
import Students from "./features/Students";
import Transaction from "./features/Transaction";
import UserSettings from "./features/UserSettings";
import Vehicles from "./features/Vehicles";
import DashboardScreen from "./features/Admin/Dashboard";
import AdminStudent from "./features/Admin/Student";
import AdminLocation from "./features/Admin/Location";
import AdminClasses from "./features/Admin/Classes";
import AdminTransactions from "./features/Admin/Transactions";
import AdminStaff from "./features/Admin/Staff";

export default function App() {
  const dispatch = useAppDispatch();
  const [dispalyError, setDisplayError] = useState("");
  const [dispalyAlert, setDisplayAlert] = useState("");

  const handleDisplayAlert = (text: string) => {
    if (!!text) {
      setDisplayError("");
      setDisplayAlert(text);
      setTimeout (() => {
          setDisplayAlert("");
      }, 6000);
    }
  };

  const handleDisplayError = (text: string) => {
    if (!!text) {
      setDisplayAlert("");
      setDisplayError(text);
      setTimeout (() => {
        setDisplayError("");
        }, 6000);
    }
  };

  useEffect(() => {
    dispatch(fetchImageVault());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingScreenStudent />} />
        <Route path="/sign-up" element={<StudentRegisterScreen onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/forgot-password" element={<ForgotPassword onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/change-password" element={<ChangePassword onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/sign-in" element={<SignInScreen onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />

        {/* Student */}
        <Route path="/verify-account/:email" element={<StudentRegisterVerifyEmailAccount />} />
        <Route path="/email-verification" element={<StudentEmailVerification />} />
        <Route path="/verification-success" element={<StudentRegisterSuccess />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/classes" element={<StudentClasses />} />
        <Route path="/calendar-view" element={<StudentCalendars />} />
        <Route path="/my-profile" element={<StudentProfile />} />

        {/* Owner */}
        {/* <Route path="/owner/" element={<LandingScreen />} />
        <Route path="/owner/sign-in" element={<SignInScreen />} /> */}
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/sign-up-owner" element={<OwnerRegister onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/sign-up-done" element={<OwnerRegisterSuccess />} />
        <Route path="/owner/owner-verify-email-account" element={<OwnerRegisterVerifyEmailAccount />} />
        <Route path="/owner/set-up-owner-account" element={<OwnerAccountSetup onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/transactions" element={<Transaction />} />
        <Route path="/owner/messages" element={<Messages />} />
        <Route path="/owner/students" element={<Students onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/staff" element={<Staff onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/vehicles" element={<Vehicles onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/classes" element={<Classes onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/locations" element={<Location onDisplayAlert={handleDisplayAlert} onDisplayError={handleDisplayError} />} />
        <Route path="/owner/certificates" element={<Certificate />} />
        <Route path="/owner/simulators" element={<Simulator />} />
        <Route path="/owner/settings" element={<UserSettings />} />
        
        {/* Admin */}

        <Route path="/admin/dashboard" element={<DashboardScreen />} />
        <Route path="/admin/students" element={<AdminStudent />} />
        <Route path="/admin/locations" element={<AdminLocation />} />
        <Route path="/admin/classes" element={<AdminClasses />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route path="/admin/simulators" element={<Simulator />} />
        
        {/* Everything else */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {(!!dispalyError && !dispalyAlert) && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
      {(!!dispalyAlert && !dispalyError) && (<AlertComponent text={dispalyAlert} variant="primary" />)}
    </>
  );
}