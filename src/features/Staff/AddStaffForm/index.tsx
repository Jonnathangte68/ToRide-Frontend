import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DatePicker from 'react-date-picker';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import _, { toNumber } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { fetchStaff, saveStaff, setIsAddingStaff, setIsFetchingStaff, setIsFetchingStaffError, updateStaff } from "../../Demo/demoSlice";
import AlertComponent from "../../../components/Alert";
import RegularTextInput from "../../../components/TextInput/RegularTextInput";
import moment from "moment";
import SelectBox from "../../../components/SelectBox";
import PublitioAPI from "publitio_js_sdk";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../../utils/globals";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  minWidth: 100%;
  minHeight: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden !important;
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

export default function AddStaffForm(props: any) {
  const dispatch = useAppDispatch();

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  const [firstName, setFirstName] = useState("");
  const [lasName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState({ id: null, url_thumbnail: "../assets/img/add-vehicle-photo-select.png" });
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState<number>();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ziuCode, setZipCode] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState<number>();
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [licenseNumber, setLiceseNumber] = useState("");
  const [licenseIssue, setLicenseIssue] = useState<Date>();
  const [licenseExpire, setLicenseExpire] = useState<Date>();
  const [instructorLicenseNumber, setInstructorLicenseNumber] = useState("");
  const [instructorLicenseIssue, setInstructorLicenseIssue] = useState<Date>();
  const [instructorLicenseExpire, setInstructorLicenseExpire] = useState<Date>();
  const [wearGlasses, setWearGlasses] = useState("");
  const [dispalyError,] = useState("");
  const [dispalyAlert,] = useState("");

  const isFetchingStaff = useAppSelector((state) => state.demo.isFetchingStaff);
  const isFetchingStaffError = useAppSelector((state) => state.demo.isFetchingStaffError);
  const user = useAppSelector((state) => state.demo.userlogin);

  console.log("user info", user);

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();
  
  const handleAddStudent = () => {

    publitio.call(`/files/update/${profilePic?.id}`, 'PUT', {
        id: `vehicle_profile_picture_${contactNumber}_${user?.username}`,
        title: `vehicle_profile_picture_${contactNumber}_${user?.username}`,
        description: `vehicle_profile_picture_${contactNumber}_${user?.username}`,
        tags: `vehicle,profile_picture,${contactNumber},${user?.username}`,
        privacy: '1',
        option_download: '1'
      }).then(data => { console.log(data) })
        .catch(error => { console.log(error) });

    const newStaff = {
        first_name: firstName,
        last_name: lasName,
        gender: gender,
        zip_code: ziuCode,
        license_expire: licenseExpire,
        emergency_email: emergencyEmail,
        role: role,
        instructor_license_number: instructorLicenseNumber,
        instructor_license_issue_date: formatDate(instructorLicenseIssue),
        instructor_license_end_date: formatDate(instructorLicenseExpire),
        email: emailAddress,
        mobile_number: contactNumber,
        address: address,
        city: city,
        state: state,
        country: "",
        due_amount: 0,
        emergency_contact_name: emergencyName,
        emergency_contact_phone: emergencyPhone,
        emergency_contact_relation: emergencyRelationship,
        license_number: licenseNumber,
        license_issue_date: formatDate(licenseIssue),
        license_end_date: formatDate(licenseExpire),
        glasses: wearGlasses,
        physical_status: "yes",
        location: 1,
    };

    if (!!props?.student?.id) {
        dispatch(updateStaff(newStaff));
        return;
    }

    dispatch(saveStaff(newStaff));
  };

  useEffect(() => {
    if (isFetchingStaff === "error" && !!isFetchingStaffError) {
        props?.onDisplayError(isFetchingStaffError);
        setTimeout (() => {
            props?.onDisplayError("");
            dispatch(setIsFetchingStaffError(undefined));
        }, 6000);
        return;
    }
    if (isFetchingStaff === "success") {
        document.getElementsByTagName("form")[1].reset();

        props?.onDisplayAlert("New staff member has been added.");
        setTimeout (() => {
            props?.onDisplayAlert("");
            dispatch(setIsFetchingStaff('idle'));
            dispatch(fetchStaff());
        }, 6000);
    }
  }, [dispatch, isFetchingStaff, isFetchingStaffError, props]);

  useEffect(() => {
    console.log("check useffect for adding student");
  if (!!props?.student) {
      console.log("is true WITH student", props?.student);
      console.log("set on init ");
      setFirstName(props?.student?.first_name);
      setLastName(props?.student?.last_name);
      setGender(props?.student?.gender);
      setEmailAddress(props?.student?.school_staff?.email);
      setContactNumber(props?.student?.mobile_number);
      setAddress(props?.student?.address);
      setCity(props?.student?.city);
      setState(props?.student?.state);
      setZipCode(props?.student?.zip_code);
      setEmergencyName(props?.student?.emergency_contact_name);
      setEmergencyPhone(props?.student?.emergency_contact_phone);
      setEmergencyRelationship(props?.student?.emergency_contact_relation);
      setLiceseNumber(props?.student?.license_number);
      setLicenseIssue(props?.student?.license_issue_date);
      setLicenseExpire(props?.student?.license_end_date);
      setWearGlasses(props?.student?.glasses);
      setInstructorLicenseNumber(props?.student?.instructor_license_number);
      setInstructorLicenseIssue(props?.student?.instructor_license_end_date);
      setInstructorLicenseExpire(props?.student?.instructor_license_end_date);
      setRole(props?.student?.role);

      console.log("check if photo is set.");
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
      setLicenseIssue(null);
      setLicenseExpire(null);
      setWearGlasses("");
      setInstructorLicenseNumber("");
      setInstructorLicenseIssue(null);
      setInstructorLicenseExpire(null);
      setRole(null);
  }
}, [props?.student]);

  const handleCancel = () => {
    dispatch(setIsAddingStaff(false));
  };

  const handleClickProfielPic = () => {
    const element = document.getElementById('upload');
    element?.click();
  };

  const handlePictureUpload = (data) => {
    console.log(data);
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
                <Plus size={27} />{`${'\tAdd New Staff'}`}
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
            overflow-y: auto;
        `}>
            {!!dispalyError && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
            {!!dispalyAlert && (<AlertComponent text={dispalyAlert} variant="primary" />)}
            <form>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <div className={css`
                        position: absolute;
                        left: -6.45vh;
                        top: 0.15vh;
                    `}>
                        <img
                            alt="student add profile pic"
                            src={profilePic?.url_thumbnail}
                            style={{ borderRadius: "50%", width: "14.5vh", height: "14.5vh" }}
                            onClick={handleClickProfielPic}
                        />
                        <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ visibility: "hidden" }}></input>
                    </div>
                </MDBCol>
                <MDBCol md="9">
                    <MDBRow>
                        <MDBCol md="5">
                            <RegularTextInput name="xs1" title="FIRST NAME" value={firstName} onChange={(value => setFirstName(value))} />    
                        </MDBCol>
                        <MDBCol md="5">
                            <RegularTextInput name="xs2" title="LAST NAME" value={lasName} onChange={(value => setLastName(value))} />    
                        </MDBCol>
                        <MDBCol md="2">
                        <SelectBox id="role_staff" title="ROLE" options={[{ id: "instructor", name: "Instructor" }, { id: "assistant", name: "Assistant" }]} onChange={value => setRole(value)}/>
                            {/* <RegularTextInput name="xs3" title="ROLE" onChange={(value => setRole(value))} />     */}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="5" className="mt-3">
                            <RegularTextInput name="xs1" title="EMAIL ADDRESS" value={emailAddress} onChange={(value => setEmailAddress(value))} />    
                        </MDBCol>
                        <MDBCol md="5" className="mt-3">
                            <RegularTextInput name="xs2" title="CONTACT NUMBER" value={_.toString(contactNumber)} onChange={(value => setContactNumber(toNumber(value)))} />    
                        </MDBCol>
                        <MDBCol md="2" className="mt-3">
                        <SelectBox id="gender_instructor" title="GENDER" defaultChecked={getGenderSelectedIndex(gender)} options={[{ id: "male", name: "Male" }, { id: "female", name: "Female" }]} onChange={value => setGender(value)}/>
                            {/* <RegularTextInput name="xs3" title="GENDER" onChange={(value => setGender(value))} />     */}
                        </MDBCol>
                    </MDBRow>
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
                    <RegularTextInput name="xs8" title="ZIP CODE" value={ziuCode} onChange={(value => setZipCode(value))}  />
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
                    <DatePicker value={licenseIssue} onChange={((value: Date) => setLicenseIssue(value))} />
                    {/* <RegularTextInput name="xs18" title="LICENSE/PERMIT ISSUE" onChange={(value => setLicenseIssue(value))} /> */}
                </MDBCol>
                <MDBCol md="4">
                <DatePicker value={licenseExpire} onChange={((value: Date) => setLicenseExpire(value))} />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs17" title="INSTRUCTOR LICENSE NUMBER" value={instructorLicenseNumber} onChange={(value => setInstructorLicenseNumber(value))} />    
                </MDBCol>
                <MDBCol md="4">  
                    <DatePicker value={instructorLicenseIssue} onChange={((value: Date) => setInstructorLicenseIssue(value))} />
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={instructorLicenseExpire} onChange={((value: Date) => setInstructorLicenseExpire(value))} />  
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
