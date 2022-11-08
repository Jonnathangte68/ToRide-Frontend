import { css } from "@emotion/css"
import styled from "@emotion/styled"
import _ from "lodash"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Calender from "../../components/Calender/Calender"
import MainMenu from "../../components/MainMenu/MainMenu"
import TransactionItem from "../../components/TransactionItem/TransactionItem"
import ScrollableArea from "../../utils/scrollable-area"
import { getStats, fetchOwnerProfiles, fetchStudent } from "../Demo/demoSlice"
import "./style.css"

const MainContainer = styled.div`
background-color: rgba(243, 243, 243, 1);
  width: 1600px;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const Container = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const DashboardBody = styled.div`
height: fit-content;
display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2vh;
  margin-bottom: 2vh;
  padding-left: 9vh !important;
  padding-right: 9vh !important;
`;

const TitleContainer = styled.div`
padding: 20px 1085px 16px 29px;
  margin-bottom: 2px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextTile = styled.p`
font-size: 23px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 123%;
  color: rgba(60, 46, 60, 1);
  width: 400px;
  word-wrap: break-word;
  margin-bottom: 4px;
`;

const Text391 = styled.p`
font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 160%;
  color: rgba(99, 88, 99, 1);
  word-wrap: break-word;
`;

const DashboardContent = styled.div`
width: fit-content;
display: flex;
  flex-direction: column;
  padding-right: 18.52vh;
`;

const DashboardCardHeader = styled.div`
margin-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: unset;
  border: unset;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 1.16vh;
`;

const TitleCard = styled.div`
box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Text215 = styled.p`
flex: 1;
  font-size: 1.15rem;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 145%;
  color: rgba(60, 46, 60, 1);
  text-align: center;
  word-wrap: break-word;
  margin-bottom: 6px;
  margin-right: 0px !important;
`;

const StatsContainer = styled.p`
padding: 0px 17px 0px 0px;
  margin-bottom: 6px;
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  flex: 1;
`;

const UpcommingSessions = styled.div`
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  height: 304px;
  width: 100%;
  padding: 19px 9px 25px 14px;
  box-sizing: border-box;
  border-radius: 10px;
  /* border: 1px solid rgba(212, 200, 200, 1); */
  height: 304px;
  width: 100%;
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid rgba(212, 200, 200, 1);
  display: flex;
  flex-direction: column;
`;

const Text1030 = styled.p`
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 213%;
  color: rgba(60, 46, 60, 1);
  width: 165px;
  word-wrap: break-word;
  margin-right: 105px;
`;

const OtherIconImg = styled.img`
  width: 16px;
  height: 16px;
`;

const Text559 = styled.p`
font-size: 10px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: rgba(113, 113, 122, 1);
  text-align: center;
  width: 56px;
  height: 15px;
  word-wrap: break-word;
  justify-content: center;
`;

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const owners = useAppSelector((state) => state.demo.ownerProfiles);
  const user = useAppSelector((state) => state.demo.userlogin);
  const isFetchingOwnerProfiles = useAppSelector((state) => state.demo.isFetchingOwnerProfiles);
  const menuOptionIdx = useAppSelector((state) => state.demo.menuOptionSelected);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onLoginRedirect = () => {
    switch(menuOptionIdx) {
      case 1:
        navigate("/owner/messages", { replace: false })
        break;
      case 2:
        navigate("/owner/students", { replace: false })
        break;
      case 3:
        navigate("/owner/staff", { replace: false })
        break;
      case 4:
        navigate("/owner/vehicles", { replace: false })
        break;
      case 5:
        navigate("/owner/classes", { replace: false })
        break;
      case 6:
        navigate("/owner/locations", { replace: false })
        break;
      case 7:
        navigate("/owner/certificates", { replace: false })
        break;
      case 8:
        navigate("/owner/transactions", { replace: false })
        break;
      case 9:
        navigate("/owner/simulators", { replace: false })
        break;
    }
  };

  useEffect(() => {
    // Complete profile
    dispatch(fetchOwnerProfiles());

    onLoginRedirect();
    console.log("user", user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  useEffect(() => {
    if (!!owners && !! user.username && isFetchingOwnerProfiles !== 'idle') {
      // @ts-ignore
      const ownerIdx = _.findIndex(owners, (owner) => owner?.user?.email === user.username);
      console.log("owner idx", ownerIdx);
      console.log("owner ", owners[ownerIdx]);
      if (!owners[ownerIdx]?.first_name) {
        navigate("/owner/set-up-owner-account", { replace: true });
        return;
      }

      // fetch all for stats
      dispatch(fetchStudent());

      setTimeout(() => {
        // load the stats from the server.
        dispatch(getStats(owners[ownerIdx]));
      }, 1500);
    }
    //eslint-disable-next-line
  }, [owners, navigate, user.username, isFetchingOwnerProfiles]);
  
  return (
    <MainContainer>
      <Container>
        <MainMenu />
        <ScrollableArea>
        <DashboardBody>
          <TitleContainer>
            <TextTile>Overview</TextTile>
            <Text391>
              Here's what's happening with your school today.
            </Text391>
          </TitleContainer>
          <DashboardContent>
            <div className="_-4 flex-row" style={{ width: "100%" }}>
              <DashboardCardHeader>
                  <div className="total-no-students flex-row-vcenter-hstart">
                  <TitleCard>
                    <Text215>
                      Total Number Of Students
                    </Text215>
                    <StatsContainer className="item flex-col-hstart-vstart clip-contents item-second-element">
                      <div className="frame-109 flex-row-vcenter-hcenter">
                        <div className="frame-108 flex-row-vcenter-hstart">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62129?alt=media&token=a007d24e-171e-46a8-9376-e873298e4075"
                            alt="Not Found"
                            className="call-_made"
                          />
                          <p className="txt-243"> 5.7%</p>
                        </div>
                        <p className="txt-233">+7 today</p>
                      </div>
                    </StatsContainer>
                    <p className="txt-628 flex-hcenter">100</p>
                  </TitleCard>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62120?alt=media&token=05d28684-294e-4c97-a00e-ac803c79e3ee"
                    alt="Not Found"
                    className="item-2 first-total-students-img"
                  />
                </div>
                <div className="total-income flex-row-vcenter-hstart">
                  <div className="frame-5961 flex-col-hstart-vstart">
                    <p className="txt-item-215 flex-hcenter-2">
                      Total Inrolling From The Site
                    </p>
                    <div className="item-3 flex-col-hstart-vstart clip-contents">
                      <div className="frame-109 flex-row-vcenter-hcenter">
                        <div className="frame-108 flex-row-vcenter-hstart">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62150?alt=media&token=73183e0b-fc7c-43f7-8955-5cfa988f049c"
                            alt="Not Found"
                            className="call-_made"
                          />
                          <p className="txt-243"> 2.9%</p>
                        </div>
                        <p className="txt-233">+5 today</p>
                      </div>
                    </div>
                    <p className="txt-628 flex-hcenter">400</p>
                  </div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62136?alt=media&token=23d264ea-2860-4ea1-9538-f3352b40ab20"
                    alt="Not Found"
                    className="item-2 second-notebook-total-enroll"
                  />
                </div>
                <div className="total-income-1 flex-row-vcenter-hstart">
                  <div className="frame-5961 flex-col-hstart-vstart">
                    <p className="txt-item-215 flex-hcenter">Total Monthly Income</p>
                    <div className="item-4 flex-col-hstart-vstart clip-contents">
                      <div className="frame-109 flex-row-vcenter-hcenter">
                        <div className="frame-108 flex-row-vcenter-hstart">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62177?alt=media&token=ce0cd006-a33f-44d2-9bf5-4b7ee0459992"
                            alt="Not Found"
                            className="call-_made"
                          />
                          <p className="txt-243"> 41.9%</p>
                        </div>
                        <p className="txt-233">+ €1K today</p>
                      </div>
                    </div>
                    <p className="txt-628 flex-hcenter">€600.75</p>
                  </div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1623%3A62163?alt=media&token=3c2daa4f-c382-4bca-bac9-48565dbd1235"
                    alt="Not Found"
                    className="item-2 third-euro-total-income-img"
                  />
                </div>
              </DashboardCardHeader>
            </div>
            <div className="_-4 flex-row" style={{ marginRight: "2%" }}>
              <div className="calender">
                <Calender />
              </div>
              <div className="group-345 flex-col">
                <div className="upcomming-sessions">
                  <div className="ladeboard flex-col">
                    <div className="group-6310 flex-row">
                      <p className="txt-824">Notifications</p>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1632%3A72754?alt=media&token=244ab92e-ae9d-48f5-9e19-3cd1082284df"
                        alt="Not Found"
                        className="other-icon"
                      />
                      <p className="txt-559 flex-hcenter">View All</p>
                    </div>
                    <div className="_-1 flex-col">
                      <div className="group-685 flex-row">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1625%3A63012?alt=media&token=3c5de660-cfc7-4bd6-a2dd-73495cab6b02"
                          alt="Not Found"
                          className="icon-avtar"
                        />
                        <p className="txt-3171">Nguyen, Shane</p>
                        <p className="txt-782">is successfully registered </p>
                        <p className="txt-676">12/12/2021</p>
                      </div>
                      <div className="line" />
                    </div>
                    <div className="_-2 flex-col">
                      <div className="group-842 flex-row">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1625%3A63023?alt=media&token=d1412f37-426b-482c-bd4b-2feb6f1b094a"
                          alt="Not Found"
                          className="icon-avtar"
                        />
                        <p className="txt-3171">Nguyen, Shane</p>
                        <p className="txt-782">is successfully registered </p>
                        <p className="txt-676">12/12/2021</p>
                      </div>
                      <div className="line" />
                    </div>
                    <div className="_-2 flex-col">
                      <div className="group-842 flex-row">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1625%3A63034?alt=media&token=99b8df6b-6716-42d3-8e34-6b9974901fb2"
                          alt="Not Found"
                          className="icon-avtar"
                        />
                        <p className="txt-3171">Nguyen, Shane</p>
                        <p className="txt-782">is successfully registered </p>
                        <p className="txt-676">12/12/2021</p>
                      </div>
                      <div className="line" />
                    </div>
                    <div className="_-4 flex-row">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1625%3A63056?alt=media&token=65b0d703-41e4-4c84-9c19-59d72dcb0a2a"
                        alt="Not Found"
                        className="icon-avtar"
                      />
                      <p className="txt-3171">Nguyen, Shane</p>
                      <p className="txt-782">is successfully registered </p>
                      <p className="txt-676">12/12/2021</p>
                    </div>
                  </div>
                </div>
                <UpcommingSessions>
                  <div className={css`
                      margin-bottom: 20px;
                      box-sizing: border-box;display: flex;
                      flex-direction: row;
                      align-items: center;`}>
                    <div className={css`
                      margin-right: 7px;
                      box-sizing: border-box;
                      height: 100%;
                      display: flex;
                      flex-direction: row;
                      align-items: center;`}>
                      <Text1030>Transaction History</Text1030>
                      <OtherIconImg
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1627%3A62188?alt=media&token=bac7f3f4-22b6-4418-9650-b52a0d294e6c"
                        alt="Not Found"
                      />
                    </div>
                    <Text559>View All</Text559>
                  </div>
                  <TransactionItem id={parseInt('1032')} status="Completed" amount={25.00} date={"Jul 21,2021"}  />
                  <TransactionItem id={parseInt('0876')} status="Declined" amount={25.00} date={"Jul 21,2021"}  />
                  <TransactionItem id={parseInt('0877')} status="Pending" amount={25.00} date={"Jul 21,2021"}  />
                </UpcommingSessions>
              </div>
            </div>
          </DashboardContent>
        </DashboardBody>
        </ScrollableArea>
      </Container>
    </MainContainer>
  )
}
