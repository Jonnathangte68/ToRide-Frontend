import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DatePicker from 'react-date-picker';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import PublitioAPI from 'publitio_js_sdk';
import { css } from "@emotion/css";
// import { AddOwnerForm, setIsAddingStudent, storeStudent, StudentElement } from "../studentsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import AlertComponent from "../../../components/Alert";
import { addVehicleBackend, fetchVehicle, setIsFetchingVehicle, setIsFetchingVehicleError, updateVehicle } from "../../Demo/demoSlice";
import RegularTextInput from "../../../components/TextInput/RegularTextInput";
import moment from "moment";
import SelectBox from "../../../components/SelectBox";
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

  const { height } = useWindowDimensions();
  const HEADER_SPACE = ((height+500)*10)/100;

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [miles, setMiles] = useState("");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [color, setColor] = useState("");
  const [service_date, setServiceDate] = useState<Date>();
  const [insurance_date, setInsuranceDate] = useState<Date>();
  const [oil_change_due_date, setOilChangeDueDate] = useState<Date>();
  const [inspection_due_date, setInspectionDueDate] = useState<Date>();
  const [tire_rotation_due_date, setTireRotationDueDate] = useState<Date>();
  const [profilePic, setProfilePic] = useState({ id: null, url_thumbnail: "../assets/img/add-vehicle-photo-select.png" });
  const [dispalyError,] = useState("");
  const [dispalyAlert,] = useState("");

  const isFetchingVehicle = useAppSelector((state) => state.demo.isFetchingVehicle);
  const isFetchingVehicleError = useAppSelector((state) => state.demo.isFetchingVehicleError);
  const user = useAppSelector((state) => state.demo.userlogin);

  console.log("user info", user);

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  const formatDate = (value) => moment(value).format('YYYY-MM-DD').toString();
  
  const handleAddVehicle = () => {
    console.log("handleAddVehicle");
    console.log("file data", profilePic);

    publitio.call(`/files/update/${profilePic?.id}`, 'PUT', {
        id: `vehicle_profile_picture_${plate}_${user?.username}`,
        title: `vehicle_profile_picture_${plate}_${user?.username}`,
        description: `vehicle_profile_picture_${plate}_${user?.username}`,
        tags: `vehicle,profile_picture,${plate},${user?.username}`,
        privacy: '1',
        option_download: '1'
      }).then(data => { console.log(data) })
        .catch(error => { console.log(error) });

    const newVehicle: any = {
        name: name,
        vehicle_type: type,
        odometer: miles,
        vin: vin,
        plate: plate,
        model: model,
        make: make,
        color: color,
        service_date: formatDate(service_date),
        insurance_date: formatDate(insurance_date),
        oil_change_due_date: formatDate(oil_change_due_date),
        inspection_due_date: formatDate(inspection_due_date),
        tire_rotation_due_date: formatDate(tire_rotation_due_date),
        location: 1
    };
    console.log("adding vehicle", newVehicle);

    if (!!props?.student?.id) {
        dispatch(updateVehicle(newVehicle));
        return;
    }

    dispatch(addVehicleBackend(newVehicle));
  };

  useEffect(() => {
    if (isFetchingVehicle === "error" && !!isFetchingVehicleError) {
        console.log("is fetching class error");
        props?.onDisplayError(isFetchingVehicleError);
        setTimeout (() => {
            props?.onDisplayError("");
            dispatch(setIsFetchingVehicleError(undefined));
        }, 6000);
        return;
    }
    if (isFetchingVehicle === "success") {
        console.log("is fetching class success");
        document.getElementsByTagName("form")[1].reset();

        props?.onDisplayAlert("New vehicle has been added.");
        setTimeout (() => {
            props?.onDisplayAlert("");
            dispatch(setIsFetchingVehicle('idle'));
            dispatch(fetchVehicle());
        }, 6000);
    }
  }, [dispatch, isFetchingVehicle, isFetchingVehicleError, props]);

  useEffect(() => {
    console.log("check useffect for adding student");
  if (!!props?.student) {
    setName("");
    setType(props?.student?.v_type);
    setMiles(props?.student?.odo_meter);
    setVin(props?.student?.vin);
    setPlate(props?.student?.license_plate_id);
    setModel(props?.student?.v_model);
    setMake("");
    setColor(props?.student?.color);
    setServiceDate(props?.student?.service_date);
    setOilChangeDueDate(props?.student?.oil_change_date);
    setInspectionDueDate(props?.student?.inspection_date);
    setTireRotationDueDate(props?.student?.tire_rotation_date);
      
      console.log("check if photo is set.");
      if (!!props?.student?.photo) {
          console.log("photo value", props?.student?.photo);
          setProfilePic({ id: null, url_thumbnail: props?.student?.photo });
      }
  } else {
    setName("");
    setType("");
    setMiles("");
    setVin("");
    setPlate("");
    setModel("");
    setMake("");
    setColor("");
    setServiceDate(null);
    setOilChangeDueDate(null);
    setInspectionDueDate(null);
    setTireRotationDueDate(null);
  }
}, [props?.student]);



  const handleCancel = () => {
    // dispatch(setIsAddingStudent(false));
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

  return (
    <MainContainer>
        <Header style={{ borderBottom: "1px solid #DCE3EA", marginTop: "3.756vh" }}>
            <p style={{ width: "60%", paddingTop: "8.75px", fontSize: "25px", fontWeight: '500', textAlign: "left" }}>
                <Plus size={27} />{`${'\tAdd New Vehicles'}`}
            </p>
            <div style={{ width: "40%", paddingTop: "1.5px" }}>
                <InputButton2
                    name="add_student"
                    title="Save"
                    color="red"
                    class={css`background-color: #FF4311!important; color: white; font-weight: bold; border-radius: 6px;`}
                    onClick={handleAddVehicle}
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
            {!!dispalyError && (<AlertComponent text={JSON.stringify(dispalyError)} variant="danger" />)}
            {!!dispalyAlert && (<AlertComponent text={dispalyAlert} variant="primary" />)}
            <form>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="3">
                    <div>
                        <img
                            alt="student add profile pic"
                            src={profilePic?.url_thumbnail}
                            style={{ borderRadius: "50%", width: "14.5vh", height: "14.5vh" }}
                            onClick={handleClickProfielPic}
                        />
                        <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ display: "none" }}></input>
                    </div>
                </MDBCol>
                <MDBCol md="6">
                    <RegularTextInput name="xs1" title="VEHICLE NAME" onChange={(value => setName(value))} containerStyle={{ marginTop: "3vh", marginBottom: "3vh" }} />  
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <SelectBox id="vehicle_type" title="TYPE" default={{ id: "car", name: "Car" }} options={[{ id: "motorcycle", name: "Motorcycle" }, { id: "mobo", name: "Mobo" }, { id: "truck", name: "Truck" }]} onChange={value => setType(value)}/>
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="VIN" value={vin} onChange={(value => setVin(value))} />  
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="LICENSE PLATE ID" value={plate} onChange={(value => setPlate(value))} />  
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="MAKE" value={make} onChange={(value => setMake(value))} containerStyle={{ marginTop: "2vh" }} />  
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="MODEL" value={model} onChange={(value => setModel(value))} containerStyle={{ marginTop: "2vh" }} />  
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="COLOR" value={color} onChange={(value => setColor(value))} containerStyle={{ marginTop: "2vh" }} />  
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Other Details</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <DatePicker value={service_date} onChange={(value => setServiceDate(value))} />  
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={insurance_date} onChange={(value => setInsuranceDate(value))} />  
                    {/* <RegularTextInput name="xs1" title="INSURANCE DUE DATE" onChange={(value => setInsuranceDate(value))} />   */}
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker />  
                    {/* <RegularTextInput name="xs1" title="REGISTRATION DUE DATE" onChange={() => {}} />   */}
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={inspection_due_date} onChange={(value => setInspectionDueDate(value))} />  
                    {/* <RegularTextInput name="xs1" title="INSPECTION DUE DATE" onChange={(value) => setInspectionDueDate(value)} containerStyle={{ marginTop: "2vh" }} />   */}
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={oil_change_due_date} onChange={(value => setOilChangeDueDate(value))} />  
                    {/* <RegularTextInput name="xs1" title="OIL CHANGE DUE DATE" onChange={(value => setOilChangeDueDate(value))} containerStyle={{ marginTop: "2vh" }} />   */}
                </MDBCol>
                <MDBCol md="4">
                    <DatePicker value={tire_rotation_due_date} onChange={(value => setTireRotationDueDate(value))} />  
                    {/* <RegularTextInput name="xs1" title="TIRE ROTATION DUE DATE" onChange={(value => setTireRotationDueDate(value))} containerStyle={{ marginTop: "2vh" }} />   */}
                </MDBCol>
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="MILES" value={miles} onChange={(value => setMiles(value))} containerStyle={{ marginTop: "2vh" }} />  
                </MDBCol>
            </MDBRow>
            <TextTile5 style={{ paddingBottom: "22px", paddingTop: "15px" }}>Locations</TextTile5>
            <MDBRow className="mt-3 mb-3">
                <MDBCol md="4">
                    <RegularTextInput name="xs1" title="LOCATION" onChange={() => {}} containerStyle={{ marginTop: "2vh" }} />  
                </MDBCol>
            </MDBRow>
            </form>
        </div>
    </MainContainer>
  )
}
