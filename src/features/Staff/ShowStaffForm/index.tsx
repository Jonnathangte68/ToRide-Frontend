import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Envelope, FileText, Gear, GenderMale, Pen, Telephone } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import GrayHorizontalLine from "../../../components/GeometricShapes/GrayHorizontalLine";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import moment from "moment";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden !important;
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
padding-right: 7%;
padding-left: 0%;
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

const HorizontalListLayout = styled.ul`
    padding: 0;
    list-style-type: none;
    li {
        display: inline-block;
        margin-left: 6vh;
    }
    li:first-child {
        display: inline-block;
        margin-left: 0vh;
    }
`;

const TextTruncated = styled.p`
width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

interface ShowStudentFormProps {
    student?: any;
    callbackForEdit?: any;
};

export default function ShowStaffForm(props: ShowStudentFormProps) {
  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;
  const [profilePictureDefault, setProfilePictureDefault] = useState("../assets/img/picture-upload-picture.png");

  const handleAddStudent = () => {
    props?.callbackForEdit();
  };

  useEffect(() => {
    (!!props?.student?.photo) ? setProfilePictureDefault(props?.student?.photo) : setProfilePictureDefault("../assets/img/picture-upload-picture.png");
  }, [props?.student?.photo]);

  console.log("student show staff", props?.student);

  return (
    <MainContainer>
        <Header style={{ marginTop: "3.756vh" }}>
            <p style={{ width: "35%", paddingTop: "2vh", fontSize: "25px", fontWeight: '400', marginLeft: "10px" }}>
                <TextTruncated>
                    <FileText size={27} style={{ fontSize: 27, marginRight: 5 }} />{`\t${capitalizeFirstLetter(props?.student?.first_name) + " " + capitalizeFirstLetter(props?.student?.last_name) + '\t Details'}`}
                </TextTruncated>
            </p>
            <div style={{ width: "40%", paddingTop: "1.20vh", paddingLeft: "0vh" }}>
                <InputButton2
                        preIcon={<Pen style={{ marginRight: 5 }} />}
                        name="edit_vehicle"
                        title="Edit Details"
                        color="red"
                        class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important }`} 
                        onClick={handleAddStudent}
                />
            </div>
        </Header>
        <div style={{ borderBottom: "1px solid #DCE3EA", marginTop: "-13px" }}>
            <MDBRow>
                <MDBCol md="2" style={{ borderBottom: "3px solid #FF7F4C" }}>
                    Basic Details
                </MDBCol>
            </MDBRow>
        </div>
        <div className={css`
            width: 95%;
            height: ${height-HEADER_SPACE}px;
            maxHeight: ${height-HEADER_SPACE}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
        `}>
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
                        <MDBCol md="12" className={css`text-align: left;`}>
                            <span style={{ textAlign: "left", fontWeight: "bold" }}>{`${capitalizeFirstLetter(props?.student?.first_name)} ${capitalizeFirstLetter(props?.student?.last_name)}`}</span><span style={{ textAlign: "left", marginLeft: "15px" }}>Inactive (Mark as Active)</span>
                        </MDBCol>
                        <MDBCol md="12" className={css`text-align: left; margin-top: 1.85vh;`}>
                            <HorizontalListLayout>
                                <li>
                                    <><Gear style={{ color: COLORS.RED }} /><span style={{ marginLeft: "15px" }}>Instructor</span></>
                                </li>
                                <li>
                                    <><Envelope style={{ color: COLORS.RED }} /><span style={{ marginLeft: "15px" }}>{`${!!props?.student?.email ? props?.student?.email : "-"}`}</span></>
                                </li>
                                <li>
                                    <Telephone style={{ color: COLORS.RED }} /><span style={{ marginLeft: "15px" }}>{`${props?.student?.mobile_number}`}</span>
                                </li>
                                <li>
                                    <GenderMale style={{ padding: "0px", color: COLORS.RED }} /><span style={{ marginLeft: "15px", fontSize: "0.88rem" }}>{`${props?.student?.gender}`}</span>
                                </li>
                            </HorizontalListLayout>
                        </MDBCol>
                        <MDBCol md="12" className={css`text-align: left;`}>
                            <p>
                            {!!props?.student?.address && <img src="../assets/img/Icon/address-pin-icon.png" alt="img pin angle" style={{ width: "19px", height: "19px", marginLeft: "-1.35px" }}/>}<span style={{ marginLeft: "15px", fontSize: "0.88rem" }}>{(props?.student?.address)}{(!!props?.student?.city) && `,${props?.student?.city}`}{(!!props?.student?.state) && `,${props?.student?.state}`}{(!!props?.student?.country) && `,${props?.student?.country}`}{(!!props?.student?.zip_code) && `,${props?.student?.zip_code}`}</span>
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
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
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_contact_name}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_email}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_contact_phone}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.student?.emergency_contact_relation}</p>
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
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{moment(props?.student?.license_issue_date).format("Do MMMM, YYYY")}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{JSON.stringify(props?.student?.license_expire)}</p>
                </MDBCol>
                <MDBCol md="3">
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Physical Condition</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="12">
                    <p style={{ textAlign: "left" }}>{props?.student?.physical_status}</p>
                </MDBCol>
            </MDBRow>
        </div>
    </MainContainer>
  )
}
