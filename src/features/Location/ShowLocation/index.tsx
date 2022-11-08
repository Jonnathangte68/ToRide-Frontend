import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Check2Circle, Pen } from "react-bootstrap-icons";
import { css } from "@emotion/css";
import GrayHorizontalLine from "../../../components/GeometricShapes/GrayHorizontalLine";
// import { AddOwnerForm, setIsAddingStudent, storeStudent, StudentElement } from "../studentsSlice";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import ActiveInactiveButton from "../../../components/ActiveInactiveButton";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden !important;
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
padding-top: 6.25%;
padding-bottom: 0%;
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


export default function ShowStudentStudentForm(props: any) {
    const { height } = useWindowDimensions();
    const HEADER_SPACE = ((height+500)*10)/100;

    const handleAddStudent = () => {
        console.log("handle add student method from show location.");
        props?.callbackForEdit();
    };

  console.log("props show location", props);

  return (
    <MainContainer>
        <Header>
            <p style={{ width: "35%", paddingTop: "39px", fontSize: "25px", fontWeight: '400', marginLeft: "-15px" }}>
                <TextTruncated>
                    <img
                        src="../assets/img/Icon/Icon/location-main-header-icon.png"
                        alt="location logo"
                    />{`${'\tBTW Session Details'}`}
                </TextTruncated>
            </p>
            <ActiveInactiveButton style={{ marginTop: "4.87vh", marginLeft: "-13%", lineHeight: "3.39vh" }} text="Active" status="active" />
            <div style={{ width: "40%", paddingTop: "3.55vh", paddingLeft: "0vh" }}>
                <InputButton2
                    preIcon={<Pen style={{ marginRight: 5 }} />}
                    name="edit_vehicle"
                    title="Edit Details"
                    color="red"
                    class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important; background-color: #FFFFFF !important; }`} 
                    onClick={handleAddStudent}
                />
            </div>
        </Header>
        <GrayHorizontalLine />
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
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LOCATION NAME</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>IDENTIFIER</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LOCATION CODE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>TYPE</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.name}</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.identifier}</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.code}</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.location_type}</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>TIME ZONE</p>
                </MDBCol>
                <MDBCol md="9"></MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.time_zone}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Address {'&'} Contact Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LOCATION OFFICE EMAIL</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CONTACT NUMBER</p>
                </MDBCol>
                <MDBCol md="6"></MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>-</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.location_phone_number}</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>ADDRESS</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CITY</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>STATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>ZIP CODE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.address}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.city}</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.province_state}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.zip_code}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Service/Class Types</TextTile5>
            <ul style={{ listStyleType: "none" }}>
                <li style={{ textAlign: "left" }}>
                    <Check2Circle size={35} style={{ paddingRight: "10px", color: COLORS.ORANGE_LIGHT }}/>
                    <span>Observation 6 hours</span>
                </li>
                <li style={{ textAlign: "left" }}>
                    <Check2Circle size={35} style={{ paddingRight: "10px", color: COLORS.ORANGE_LIGHT }}/>
                    <span>BTW 2 hours</span>
                </li>
                <li style={{ textAlign: "left" }}>
                    <Check2Circle size={35} style={{ paddingRight: "10px", color: COLORS.ORANGE_LIGHT }}/>
                    <span>Drive Education</span>
                </li>
            </ul>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Rental Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CONTACT PERSON</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>EMAIL ADDRESS</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>CONTACT NUMBER</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>RENTAL DATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.rentnal_contact_person}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>-</p>
                </MDBCol>
                <MDBCol md="3">
                    <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{props?.location?.rental_contact_number}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>-</p>
                </MDBCol>
                <MDBCol md="3" className="mt-3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>RENTAL AGREEMENT</p>
                </MDBCol>
                <MDBCol md="9" className="mt-3"></MDBCol>
                <MDBCol md="3" className="mt-3">
                    PLACE HERE THE RENTAL AGREEMENT.
                </MDBCol>
            </MDBRow>
        </div>
    </MainContainer>
  )
}
