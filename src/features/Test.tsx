import React from "react"

import PublitioAPI from 'publitio_js_sdk'
const publitio = new PublitioAPI('<API key>', '<API secret>')

const Test = () => {
  <p>.</p>
};

export default Test;

/*import React from "react"

import { Scheduler } from '@devexpress/dx-react-scheduler';

export default function Test() {
  async function getData(_, requestOptions) {
    const PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k';
    const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
  
    return await fetch(dataUrl, requestOptions).then(
      (response) => response.json(),
    ).then((data) => data.items);
  }
  const currentDate = new Date(2017, 4, 25);
  const views = ['month'];
  
  const dataSource = {
    "kind": "calendar#events",
    "etag": "\"p324f37vbgbgum0g\"",
    "summary": "Shared",
    "description": "",
    "updated": "2020-09-11T11:42:19.941Z",
    "timeZone": "Europe/London",
    "accessRole": "reader",
    "defaultReminders": [],
    "nextSyncToken": "CIjxn-uC4esCEAAYASDn3OLaAQ==",
    "items": [
     {
      "kind": "calendar#event",
      "etag": "\"2995719729570000\"",
      "id": "ufltvtp2s1es4i2l4jt9bncf9c",
      "status": "confirmed",
      "htmlLink": "https://www.google.com/calendar/event?eid=dWZsdHZ0cDJzMWVzNGkybDRqdDlibmNmOWMgZjdqbmV0bTIyZHNqYzNucGMybHUzYnV2dTRAZw",
      "created": "2015-05-27T10:27:10.000Z",
      "updated": "2017-06-19T08:11:04.785Z",
      "summary": "Approve Personal Computer Upgrade Plan",
      "creator": {
       "email": "user4652@gmail.com",
       "displayName": "Donald Murphy"
      },
      "organizer": {
       "email": "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com",
       "displayName": "Shared",
       "self": true
      },
      "start": {
       "dateTime": "2017-05-23T18:00:00+01:00",
       "timeZone": "UTC"
      },
      "end": {
       "dateTime": "2017-05-23T20:00:00+01:00",
       "timeZone": "UTC"
      },
      "iCalUID": "ufltvtp2s1es4i2l4jt9bncf9c@google.com",
      "sequence": 9,
      "eventType": "default"
     },
     {
      "kind": "calendar#event",
      "etag": "\"2995719775516000\"",
      "id": "pjo97p26heu0i73mapivkhrheg",
      "status": "confirmed",
      "htmlLink": "https://www.google.com/calendar/event?eid=cGpvOTdwMjZoZXUwaTczbWFwaXZraHJoZWcgZjdqbmV0bTIyZHNqYzNucGMybHUzYnV2dTRAZw",
      "created": "2015-05-27T09:31:14.000Z",
      "updated": "2017-06-19T08:11:27.758Z",
      "summary": "Upgrade Server Hardware",
      "creator": {
       "email": "user4652@gmail.com",
       "displayName": "Donald Murphy"
      },
      "organizer": {
       "email": "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com",
       "displayName": "Shared",
       "self": true
      },
      "start": {
       "dateTime": "2017-05-25T16:30:00+01:00",
       "timeZone": "UTC"
      },
      "end": {
       "dateTime": "2017-05-25T20:30:00+01:00",
       "timeZone": "UTC"
      },
      "iCalUID": "pjo97p26heu0i73mapivkhrheg@google.com",
      "sequence": 15,
      "eventType": "default"
     },
     {
      "kind": "calendar#event",
      "etag": "\"2995719814846000\"",
      "id": "51kj06ju8297jgjscgkhqso8mo",
      "status": "confirmed",
      "htmlLink": "https://www.google.com/calendar/event?eid=NTFrajA2anU4Mjk3amdqc2Nna2hxc284bW8gZjdqbmV0bTIyZHNqYzNucGMybHUzYnV2dTRAZw",
      "created": "2015-05-27T10:17:22.000Z",
      "updated": "2017-06-19T08:11:47.423Z",
      "summary": "Install New Router in Dev Room",
      "creator": {
       "email": "user4652@gmail.com",
       "displayName": "Donald Murphy"
      },
      "organizer": {
       "email": "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com",
       "displayName": "Shared",
       "self": true
      },
      "start": {
       "dateTime": "2017-05-22T23:30:00+01:00",
       "timeZone": "UTC"
      },
      "end": {
       "dateTime": "2017-05-23T00:30:00+01:00",
       "timeZone": "UTC"
      },
      "iCalUID": "51kj06ju8297jgjscgkhqso8mo@google.com",
      "sequence": 5,
      "eventType": "default"
     },
     {
      "kind": "calendar#event",
      "etag": "\"2995719938618000\"",
      "id": "62nu6c6mirh5ded3dfnjag4s70",
      "status": "confirmed",
      "htmlLink": "https://www.google.com/calendar/event?eid=NjJudTZjNm1pcmg1ZGVkM2RmbmphZzRzNzAgZjdqbmV0bTIyZHNqYzNucGMybHUzYnV2dTRAZw",
      "created": "2015-05-27T09:30:31.000Z",
      "updated": "2017-06-19T08:12:49.309Z",
      "summary": "Upgrade Personal Computers",
      "creator": {
       "email": "user4652@gmail.com",
       "displayName": "Donald Murphy"
      },
      "organizer": {
       "email": "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com",
       "displayName": "Shared",
       "self": true
      },
      "start": {
       "dateTime": "2017-05-24T20:15:00+01:00",
       "timeZone": "UTC"
      },
      "end": {
       "dateTime": "2017-05-24T23:30:00+01:00",
       "timeZone": "UTC"
      },
      "iCalUID": "62nu6c6mirh5ded3dfnjag4s70@google.com",
      "sequence": 8,
      "eventType": "default"
     }
    ]
   };

  return (
    <div>
      <Scheduler
          dataSource={dataSource}
          views={views}
          defaultCurrentView="workWeek"
          defaultCurrentDate={currentDate}
          height={500}
          startDayHour={7}
          editing={false}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          timeZone="America/Los_Angeles" />
    </div>
  );
}
*/
