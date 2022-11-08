/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Pen } from "react-bootstrap-icons";
import { css } from "@emotion/css";
// import { AddOwnerForm, setIsAddingStudent, storeStudent, StudentElement } from "../studentsSlice";
import { useAppDispatch } from "../../../app/hooks";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import VideoCarousel from "../../../components/VideoCarousel";
import { setIsShowingClass, setIsShowingClassInformation } from "../../Demo/demoSlice";

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

export default function ClassInformation(props: any) {
  const dispatch = useAppDispatch();

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  console.log("props show student", props);

  const handleAddNewAttachment = () => {

  };

  const handleAddStudent = () => {
    props?.callbackForEdit();
  };

  const handleCloseStudentClassInformation = () => {
    dispatch(setIsShowingClassInformation(false));
    dispatch(setIsShowingClass(true));
  };

  const renderEditingOptions = () => (
    <>
      <InputButton2
          name="material"
          title="Report"
          color="red"
          class={css`background-color: #FF4311!important; color: white; font-weight: bold; border-radius: 6px;`} 
          onClick={() => {}}
      />
      <InputButton2
          preIcon={<Pen style={{ marginRight: 5 }} />}
          name="edit_vehicle"
          title="Edit Details"
          color="red"
          class={css`border: 1px solid #FF4311; color: #FF4311; font-weight: bold; border-radius: 6px; background-color: #FFFFFF !important;&:hover { color: #FF4311 !important }`} 
          onClick={handleAddStudent}
      />
    </>
  );

  const renderVideoOptions = () => (
    <>
      <MDBCol md="6">
        <video width="100%" height="300vh" style={{ paddingRight: "1.15vh" }} controls>
          <source src="https://vod-progressive.akamaized.net/exp=1658081010~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F673%2F23%2F578367092%2F2731768716.mp4~hmac=658c8f4a94003e5663c0e229a162471495feec0f9b90537d7d7d608451729f3b/vimeo-prod-skyfire-std-us/01/673/23/578367092/2731768716.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </MDBCol>
      <MDBCol md="6">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", border: "1px solid "+COLORS.GRAY_SLIGHT, borderRadius: "10px", paddingRight: "1.15vh" }}>
          <i className="fa fa-plus-circle" style={{ fontSize: "3rem", textShadow: "50px -20px 1px #FF4311", color: "white" }} aria-hidden="true"></i>
          <p style={{ fontWeight: "600", fontSize: "1.14rem", marginTop: "5.23vh", marginLeft: "-4.24vh" }}>Add new media</p>  
        </div>
      </MDBCol>
    </>
  );

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA", marginTop: "3.756vh" }}>
            <p style={{ width: "35%", paddingTop: "2vh", fontSize: "25px", fontWeight: '400', marginLeft: "-6vh" }}>
                <img src="../assets/img/icon-class-board-show-class.png" alt="icon class"  style={{ fontSize: 27, marginRight: 5 }} />{`\BTW ${props?.student?.id} Details`}
            </p>
            <div style={{ width: "55%", paddingTop: "0vh", paddingLeft: "0vh" }}>
                {!props?.disableEditing ? renderEditingOptions() : (
                  <i className="fa fa-times-circle" style={{ fontSize: "3rem", textShadow: "50px -20px 1px #FF4311", color: "white", position: "absolute", right: "9.87vh", top: "14.87vh" }} aria-hidden="true" onClick={() => handleCloseStudentClassInformation()}></i>
                )} 
                {/* <XCircle style={{ position: "absolute", right: "3.14vh", fontSize: "1.87rem", marginTop: "2.11vh", color: COLORS.ORANGE }} stroke={COLORS.ORANGE} strokeWidth=".3" />} */}
            </div>
        </Header>
        <div className={css`
            width: 95%;
            height: ${height-HEADER_SPACE}px;
            maxHeight: ${height-HEADER_SPACE}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
            overflow-y: auto;
        `}>
          <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Media</TextTile5>
          <MDBRow className="mt-3 mb-3">
            {!props?.disableEditing ? renderVideoOptions() : (
              <VideoCarousel {...{ name: "vdieo1", src: "https://youtu.be/6Xn3Z30zqUc" }} />
            )}
          </MDBRow>
          <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Attachment</TextTile5>
          <MDBRow className="mt-3 mb-3">
            <MDBCol md="3">
              <a href="#">
                <img alt="attachment file type icon" src="../assets/img/pdf-class-attachment-icon.png" />{"\t"}Some name.pdf
              </a>
            </MDBCol>
            {/* Always present button for adding new attachement */}
            {!props?.disableEditing ? (<MDBCol md="4">
              <span onClick={handleAddNewAttachment}>
                <i className="fa fa-plus-circle" style={{ textShadow: "20px 1px 1px #FF4311", color: "white" }} aria-hidden="true"></i>{"\t"}<b style={{ marginLeft: "2.44vh" }}>Add new Attachement</b>
              </span>
            </MDBCol>) : null}
          </MDBRow>
          <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Description</TextTile5>
          <br></br>
          <p style={{ width: "100%", textAlign: "left", fontSize: "1.25rem" }}>
            Some text for description
          </p>
        </div>
    </MainContainer>
  )
}
