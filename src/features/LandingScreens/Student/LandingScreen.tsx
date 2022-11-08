import styled from "@emotion/styled";
import OutsideHeader from "../../../components/Headers/PublicHeader";

const MainContainer = styled.div`
padding: 0px 0px 132px 0px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

const Group1210 = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
margin-bottom: 43px;
  box-sizing: border-box;
  width: 669px;
  height: 217px;
  align-items: center;
  justify-content: center;
`;
const Text5107 = styled.p`
font-size: 16px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  line-height: 200%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  word-wrap: break-word;
  justify-content: center;
`;

const Text734 = styled.p`
  font-size: 48px;
  padding-bottom: 5%;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 136%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  word-wrap: break-word;
  justify-content: center;
`;

export default function LandingScreens() {
  return (
    <MainContainer>
      <Group1210>
        <OutsideHeader />
        <TextContainer>
        <Text734>The Most Advance<br/>Driving School in Finland</Text734>
          <Text5107>
            We have reacived your details. Our team will ger in touch with you
            soon. please download the app from App Store or Play Store to know.
          </Text5107>
          <img style={{ textAlign: "center", marginLeft: "9%" }} src="../assets/img/main-image-landing-all-screens-school.png" alt="driving school to ride main reach"></img>
        </TextContainer>
      </Group1210>
    </MainContainer>
  )
}