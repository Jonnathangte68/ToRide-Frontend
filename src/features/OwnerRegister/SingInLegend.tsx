import styled from "@emotion/styled";

const InfoContainer = styled.div`
  box-sizing: border-box;
  border-top: 1px solid rgba(117, 124, 133, 1);
  width: 100%;
  margin-top: 0.35vh;
  padding-top: 1.75vh;
  `;

const Text7100 = styled.p`
font-size: 13px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  line-height: 138%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  word-wrap: break-word;
  opacity: 0.8;
`;

const Text71002 = styled.span`
font-weight: 700;
  color: rgba(255, 67, 17, 1);
`;

export default function SignInLegend() {
    return (
        <InfoContainer>
            <Text7100>
                By clicking “Register” you agree to ToRide.com website<br/>
                <Text71002>Terms & Conditions</Text71002> an{" "}
                <Text71002>Privacy Policy.</Text71002>
            </Text7100>
        </InfoContainer>
    );
}