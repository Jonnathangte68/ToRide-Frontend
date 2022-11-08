import styled from '@emotion/styled'
import { useAppDispatch } from '../../app/hooks';
import { setGlobalLocation } from '../../features/Demo/demoSlice';
import SelectBox from "../SelectBox";
import "./PublicHeaderStyle.css";

const Container = styled.div`
  padding: 19px 80px 18px 80px;
  margin-bottom: 80px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 234, 1);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 12.25vh;
  margin-right: 46px;
  padding-top: 0.98vh;
`;

const LocationBar = styled.div`
  padding: 0.25% 4px 6px 3px;
  margin-right: 0.55%;
  box-sizing: border-box;
  height: 80%;
  flex: 12;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MenuOptions = styled.div`
  padding: 0px;
  box-sizing: border-box;
  flex: 1;
  height: 80.25% !important;
  height: fit-content;
`;

const LoginOptions = styled.div`
  height: fix-content;
  display: flex;
  flex: 3;
  flex-direction: row;
  margin-left: 2.25%;
  margin-top: -0.22vh;
`;

const OptionsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text8107 = styled.p`
  width: 9vh;
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  word-wrap: break-word;
  margin-right: 23px;`;

const Text757 = styled.p`
  width: 13vh;
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  word-wrap: break-word;
  border-right: 1px solid rgba(226, 226, 235);
  padding-right: 0%;
`;

const RegisterOwnerContainer = styled.div`
  padding: 11px 18px 10px 19px;
  margin-right: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(255, 67, 17, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Text134 = styled.a`
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 114%;
  color: rgba(255, 67, 17, 1);
  text-align: center;
  width: 118px;
  word-wrap: break-word;
  justify-content: center;
  &:hover {
    font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 114%;
  color: rgba(255, 67, 17, 1);
  text-align: center;
  width: 118px;
  word-wrap: break-word;
  justify-content: center;
  }
  &:active {
    font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 114%;
  color: rgba(255, 67, 17, 1);
  text-align: center;
  width: 118px;
  word-wrap: break-word;
  justify-content: center;
  }
`;

const SignInContainer = styled.div`
  padding: 11px 18px 10px 19px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(44, 47, 52, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LinkSignIn = styled.a`
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 114%;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  width: 59px;
  word-wrap: break-word;
  justify-content: center;
  text-decoration: none;
  &:hover {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    width: 59px;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
  &:visited {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    width: 59px;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
  &:active {
    font-family: Open Sans, sans-serif;
    font-weight: 700;
    line-height: 114%;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    width: 59px;
    word-wrap: break-word;
    justify-content: center;
    text-decoration: none;
  }
}
`;

const PinImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const PublicHeader = (props: any) => {
    const dispatch = useAppDispatch();

    const handleChangeLocation = (locationId: any) => {
      console.log("location id.");
      console.log(locationId);
      dispatch(setGlobalLocation(locationId));
    };

    return (
        <Container>
          <Logo
            src="../assets/img/logo-landing-1.png"
            alt="Not Found"
            style={{ flex: 1, width: "9vh", height: "auto", paddingTop: "1.29vh" }} //height: "3.77vh"
          />
          <LocationBar>
            <PinImage
              src="../assets/img/pin-landing-image-1.png"
              alt="Not Found"
              style={{ marginTop: "0.31vh" }}
            />
            {/* @ts-ignore */}
            <SelectBox id="main-landing-select-location-box-border" onChange={handleChangeLocation} boxStyle={{ marginTop: "-0.22vh", border: "none", width: "20vh" }} options={[{id: 0, name: "Malmi"}, {id: 1, name: "Test"}]}/>
          </LocationBar>
          <MenuOptions>
            <OptionsWrapper>
              <Text8107>Home</Text8107>
              <Text757>About us</Text757>
            </OptionsWrapper>
          </MenuOptions>
          <LoginOptions>
            <RegisterOwnerContainer>
              <Text134 href="/owner/sign-up-owner">Register Owner</Text134>
            </RegisterOwnerContainer>
            <RegisterOwnerContainer>
              <Text134 href="/sign-up">Register Student</Text134>
            </RegisterOwnerContainer>
            <SignInContainer>
              <LinkSignIn href={props?.path ? props?.path : "/sign-in"}>Sign In</LinkSignIn>
            </SignInContainer>
          </LoginOptions>
        </Container>
    );
};

export default PublicHeader;
