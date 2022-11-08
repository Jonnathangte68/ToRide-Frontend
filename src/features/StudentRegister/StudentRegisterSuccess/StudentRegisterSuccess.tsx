import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSignInOnly from "../../../components/Headers/HeaderSignInOnly";
import InputButton from "../../../components/InputButton/InputButton";

const Container = styled.div`
padding: 0px 0px 226px 0px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  width: "100%";
  height: "100%";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const CenterContainer = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: "100%";
  height: "100%";
  padding-top: 9vh;
  padding-bottom: 9vh;
`;

const FlexColHCenterContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.img`
  width: 29.15vh;
  height: 29.15vh
`;

const MainTitleContainer = styled.div`
margin-bottom: 40px;
  box-sizing: border-box;
  width: 100%;
display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text274 = styled.p`
font-size: 30px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 133%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  word-wrap: break-word;
  margin-bottom: 11px;
  justify-content: center;
`;

const Text4104 = styled.p`
font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  line-height: 160%;
  color: rgba(117, 124, 133, 1);
  text-align: center;
  word-wrap: break-word;
`;

const Text41042 = styled.span`
font-weight: 600;
  color: rgba(44, 47, 52, 1);
`;

const ButtonResendEmailStyle: CSSProperties = {
  width: "100%",
  marginTop: "0.75vh",
  marginBottom: "0.75vh",
  padding: "14.85px 10px"
};

const ButtonBackToSignInStyle: CSSProperties = {
  ...ButtonResendEmailStyle,
  border: "2px solid black"
};

export default function StudentRegisterSuccess() {
  const navigate = useNavigate();
  
  return (
    <>
      <HeaderSignInOnly />
      <Container>
        <CenterContainer>
          <FlexColHCenterContainer>
            <MainImage
              src="../assets/img/owner-files-school-registration-success.png"
              alt="registration owner success school"
            />
            <MainTitleContainer>
              <Text274>Registration Successfully!</Text274>
              <Text4104>
                We sent an email to{" "}
                <Text41042 className="txt-41042">example@toride.com.</Text41042><br/>Click the
                confirmation link in the email to verify your account
              </Text4104>
            </MainTitleContainer>
            <InputButton label="Resend Email" variant="dark" containerStyle={ButtonResendEmailStyle} />
            <InputButton label="Back to Sign in" onClick={() => navigate("/", { replace: false })} variant="" containerStyle={ButtonBackToSignInStyle} />
          </FlexColHCenterContainer>
        </CenterContainer>
      </Container>
    </>
  )
}