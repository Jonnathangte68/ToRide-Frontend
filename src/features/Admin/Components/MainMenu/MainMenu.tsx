import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import SettingsButton from "../SettingsButton/SettingsButton";
import COLORS from "../../../../utils/colors";
import { selectMenuOption, setUsername } from "../../../Demo/demoSlice";

const NavMenu = styled.div`
position: fixed !important; /* Set the navbar to fixed position */
  top: 0 !important; /* Position the navbar at the top of the page */
  left: 0 !important; /* Position the navbar at the top of the page */
  padding: 0px 0px 39px 0px;
  box-sizing: border-box;
  background-color: rgba(44, 47, 52, 1);
  height: 100%;
  min-height: 100%;
  overflow: hidden !important;
  width: 9vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LogoContainer = styled.div`
  padding: 30px 15px;
  padding-bottom: 2% !important;
  margin-bottom: 0px !important;
  box-sizing: border-box;
  background-color: rgba(44, 47, 52, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LogoImg = styled.img`
width: 100%;
  height: 100%;
`;

const MenuOptionsContainer = styled.div`
margin-bottom: 71px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 3vh;
  padding-bottom: 10vh;
  height: 92.75%;
`;

const OptionItemMiddle = styled.div`
padding: 22px 27px;
  box-sizing: border-box;
  background-color: rgba(44, 47, 52, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.95vh;
`;

const MainMenu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const optionSelected = useAppSelector((state) => state.demo.menuOptionSelected);
    const owners = useAppSelector((state) => state.demo.ownerProfiles);
    const user = useAppSelector((state) => state.demo.userlogin);
    console.log("option selected", optionSelected);

    useEffect(() => {
      // @ts-ignore
      const ownerIdx = _.findIndex(owners, (owner) => owner?.user?.email === user.username);
      if (!!owners[ownerIdx]?.first_name) {
        dispatch(setUsername(`${owners[ownerIdx]?.first_name} ${owners[ownerIdx]?.last_name}`));
      }
    }, [owners, navigate, user.username, dispatch]);

    const handleDashboardSpecialRedirect = () => {
      dispatch(selectMenuOption(0));
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: false });
      },400);
    };

    return (
        <NavMenu>
          <LogoContainer>
            <LogoImg
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-I1690%3A93856%3B70%3A1971?alt=media&token=ee03146c-b330-4d39-ae09-3aac8a7fd8ea"
              alt="Not Found"
              onClick={handleDashboardSpecialRedirect}
            />
          </LogoContainer>
          <MenuOptionsContainer>
            <br/>
            <OptionItemMiddle className={css`${optionSelected === 2 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 2 ? "../assets/img/student-selected-menu-option.png" : "../assets/img/student-unselected-menu-option.png" }
                alt="Not Found"
                className="icon-menu-icon-1"
                onClick={() => navigate("/admin/students", { replace: false })}
              />
            </OptionItemMiddle>
            <OptionItemMiddle className={css`${optionSelected === 3 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 3 ? "../assets/img/staff-menu-item-selected.png" : "../assets/img/staff-menu-item-unselected.png" }
                alt="Not Found"
                className="icon-menu-icon-1"
                onClick={() => navigate("/admin/staff", { replace: false })}
              />
            </OptionItemMiddle>
            <OptionItemMiddle className={css`${optionSelected === 5 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 5 ? "../assets/img/classes-menu-item-option-selected.png" : "../assets/img/classes-menu-item-option-unselected.png" }
                alt="Not Found"
                className="icon-menu-icon-1"
                onClick={() => navigate("/admin/classes", { replace: false })}
              />
            </OptionItemMiddle>
            <OptionItemMiddle className={css`${optionSelected === 6 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 6 ? "../assets/img/location-menu-item-option-selected.png" : "../assets/img/location-menu-item-option-unselected.png" }
                alt="option location"
                className="icon-menu-icon-1"
                onClick={() => navigate("/admin/locations", { replace: false })}
              />
            </OptionItemMiddle>
            <OptionItemMiddle className={css`${optionSelected === 8 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 8 ? "../assets/img/transaction-menu-item-option-selected.png" : "../assets/img/transaction-menu-item-option-unselected.png" }
                alt="Not Found"
                className="icon-menu-icon-1"
                onClick={() => navigate("/admin/transactions", { replace: false })}
              />
            </OptionItemMiddle>
            <OptionItemMiddle className={css`${optionSelected === 9 && "border-right: 3px solid "+COLORS.ORANGE}`}>
              <img
                src={optionSelected === 9 ? "../assets/img/simulator-menu-item-option-selected.png" : "../assets/img/simulator-menu-item-option-unselected.png" }
                alt="Not Found"
                className="fi-box"
                onClick={() => navigate("/admin/simulators", { replace: false })}
              />
            </OptionItemMiddle>
          </MenuOptionsContainer>
          <SettingsButton />
        </NavMenu>
    );
};

export default MainMenu;
