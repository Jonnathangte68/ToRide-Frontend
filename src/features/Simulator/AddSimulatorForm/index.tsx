import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MDBRow, MDBCol } from "mdbreact";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import InputDropdown from "../../../components/InputSelect/InputSelect";
import TextInput from "../../../components/TextInput/TextInput";
import WeeklyDaySelector from "../../../components/WeeklyDaySelector";
import COLORS from "../../../utils/colors";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden !important;
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


const Form = () => {
    const { height } = useWindowDimensions();
    const [, setFirstName] = useState("");
    const [, setLocation] = useState("");
    const [, setCity] = useState("");
    const [, setState] = useState("");
    const [, setZipCode] = useState("");
    const [weekday, setWeekday] = useState(null);

    
    const handleAddSimulator = () => {

    };

    const handleCancel = () => {

    };

    return (
        <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA" }}>
            <p style={{ width: "27%", paddingTop: "29.198px", fontSize: "25px", fontWeight: '500' }}>
                <Plus size={27} />{`${'\tAdd New Simulator'}`}
            </p>
            <div style={{ width: "40%", paddingTop: "18.5px" }}>
                <InputButton2
                    name="add_student"
                    title="Next"
                    color="red"
                    onClick={handleAddSimulator}
                />
                <InputButton2
                    name="add_student"
                    title="Cancel"
                    color="dark"
                    onClick={handleCancel}
                />
            </div>
        </Header>
        <div className={css`
            width: 95%;
            height: ${height-55}px;
            maxHeight: ${height-55}px;
            padding-left: 3.5vh;
            padding-right: 3.5vh;
        `}>
            {/* {!!dispalyError && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)} */}
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Simulator Information</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <TextInput name="xs5" title="NAME" onChange={(value => setFirstName(value))} />    
                </MDBCol>
                <MDBCol md="6">
                    <TextInput name="xs6" title="LOCATION" onChange={(value => setLocation(value))} />
                </MDBCol>
                <MDBCol md="2"></MDBCol>
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="CITY" onChange={(value => setCity(value))} />
                </MDBCol>
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="STATE" onChange={(value => setState(value))} />
                </MDBCol>
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="ZIP CODE" onChange={(value => setZipCode(value))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Session Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="TOTAL NO. OF SESSIONS" onChange={(value => setCity(value))} />
                </MDBCol>
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="NO. OF SESSIONS PER DAY" onChange={(value => setState(value))} />
                </MDBCol>
                <MDBCol md="3" className="mt-3">
                    <TextInput name="xs5" title="BREAK/EXTRA TIME" onChange={(value => setZipCode(value))} />
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
                                            <InputDropdown dropdownTitle="From" onSelect={() => { } } options={null} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                        <td>
                                            <img src="../assets/img/switch-session-pick-time.png" alt="switch start time to end time" />
                                        </td>
                                        <td>
                                            <InputDropdown dropdownTitle="To" onSelect={() => { } } options={null} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
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
                                            <InputDropdown dropdownTitle="From" onSelect={() => { } } options={null} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                        <td>
                                            <img src="../assets/img/switch-session-pick-time.png" alt="switch start time to end time" />
                                        </td>
                                        <td>
                                            <InputDropdown dropdownTitle="To" onSelect={() => { } } options={null} children={undefined} style={{ width: "25%", backgroundColor: COLORS.GRAY_INPUT }} />
                                        </td>
                                    </tr>
                                </table>
                            </MDBCol>
                        </MDBRow>
                </MDBCol>
                <MDBCol md="6" className="mt-3">
                    <WeeklyDaySelector selected={weekday} onChange={(d) => {setWeekday(d)}} />
                </MDBCol>
            </MDBRow>
        </div>
    </MainContainer>
    );
};

export default Form;