import { css } from '@emotion/css';
import styled from '@emotion/styled'
import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import InputPassword from '../../../components/InputPassword/InputPassword';
import TextInput from '../../../components/TextInput/TextInput';
import { registerStudentAsync, resetStudentRegisterErrors } from '../../Demo/demoSlice';

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

const StudentSignUpForm = (props: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [legalSchoolName, setLegalSchoolName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");

    const RegisterStudentErrors = useAppSelector((state) => state.demo.registerStudentError);

    const handleStudentSignUp = () => {
         dispatch(registerStudentAsync({
            first_name: legalSchoolName,
            email: email,
            mobile_number: mobileNumber,
            password: password,
         }));

         navigate(`/verify-account/${email}`, { replace: false });

    };

    useEffect(() => {
        console.log("RegisterStudentErrors");
        console.log(RegisterStudentErrors);
        if (!!RegisterStudentErrors) {

            // catch the previous values and display to user.

            if (!!RegisterStudentErrors?.["pre_state"]) {
                setEmail(RegisterStudentErrors?.["pre_state"]?.business_email);
                setLegalSchoolName(RegisterStudentErrors?.["pre_state"]?.school_name);
                setPassword(RegisterStudentErrors?.["pre_state"]?.password);
                setMobileNumber(RegisterStudentErrors?.["pre_state"]?.mobile_number);
            }

            // display the warning

            console.log("error bag.");
            console.log(RegisterStudentErrors?.["error_message"]);
            if (!!RegisterStudentErrors?.["error_message"]) {
                let htmlFormatted = '';
                for (const error in RegisterStudentErrors?.["error_message"]) {
                    console.log("inside.");
                    console.log(error);
                    console.log("value.");
                    console.log(RegisterStudentErrors?.["error_message"]?.[error]);
                    htmlFormatted += `${String(RegisterStudentErrors?.["error_message"]?.[error]?.[0])}`;
                }
                console.log("formatted.");
                console.log(htmlFormatted);
                props?.onDisplayError(htmlFormatted);
                setTimeout(() => dispatch(resetStudentRegisterErrors()), 2000);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RegisterStudentErrors]);

    return (
        <Fragment>
            <FormItem>
                <TextInput name="student_name" title='Student Name' value={legalSchoolName} onChange={(legalSchoolName: string) => setLegalSchoolName(legalSchoolName)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <TextInput name="business_email" title='Email' value={email} onChange={(email: string) => setEmail(email)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <TextInput name="mobile_number" title='Mobile Number' value={mobileNumber} onChange={(mobileNumber: string) => setMobileNumber(mobileNumber)} containerStyle={FormInputWidth} />
            </FormItem>
            <FormItem>
                <InputPassword name="password" placeholder='Password' value={password} onChange={(password: string) => setPassword(password)} containerStyle={FormInputWidth} />
            </FormItem>
            <ButtonSendForm onClick={handleStudentSignUp}>
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

export default StudentSignUpForm;
