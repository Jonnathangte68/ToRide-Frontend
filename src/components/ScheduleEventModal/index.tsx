import { css } from "@emotion/css";
import _ from "lodash";
import { MDBCol, MDBRow } from "mdbreact";
import moment from "moment";
import { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { scheduleNewCalendarEvent } from "../../features/Demo/demoSlice";
import COLORS from "../../utils/colors";
import useWindowDimensions from "../../utils/useWindowDimensions";
import convertVhToPx from "../../utils/vhToPx";
import InputButton from "../InputButton/InputButton";
import InputButton2 from "../InputButton2/InputButton2";
import SelectBox from "../SelectBox";
import SelectStudentModal from "../SelectStudentModal";
import RegularTextInput from "../TextInput/RegularTextInput";

const ScheduleEventModal = (props: any) => {

    // Positioning
    const modalElement = useRef(null);
    const { width, height } = useWindowDimensions();
    const modalWidth = convertVhToPx(90, "w");
    const modalHeight = convertVhToPx(90, "h");
    const offsetX = width - modalWidth + 40; // 115 magic modal style left space
    const offsetY = height - modalHeight;
    const [startDateEvent, setStartDateEvent] = useState<any>();
    const [endDateEvent, setEndDateEvent] = useState<any>();
    const [studentsFromSelect, setStudentsFromSelect] = useState([]);
    const [showSelectStudentModal, setShowSelectStudentModal] = useState(false);
    const students = useAppSelector((state) => state.demo.students);
    const imageList = useAppSelector((state) => state.demo.userImageVault);
    const [valueClass, setValueClass] = useState("Theory Class");
    const [valueVehicle, setValueVehicle] = useState("");

    const dispatch = useAppDispatch();

    const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();

    const handleScheduleEvent = () => {
        const form: HTMLFormElement | null = document.querySelector('form');
        if (!!form) {
          let formData = new FormData(form);
          let title = "";
      
          Array.from(formData.entries(), ([key, value]) => {
            if (key === "add_title") {
                title = value as string;
            }
            return true;
          });

          console.log("value class in form check!", valueClass);
          console.log("value vehicle ", valueVehicle);

          const calendarDetails = {
                date_start: formatDate(startDateEvent),
                date_end: formatDate(endDateEvent),
                title: title,
                student: studentsFromSelect,
                instructor: 1,
                class: `${valueClass}`,
                vehicle: valueVehicle
            };

            console.log("calendar details", calendarDetails);

            dispatch(scheduleNewCalendarEvent(calendarDetails));
        }
        return props?.onClose();
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

    return (
        <>
            <Modal
                show={props?.show}
                onHide={props?.onClose}
                backdrop="static"
                keyboard={false}
                ref={modalElement}
                contentClassName={css`width: 90vh; height: 90vh; margin-left: ${offsetX}px !important; margin-top:${offsetY}px !important`}
            >
                <Modal.Header>
                    <h1 style={{ fontSize: "1.55rem", fontWeight: "600" }}>{props?.title1}</h1>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <RegularTextInput placeholder="Add Title" name="add_title" title="" class={css`border: none !important; font-size: 2rem; &:focus{ border: none !important; outline: 0 none; box-shadow: unset !important; }`} />
                        <div className={css`margin-left: 1.15vh; margin-top: 2vh;`}>
                            <Form.Label style={{ fontWeight: 800, color: COLORS.SECONDARY_COLOR, fontSize: "0.99rem" }} >CLASS START AND END DATE</Form.Label>
                            <MDBRow>
                                <MDBCol md="4">
                                    <DatePicker value={startDateEvent} onChange={((value: Date) => setStartDateEvent(value))} />
                                </MDBCol>
                                <MDBCol md="4">
                                    <DatePicker value={endDateEvent} onChange={((value: Date) => setEndDateEvent(value))} />
                                </MDBCol>
                            </MDBRow>
                        </div>
                        <div className={css`margin-left: 1.15vh; margin-top: 2vh;`}>
                            <MDBRow>
                                <MDBCol md="4">
                                    <Form.Label style={{ fontWeight: 800, color: COLORS.SECONDARY_COLOR, fontSize: "0.99rem" }} >STUDENT</Form.Label>
                                    <br/>
                                    <MDBRow>
                                        {(!!studentsFromSelect && studentsFromSelect.length > 0) && studentsFromSelect.map((s) => (<><MDBCol md="2"><img
                                            src={getStudentImage(s?.id)}
                                            alt="profile student selected"
                                            style={{ objectFit: "cover", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                                        /></MDBCol></>))}
                                        {(!studentsFromSelect || studentsFromSelect.length === 0) && (
                                            <div
                                                onClick={() => setShowSelectStudentModal(true)}
                                                style={{ border: "1px solid "+COLORS.GRAY_BUTTON_DEFAULT, borderStyle: "dashed", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                                            >
                                                <p style={{ color: COLORS.GRAY_BUTTON_DEFAULT, fontSize: 11, textAlign: "center", fontWeight: "bold", paddingTop: "39.35%" }}>Choose Student</p>
                                            </div>
                                        )}
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol md="8">
                                <div className={css`width: 100%; height: 100%; border-left: 1px solid ${COLORS.VERY_LIGHT_GRAY}; padding-left: 9vh`}>
                                    <Form.Label style={{ fontWeight: 800, color: COLORS.SECONDARY_COLOR, fontSize: "0.99rem" }} >INSTRUCTOR</Form.Label>
                                    <br/>
                                    <div
                                        onClick={() => {}}
                                        style={{ border: "1px solid "+COLORS.GRAY_BUTTON_DEFAULT, borderStyle: "dashed", borderRadius: "50%", width: "7.75vh", height: "7.75vh" }}
                                    >
                                        <p style={{ color: COLORS.GRAY_BUTTON_DEFAULT, fontSize: 11, textAlign: "center", fontWeight: "bold", paddingTop: "27.35%" }}>Choose Instructor</p>
                                    </div>
                                </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                        <div className={css`margin-left: -1vh; margin-top: 2vh;`}>
                            <MDBCol md="5">
                                <SelectBox title="CLASS" defaultChecked={0} containerStyle={{ marginTop: "2vh" }} options={[{id: 0, name: "Theory Class"}, {id: 1, name: "Practice Class"}]} onChange={value => {
                                    console.log("on change event class", [{id: 0, name: "Theory Class"}, {id: 1, name: "Practice Class"}].filter(cls => _.toString(cls.id) === value)?.[0]?.name);
                                    setValueClass([{id: 0, name: "Theory Class"}, {id: 1, name: "Practice Class"}].filter(cls => _.toString(cls.id) === value)?.[0]?.name);
                                    return null;
                                }} />
                            </MDBCol>
                            <MDBCol md="5">
                                <SelectBox title="VEHICLES" defaultChecked={0} containerStyle={{ marginTop: "2vh" }} options={[{id: 0, name: "Vehicle 1"}, {id: 1, name: "Vehicle 2"}]} onChange={value => setValueVehicle(value)} />
                            </MDBCol>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className={css`
                        width: "300px";
                        margin-left: "20%";
                    `}>
                        {/* @ts-ignore */}
                        <InputButton2 name="gasjdbgisabgibu" title={"Cancel"} onClick={props?.onClose} class={css`background-color: white !important;color: black;border: 1px solid black;border-radius: 10px;`} />
                        <InputButton variant="danger" label="Schedule" containerStyle={{ borderRadius: "10px" }} onClick={handleScheduleEvent} />
                    </div>
                </Modal.Footer>
            </Modal>
            <SelectStudentModal
                selection={studentsFromSelect}
                show={showSelectStudentModal}
                onClose={handleSelectStudentModalClose}
                onSubmit={handleStudentsSelected}
            />
        </>
    );
};

export default ScheduleEventModal;
