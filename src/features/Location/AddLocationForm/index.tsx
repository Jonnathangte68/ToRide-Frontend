import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import RegularTextInput from "../../../components/TextInput/RegularTextInput";
import { fetchLocation, saveLocation, setIsAddingLocation, setIsFetchingLocation, setIsFetchingLocationError, updateLocation } from "../../Demo/demoSlice";
import AlertComponent from "../../../components/Alert";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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

export default function AddLocationForm(props: any) {
  const dispatch = useAppDispatch();

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  const [timezone, settimezone] = useState();
  const [name, setname] = useState();
  const [identifier, setidentifier] = useState();
  const [code, setcode] = useState();
  const [locationtype, setlocationtype] = useState();
  const [location_time_zoen, setlocation_time_zoen] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [province_state, setprovince_state] = useState();
  const [zipcode, setzipcode] = useState();
  const [locationphonenumber, setlocationphonenumber] = useState();
  const [rental, setrental] = useState();
  const [rental_contact_person, setrental_contact_person] = useState();
  const [rental_contact_number, setrental_contact_number] = useState();
  const [rental_rate_monthly, setrental_rate_monthly] = useState();
  const [service_class_type, setservice_class_type] = useState();
  const [rental_agreement, setrental_agreement] = useState();
  const [is_Active, setis_Active] = useState(true);
  const [dispalyError,] = useState("");
  const [dispalyAlert,] = useState("");

  const isFetchingLocation = useAppSelector((state) => state.demo.isFetchingLocation);
  const isFetchingLocationError = useAppSelector((state) => state.demo.isFetchingLocationError);
  
  const handleAddStudent = () => {
    const newLocation: any = {
        time_zone: timezone,
        name: name,
        identifier: identifier,
        code: code,
        location_type: locationtype,
        Location_Time_zone: location_time_zoen,
        address: address,
        city: city,
        province_state: province_state,
        zip_code: zipcode,
        location_phone_number: locationphonenumber,
        rental: rental,
        rentnal_contact_person: rental_contact_person,
        rental_contact_number: rental_contact_number,
        rental_rate_monthly: rental_rate_monthly,
        service_class_type: service_class_type,
        rental_agreement: rental_agreement,
        is_Active: is_Active,
        school: 1,

    };

    if (!!props?.student) {
        dispatch(updateLocation({id: props?.student?.id, ...newLocation}));
        return;
    }

    dispatch(saveLocation(newLocation));
  };

  useEffect(() => {
    if (isFetchingLocation === "error" && !!isFetchingLocationError) {
        props?.onDisplayError(isFetchingLocationError);
        setTimeout (() => {
            props?.onDisplayError("");
            dispatch(setIsFetchingLocationError(undefined));
        }, 6000);
        return;
    }
    if (isFetchingLocation === "success") {
        document.getElementsByTagName("form")[1].reset();

        props?.onDisplayAlert("New location has been added.");
        setTimeout (() => {
            props?.onDisplayAlert("");
            dispatch(setIsFetchingLocation('idle'));
            dispatch(fetchLocation());
        }, 6000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingLocation, isFetchingLocationError, props]);

    useEffect(() => {
    console.log("check useffect for adding student");
        if (!!props?.student) {
            setname(props?.student?.name);
            setidentifier(props?.student?.identifier);
            setcode(props?.student?.code);
            setlocationtype(props?.student?.location_type);
            setlocation_time_zoen(props?.student?.Location_Time_zone);
            setaddress(props?.student?.address);
            setcity(props?.student?.city);
            setprovince_state(props?.student?.province_state);
            setzipcode(props?.student?.zip_code);
            setlocationphonenumber(props?.student?.location_phone_number);
            setrental(props?.student?.rental);
            setrental_contact_person(props?.student?.rentnal_contact_person);
            setrental_contact_number(props?.student?.rental_contact_number);
            setrental_rate_monthly(props?.student?.rental_rate_monthly);
            setservice_class_type(props?.student?.service_class_type);
            setrental_agreement(props?.student?.rental_agreement);
            setis_Active(props?.student?.is_Active);
        } else {
            setname(null);
            setidentifier(null);
            setcode(null);
            setlocationtype(null);
            setlocation_time_zoen(null);
            setaddress(null);
            setcity(null);
            setprovince_state(null);
            setzipcode(null);
            setlocationphonenumber(null);
            setrental(null);
            setrental_contact_person(null);
            setrental_contact_number(null);
            setrental_rate_monthly(null);
            setservice_class_type(null);
            setrental_agreement(null);
            setis_Active(null);
        }
    }, [props?.student]);
  

  const handleCancel = () => {
    dispatch(setIsAddingLocation(false));
  };

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA" }}>
            <p style={{ width: "30%", paddingTop: "29.198px", fontSize: "25px", fontWeight: '400' }}>
                <Plus size={27} />{`${'\tAdd New Location'}`}
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
            overflow-y: auto;
        `}>
            <form>
            {(!!dispalyError && !dispalyAlert) && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
            {(!!dispalyAlert && !dispalyError) && (<AlertComponent text={dispalyAlert} variant="primary" />)}
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={name} title="LOCATION NAME" onChange={(value => setname(value))} />
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={identifier} title="IDENTIFIER" onChange={(value => setidentifier(value))} /> 
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={code} title="LOCATION CODE" onChange={(value => setcode(value))} /> 
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={locationtype} title="TYPE" onChange={(value => setlocationtype(value))} />
                </MDBCol>
                <MDBCol md="4">  
                    <RegularTextInput name="xs1" value={timezone} title="TIMEZONE" onChange={(value => settimezone(value))} />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="12">
                    <RegularTextInput
                        name="xs1" title="LOCATION TAG LINE"
                        onChange={() => {}}
                        placeholder="for e.g. We're your key to safe driving your life"
                    /> 
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Address {'&'} Contact Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="LOCATION OWNER EMAIL" onChange={() => {}} />    
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={locationphonenumber} title="CONTACT NUMBER" onChange={(value => setlocationphonenumber(value))} />  
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="6">
                    <RegularTextInput name="xs1" value={address} title="ADDRESS" onChange={(value => setaddress(value))} />    
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs1" value={city} title="CITY" onChange={(value => setcity(value))} />     
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs1" value={province_state} title="STATE" onChange={(value => setprovince_state(value))} /> 
                </MDBCol>
                <MDBCol md="2">
                    <RegularTextInput name="xs1" value={zipcode} title="ZIP CODE" onChange={(value => setzipcode(value))} />   
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Service/Class Types</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={rental} title="" onChange={(value => setrental(value))} />   
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Rental Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={rental_contact_person} title="CONTACT PERSON" onChange={(value => setrental_contact_person(value))} />
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="EMAIL ADDRESS" onChange={() => {}} /> 
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" value={rental_contact_number} title="CONTACT NUMBER" onChange={(value => setrental_contact_number(value))} /> 
                </MDBCol>
                <MDBCol md="4" className="mt-3">
                    <RegularTextInput name="xs1" value={rental_rate_monthly} inputType="number" title="RENTAL RATE" onChange={(value => setrental_rate_monthly(value))} />
                </MDBCol>
                <MDBCol md="4" className={"mt-3"}>
                    <div className={css`text-align: left; padding-left: 0.15vh; padding-top: 3.89vh;`}><img alt="icon for attachment agreement upload" src="../assets/img/attachement-agreement-clip-icon-upload.png" />Attachment</div>
                </MDBCol>
            </MDBRow>
            </form>
        </div>
    </MainContainer>
  )
}
