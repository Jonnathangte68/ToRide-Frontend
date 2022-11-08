import PublitioAPI from "publitio_js_sdk";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateStudent } from "../../features/Demo/demoSlice";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../utils/globals";
import InputButton from "../InputButton/InputButton";
import TextInput from "../TextInput/TextInput";

const EditStudentDetailsModal = (props: any) => {
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();

    const user = useAppSelector((state) => state.demo.userlogin);
    const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

    const handleUpdateStudent = () => {
        const profilePic = props?.profilePicture;

        if (!!profilePic) {
            publitio.call(`/files/update/${profilePic?.id}`, 'PUT', {
                id: `vehicle_profile_picture_${mobile}_${user?.username}`,
                title: `vehicle_profile_picture_${mobile}_${user?.username}`,
                description: `vehicle_profile_picture_${mobile}_${user?.username}`,
                tags: `vehicle,profile_picture,${mobile},${user?.username}`,
                privacy: '1',
                option_download: '1'
              }).then(data => { console.log(data) })
                .catch(error => { console.log(error) });
        }

        dispatch(updateStudent({
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            mobile_number: mobile,
            address: address,
            city: city,
            state: state,
            zip_code: zipCode
        }));
        return props?.onClose();
    };

    const handleShowModal = () => {
        console.log("on entered edit student details modal.");
        console.log("props details.", props?.details);
        if (props?.details) {
            setFirstName(props?.details?.first_name);
            setLastName(props?.details?.last_name);
            setEmailAddress(props?.details?.student?.email);
            setMobile(props?.details?.mobile_number);
            setAddress(props?.details?.address);
            setCity(props?.details?.city);
            setState(props?.details?.state);
            setZipCode(props?.details?.zip_code);
        }
    };
    
    return (
        <>
            <Modal
                show={props?.show}
                onHide={props?.onClose}
                backdrop="static"
                onEntered={handleShowModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput value={firstName} onChange={(value: any) => setFirstName(value)} name="first_name" title="First Name" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }} />
                    <TextInput value={lastName} onChange={(value: any) => setLastName(value)} name="last_name" title="Last Name" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={emailAddress} onChange={(value: any) => setEmailAddress(value)} name="email_address" title="Email Adresse" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={mobile} onChange={(value: any) => setMobile(value)} name="mobile" title="Mobile Number" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={address} onChange={(value: any) => setAddress(value)} name="address" title="Adresse" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={city} onChange={(value: any) => setCity(value)} name="city" title="City" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={state} onChange={(value: any) => setState(value)} name="state" title="State" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={zipCode} onChange={(value: any) => setZipCode(value)} name="zip_code" title="Zip Code" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                </Modal.Body>
                <Modal.Footer>
                <InputButton variant="light" onClick={props?.onClose} label="Cancel" containerStyle={{ width: "47.25%" }} />
                <InputButton variant="danger" label="Edit" containerStyle={{ width: "47.25%" }} onClick={handleUpdateStudent} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditStudentDetailsModal;
