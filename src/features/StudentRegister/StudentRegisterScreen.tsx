import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react"
import HeaderSignInOnly from "../../components/Headers/HeaderSignInOnly"
import StudentSignUpForm from "./StudentSignUpForm/StudentSignUpForm";
import SignInLegend from "./SingInLegend"
import "./style.css"

const Frame2 = styled.div`
margin-bottom: 30px;
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const ItemsContainer = styled.div`
flex: 1;
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5vh;
`;

const Text945 = styled.a`
font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  width: 421px;
  word-wrap: break-word;
  opacity: 0.8;
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  text-decoration: none;
  &:hover {
    font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  width: 421px;
  word-wrap: break-word;
  opacity: 0.8;
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  text-decoration: none;
  }
  &:visited {
    font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  width: 421px;
  word-wrap: break-word;
  opacity: 0.8;
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  text-decoration: none;
  }
  &:active {
    font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  width: 421px;
  word-wrap: break-word;
  opacity: 0.8;
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  text-decoration: none;
  }
`;

export default function StudentRegisterScreen(props: any) {
  return (
    <>
      <HeaderSignInOnly />
      <div style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
        <ItemsContainer>
          <div className="flex-col">
            <div className="text flex-col-hcenter-vstart">
              <p className="txt-868 flex-hcenter">ToRide Student Account Setup</p>
              <p className="txt-879 flex-hcenter">
                Please enter the following details to set up the account!
              </p>
            </div>
            <Frame2>
              <StudentSignUpForm
                onDisplayAlert={props?.onDisplayAlert}
                onDisplayError={props?.onDisplayError}
              />
            </Frame2>
            <div className={css`width: 100%; text-align: center; padding-bottom: 0.35vh;`}>
              <Text945 href="/sign-in">
                Already have an account? <span className="txt-9452">Sign In</span>
              </Text945>
            </div>
            <SignInLegend />
          </div>
        </ItemsContainer>
      </div>
    </>
  )
}
