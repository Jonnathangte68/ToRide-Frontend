import React from "react";
import OwnerAccountSetupStep2 from "../SetUpAccountOwner/OwnerAccountSetupStep2/OwnerAccountSetupStep2";
import OwnerAccountSetupStep4 from "../SetUpAccountOwner/OwnerAccountSetupStep4/OwnerAccountSetupStep4";

const TestScreen = (props: any) => {
    // TEST OWNER SIGNUP REGISTRATIONS STEPS

    // return (
    //     <OwnerAccountSetupStep2 onDisplayAlert={props?.onDisplayAlert} onDisplayError={props?.onDisplayError} />
    // );

    return (
        <OwnerAccountSetupStep4 onDisplayAlert={props?.onDisplayAlert} onDisplayError={props?.onDisplayError} />
    );
}

export default TestScreen;
