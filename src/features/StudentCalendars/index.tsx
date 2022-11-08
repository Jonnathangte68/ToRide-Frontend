import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Calender from "../../components/Calender/Calender";
import StudentHeader from "../../components/Headers/StudentHeader";
import 'react-circular-progressbar/dist/styles.css';
import COLORS from "../../utils/colors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RequireAuth from "../Auth/RequireAuth";
import { fetchCalendars } from "../Demo/demoSlice";
import moment from "moment";

const MainContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const LeftPane = styled.div`
  background-color: ${COLORS.GRAY_PANE};
  width: 33.33%;
  height: 100%;
  flex-display: column;
  align-items: space-between;
  justify-content: space-between;
`;

const RightPane = styled.div`
  flex: 1;
  width: 66.67vh;
  text-align: center;
  justify-content: center;
  align-items: center;
}
`;

const StudentCalendars = () => {
  const dispatch = useAppDispatch();
  const calendars = useAppSelector((state) => state.demo.calendars);
  const userLogged = useAppSelector((state) => state.demo.userlogin);
  const [events, setEvents] = useState(null);

  const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();

  console.log("USER LOGGED.", userLogged);
  console.log("calends ", calendars);

  useEffect(() => {
    dispatch(fetchCalendars());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (calendars) {
      try {
        console.log("gasinudgh97ahb7a9shdf~~~~~~-> calendar events fetched.", calendars);
        //eslint-disable-next-line
        const eventList = calendars.map(e => {
          const event = JSON.parse(e.description);
          if (!!event?.date_end) {
            return {
                title: `NW\n${event?.class}`,
                start: formatDate(event?.date_start),
                end: formatDate(event?.date_end)
            };
          }
          else if (!!event?.date_start) {
            return {
                title: formatDate(event?.class),
                start: formatDate(event?.date_start)
            };
          }
        });
        console.log("gasinudgh97ahb7a9shdf~~~~~~-> result to assign calendar", eventList);
        setEvents(eventList);
      } catch(err) {}
    }
  }, [calendars]);
  
  const renderContent = () => (
    <>
      <StudentHeader />
      <MainContainer>
        <LeftPane>
          <div className={css`flex: 1; height: 100%; width: 100%; justify-content: center; align-items: center;`}>
            <img
              src="../assets/img/No-moredatano-more-data-messages.png"
              alt="no more data selecting students"
              style={{ marginTop: "60%", marginBottom: "60%", width: "90%", height: "auto", marginLeft: "5%", marginRight: "auto" }}
            />
          </div>
        </LeftPane>
        <RightPane>
          {/* @ts-ignore */}
          <Calender events={events} />
        </RightPane>
      </MainContainer>
    </>
  );

  return (
    <RequireAuth>
      {renderContent()}
    </RequireAuth>
  );
};

export default StudentCalendars;