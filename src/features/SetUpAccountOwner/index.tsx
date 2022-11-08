import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import RequireAuth from "../Auth/RequireAuth";
import Step1 from "./OwnerAccountSetupStep1/OwnerAccountSetupStep1";
import Step2 from "./OwnerAccountSetupStep2/OwnerAccountSetupStep2";
import Step3 from "./OwnerAccountSetupStep4/OwnerAccountSetupStep4";

export default function Dashboard(props: any) {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [profileInfo, setProfileInfo] = useState(null);
  const ownerProfiles = useAppSelector((state) => state.demo.ownerProfiles);
  const user = useAppSelector((state) => state.demo.userlogin);
  

  // --FINAL INFO-- owner register profile
  // "id": 1,
  // "first_name": null,
  // "last_name": null,
  // "mobile_number": null,
  // "photo": null,
  // "address": "",
  // "city": "",
  // "zip_code": null,
  // "state": "",
  // "country": "",
  // "company_name": "",
  // "company_logo": null,
  // "company_registraion_number": null,
  // "company_email_address": null,
  // "about_us": null,
  // "business_hours_from": null,
  // "business_hours_to": null,
  // "Business_location": null,
  // "Social_links_linkdin": null,
  // "Social_links_facebook": null,
  // "Social_links_twitter": null,
  // "stripe_id": "",
  // "stripe_access_token": "",
  // "accepted_terms_and_conditions": true,

  const handleMoveStep = (increment?: "decrease" | "increase") => {
    if (step < 4) {
      if (!!increment && increment === "decrease") {
        const nextStep: number = step - 1;
        setStep(nextStep);
        return;
      }
      const nextStep: number = step + 1;
      setStep(nextStep);
    }
  };

  const handleSendSetupOwnerForm = () => {
    console.log("navigate owner dashboard");
    navigate("/owner/dashboard", { replace: true });
  };

  useEffect(() => {
    if (!!ownerProfiles && !!user && ownerProfiles.length > 0) {
      setProfileInfo(
        ownerProfiles.filter((profile) => profile?.user?.email === user?.username)?.[0]
      );
    }
  }, [ownerProfiles, user]);
  
  
  return (
    <RequireAuth>
        <>
          {step === 1 && <Step1 onSubmit={handleMoveStep} dataPreload={profileInfo} {...props} />}
          {step === 2 && <Step2 onNext={handleMoveStep} dataPreload={profileInfo} onPrevious={() => handleMoveStep("decrease")} {...props} />}
          {step === 3 && <Step3 onNext={handleSendSetupOwnerForm} dataPreload={profileInfo} onPrevious={() => handleMoveStep("decrease")} {...props} />}
        </>
    </RequireAuth>
  )
}
