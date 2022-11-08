import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import { Calendar2Date, Envelope, FileText, GenderMale, Pen, Telephone } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import capitalizeFirstLetter from "../../../../utils/capitalizeFirstLetter";
import InputButton2 from "../../../../components/InputButton2/InputButton2";
import COLORS from "../../../../utils/colors";
import GrayHorizontalLine from "../../../../components/GeometricShapes/GrayHorizontalLine";
import Calender from "../../../../components/Calender/Calender";
import ScheduleEventModal from "../../../../components/ScheduleEventModal";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
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

interface ShowStudentFormProps {
    student?: any;
    callbackForEdit: () => any;
};

export default function ShowStudentStudentForm(props: ShowStudentFormProps) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [showScheduleEventModal, setShowScheduleEventModal] = useState(false);
  const [profilePictureDefault, setProfilePictureDefault] = useState("../assets/img/picture-upload-picture.png");

  console.log("props show student", props);

  const { height } = useWindowDimensions();

  const handleAddStudent = () => {
    props?.callbackForEdit();
  };

  useEffect(() => {
      console.log("profile picture show student q5inDpZ0   ==>", props?.student?.photo);
    (!!props?.student?.photo) ? setProfilePictureDefault(props?.student?.photo) : setProfilePictureDefault("../assets/img/picture-upload-picture.png");
  }, [props?.student?.photo]);

  const handleAddEvent = () => {
    setShowScheduleEventModal(true);
  };

  // Renders

  const renderBasicDetails = () => (
      <>
        <MDBRow className="mt-3 mb-3">
                <MDBCol md="2">
                    <div>
                        <img
                            alt="student add profile pic"
                            src={profilePictureDefault}
                            style={{ borderRadius: "50%", width: "15vh", height: "15vh" }}
                        />
                    </div>
                </MDBCol>
                <MDBCol md="10">
                    <MDBRow>
                        <MDBCol md="10" style={{ display:'flex', justifyContent:'left', marginBottom: "10px" }}>
                            <span style={{ textAlign: "left", fontWeight: "bold" }}>
                                {`${capitalizeFirstLetter(props?.student?.first_name)} ${capitalizeFirstLetter(props?.student?.last_name)}`}
                            </span>
                            <span style={{ marginLeft: "15px" }}>
                                Inactive (Mark as Active)
                            </span>
                        </MDBCol>
                        <MDBCol md="2" style={{ display:'flex', justifyContent:'right', marginBottom: "10px" }}>
                            {!!props?.student?.due_amount && <span style={{ textAlign: "left", fontWeight: "bold", fontSize: "0.75rem" }}>
                                {`Payment Status`}
                            </span>}
                        </MDBCol>
                        <MDBCol md="3" style={{ display:'flex', justifyContent:'left', marginBottom: "10px" }}>
                            <Envelope style={{ padding: "0px", marginTop: "4.66px", color: COLORS.RED, borderWidth: 10 }} /><span style={{ marginLeft: "15px" }}>{props?.student?.student?.email}</span>    
                        </MDBCol>
                        <MDBCol md="3" style={{ display:'flex', justifyContent:'left', marginBottom: "10px" }}>
                            {!!props?.student?.mobile_number && <Telephone style={{ padding: "0px", marginTop: "3.75px", color: COLORS.RED, borderWidth: 10 }} />}<span style={{ marginLeft: "15px" }}>{props?.student?.mobile_number}</span>
                        </MDBCol>
                        <MDBCol md="3" style={{ display:'flex', justifyContent:'left', marginBottom: "10px" }}>
                            <GenderMale style={{ padding: "0px", marginTop: "2px", color: COLORS.RED, borderWidth: 10 }} /><span style={{ marginLeft: "15px", fontSize: "0.88rem" }}>{props?.student?.gender}</span>
                        </MDBCol>
                        <MDBCol md="3" style={{ display:'flex', justifyContent:'right', marginBottom: "10px" }}>
                            {!!props?.student?.due_amount && <InputButton2
                                name="due_amount"
                                title={`Due Amount: ${props?.student?.due_amount}`}
                                color="red"
                                class={css`
                                    position: relative;
                                    position: relative;
                                    top: -18.5px; 
                                    margin-bottom: -30px;
                                    right: -10.50px;
                                    padding-left: 3.5px !important;
                                    padding-right: 3.5px !important;
                                    background-color: ${COLORS.RED} !important;
                                    border-radius: 10px;
                                `}
                            />}
                        </MDBCol>
                        <MDBCol md="12" style={{ display:'flex', justifyContent:'left' }}>
                            {!!props?.student?.address && <img src="../assets/img/Icon/address-pin-icon.png" alt="img pin angle" style={{ width: "19px", height: "19px", marginLeft: "-1.35px" }}/>}<span style={{ marginLeft: "15px" }}>{(props?.student?.address)}{(!!props?.student?.city) && `, ${props?.student?.city}`}{(!!props?.student?.state) && `, ${props?.student?.state}`}{(!!props?.student?.country) && `, ${props?.student?.country}`}{(!!props?.student?.zip_code) && `, ${props?.student?.zip_code}`}</span>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Parents/Guardians Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>NAME</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>EMAIL ADDRESS</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>CONTACT NO.</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem"  }}>RELATIONSHIP</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_name}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_email}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_phone}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_relationship}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Emergency Contact</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>NAME</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>EMAIL ADDRESS</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CONTACT NO.</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>RELATIONSHIP</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_name}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_email}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_phone}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergecy_contact_relationship}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>License Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LICENSE PERMIT NUMBER</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LICENSE/ PERMIT ISSUE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LICENSE/ PERMIT EXPIRE</p>
                </MDBCol>
                <MDBCol md="3">
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.license_number}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.license_issue_date}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.license_expire_date}</p>
                </MDBCol>
                <MDBCol md="3">
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Physical Condition</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="12">
                    <p style={{ textAlign: "left" }}><b>Use Glasses: </b>{`${props?.student?.glasses}`}</p>
                </MDBCol>
        </MDBRow>
      </>
  );

  const renderScheduling = () => (
    <>
        <Calender />
    </>
  );

  return (
    <MainContainer>
        <Header style={{ marginTop: "3.756vh" }}>
            <p style={{ width: "35%", paddingTop: "2vh", fontSize: "25px", fontWeight: '400', marginLeft: "10px" }}>
                <TextTruncated>
                    <FileText size={27} style={{ fontSize: 27, marginRight: 5 }} />
                    {`\t${capitalizeFirstLetter(props?.student?.first_name) + " " + capitalizeFirstLetter(props?.student?.last_name) + '\t Details'}`}
                </TextTruncated>
            </p>
            <div style={{ width: "40%", paddingTop: "0vh", paddingLeft: "0vh" }}>
                {!!isScheduling ? (<InputButton2
                        preIcon={<Calendar2Date style={{ marginRight: 5 }} />}
                        name="edit_vehicle"
                        title="Schedule new Event"
                        color="red"
                        class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important }`} 
                        onClick={handleAddEvent}
                    />) : (<InputButton2
                        preIcon={<Pen style={{ marginRight: 5 }} />}
                        name="edit_vehicle"
                        title="Edit Details"
                        color="red"
                        class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important }`} 
                        onClick={handleAddStudent}
                />)}
            </div>
        </Header>
        <div style={{ borderBottom: "1px solid #DCE3EA", marginTop: "-13px" }}>
            <MDBRow>
                <MDBCol md="2" style={{ borderBottom: !!isScheduling ? "unset" : "3px solid #FF7F4C" }}>
                    <span onClick={() => setIsScheduling(false)}>Basic Details</span>
                </MDBCol>
                <MDBCol md="2" style={{ borderBottom: !isScheduling ? "unset" : "3px solid #FF7F4C" }}>
                    <span onClick={() => setIsScheduling(true)}>Schedule</span>
                </MDBCol>
            </MDBRow>
        </div>
        <div className={css`
            width: 95%;
            height: ${height-55}px;
            maxHeight: ${height-55}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
            overflow-y: auto;
        `}>
            {!isScheduling ? renderBasicDetails() : renderScheduling()}
            <ScheduleEventModal
                title1={"Schedule on -"}
                title2={"Test"}
                show={showScheduleEventModal}
                onClose={() => setShowScheduleEventModal(false)}
                onAction={() => {}}
            />
        </div>
    </MainContainer>
  )
}
