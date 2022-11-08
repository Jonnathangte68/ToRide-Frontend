import styled from "@emotion/styled";
import OutsideHeader from "../../components/Headers/PublicHeader";

const MainContainer = styled.div`
padding: 0px 0px 132px 0px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  width: 100%ñ
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
`;
const Text5107 = styled.p`
font-size: 16px;
  padding-top: 5%;
  padding-bottom: 5%;
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
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 136%;
  color: rgba(44, 47, 52, 1);
  text-align: center;
  word-wrap: break-word;
  justify-content: center;
`;

const Frame2Container = styled.div`
transform: rotate(-180deg);
  opacity: 0.5;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Component1HStart = styled.div`
margin-right: 6px;
  box-sizing: border-box;
  height: 100%;
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;`;

const Illustration = styled.div`
padding: 0px 0px 0px 6px;
  box-sizing: border-box;
  height: 346.51px;
  width: fit-content;
`;

const Arrow1 = styled.div`
transform: rotate(-23.6deg);
  width: 132.39px;
  height: 124.66px;
`;

const Text8381 = styled.p`
font-size: 11px;
  font-family: Rock Salt, handwriting;
  font-weight: 400;
  line-height: 218%;
  color: rgba(44, 47, 52, 1);
  word-wrap: break-word;
`;

const ArrowImg = styled.img`
width: 66.89px;
  height: 60px;
`;

const DogImg = styled.img`
width: 54.24px;
  height: 59.79px;
`;

const ObjectsImg = styled.img`
width: 507.81px;
  height: 100%;
`;

export default function LandingScreens() {
  return (
    <MainContainer>
      <Group1210>
        <OutsideHeader path="/sign-in" />
        <TextContainer>
          <Text5107>
            We have reacived your details. Our team will ger in touch with you
            soon. please download the app from App Store or Play Store to know.
          </Text5107>
          <Text734>The Most Advance Driving School in Finland</Text734>
          <Frame2Container className="frame-2 flex-row-vstart-hstart">
            <Component1HStart>
              <div className="ellipse-1" />
              <div className="ellipse-1" />
              <div className="ellipse-3" />
            </Component1HStart>
            <Component1HStart>
              <div className="ellipse-1" />
              <div className="ellipse-1" />
              <div className="ellipse-3" />
            </Component1HStart>
            <Component1HStart>
              <div className="ellipse-1" />
              <div className="ellipse-1" />
              <div className="ellipse-3" />
            </Component1HStart>
            <Component1HStart>
              <div className="ellipse-1" />
              <div className="ellipse-1" />
              <div className="ellipse-3" />
            </Component1HStart>
            <Component1HStart>
              <div className="ellipse-1" />
              <div className="ellipse-1" />
              <div className="ellipse-3" />
            </Component1HStart>
          </Frame2Container>
        </TextContainer>
        <Illustration>
          <Arrow1>
            <Text8381>Driving School</Text8381>
            <ArrowImg
              src="../assets/img/driving-school-illustration-arrow-up.png"
              alt="Not Found"
            />
          </Arrow1>
          <DogImg
            src="../assets/img/dog-car-driving-school-illustration-1.png"
            alt="Not Found"
          />
          <ObjectsImg
            src="../assets/img/driving-school-home-granny-landing-1.png"
            alt="Not Found"
          />
        </Illustration>
      </Group1210>
    </MainContainer>
  )
}