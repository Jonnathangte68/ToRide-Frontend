import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import React from "react";
import StudentHeader from "../../components/Headers/StudentHeader";
import 'react-circular-progressbar/dist/styles.css';
import COLORS from "../../utils/colors";
import "./style.css";
import Graph from "../../components/Graph";
import ProgressBar from "../../components/ProgressBar";
import RequireAuth from "../Auth/RequireAuth";

const MainContainer = styled.div`
background-color: rgba(243, 243, 243, 1);
  width: 1600px;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

export default function DashboardScreen() {

  const renderContent = () => (
    <MainContainer>
      <StudentHeader />
      <div className={css`
        width: 100%;
        height: 100%;
        background-color: #FFF;
      `}>
        <MDBRow>
          <MDBCol md="4" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS}; border-right: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
            <p className={css`
              padding: 2vh 2vh 2vh 5vh;
              font-size: 1.72rem;
              font-weight: 500;
              height: 9.5vh;
            `}>Statistics</p>
          </MDBCol>
          <MDBCol md="8" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
            <p className={css`
              padding: 2vh 2vh 2vh 5vh;
              font-size: 1.72rem;
              font-weight: 500;
              height: 9.5vh;
            `}>Hours Remaining</p>
          </MDBCol>
        </MDBRow>
        <MDBRow>


          <MDBCol md="4">
            {/* Left Side Pane */}
            <MDBRow>
              <MDBCol md="12" className={css`justify-content: center; padding-bottom: 3.15vh; border-right: 1px solid ${COLORS.GRAY_ELEMENTS}; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <div style={{ width: "22vh", height: "22vh", marginLeft: "32.10%", marginTop: "4%" }}>
                  <ProgressBar />
                </div>
                <p className={css`text-align: center; font-size: 1.44rem; font-weight: 400; margin-top: 4.10vh; `}>Session Process</p>
              </MDBCol>
              <MDBCol md="6" className={css`text-align: center; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS}; border-right: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <p style={{ fontWeight: "500", fontSize: "5rem" }}>5</p>
                <p style={{ fontWeight: "500" }}>Practical Classes</p>
              </MDBCol>
              <MDBCol md="6" className={css`text-align: center; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS}; border-right: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <p style={{ fontWeight: "500", fontSize: "5rem" }}>10</p>
                <p style={{ fontWeight: "500" }}>Theory Classes</p>
              </MDBCol>
              <MDBCol md="6">
                <p style={{ fontWeight: "500", fontSize: "1.22rem", paddingTop: "1.35vh", paddingBottom: "1.35vh" }}>Number Of Hours Per Day.</p>
                <Graph />
              </MDBCol>
              <MDBCol md="6">
                <img alt="student desk" src="../assets/img/student-desk-hours-per-day-img.png" style={{ marginLeft: "12.21vh", marginTop: "6.71vh" }}></img>
              </MDBCol>
            </MDBRow>
          </MDBCol>



          {/* Right Side Pane */}
          <MDBCol md="8">
            <MDBRow>
              <MDBCol md="6" className={css`overflow-y: auto !important; height: 52.6999vh !important; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                  {["1","2","3","4","5","6","7"].map(session => (
                    <MDBCol md="12" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                      <MDBRow>
                        <MDBCol md="9">
                          <p style={{ fontWeight: "bold", marginBottom: "0.85vh" }}>BTW Session</p>
                          <MDBRow>
                            <MDBCol md="4">
                              <span style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.88rem" }}>CLASS SIZE</span>
                            </MDBCol>
                            <MDBCol md="4">
                              <span style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.88rem" }}>INSTRUCTOR</span>
                            </MDBCol>
                            <MDBCol md="4">
                              <span style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.88rem" }}>START DATE</span>
                            </MDBCol>
                            <MDBCol md="4">
                              <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>gasd</p>
                            </MDBCol>
                            <MDBCol md="4">
                              <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>gasd</p>
                            </MDBCol>
                            <MDBCol md="4">
                              <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>gasd</p>
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                        <MDBCol md="3">
                            <p style={{ textAlign: "center", fontSize: "0.77rem", fontWeight: "400", color: COLORS.RED }}>
                              Hours Remaining
                            </p>
                            <p style={{ textAlign: "center", fontSize: "5rem", fontWeight: "400", color: COLORS.RED }}>
                              7
                            </p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                  ))}
              </MDBCol>
              <MDBCol md="6" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <img
                  alt="decoration session summary"
                  src="../assets/img/man-laptop-session-summary.png"
                  style={{ marginTop: "5.72vh", marginBottom: "3.82vh", marginLeft: "5.10vh" }}
                />
              </MDBCol>
              <MDBCol md="12" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS}; border-left: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <p className={css`
                padding: 2vh 2vh 2vh 5vh;
                font-size: 1.72rem;
                font-weight: 500;
                height: 9.5vh;
              `}>Payments Remaining</p>
              </MDBCol>
              <MDBCol md="12" className={css`overflow-y: auto !important; height: 30vh !important; border-left: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                <MDBRow className={css`padding-top: 1.5vh; padding-bottom: 1.5vh; margin-left: 1.35vh; margin-right: 23.35vh; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                  <MDBCol md="3">
                    <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Title</p>
                  </MDBCol>
                  <MDBCol md="3">
                    <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Date</p>
                  </MDBCol>
                  <MDBCol md="3">
                    <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Class Status</p>
                  </MDBCol>
                  <MDBCol md="3">
                    <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Payment Remaining</p>
                  </MDBCol>
                </MDBRow>
                  {["1","2","3","4","5","6","7"].map(payment => (
                    <MDBRow className={css`padding-top: 1.5vh; padding-bottom: 1.5vh; margin-left: 1.35vh; margin-right: 23.35vh; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
                      <MDBCol md="3">
                        <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Basic Session No.1</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontSize: "1.18rem" }}>Jul 21, 2021</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <p style={{ textAlign: "center", color: COLORS.GREEN_LIGHT, fontSize: "1.18rem" }}>Completed</p>
                      </MDBCol>
                      <MDBCol md="3">
                        <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>€100.00</p>
                      </MDBCol>
                    </MDBRow>
                  ))}
              </MDBCol>
            </MDBRow>
          </MDBCol>


        </MDBRow>  
      </div>
    </MainContainer>
  );

  return (
    <RequireAuth>
      {renderContent()}
    </RequireAuth>
  );
}
