import { css } from '@emotion/css';
import styled from '@emotion/styled'
import { CSSProperties, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import InputPassword from '../../../components/InputPassword/InputPassword';
import TextInput from '../../../components/TextInput/TextInput';
import { addOwner, addStudent } from '../../Demo/demoSlice';
// import { registerOwnerAsync } from '../ownerRegisterSlice';

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

const SignUpForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [legalSchoolName, setLegalSchoolName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleStudentSignUp = () => {
        // dispatch(registerOwnerAsync({ 
        //     school_name: legalSchoolName,
        //     business_email: email,
        //     mobile_number: mobileNumber,
        //     password: password,
        //  }));
        dispatch(addStudent({
            first_name: legalSchoolName,
            email: email,
            mobile_number: mobileNumber,
            password: password,
         }));

        navigate(`/verify-account/${email}`, { replace: false });

    };

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
              <div className="text-48px-large-1-primary flex-col-hstart-vstart" style={{ textAlign: "center", paddingLeft: "25.54vh", paddingRight: "25.54vh", marginTop: "0.75vh" }}>
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

export default SignUpForm;
