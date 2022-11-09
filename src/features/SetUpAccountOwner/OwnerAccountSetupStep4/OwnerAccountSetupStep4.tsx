import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import Checkbox from "../../../components/Checkbox";
import InputButton from "../../../components/InputButton/InputButton";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "./style.css";

export default function OwnerAccountSetupStep2(props: any) {
  const { height } = useWindowDimensions();
  const [rememberMeCheck, setRememberMeCheck] = useState(false);

  const ImageSteps = styled.img`
    position: fixed;
    left: 0;
    top: 0;
    height: ${height}px;
    max-height: ${height}px;
    width: 31.50%;
  `;

  const ContainerForm = styled.div`
    background-color: rgba(255, 255, 255, 1);
    width: 80%;
    height: ${height};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    padding-left: 25%;
    padding-right: 4%;
  `;

  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <ImageSteps src="../assets/img/01_Owner A/Side Patterns.png" alt="left pane navigation steps" />
      <ContainerForm>
        <div className={css`
        height: 100%;
        display: flex;
        flex-direction: row;
        padding-top: 13.5vh;
        padding-bottom: 13.5vh;
        `}>
          <div className="flex-col-hcenter">
            <div className="flex-col-hcenter">
              <div className="flex-col">
                <div className="label-text flex-col-hstart-vstart">
                  <p className="txt-867">STEP 3 OF 3</p>
                  <p className="txt-6410">Terms {'&'} Conditions</p>
                  <p className="txt-455 flex-hcenter">
                    Efective date: September 1, 2021
                  </p>
                </div>
              </div>
              <div className="flex-col">
              <div className="dummy-text flex-col">
              <div className="text-2">
                <div className="flex-col">
                  <p className="txt-640">Introduction</p>
                  <p className="txt-961" style={{ overflowWrap: "break-word"  }}>
                    We are committed to respecting your online privacy and
                    recognize your need for appropriate protection and
                    management of any personally identifiable information
                    (“Personal Information”) you share with us. “Personal
                    Information” means any information that may be used, either
                    alone or in combination with other information, to
                    personally identify an individual, including, but not
                    limited to, a first and last name, personal profile, a home
                    or other physical address, an email address or other contact
                    information.
                  </p>
                </div>
              </div>
              <div className="text-2">
                <div className="flex-col">
                  <p className="txt-640">Consent and Modification</p>
                  <p className="txt-961" style={{ overflowWrap: "break-word"  }}>
                    By using this Site, you consent to the terms of our Privacy
                    Policy and to Webkul Software Private Limited processing of
                    Personal Information for the purposes set forth herein. If
                    you do not agree to this Privacy Policy, please do not use
                    our Site. We reserve the right, at our discretion, to change
                    this Privacy Policy at any time, which change will be
                    effective 30 days following posting the revised Privacy
                    Policy on the Site. Your continued use of our Site 30 days
                    following such posting means you will accept those changes.
                  </p>
                </div>
              </div>
              <div className="text-3">
                <div className="flex-col">
                  <p className="txt-640">
                    Receipt and Collection of Information
                  </p>
                  <p className="txt-961" style={{ overflowWrap: "break-word"  }}>
                    By using this Site, you consent to the terms of our Privacy
                    Policy and to Webkul Software Private Limited processing of
                    Personal Information for the purposes set forth herein. If
                    you do not agree to this Privacy Policy, please do not use
                    our Site. We reserve the right, at our discretion...
                  </p>
                </div>
              </div>
              <Checkbox checked={rememberMeCheck} onClick={(selected) => setRememberMeCheck(!selected)} />
              <div style={{ paddingBottom: "1.95vh", borderBottom: "1px solid #DCE3EA", paddingTop: "1.95vh", borderTop: "1px solid #DCE3EA" }}>
                <p className="txt-154">
                  I agree to the terms {'&'} conditions!
                </p>
              </div>
            </div>
                <div className={css`
                  display: flex;
                  flex-wrap: wrap;
                `}>
                  <InputButton
                    label="Next"
                    type="button"
                    variant="dark"
                    size="sm"
                    containerStyle={{ width: "26.15vh", marginTop: "2.5vh", padding: "1.235vh 1.235vh 1.235vh 1.235vh" }}
                    onClick={props?.onNext}
                  />
                  <InputButton
                    label="Previous"
                    type="button"
                    variant="light"
                    size="sm"
                    containerStyle={{ width: "26.15vh", marginTop: "2.5vh", marginLeft: "1vh", padding: "1.235vh 1.235vh 1.235vh 1.235vh" }}
                    onClick={props?.onPrevious}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerForm>
    </div>
  )
}
