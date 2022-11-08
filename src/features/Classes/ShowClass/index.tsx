/* eslint-disable no-useless-escape */
import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Pen } from "react-bootstrap-icons";
import { useState } from "react";
import { css } from "@emotion/css";
import GrayHorizontalLine from "../../../components/GeometricShapes/GrayHorizontalLine";
// import { AddOwnerForm, setIsAddingStudent, storeStudent, StudentElement } from "../studentsSlice";
import { useAppDispatch } from "../../../app/hooks";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import React from "react";
import { setIsShowingClassInformation } from "../../Demo/demoSlice";
import moment from "moment";
import WeeklyDaySelector from "../../../components/WeeklyDaySelector";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10vh;
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const Header = styled.div`
flex: 1;
display: flex;
justify-content: space-between;
flex-direction: row;
flex-wrap: wrap;
width: "100%";
height: "10%";
padding-top: 2.25%;
padding-bottom: 2.25%;
`;

const TextTile5 = styled.p`
font-size: 18px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 123%;
  color: rgba(60, 46, 60, 1);
  width: 100%;
  word-wrap: break-word;
  text-align: left;
`;

const TextTruncated = styled.p`
width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

export default function ShowClass(props: any) {
  const dispatch = useAppDispatch();

  const [weekday, setWeekday] = useState(null);

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  const handleOpenClassInformation = () => {
    dispatch(setIsShowingClassInformation(true));
  };

  const handleAddStudent = () => {
    props?.callbackForEdit();
  };

  console.log("props show student", props);

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA", marginTop: "3.756vh" }}>
            <p style={{ width: "35%", paddingTop: "2vh", fontSize: "25px", fontWeight: '400', marginLeft: "-6vh" }}>
                <TextTruncated>
                    <img src="../assets/img/icon-class-board-show-class.png" alt="icon class"  style={{ fontSize: 27, marginRight: 5 }} />{`\BTW ${props?.student?.id} Details`}
                </TextTruncated>
            </p>
            <div style={{ width: "55%", paddingTop: "0vh", paddingLeft: "0vh" }}>
                <InputButton2
                    name="material"
                    title="Class Information"
                    color="red"
                    class={css`background-color: #FF4311!important; color: white; font-weight: bold; border-radius: 6px; ${!!props?.disableEditing && "margin-left: 52%;"}`} 
                    onClick={handleOpenClassInformation}
                />
                {!props?.disableEditing ? <InputButton2
                    preIcon={<Pen style={{ marginRight: 5 }} />}
                    name="edit_vehicle"
                    title="Edit Details"
                    color="red"
                    class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important }`} 
                    onClick={handleAddStudent}
                /> : null}
            </div>
        </Header>
        <div className={css`
            width: 95%;
            height: ${height-HEADER_SPACE}px;
            maxHeight: ${height-HEADER_SPACE}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
            overflow-y: auto !important;
        `}>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>NAME</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>INSTRUCTOR</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>INSTRUCTOR SUBSTITUTE-1</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>INSTRUCTOR SUBSTITUTE-1</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.name}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${capitalizeFirstLetter(props?.student?.class_instructor?.first_name) + " " + capitalizeFirstLetter(props?.student?.class_instructor?.last_name)}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.instructor_sub1}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.instructor_sub2}</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CLASS SIZE</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>DATE START</p>
                </MDBCol>
                <MDBCol md="6"></MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.class_size}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{moment(props?.student?.class_date_start).format("Do MMMM, YYYY")}</p>
                </MDBCol>
                <MDBCol md="6"></MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Session Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>TOTAL NO. OF SESSIONS</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>NO. OF SESSIONS PER DAY</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>BREAK/EXTRA TIME</p>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.total_number_of_sessions}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.total_number_of_sessions_day}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.number_of_extra_sessions}</p>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
                <MDBRow className="mt-3 mb-3">
                    <MDBCol md="6" className="mt-3">
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="4" className="mt-4">
                            <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>Session 1:</p>
                            </MDBCol>
                            <MDBCol md="3" className="mt-3">
                            <MDBCol md="2" className="mt-3">

                            </MDBCol>
                            </MDBCol>

                            <MDBCol md="3" className="mt-3">

                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="4" className="mt-4">
                            <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>Session 2:</p>
                            </MDBCol>
                            <MDBCol md="3" className="mt-3">
                            <MDBCol md="2" className="mt-3">

                            </MDBCol>
                            </MDBCol>

                            <MDBCol md="3" className="mt-3">

                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="6" className="mt-3">
                        <WeeklyDaySelector selected={weekday} onChange={(d) => {setWeekday(d)}} />
                    </MDBCol>
                </MDBRow>
            </MDBRow>
            <GrayHorizontalLine />
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="6">
                    <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Material/Program Completion Checklist</TextTile5>
                    <span style={{ textAlign: "left", float: "left" }}>
                        <img src="../assets/img/check-mark-completition-list-item-add.png" alt="icon search bar top search sort default" />{"\t"}50 hour driving practice
                    </span>
                </MDBCol>
                <MDBCol md="6">
                    <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Students Assigned To</TextTile5> 
                </MDBCol>
            </MDBRow>
        </div>
    </MainContainer>
  )
}
