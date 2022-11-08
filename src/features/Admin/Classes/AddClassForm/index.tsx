import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import DatePicker from 'react-date-picker';
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { range } from "lodash";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./style.css";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { fetchClass, saveClass, setIsAddingClass, setIsFetchingClass, setIsFetchingClassError } from "../../../Demo/demoSlice";
import { PlusCircle } from "react-bootstrap-icons";
import InputButton2 from "../../../../components/InputButton2/InputButton2";
import AlertComponent from "../../../../components/Alert";
import RegularTextInput from "../../../../components/TextInput/RegularTextInput";
import COLORS from "../../../../utils/colors";
import InputDropdown from "../../../../components/InputSelect/InputSelect";
import WeeklyDaySelector from "../../../../components/WeeklyDaySelector";
import SelectStudentModal from "../../../../components/SelectStudentModal";

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

export const DAYS_OF_THE_WEEK = {
    monday: "MO",
    tuesday: "TU",
    wednesday: "WE",
    thursday: "TH",
    friday: "FR",
    saturday: "SA",
    sunday: "SU"
};

export default function AddStudentForm(props: any) {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.demo.students);

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  const [name, setName] = useState("");
  const [instructor1, setInstructor1] = useState("");
  const [instructor2, setInstructor2] = useState("");
  const [classSize, setClassSize] = useState("");
  const [classDateStart, setClassDateStart] = useState("");
  const [totalNoSessions, setTotalNoSessions] = useState(null);
  const [totalNoSessionsDay, setTotalNoSessionsDay] = useState(null);
  const [totalNoSessionsExtra, setTotalNoSessionsExtra] = useState(null);
  const [weekday, setWeekday] = useState(null);
  const [materialProgrameCompilationList, setMaterialProgrameCompilationList] = useState(null);
  const [classInstructor, setClassInstructor] = useState(null);
  const [dispalyError,] = useState("");
  const [dispalyAlert,] = useState("");
  const [studentsFromSelect, setStudentsFromSelect] = useState([]);
  const [showSelectStudentModal, setShowSelectStudentModal] = useState(false);
  const [resultSelectionDay, setResultSelectionDay] = useState();
  const [sessionsList, setsessionsList] = useState([]);

  const isFetchingClass = useAppSelector((state) => state.demo.isFetchingClass);
  const isFetchingClassError = useAppSelector((state) => state.demo.isFetchingClassError);
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  
  const handleAddStudent = () => {

    const newStudent: any = {
        name: name,
        instructor_sub1: instructor1,
        instructor_sub2: instructor2,
        class_size: classSize,
        class_date_start: classDateStart,
        total_number_of_sessions: totalNoSessions,
        total_number_of_sessions_day: totalNoSessionsDay,
        number_of_extra_sessions: totalNoSessionsExtra,
        session_1: sessionsList[0],
        session_2: sessionsList[1],
        weekday: weekday,
        material_programe_compilation_list: "very big long text",
        class_instructor: 3,
        students: studentsFromSelect,
        location: 1,
    };

    // dispatch(storeStudent(newStudent));
    dispatch(saveClass(newStudent));
  };

  useEffect(() => {
    if (isFetchingClass === "error" && !!isFetchingClassError) {
        console.log("is fetching class error");
        props?.onDisplayError(isFetchingClassError);
        setTimeout (() => {
            props?.onDisplayError("");
            dispatch(setIsFetchingClassError(undefined));
        }, 6000);
        return;
    }
    if (isFetchingClass === "success") {
        console.log("is fetching class success");
        document.getElementsByTagName("form")[1].reset();

        props?.onDisplayAlert("New Class has been added.");
        setTimeout (() => {
            props?.onDisplayAlert("");
            dispatch(setIsFetchingClass('idle'));
            dispatch(fetchClass());
        }, 6000);
    }
  }, [dispatch, isFetchingClass, isFetchingClassError, props]);

  useEffect(() => {
    console.log("check useffect for adding student");
  if (!!props?.student) {
      setName(props?.student?.name);
      setClassInstructor(props?.student?.class_instructor?.id);
      setInstructor1(props?.student?.instructor_sub1);
      setInstructor2(props?.student?.instructor_sub2);
      setClassSize(props?.student?.class_size);
      setTotalNoSessions(props?.student?.total_number_of_sessions);
      setTotalNoSessionsDay(props?.student?.total_number_of_sessions_day);
      setTotalNoSessionsExtra(props?.student?.number_of_extra_sessions);
      setWeekday(props?.student?.weekday);
      setWeekday(props?.student?.weekday);
      setMaterialProgrameCompilationList(props?.student?.material_programe_compilation_list);
      setStudentsFromSelect(props?.student?.students?.map(s => s.id));
      setsessionsList(props?.student?.session_1);
  } else {
    setName("");
    setClassInstructor(null);
    setInstructor1("");
    setInstructor2("");
    setClassSize("");
    setTotalNoSessions("");
    setTotalNoSessionsDay("");
    setTotalNoSessionsExtra("");
    setWeekday("");
    setWeekday("");
    setMaterialProgrameCompilationList("");
    setStudentsFromSelect([]);
    setsessionsList([]);
  }
}, [props?.student]);

  useEffect(() => {
    if (resultSelectionDay) {
        // @ts-ignore
        for (const key in resultSelectionDay) {
            if (resultSelectionDay[key] === true) {
                setWeekday(DAYS_OF_THE_WEEK[key]);
            }
        }
    }
  }, [resultSelectionDay]);
  

  const handleCancel = () => {
    dispatch(setIsAddingClass(false));
  };

  const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();

  const handleAssignClassStudent = () => {
      setShowSelectStudentModal(true);
  };

  const handleSelectStudentModalClose = () => {
    setShowSelectStudentModal(false);
  };

  const handleStudentsSelected = (values: any[]) => {
    console.log("students selected to add.", values);
    setStudentsFromSelect(values);
    setShowSelectStudentModal(false);
  };

  const getStudentImage = (id: number) => {
    const student = students[id];
    const pictureG = imageList?.filter(f => {
        if (f.title === `vehicle_profile_picture_${student?.mobile_number}_${student?.student?.email}`) {
            return true;
        }
        return false;
    });
    return (!!pictureG && pictureG.length > 0 && !!pictureG?.[0]?.url_thumbnail) ? pictureG?.[0]?.url_thumbnail : "../assets/img/picture-upload-picture.png";
  };

  const handleChangeDaySelected = (result: any) => {
    setResultSelectionDay(result);
  };

  const getTimeOptions = () => {
    const values: string[] = [];
    for (let time in range( 0, 24, 1 )) {
      values.push(`${parseInt(time) > 12 ? (parseInt(time)-12) : parseInt(time)}:00 ${parseInt(time) > 12 ? "PM" : "AM"}`);
    }
    return values;
  };

  const handleSelectFromSession = (timeSelected) => {
    console.log("from session selection", timeSelected);
    const fromTime = moment(timeSelected, "hh:mm A").format("HH:mm:ss");
    console.log("formatted time after selection.", fromTime);
    setsessionsList([fromTime]);
  };

  const handleSelectToSession = (timeSelected) => {
    console.log("to session selection", timeSelected);
    const toTime = moment(timeSelected, "hh:mm A").format("HH:mm:ss");
    console.log("formatted time after selection.", toTime);
    const newSessionList = sessionsList.concat(toTime);
    setsessionsList(newSessionList);
  };

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA" }}>
            <p style={{ width: "20%", paddingTop: "29.198px", fontSize: "25px", fontWeight: '400' }}>
                <PlusCircle size={27} />{`${'\tAdd Class'}`}
            </p>
            <div style={{ width: "40%", paddingTop: "18.5px" }}>
                <InputButton2
                    name="add_student"
                    title="Next"
                    color="red"
                    class={css`background-color: #FF4311!important; color: white; font-weight: bold; border-radius: 6px;`} 
                    onClick={handleAddStudent}
                />
                <InputButton2
                    name="add_student"
                    title="Cancel"
                    color="dark"
                    class={css`font-weight: bold; border-radius: 6px;`} 
                    onClick={handleCancel}
                />
            </div>
        </Header>
        <div className={css`
            width: 95%;
            height: ${height-HEADER_SPACE}px;
            maxHeight: ${height-HEADER_SPACE}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
        `}>
            {(!!dispalyError && !dispalyAlert) && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
            {(!!dispalyAlert && !dispalyError) && (<AlertComponent text={dispalyAlert} variant="primary" />)}
            <form>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="CLASS NAME" value={name} onChange={(value => setName(value))} />    
                </MDBCol>
                <MDBCol md="6"></MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs2" title="INSTRUCTOR" value={classInstructor} onChange={(value => setInstructor1(value))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs3" title="INSTRUCTOR SUBSTITUTE-1" value={instructor1} onChange={(value => setInstructor1(value))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs3" title="INSTRUCTOR SUBSTITUTE-2" value={instructor2} onChange={(value => setInstructor2(value))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs3" title="CLASS SIZE" value={classSize} onChange={(value => setClassSize(value))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <DatePicker value={!!classDateStart ? new Date(classDateStart) : new Date()} onChange={((value: any) => setClassDateStart(formatDate(value)))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Session Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="TOTAL NO. OF SESSION" value={totalNoSessions} onChange={(value => setTotalNoSessions(value))} />    
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="NO. OF SESSION PER DAY" value={totalNoSessionsDay} onChange={(value => setTotalNoSessionsDay(value))} />    
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="BREAK / EXTRA TIME" value={totalNoSessionsExtra} onChange={(value => setTotalNoSessionsExtra(value))} />    
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                    <MDBCol md="6" className="mt-3">
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="3" className="mt-4">
                            <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>Session 1:</p>
                            </MDBCol>
                            <MDBCol md="8">
                                <table className={"dropdown-custom-select-business-hours"+css`padding-left:2vh;padding-right:2vh;`}>
                                    <tr>
                                        <td>
                                            <InputDropdown dropdownTitle="From" onSelect={handleSelectFromSession} options={getTimeOptions()} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                        <td>
                                            <img src="../assets/img/switch-session-pick-time.png" alt="switch start time to end time" />
                                        </td>
                                        <td>
                                            <InputDropdown dropdownTitle="To" onSelect={handleSelectToSession} options={getTimeOptions()} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                    </tr>
                                </table>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-3 mb-3">
                            <MDBCol md="3" className="mt-4">
                            <p style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "0.94rem" }}>Session 2:</p>
                            </MDBCol>
                            <MDBCol md="8">
                                <table className={"dropdown-custom-select-business-hours"+css`padding-left:2vh;padding-right:2vh;`}>
                                    <tr>
                                        <td>
                                            <InputDropdown dropdownTitle="From" onSelect={() => { } } options={getTimeOptions()} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                        <td>
                                            <img src="../assets/img/switch-session-pick-time.png" alt="switch start time to end time" />
                                        </td>
                                        <td>
                                            <InputDropdown dropdownTitle="To" onSelect={() => { } } options={getTimeOptions()} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                    </tr>
                                </table>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="6" className="mt-3">
                        <WeeklyDaySelector onChange={handleChangeDaySelected} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3 mb-3">
                    <MDBCol md="6">
                        <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Material/Program Completion Checklist</TextTile5>
                        <div style={{ textAlign: "left", marginTop: "0.25vh", marginBottom: "1.15vh" }}><i className="fa fa-plus-circle" style={{ textShadow: "20px 1px 1px #FF4311", color: "white" }} aria-hidden="true"></i>{"\t"}<b style={{ marginLeft: "2.55vh" }}>Add more items</b></div>
                        <MDBCol md="10">
                            <RegularTextInput name="xs1" title="Item #1" value={materialProgrameCompilationList} onChange={(value => setMaterialProgrameCompilationList(value))} />    
                        </MDBCol>
                    </MDBCol>
                    <MDBCol md="6" className={css`overflow-y: auto;`}>
                        <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Students Assigned To<span onClick={handleAssignClassStudent} style={{ float: "right", paddingRight: "5.55vh" }}><i className="fa fa-plus-circle" style={{ textShadow: "20px 1px 1px #FF4311", color: "white" }} aria-hidden="true"></i>{"\t"}<b style={{ marginLeft: "2.44vh" }}>Add new student</b></span></TextTile5>
                        <div className={css`height: 100vh; overflow-y: auto`}>
                            <MDBRow>
                                {(!!studentsFromSelect && studentsFromSelect.length > 0) && studentsFromSelect.map((s) => (<><MDBCol md="2"><img
                                    src={getStudentImage(s?.id)}
                                    alt="profile student selected"
                                    style={{ objectFit: "cover", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                                /></MDBCol></>))}
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
            </form>
        </div>
        <SelectStudentModal
            selection={studentsFromSelect}
            show={showSelectStudentModal}
            onClose={handleSelectStudentModalClose}
            onSubmit={handleStudentsSelected}
        />
    </MainContainer>
  )
}
