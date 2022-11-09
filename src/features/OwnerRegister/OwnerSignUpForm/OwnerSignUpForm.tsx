import { css } from '@emotion/css';
import styled from '@emotion/styled'
import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import InputPassword from '../../../components/InputPassword/InputPassword';
import TextInput from '../../../components/TextInput/TextInput';
import stringifyStringFix from '../../../utils/stringifyStringFix';
import { clearOwnerRegistration, registerOwnerAsync, resetOwnerRegisterErrors } from '../ownerRegisterSlice';

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 1.25vh;
  padding-bottom: 1.25vh;
`;

const ButtonSendForm = styled.div`
margin-bottom: 20px;
box-sizing: border-box;
height: 48px;
width: fit-content;
width: 100%;
`;

const FormInputWidth: CSSProperties = {
    width: "100%"
};

const OwnerSignUpForm = (props: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [legalSchoolName, setLegalSchoolName] = useState<string>("");
    const [formsubmitted, setformsubmitted] = useState(false);
    const RegisterOwnerErrors = useAppSelector((state) => state.ownerRegister.registerOwnerError);
    const registrationState = useAppSelector((state) => state.ownerRegister.registerOwnerStatus);
    const [mobileNumber, setMobileNumber] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOwnerSignUp = () => {
        dispatch(registerOwnerAsync({
            school_name: legalSchoolName,
            business_email: email,
            mobile_number: mobileNumber,
            password: password,
        }));
        setformsubmitted(true);
        // navigate("/owner/sign-up-done", { replace: false });
    };

    useEffect(() => {
        if (registrationState === 'success' && !!formsubmitted) {
            navigate("/owner/sign-up-done", { state: email, replace: false });
        }
        //eslint-disable-next-line
    }, [registrationState]);
    

    useEffect(() => {
        console.log("RegisterOwnerErrors");
        console.log(RegisterOwnerErrors);
        if (!!RegisterOwnerErrors) {

            // catch the previous values and display to user.

            if (!!RegisterOwnerErrors?.["pre_state"]) {
                setEmail(RegisterOwnerErrors?.["pre_state"]?.business_email);
                setLegalSchoolName(RegisterOwnerErrors?.["pre_state"]?.school_name);
                setPassword(RegisterOwnerErrors?.["pre_state"]?.password);
                setMobileNumber(RegisterOwnerErrors?.["pre_state"]?.mobile_number);
            }

            // display the warning

            console.log("error bag.");
            console.log(RegisterOwnerErrors?.["error_message"]);
            if (!!RegisterOwnerErrors?.["error_message"]) {
                let htmlFormatted = '';
                for (const error in RegisterOwnerErrors?.["error_message"]) {
                    console.log("inside.");
                    console.log(error);
                    console.log("value.");
                    console.log(RegisterOwnerErrors?.["error_message"]?.[error]);
                    htmlFormatted += `${stringifyStringFix(RegisterOwnerErrors?.["error_message"]?.[error]?.[0])}`;
                }
                console.log("formatted.");
                console.log(htmlFormatted);
                props?.onDisplayError(htmlFormatted);
                setTimeout(() => dispatch(resetOwnerRegisterErrors()), 2000);
            }

            // const htmlDispalEroror = RegisterOwnerErrors?.reduce(e => `<p>${String(e)}</p>`);
            // console.log("htmlDispalEroror");
            // console.log(htmlDispalEroror);
            // props?.onDisplayError(htmlDispalEroror);
            // setTimeout(() => dispatch(resetOwnerRegisterErrors()), 2000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RegisterOwnerErrors]);

    useEffect(() => {
        dispatch(clearOwnerRegistration());
        //eslint-disable-next-line
    }, []);
    

    return (
        <Fragment>
            <FormItem>
                <TextInput name="legal_school_name" title='Legal School Name' value={legalSchoolName} onChange={(legalSchoolName: string) => setLegalSchoolName(legalSchoolName)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <TextInput name="business_email" title='Business Email' value={email} onChange={(email: string) => setEmail(email)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <TextInput name="mobile_number" title='Mobile Number' value={mobileNumber} onChange={(mobileNumber: string) => setMobileNumber(mobileNumber)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <InputPassword name="password" placeholder='Password' value={password} onChange={(password: string) => setPassword(password)} containerStyle={FormInputWidth} />
            </FormItem>
            <ButtonSendForm onClick={handleOwnerSignUp}>
              <div className="text-48px-large-1-primary flex-col-hstart-vstart" style={{ textAlign: "center", paddingLeft: "29.54vh", paddingRight: "25.54vh", marginTop: "0.75vh" }}>
                <p className={css`
                font-size: 16px;
                font-family: Open Sans, sans-serif;
                font-weight: 700;
                line-height: 125%;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                word-wrap: break-word;
                `}>Register</p>
              </div>
            </ButtonSendForm>
        </Fragment>
    );
};

export default OwnerSignUpForm;
