import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

interface SettingsButtonProps {
  onClick?: () => any;
}

const ActiveStateBadge = styled.div`
  border-radius: 2000px;
  background-color: rgba(255, 67, 17, 0.15);
  border: 1px solid rgba(255, 67, 17, 1);
  width: 48px;
  height: 48px;
`;

const UserNameBoxContainer = styled.p`
  font-size: 16px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 125%;
  color: rgba(255, 67, 17, 1);
  text-align: center;
  word-wrap: break-word;
  margin-right: 0px !important;
  position: relative;
  top: 4.88vh;
`;

const SettingsButtonWrapper = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const ButtonContainer = styled.div`
  background-color: rgba(44, 47, 52, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: center !important;
  align-items: center !important;
`;

const SettingsButton = (props: SettingsButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/owner/settings", { replace: true });
  };

  return (
      <ButtonContainer onClick={props.onClick}>
          <SettingsButtonWrapper onClick={handleLogout}>
              <UserNameBoxContainer>AD</UserNameBoxContainer>
              <ActiveStateBadge />
          </SettingsButtonWrapper>
      </ButtonContainer>
  );
};

export default SettingsButton;
