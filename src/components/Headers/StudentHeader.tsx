import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/Demo/demoSlice';
import COLORS from '../../utils/colors';
import SelectBox from '../SelectBox';

const Container = styled.div`
padding: 19px 136px 18px 3vh;
margin-bottom: 0px;
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
width: 201.74px;
margin-right: 46px;
height: 100%;
`;

const LocationBar = styled.div`
padding: 0px 4px 6px 3px;
margin-right: 203px;
box-sizing: border-box;
height: fit-content;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
`;

const MenuOptions = styled.div`
padding: 6px 20px 3px 0px;
padding-left: 11.50%;
margin-right: 20px;
box-sizing: border-box;
width: 152px;
height: fit-content;
`;

const OptionsWrapper = styled.div`
height: 100%;
display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Text8107 = styled.p`
font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  word-wrap: break-word;
  margin-right: 23px;`;

const Text757 = styled.p`
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(44, 47, 52, 1);
  word-wrap: break-word;
  margin-left: 3.65vh;
  margin-right: 3.65vh;
`;

const LogOutStudentBtn = styled.div`
  padding: 11px 18px 10px 19px;
  margin-right: 15px;
  margin-top: -10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(255, 67, 17, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgba(255, 67, 17, 1);
  color: #FFF;
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
`;

const PinImage = styled.img`
width: 24px;
height: 24px;
margin-right: 8px;
`;

const StudentHeader = (props: any) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const OPTION_SELECTED_STYLE = {
      color: `${COLORS.ORANGE}`,
      borderBottom: `3px solid ${COLORS.ORANGE}`
    };

    const handleLogout = () => {
      dispatch(logout());
      navigate("/sign-in", { replace: true });
    };
    
    return (
        <Container>
          <Logo
            src="../assets/img/logo-landing-1.png"
            alt="Not Found"
            style={{ width: "16.87vh", height: "4.87vh" }}
          />
          <LocationBar>
            <PinImage
              src="../assets/img/pin-landing-image-1.png"
              alt="Not Found"
              style={{ marginTop: "0.40vh", height: "3.45vh", width: "3.45vh", marginRight: "-.59vh" }}
            />
            <SelectBox id="main-landing-select-location-box-border" boxStyle={{ marginTop: "0vh", width: "30vh", border: "none" }} options={[{id: 0, name: "Malmi"}]}/>
          </LocationBar>
          <MenuOptions>
            <OptionsWrapper>
              <Text8107 style={location.pathname === "/dashboard" ? OPTION_SELECTED_STYLE : null} onClick={() => navigate("/dashboard", { replace: false })}>Home</Text8107>
              <Text757 style={location.pathname === "/classes" ? OPTION_SELECTED_STYLE : null} onClick={() => navigate("/classes", { replace: false })}>Classe</Text757>
              <Text757 style={location.pathname === "/calendar-view" ? OPTION_SELECTED_STYLE : null} onClick={() => navigate("/calendar-view", { replace: false })}>Calendar</Text757>
              <Text757 style={location.pathname === "/my-profile" ? OPTION_SELECTED_STYLE : null} onClick={() => navigate("/my-profile", { replace: false })}>Profile</Text757>
              <LogOutStudentBtn onClick={handleLogout}>
                <Text134>Logout</Text134>
              </LogOutStudentBtn>
            </OptionsWrapper>
          </MenuOptions>
        </Container>
    );
};

export default StudentHeader;
