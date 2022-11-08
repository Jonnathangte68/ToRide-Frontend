import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react"
import HeaderSignInOnly from "../../../components/Headers/HeaderSignInOnly";
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
  border: 1px solid rgba(220, 227, 234, 1);

  `;

  const Logo = styled.img`
  width: 198.87px;
  height: 40px;
  margin-bottom: 40px;
  `;

  const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
  box-sizing: border-box;
  width: fit-content;
  `;

export default function OwnerRegisterVerifyEmailAccount() {
  return (
    <>
      <HeaderSignInOnly path="/sign-in" />
      <MainContainer>
      <DetailsContainer>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/83o6iaozd4x-26%3A847?alt=media&token=e5fd12b2-3fb6-40ce-84cb-6583716eb5dd"
          alt="Not Found"
        />
        <TextContainer>
          <p className={css`
                font-size: 22px;
                font-family: Open Sans, sans-serif;
                font-weight: 700;
                line-height: 145%;
                color: rgba(44, 47, 52, 1);
                text-align: center;
                word-wrap: break-word;
                margin-bottom: 17px;
                justify-content: center;
                padding-left: 10.15vh;
          `}>Verify Your Email Address!</p>
          <p className={css`
          font-size: 15px;
          font-family: Open Sans, sans-serif;
          font-weight: 700;
          line-height: 160%;
          color: rgba(44, 47, 52, 1);
          width: 502px;
          word-wrap: break-word;
          margin-bottom: 5px;
          padding-left: 9vh;
          text-align: left;
          `}>Hi there!</p>
          <p className={css`
          font-size: 15px;
          font-family: Open Sans, sans-serif;
          font-weight: 400;
          line-height: 160%;
          color: rgba(44, 47, 52, 1);
          width: 512px;
          word-wrap: break-word;
          padding-left: 9.5vh;
          text-align: justify;
          `}>
            Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder
            text used in design when creating content. It helps designers plan
            out where the content will sit, without needing to wait for the
            content to be written and approved. It originally comes from a Latin
            text, but to today's reader, it's seen as gibberish.
          </p>
        </TextContainer>
        <div className={css`
          margin-bottom: 19px;
          box-sizing: border-box;
          height: 48px;
          width: 100%;
          padding-left: 17.5vh;
          padding-right: 17.5vh;
          text-align: center;
        `}>
          <div className={css`
            padding: 13px 33px 12px 33px;
            box-sizing: border-box;
            border-radius: 4px;
            background-color: rgba(44, 47, 52, 1);
            width: 100%;
            height: 100%;
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
            `}>Verify Now</p>
          </div>
        </div>
        <div className="support-message">
          <p className="txt-937">
            Something you’ll have question, and we have multiple channels to get
            you answers-fast. Call{" "}
            <span className="txt-9372">1800-021-0124</span> or email us at{" "}
            <span className="txt-9372">Support@toride.com.</span>
          </p>
        </div>
      </DetailsContainer>
    </MainContainer>
    </>
  )
}
