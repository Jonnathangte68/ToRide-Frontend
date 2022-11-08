import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AlertComponent from "../../components/Alert";
import ContactSupport from "../../components/ContactSupport/ContactSupport";
import InputButton from "../../components/InputButton/InputButton";
import InputEmail from "../../components/InputEmail/InputEmail";
import COLORS from "../../utils/colors";
import stringifyStringFix from "../../utils/stringifyStringFix";
import { clearLoginErrors } from "../Demo/demoSlice";
import "./style.css";

const ForgotPassword = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>("");
  const [password,] = useState<string>("");
  const LoginErrors = useAppSelector((state) => state.demo.userLoginError);
  const [dispalyError, ] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement | null = document.querySelector('form');
    if (!!form) {
      let formData = new FormData(form);
      let username = "";
  
      Array.from(formData.entries(), ([key, value]) => {
        if (key === "username") {
          username = value as string;
        }
        return true;
      });

      console.log("form submit", {
        username,
        password
      });

    //   const usersignup = {
    //     username,
    //     password,
    //     type: "owner"
    //   };
      
    //   dispatch(authOwner(usersignup));
    }
  }

  useEffect(() => {
    if (!!LoginErrors) {
      props?.onDisplayError(stringifyStringFix(LoginErrors?.detail));
      // only show once.
      dispatch(clearLoginErrors());
    }
    //eslint-disable-next-line
  }, [LoginErrors]);

  const handleGoToSignIn = () => navigate("/sign-in");

  const renderFloatingElements = () => (
    <div className="available-on-sign-in">
      <p className="txt-777-sign-in flex-hcenter-sign-in">Available on</p>
      <table className="table-container-social-media-items-sign-in">
        <tbody>
          <tr>
            <th className="compact-items-social-media-sign-in">
              <img
                src="../assets/img/apple-logo-1.png"
                alt="Not Found"
                className="icon-table-social-media-sign-in"
              />  
            </th>
            <th className="border-table-separator compact-items-social-media-sign-in">
              <div style={{ borderLeft: "1px solid rgba(117, 124, 133, 1)" }}>
                <img
                  src="../assets/img/logo-selection-carret-1.png"
                  alt="Not Found"
                  className="icon-table-social-media-sign-in"
                />
              </div>
            </th>
            <th className="border-table-separator compact-items-social-media-sign-in">
              <div style={{ borderLeft: "1px solid rgba(117, 124, 133, 1)" }}>
                <img
                  src="../assets/img/logo-windows-1.png"
                  alt="Not Found"
                  className="icon-table-social-media-sign-in"
                />
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>);

  return (
    <>
    <div className="sign-in-screen">
      {!!dispalyError && (<AlertComponent text={dispalyError} variant="warning" />)}
      <div className="container-sign-in">


        {/* LEFT-SIDE CONTAINER */}

        <div className="container-left-sign-in flex-col-hstart-vstart-sign-in">
          <div className={css`flex: 3;`}>
            <img
                src="../assets/img/to-ride-logo-content-word-1.png"
                alt="Not Found"
                className="logo-sign-in"
            />
          </div>
          <div className={css`flex: 5; padding-left: 1vh; padding-right: 1vh;`}>
            <img
                src="../assets/img/central-image-school-dashboard-1.png"
                alt="Not Found"
                style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className={css`flex: 3;`}>
            <p className={css`text-align: center; font-size: 1.355rem; font-family: Open Sans, sans-serif; font-weight: 700; line-height: 123%; color: rgba(255, 255, 255, 1); word-wrap: break-word; margin-top: 1.5vh;`}>New opportunities for cooperation</p>
            <p className="txt-414-sign-in flex-hcenter-sign-in">
              An easy way to manage your files, creates groups of orders<br></br> and send
              to diffrent ways
            </p>
          </div>

          {renderFloatingElements()}
          
        </div>

        {/* RIGHT-SIDE CONTAINER */}

        <div className="flex-col-hcenter-sign-in">
          <h1 className="txt-4101-sign-in">Forgot Your Password</h1>
          <p className="txt-582-sign-in">Enter the email address you registered with and we'll<br/>send you the instructions to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="space-input-from-form-sign-in">
              <InputEmail
                class="form-inputbox-21-sign-in"
                name="username"
                value={username}
                onChange={(username: string) => setUsername(username)}
              />
            </div>
            <div className="space-input-from-form-sign-in">
              <InputButton
                label="Reset Password"
                class={"form-inputbox-22-sign-in"}
                type="submit"
                variant="dark"
              />
              <br/>
              <p style={{ textAlign: "center" }} className={css`font-size: 15px; font-family: Open Sans, sans-serif; font-weight: 400; color: rgba(117, 124, 133, 1); word-wrap: break-word;`}>Or <span style={{ color: COLORS.MORE_RED_BUTTON }} onClick={handleGoToSignIn} >Sign In</span></p>
            </div>
          </form>
          <ContactSupport style={{ backgroundColor: "transparent" }} />
        </div>
      </div>

      <img src="../assets/img/polygon_2.png" alt="decoration for sign in" className={css`position: absolute; top: 0vh; left: 12.5%; width: 13vh; height: 5vh; z-index: 1000;`} />
      <img src="../assets/img/polygon_1.png" alt="decoration for sign in" className={css`position: absolute; top: 3.88%; left: 17.95%; width: 6vh; height: 6vh; z-index: 1000;`} />
      <img src="../assets/img/polygon_4.png" alt="decoration for sign in" className={css`position: absolute; top: .44%; left: calc(40% - 10vh); width: 10vh; height: 22vh; z-index: 1000;`} />

    </div>


    </>
  )
}

export default ForgotPassword;
