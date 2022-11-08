import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react"
import { useNavigate } from "react-router-dom";
import HeaderSignInOnly from "../../../components/Headers/HeaderSignInOnly";
import TextInput from "../../../components/TextInput/TextInput";
import "./style.css"

const MainContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-top: 4.85%;
padding-bottom: 4.85%;
`;

const DetailsContainer = styled.div`
padding: 50px 0px 0px 0px;
text-align: center;
box-sizing: border-box;
border-radius: 8px;
background-color: rgba(255, 255, 255, 1);
`;

  const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
  box-sizing: border-box;
  width: fit-content;
  `;

export default function StudentRegisterVerifyEmailAccount() {
  const navigate = useNavigate();

  const handleVerifyStudentPhoneNumber = () => {
    navigate("/email-verification", { replace: false })
  };

  return (
    <>
      <HeaderSignInOnly />
      <MainContainer>
      <DetailsContainer>
        <TextContainer>
          <p className={css`
                font-size: 35px;
                font-family: Open Sans, sans-serif;
                font-weight: 700;
                line-height: 145%;
                color: rgba(44, 47, 52, 1);
                text-align: center;
                width: 100%;
                word-wrap: break-word;
                margin-bottom: 17px;
                justify-content: center;
                padding-left: 10.15vh;
                text-align: center;
          `}>Mobile Number Verification</p>
          <p className={css`
          font-size: 0.98rem;
          font-family: Open Sans, sans-serif;
          font-weight: 400;
          line-height: 160%;
          width: 100%;
          color: rgba(44, 47, 52, 1);
          width: 512px;
          word-wrap: break-word;
          padding-left: 9.5vh;
          text-align: center;
          `}>Please enter the 4 digit OTP</p>
          <div className={css`
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 5vh;
            margin-bottom: 5vh;
            padding-left: 23vh;
            padding-right: 13vh;
          `}>
            <TextInput name="code_number_1_verification_1_number" title="" containerStyle={{ marginLeft: "2vh", display: "inline" }} extraProps={{ maxLength: 1 }} />
            <TextInput name="code_number_2_verification_2_number" title="" containerStyle={{ marginLeft: "2vh", display: "inline" }} extraProps={{ maxLength: 1 }} />
            <TextInput name="code_number_3_verification_3_number" title="" containerStyle={{ marginLeft: "2vh", display: "inline" }} extraProps={{ maxLength: 1 }} />
            <TextInput name="code_number_4_verification_4_number" title="" containerStyle={{ marginLeft: "2vh", display: "inline" }} extraProps={{ maxLength: 1 }} />
          </div>
          <div className={css`
            width: 100%;
            height: 100%;
            padding-left: 45vh;
            padding-right: 30vh;
          `}
          onClick={handleVerifyStudentPhoneNumber}> 
            <div className={css`
              padding: 13px 33px 12px 33px;
              box-sizing: border-box;
              border-radius: 4px;
              background-color: rgba(44, 47, 52, 1);
              text-align: center;
            `}>
              <p className={css`
                font-size: 16px;
                font-family: Open Sans, sans-serif;
                font-weight: 700;
                line-height: 125%;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                width: "100%";
                word-wrap: break-word;
                justify-content: center;
                text-align: center;
              `}>Verify</p>
            </div>
          </div>
          <p className={css`
            font-size: 0.98rem;
            font-family: Open Sans, sans-serif;
            font-weight: 400;
            line-height: 160%;
            width: 100%;
            color: rgba(44, 47, 52, 1);
            width: 512px;
            word-wrap: break-word;
            padding-left: 9.5vh;
            text-align: center;
            margin-top: 33px;
            `}>
              You didn't receive the verification number? <span>Resend</span>  
          </p>
        </TextContainer>
      </DetailsContainer>
    </MainContainer>
    </>
  )
}
