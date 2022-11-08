import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DatePicker from 'react-date-picker';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { PlusCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import PublitioAPI from 'publitio_js_sdk';
import { css } from "@emotion/css";
import SelectBox from "../../../components/SelectBox";
import _, { toNumber } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import AlertComponent from "../../../components/Alert";
import { fetchStudent, saveStudent, setIsAddingStudent, setIsFetchingStudent, setIsFetchingStudentError, updateStudent } from "../../Demo/demoSlice";
import "./style.css";
import moment from "moment";
import RegularTextInput from "../../../components/TextInput/RegularTextInput";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../../utils/globals";

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

export default function AddStudentForm(props: any) {
  const dispatch = useAppDispatch();
  const isFetchingStudent = useAppSelector((state) => state.demo.isFetchingStudent);
  const isFetchingStudentError = useAppSelector((state) => state.demo.isFetchingStudentError);

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

//   const storeStudentStatus = useAppSelector((state) => state.students.storeStudentStatus);
//   const storeStudentError = useAppSelector((state) => state.students.storeStudentError);

//   console.log("storeStudentStatus => ", storeStudentStatus);
//   console.log("storeStudentError => ", storeStudentError);

  const [firstName, setFirstName] = useState("");
  const [lasName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState({ id: null, url_thumbnail: "../assets/img/add-vehicle-photo-select.png" });
  const [gender, setGender] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState<number | undefined>();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ziuCode, setZipCode] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState<number | undefined>();
  const [parentRelationshp, setParentRelationship] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState<number | undefined>();
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [licenseNumber, setLiceseNumber] = useState("");
  const [licenseIssue, setLicenseIssue] = useState("");
  const [licenseExpire, setLicenseExpire] = useState("");
  const [wearGlasses, setWearGlasses] = useState("");
  const [dispalyError,] = useState("");
  const [dispalyAlert,] = useState("");

  // Hardcoded change later review 
  const [student, setStudent] = useState(1);
  const [location, setLocation] = useState(1);
  const [school, setSchool] = useState(1);

  const user = useAppSelector((state) => state.demo.userlogin);

  console.log("user info", user);

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  useEffect(() => {
      console.log("check useffect for adding student");
    if (!!props?.student) {
        console.log("is true WITH student", props?.student);
        console.log("set on init ");
        console.log("location value", props?.student?.location);
        console.log("student value", props?.student?.student);
        console.log("school value", props?.student?.school);
        setFirstName(props?.student?.first_name);
        setLastName(props?.student?.last_name);
        setGender(props?.student?.gender);
        setEmailAddress(props?.student?.student?.email);
        setContactNumber(props?.student?.mobile_number);
        setAddress(props?.student?.address);
        setCity(props?.student?.city);
        setState(props?.student?.state);
        setZipCode(props?.student?.zip_code);
        setEmergencyName(props?.student?.emergecy_contact_name);
        setEmergencyPhone(props?.student?.emergecy_contact_phone);
        setEmergencyRelationship(props?.student?.emergecy_contact_relationship);
        setLiceseNumber(props?.student?.license_number);
        setLicenseIssue(props?.student?.license_issue_date);
        setLicenseExpire(props?.student?.license_expire_date);
        setWearGlasses(props?.student?.glasses);
        setStudent(props?.student?.student);
        setLocation(props?.student?.location);
        setSchool(props?.student?.location?.school);
        
        console.log("check if photo is set.");
        console.log("photo result", props?.student?.photo);
        console.log("photo id value to test [end] ====> ", props?.student?.photo);
        if (!!props?.student?.photo) {
            console.log("photo value", props?.student?.photo);
            setProfilePic({ id: null, url_thumbnail: props?.student?.photo });
        }
    } else {
        setFirstName("");
        setLastName("");
        setGender("");
        setEmailAddress("");
        setContactNumber(null);
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setEmergencyName("");
        setEmergencyPhone(null);
        setEmergencyRelationship("");
        setLiceseNumber("");
        setLicenseIssue("");
        setLicenseExpire("");
        setWearGlasses("");
        setStudent(1);
        setLocation(1);
        setSchool(1);
    }
  }, [props?.student]);
  
  const handleAddStudent = () => {
    console.log("file data", profilePic);

    console.log("my file to be updated.", profilePic?.id);

    publitio.call(`/files/update/${profilePic?.id}`, 'PUT', {
        id: `student_profile_picture_${contactNumber}`,
        title: `student_profile_picture_${contactNumber}`,
        description: `student_profile_picture_${contactNumber}`,
        tags: `student,profile_picture,${contactNumber}`,
        privacy: '1',
        option_download: '1'
      }).then(data => { console.log(data) })
        .catch(error => { console.log(error) });

    const newStudent: any = {
        id: props?.student?.id ? props?.student?.id : props?.id,
        first_name: firstName,
        last_name: lasName,
        gender: gender,
        zip_code: ziuCode,
        parent_name: parentName,
        parent_email: parentEmail,
        parent_phone: parentPhone,
        parent_relationship: parentRelationshp,
        license_expire: licenseExpire,
        emergency_email: emergencyEmail,
        email: emailAddress,
        mobile_number: contactNumber,
        address: address,
        city: city,
        state: state,
        country: "",
        due_amount: 0,
        emergecy_contact_name: emergencyName,
        emergecy_contact_phone: emergencyPhone,
        emergecy_contact_relationship: emergencyRelationship,
        license_number: licenseNumber,
        license_issue_date: licenseIssue,
        glasses: wearGlasses,
        student: student,
        location: location,
        school: school,
    };

    if (!!props?.student?.id) {
        console.log("in update student form.", newStudent);
        dispatch(updateStudent(newStudent));
        return;
    }

    dispatch(saveStudent(newStudent));
  };

  useEffect(() => {
    if (isFetchingStudent === "error" && !!isFetchingStudentError) {
        console.log("is fetching class error");
        console.log("error is fetching", isFetchingStudentError);
        props?.onDisplayError(isFetchingStudentError);
        setTimeout (() => {
            props?.onDisplayError("");
            dispatch(setIsFetchingStudentError(undefined));
        }, 6000);
        return;
    }
    if (isFetchingStudent === "success") {
        console.log("is fetching class success");
        document.getElementsByTagName("form")[1].reset();

        props?.onDisplayAlert("New student has been added.");
        setTimeout (() => {
            props?.onDisplayAlert("");
            dispatch(setIsFetchingStudent('idle'));
            dispatch(fetchStudent());
        }, 6000);
    }
  }, [dispatch, isFetchingStudent, isFetchingStudentError, props]);

  const handleCancel = () => {
    dispatch(setIsAddingStudent(false));
  };

  const handleClickProfielPic = () => {
      console.log("handleClickProfielPic");
    const element = document.getElementById('upload');
    console.log("element after get", element);
    element?.click();
  };

//   useEffect(() => {
//     if (storeStudentStatus === "error" && !!storeStudentError) {
//         console.log('it enters condition (storeStudentStatus === "error" && !!storeStudentError)');
//         setDisplayError(storeStudentError);
//     }
//   }, [storeStudentStatus, storeStudentError]);

  const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();

  const handlePictureUpload = (data) => {
    console.log(data);

    // do not replace just update
    if (!!profilePic?.id) {
        const newPic = {...data};
        newPic.id = profilePic.id;
        setProfilePic(newPic);
        return;
    }
    
    setProfilePic(data);
  };

  const handleNewFileUpload = (event: any) => {
    let file = event.target.files[0];
    console.log(file);
    
    if (file) {
      let data = new FormData();
      data.append('file', file);
      publitio.uploadFile(file, 'file', {
        title: 'tmp_upload',
        description: 'tmp_upload',
        tags: 'tmp_upload',
        privacy: '1',
        option_download: '1'
      }).then(handlePictureUpload)
        .catch(error => { console.log("error picture, ", error) })
      }
  };

  const getGenderSelectedIndex = (gender) => {
    if (gender === "male") {
        return 0;
    }
    if (gender === "female") {
        return 1;
    }
    return null;
  };

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA" }}>
            <p style={{ width: "20%", paddingTop: "29.198px", fontSize: "25px", fontWeight: '400' }}>
                <PlusCircle size={27} />{`${'\tAdd Student'}`}
            </p>
            <div style={{ width: "40%", paddingTop: "18.5px" }}>
                <InputButton2
                    name="add_student"
                    title="Save"
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
            overflow-y: auto !important;
        `}>
            {(!!dispalyError && !dispalyAlert) && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
            {(!!dispalyAlert && !dispalyError) && (<AlertComponent text={dispalyAlert} variant="primary" />)}
            <form>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <div>
                        <img
                            alt="student add profile pic"
                            src={profilePic?.url_thumbnail}
                            style={{ position: "relative", top: "5vh", borderRadius: "50%", marginBottom: "-30px", width: "14.5vh", height: "14.5vh" }}
                            onClick={handleClickProfielPic}
                        />
                        <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ display: "none" }}></input>
                    </div>
                </MDBCol>
                <MDBCol md="3">
                    <RegularTextInput name="xs1" title="FIRST NAME" value={firstName} onChange={(value => setFirstName(value))} />    
                </MDBCol>
                <MDBCol md="3">
                    <RegularTextInput name="xs2" title="LAST NAME" value={lasName} onChange={(value => setLastName(value))} />
                </MDBCol>
                <MDBCol md="3">
                    <SelectBox id="gender_student" title="GENDER" defaultChecked={getGenderSelectedIndex(gender)} options={[{ id: "male", name: "Male" }, { id: "female", name: "Female" }]} onChange={value => setGender(value)}/>
                </MDBCol>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="3" className="mt-4">
                    <RegularTextInput name="xs4" title="EMAIL ADDRESS" value={emailAddress} onChange={(value => setEmailAddress(value))} />
                </MDBCol>
                <MDBCol md="3" className="mt-4">
                    <RegularTextInput name="xs5" title="CONTACT NUMBER" value={_.toString(contactNumber)} onChange={(value => setContactNumber(toNumber(value)))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Address Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="6">
                    <RegularTextInput name="xs5" title="ADDRESS" value={address} onChange={(value => setAddress(value))} />    
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs6" title="CITY" value={city} onChange={(value => setCity(value))} />
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs7" title="STATE" value={state} onChange={(value => setState(value))} />
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs8" title="ZIP CODE" value={ziuCode} onChange={(value => setZipCode(value))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Parents/Guardians Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs9" title="NAME" onChange={(value => setParentName(value))} />    
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs10" title="EMAIL ADDRESS" onChange={(value => setParentEmail(value))} />
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs11" title="CONTACT NUMBER" onChange={(value => setParentPhone(toNumber(value)))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs12" title="RELATIONSHIP" onChange={(value => setParentRelationship(value))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Emergency Contact</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs13" title="NAME" value={emergencyName} onChange={(value => setEmergencyName(value))} />    
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs14" title="EMAIL ADDRESS" value={emergencyEmail} onChange={(value => setEmergencyEmail(value))} />
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs15" title="CONTACT NUMBER" value={_.toString(emergencyPhone)} onChange={(value => setEmergencyPhone(toNumber(value)))} />
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs16" title="RELATIONSHIP" value={emergencyRelationship} onChange={(value => setEmergencyRelationship(value))} />
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>License Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs17" title="LICENSE/PERMIT NUMBER" value={licenseNumber} onChange={(value => setLiceseNumber(value))} />    
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={!!licenseIssue ? new Date(licenseIssue) : new Date()} onChange={((value: any) => {setLicenseIssue(formatDate(value))})} />
                    {/* <RegularTextInput name="xs18" title="LICENSE/PERMIT ISSUE" onChange={(value => setLicenseIssue(value))} /> */}
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={!!licenseExpire ? new Date(licenseExpire) : new Date()} onChange={((value: any) => setLicenseExpire(formatDate(value)))} />
                    {/* <RegularTextInput name="xs19" title="LICENSE/PERMIT EXPIRE" onChange={(value => setLicenseExpire(value))} /> */}
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Physical Condition</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs20" title="WEAR GLASSES" value={wearGlasses} onChange={(value => setWearGlasses(value))} />    
                </MDBCol>
                <MDBCol md="4"></MDBCol>
                <MDBCol md="4"></MDBCol>
            </MDBRow>
            </form>
        </div>
    </MainContainer>
  )
}
