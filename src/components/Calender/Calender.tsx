import React, { useEffect, useState } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper-with-scheduler';
import 'fullcalendar-reactwrapper-with-scheduler/dist/css/fullcalendar.min.css';
import moment from 'moment';
import { css } from '@emotion/css';
import "./style.css";

const MyCalendar = (props: any) => {
  const todayDate = moment().format("YYYY-MM-DD");
  const [events, setEvents] = useState(props?.events);

  useEffect(() => {
    if (props?.events) {
      setEvents(props?.events);
    }
  }, [props?.events]);

  console.log("event", events);
  
  return (
    <div id="example-component" className={css`background-color: white; padding: 5vh 2vh 5vh 2vh; border-radius: 20px;`}>
      <FullCalendar
        id = "your-custom-ID"
        header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        }}
        defaultDate={todayDate}
        navLinks= {true} // can click day/week names to navigate views
        editable= {true}
        eventLimit= {true} // allow "more" link when too many events
        events = {events}
        backgroundColor={"#FFF"}
        className={css`background-color: #FFF`}
      />
    </div>
  );
}

export default MyCalendar;

// Weekly calendar with list planner
/*
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const calendars = [
  {
    id: '0',
    name: 'Private',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

// Especially avoid to declare the `template` prop inside the component.
const template = {};

function MyCalendar() {
  // ...

  return (
    <Calendar
      // ...
      calendars={calendars}
      template={template}
    />
  );
}

export default MyCalendar;
*/