import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Pen } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import GrayHorizontalLine from "../../../components/GeometricShapes/GrayHorizontalLine";
// import { AddOwnerForm, setIsAddingStudent, storeStudent, StudentElement } from "../studentsSlice";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import moment from "moment";

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

interface ShowVehicleFormProps {
    student?: any;
    callbackForEdit?: any;
};

export default function ShowVehicleForm(props: ShowVehicleFormProps) {
  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;
  const [profilePictureDefault, setProfilePictureDefault] = useState("../assets/img/picture-upload-picture.png");

  const handleAddStudent = () => {
    props?.callbackForEdit();
  };

  useEffect(() => {
    (!!props?.student?.photo) ? setProfilePictureDefault(props?.student?.photo) : setProfilePictureDefault("../assets/img/picture-upload-picture.png");
  }, [props?.student?.photo]);
  

  console.log("props show student", props);

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA", marginTop: "3.756vh" }}>
            <p style={{ width: "35%", paddingTop: "2vh", fontSize: "25px", fontWeight: '400', marginLeft: "-37px" }}>
                <TextTruncated>
                    <i className="fa fa-car" style={{ fontSize: 27, marginRight: 5 }} />{`\tVehicle ${props?.student?.id} Details`}
                </TextTruncated>
            </p>
            <div style={{ width: "40%", paddingTop: "0vh", paddingLeft: "0vh" }}>
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
        <div className={css`
            width: 95%;
            height: ${height-HEADER_SPACE}px;
            maxHeight: ${height-HEADER_SPACE}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
            overflow-y: auto !important;
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
                    <p style={{ textAlign: "left", paddingTop: "4.87vh", fontSize: "1.74rem", fontWeight: 700 }}>{`Vehicle ${props?.student?.id}`}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Vehicle Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>TYPE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>VIN</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>LICENSE PLATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>MAKE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.v_type ? props?.student?.v_type : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.MORE_RED_BUTTON, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.vin ? props?.student?.vin : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.license_plate_id ? props?.student?.license_plate_id : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.make ? props?.student?.make : "-"}`}</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>COLOR</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>MODEL</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>ODOMETER</p>
                </MDBCol>
                <MDBCol md="3">
                    <p></p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.color ? props?.student?.color : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.v_model ? props?.student?.v_model : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}><span style={{ color: COLORS.MORE_RED_BUTTON }}>{`${props?.student?.odo_meter ? props?.student?.odo_meter : "-"}`}</span> miles</p>
                </MDBCol>
                <MDBCol md="3">
                    <p></p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>SERVICE DATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>INSURANCE DUE DATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>OIL CHANGE DUE DATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>INSPECTION DUE DATE</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.service_date ? moment(props?.student?.service_date).format("Do MMMM, YYYY") : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.insurance_due_date ? moment(props?.student?.insurance_due_date).format("Do MMMM, YYYY") : "-"}`}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.oil_change_due_date}` ? moment(props?.student?.oil_change_due_date).format("Do MMMM, YYYY") : "-"}</p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.inspection_date}` ? moment(props?.student?.inspection_date).format("Do MMMM, YYYY") : "-"}</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.75rem" }}>TIRE ROTATION DUE DATE</p>
                </MDBCol>
                <MDBCol md="3">
                    <p></p>
                </MDBCol>
                <MDBCol md="3">
                    <p></p>
                </MDBCol>
                <MDBCol md="3">
                    <p></p>
                </MDBCol>
                <MDBCol md="3">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.tire_rotation_due_date ? props?.student?.tire_rotation_due_date : "-"}`}</p>
                </MDBCol>
            </MDBRow>
            <GrayHorizontalLine />
            {!!props?.student?.location?.name && <MDBRow className="mt-3 mb-3">
                <MDBCol md="1">
                    <img src="../assets/img/Icon/address-pin-icon.png" alt="img pin angle" style={{ width: "19px", height: "19px", marginLeft: "0px" }}/>
                </MDBCol>
                <MDBCol md="9">
                <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>{`${props?.student?.location?.name} - ${props?.student?.location?.address}`}</p>
                </MDBCol>
            </MDBRow>}
            <br/>
        </div>
    </MainContainer>
  )
}