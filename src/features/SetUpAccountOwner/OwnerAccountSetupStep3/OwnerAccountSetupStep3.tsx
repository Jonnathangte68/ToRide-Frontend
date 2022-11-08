import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { range } from "lodash";
import React, { useState } from "react"
import InputButton from "../../../components/InputButton/InputButton";
import InputDropdown from "../../../components/InputSelect/InputSelect";
import TextInput from "../../../components/TextInput/TextInput";
import { Editor } from "react-draft-wysiwyg";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css"

interface OwnerAccountSetupStep3Props {
  onNext: () => any;
  onPrevious: () => any;
}

export default function OwnerAccountSetupStep3(props: OwnerAccountSetupStep3Props) {
  const { height } = useWindowDimensions();
  const [aboutUsText, setAboutUsText] = useState(undefined);

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
    width: 68.50%;
    height: ${height};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    margin-left: 12.75%;
  `;

  const WYSIWYGContainer = styled.div`
    border: 1px solid #F3F3F3 !important;
    border-radius: 6px;
  `;

  const getTimeOptions = () => {
    const values: string[] = [];
    for (let time in range( 0, 24, 1 )) {
      values.push(`${parseInt(time) > 12 ? (parseInt(time)-12) : parseInt(time)}:00 ${parseInt(time) > 12 ? "PM" : "AM"}`);
    }
    return values;
  };

  const handleEditorStateChange = (value: any) => {
    setAboutUsText(value);
  };

  console.log("get time options debug ", getTimeOptions());

  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <ImageSteps src="../assets/img/01_Owner A/Side Patterns.png" alt="left pane navigation steps" />
      _-01-_owner-acsetup flex-col-hstart-vstart clip-contents
      <ContainerForm>
        <div className={css`
        height: 100%;
        display: flex;
        flex-direction: row;
        padding-top: 13.5vh;
        padding-bottom: 13.5vh;
        overflow-y: scroll !important;
        `}>
          <div className="flex-col-hcenter">
            <div className="flex-col-hcenter">
              <div className="flex-col">
                <div className="label-text flex-col-hstart-vstart">
                  <p className="txt-867">Step 2 of 3</p>
                  <p className="txt-6410">Company Details</p>
                  <p className="txt-073 flex-hcenter">
                    Please enter the following details to proceed further
                  </p>
                </div>
                <div className="picture flex-col-hstart-vstart" style={{ paddingLeft: "3.35vh", width: "15vh", height: "15vh" }}>
                  <p className="txt-025 flex-hcenter">Company<br/>Logo</p>
                </div>
              </div>
              <div className="flex-col">
                <div className={css`
                  display: flex;
                  flex-wrap: wrap;
                `}>
                   <TextInput name="first_name" title="Company Name" value="" containerStyle={{ boxSizing: 'border-box', width: '52.50vh', marginRight: '13px' }} />
                   <TextInput name="last_name" title="Registration Number" value="" containerStyle={{ boxSizing: 'border-box', width: '52.50vh', marginLeft: '13px' }} />
                </div>
                <div className={css`
                  display: flex;
                  flex-wrap: wrap;
                  margin-top: 3.5vh;
                `}>
                   <TextInput name="email_address" title="Email address" value="" containerStyle={{ boxSizing: 'border-box', width: '52.50vh', marginRight: '13px' }} />
                   <TextInput name="phone" title="Mobile Number" value="" containerStyle={{ boxSizing: 'border-box', width: '52.50vh', marginLeft: '13px' }} />
                </div>
                <div>
                  <p className={css`
                    margin-top: 2vh;
                    margin-bottom: 2vh;
                  `}>
                    About us
                  </p>
                  <WYSIWYGContainer>
                    <Editor
                      editorState={aboutUsText}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={handleEditorStateChange}
                    />
                  </WYSIWYGContainer>
                </div>
                <div style={{ paddingBottom: "4.25vh", borderBottom: "1px solid #DCE3EA" }}>
                  <p className={css`
                    margin-top: 2vh;
                    margin-bottom: 2vh;
                  `}>
                    Business Hours
                  </p>
                  <table className="dropdown-custom-select-business-hours">
                    <tr>
                      <td>
                        <InputDropdown dropdownTitle="From" onSelect={() => { } } options={getTimeOptions()} children={undefined} style={{ backgroundColor: COLORS.GRAY_INPUT }} />
                      </td>
                      <td>
                        <InputDropdown dropdownTitle="To" onSelect={() => { } } options={getTimeOptions()} children={undefined} />
                      </td>
                    </tr>
                  </table>
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
