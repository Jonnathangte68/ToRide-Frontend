import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import React, { useEffect, useState } from "react";
import GrayHorizontalLine from "../../components/GeometricShapes/GrayHorizontalLine";
import StudentHeader from "../../components/Headers/StudentHeader";
import PublitioAPI from 'publitio_js_sdk';
import 'react-circular-progressbar/dist/styles.css';
import COLORS from "../../utils/colors";
import { getAuthHeader } from "../../utils/getAuthHeaders";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchImageVault, fetchStudent } from "../Demo/demoSlice";
import TextInput from "../../components/TextInput/TextInput";
import InputButton2 from "../../components/InputButton2/InputButton2";
import InputGroupPrepend from "../../components/InputGroupPrepend/InputGroupPrepend";
import InputDropdown from "../../components/InputSelect/InputSelect";
import { range } from "lodash";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../utils/globals";
import { PencilSquare } from "react-bootstrap-icons";
import EditStudentDetailsModal from "../../components/EditStudentDetailsModal";
import RequireAuth from "../Auth/RequireAuth";

const MainContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 9vh;
`;

const TextTile = styled.p`
font-size: 23px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 123%;
  color: rgba(60, 46, 60, 1);
  width: 400px;
  word-wrap: break-word;
  margin-bottom: 4px;
`;

const TextTile5 = styled.p`
font-size: 18px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  line-height: 123%;
  color: rgba(60, 46, 60, 1);
  width: 100%;
  word-wrap: break-word;
`;

const Text391 = styled.p`
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 500;
  line-height: 160%;
  color: rgba(99, 88, 99, 1);
  word-wrap: break-word;
  color: #B0B8C2;
`;

const TextTile327 = styled.p`
    font-size: 14.15px;
    font-family: Open Sans, sans-serif;
    font-weight: bold;
    line-height: 123%;
    color: #757C85;
    width: 400px;
    word-wrap: break-word;
    margin-bottom: 4px;
`;

const MenuOptionText = styled.p`
font-size: 18px;
font-family: Open Sans, sans-serif;
font-weight: 400;
line-height: 160%;
color: #000;
word-wrap: break-word;
`;

const ContainerSettingsOptions = styled.div`
    border: 1px solid #DCE3EA;
    border-radius: 6px;
    padding: 15px 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextTruncated = styled.p`
width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const StudentProfile = () => {
  const dispatch = useAppDispatch();

  const userLogged = useAppSelector((state) => state.demo.userlogin);
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  const students = useAppSelector((state) => state.demo.students);
  const [optionSelected, setOptionSelected] = useState<string>("profile");

  const [profilePic, setProfilePic] = useState({ id: null, url_thumbnail: "../assets/img/add-vehicle-photo-select.png" });
  const [addressFieldsElements,] = useState<JSX.Element[]>();
  const [showEditStudentDetailsModal, setShowEditStudentDetailsModal] = useState(false);
  const [profilePictureDefault, setProfilePictureDefault] = useState("../assets/img/picture-upload-picture.png");
  const [student, setStudent] = useState<any>(undefined);

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  const handleSettingsOptionView = (value: string) => {
    if (value === "bank_account") {
      const head = Object.values(getAuthHeader(userLogged?.access))[0];
      const req = new XMLHttpRequest();
      req.open("GET", 'https://goldfish-app-wuj8y.ondigitalocean.app/api/payments/account/', true);
      req.setRequestHeader('Authorization', head);
      req.send();

      return;
    }
  setOptionSelected(value);
};

const getTimeOptions = () => {
  const values: string[] = [];
  for (let time in range( 0, 24, 1 )) {
    values.push(`${parseInt(time) > 12 ? (parseInt(time)-12) : parseInt(time)}:00 ${parseInt(time) > 12 ? "PM" : "AM"}`);
  }
  return values;
};

const handleClickProfielPic = () => {
  console.log("handleClickProfielPic");
const element = document.getElementById('upload');
console.log("element after get", element);
element?.click();
};

const handlePictureUpload = (data) => {
  console.log(data);

  // do not replace just update
  if (!!profilePic?.id) {
    publitio.call(`/files/update/${data?.id}`, 'PUT', {
      id: `student_profile_picture_${student?.mobile_number}`,
      title: `student_profile_picture_${student?.mobile_number}`,
      description: `student_profile_picture_${student?.mobile_number}`,
      tags: `student,profile_picture,${student?.mobile_number}`,
      privacy: '1',
      option_download: '1'
    }).then(d => {
      setProfilePic(d);
    })
      .catch(error => { console.log(error) });
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

useEffect(() => {
  dispatch(fetchStudent());
  dispatch(fetchImageVault());
}, [dispatch]);


useEffect(() => {
  if (!!profilePic) {
    setProfilePictureDefault(profilePic?.url_thumbnail);
  } else {
    setProfilePictureDefault("../assets/img/picture-upload-picture.png");
  }
}, [profilePic]);

useEffect(() => {
  console.log("set image for user profile after save.");
  console.log("image list", imageList);
  if (!!student) {
    console.log("student after fetch", student);
    console.log("key-to-search", `student_profile_picture_${student?.['mobile_number']}`);
  }
  if (!!student && !!student['mobile_number'] && !!userLogged) {
    const pictureG = imageList?.filter(f => {
      if (f.title === `student_profile_picture_${student['mobile_number']}`) {
          return true;
      }
      return false;
    });
    setProfilePic((!!pictureG && pictureG.length > 0 && !!pictureG?.[pictureG.length - 1]?.url_thumbnail)
      ? pictureG?.[pictureG.length - 1]
      : { id: null, url_thumbnail: "../assets/img/picture-upload-picture.png" }
    );
  }
}, [imageList, student, userLogged]);

useEffect(() => {
  setStudent(students.filter(stud => stud?.student?.email === userLogged?.username)[0]);
}, [students, userLogged?.username]);

console.log("PROFILE PICTURE FOR UPDATE STUDENT", profilePic);

const handleEditStudentDetails = () => setShowEditStudentDetailsModal(true);

const handleCloseStudentDetailsModal = () => setShowEditStudentDetailsModal(false);

const renderEditProfile = () => (
  <>
    <MDBRow>
      <MDBCol md="12" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
        <MDBRow>
          <MDBCol md="10">
            <p className={css`
            padding: 2vh 2vh 2vh 5vh;
            font-size: 1.72rem;
            font-weight: 500;
            height: 9.5vh;
          `}>Basic Informations</p>
          </MDBCol>
          <MDBCol md="2">
            <PencilSquare
              style={{ color: COLORS.RED, fontSize: "1.72rem", marginRight: "0px", marginTop: "2.55vh" }}
              onClick={handleEditStudentDetails}
            />
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBRow className={css`padding-bottom: 1.5vh`}>
        <MDBCol md="3" className={css`text-align: center;`}>
          <div>
              <img
                  alt="student add profile pic"
                  src={profilePictureDefault}
                  style={{ position: "relative", top: "5vh", borderRadius: "50%", marginBottom: "-30px", width: "14.5vh", height: "14.5vh", border: `8px double ${COLORS.ORANGE}` }}
                  onClick={handleClickProfielPic}
              />
              <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ display: "none" }}></input>
              <TextTruncated style={{ textAlign: "center", marginTop: "52%" }}>
                <b style={{ color: COLORS.SECONDARY_COLOR }}>{`${student?.first_name} ${student?.last_name}`}</b><br/><span style={{ color: COLORS.SECONDARY_COLOR }}>{`${!!student?.city ? student?.city : ""}${!!student?.country ? "," : ""}${!!student?.country ? student?.country : ""}`}</span>
              </TextTruncated>
          </div>
        </MDBCol>
        <MDBCol md="4">
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>First Name: </span>{!!student ? student?.first_name : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>Last Name: </span>{!!student ? student?.last_name : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>Mobile Number: </span>{!!student ? student?.mobile_number : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>Email Address: </span>{!!student ? student?.student?.email : ""}</TextTruncated>
        </MDBCol>
        <MDBCol md="5">
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>Adresse: </span>{!!student ? student?.address : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>City: </span>{!!student ? student?.city : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>State: </span>{!!student ? student?.state : ""}</TextTruncated>
          <TextTruncated style={{ textAlign: "left", color: COLORS.SECONDARY_COLOR, fontSize: "1.22rem", paddingTop: "2vh", paddingBottom: "2vh" }}><span style={{ fontWeight: "bold" }}>Zip Code: </span>{!!student ? student?.zip_code : ""}</TextTruncated>
        </MDBCol>
      </MDBRow>
      <MDBCol md="12" className={css`border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS}; border-top: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
        <p className={css`
          padding: 2vh 2vh 2vh 5vh;
          font-size: 1.72rem;
          font-weight: 500;
          height: 9.5vh;
        `}>Payments Remaining</p>
      </MDBCol>
      <MDBCol md="12">
        <MDBRow className={css`padding-top: 2vh; padding-bottom: 2vh; margin-right: 8vh; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
          <MDBCol md="3">
            <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Title</p>
          </MDBCol>
          <MDBCol md="2">
            <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Date</p>
          </MDBCol>
          <MDBCol md="3">
            <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Class Status</p>
          </MDBCol>
          <MDBCol md="2">
            <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Payment Remaining</p>
          </MDBCol>
          <MDBCol md="2">
            <p style={{ textAlign: "center", color: COLORS.ORANGE, fontWeight: "bold", fontSize: "1.18rem" }}>Days Remaining</p>
          </MDBCol>
        </MDBRow>
        <div style={{ height: "35vh", overflowY: "auto" }}>
          {["1","2","3","4","5","6","7"].map(payment => (
            <MDBRow className={css`padding-top: 2vh; padding-bottom: 2vh; margin-right: 8vh; border-bottom: 1px solid ${COLORS.GRAY_ELEMENTS};`}>
              <MDBCol md="3">
                <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>Basic Session No.1</p>
              </MDBCol>
              <MDBCol md="2">
                <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontSize: "1.18rem" }}>Jul 21, 2021</p>
              </MDBCol>
              <MDBCol md="3">
                <p style={{ textAlign: "center", color: COLORS.GREEN_LIGHT, fontSize: "1.18rem" }}>Completed</p>
              </MDBCol>
              <MDBCol md="2">
                <p style={{ textAlign: "center", color: COLORS.SECONDARY_COLOR, fontWeight: "bold", fontSize: "1.18rem" }}>€100.00</p>
              </MDBCol>
              <MDBCol md="2">
                <p style={{ textAlign: "center", color: COLORS.ORANGE, fontWeight: "bold", fontSize: "2rem" }}>2</p>
              </MDBCol>
            </MDBRow>
          ))}
        </div>
      </MDBCol>
    </MDBRow>
  </>
);

const renderContent = () => (
  <>
    <StudentHeader />
    <MainContainer>
      <div className={css`
          width: 100%;
          height: 100%;
          padding: 0vh 0vh;
      `}>
      <MDBRow className={css`height: 100%; minHeight: 100%;`}>
          <MDBCol md="4" className={css`border-right: 1px solid ${COLORS.GRAY_ELEMENTS}; height: 100%; padding-top: 3.33vh;`}>
              <MDBCol md="12">
                  <TextTile style={{ fontSize: "2.11rem" }}>Settings</TextTile>
                  <Text391 style={{ fontSize: "1.11rem" }}>Update and manage your account</Text391>
              </MDBCol>
              <MDBCol md="12" className="mt-5 mb-5">
                  <TextTile327>PERSONAL INFORMATION</TextTile327>
                  <MDBRow>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img
                              src="../assets/img/Other-Iconone-user-setting-edit-profile.png"
                              alt="edit profile"
                          />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("profile")}>Edit Profile</MenuOptionText>
                      </MDBCol>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img src="../assets/img/Locklock-change-password.png" alt="edit profile" />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("change_password")}>Change Password</MenuOptionText>
                      </MDBCol>
                  </MDBRow>
              </MDBCol>
              <MDBCol md="12" className="mt-5 mb-5">
                  <TextTile327>OTHERS</TextTile327>
                  <MDBRow>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img src="../assets/img/Other-Iconinfo-other-about-us.png" alt="edit profile" onClick={() => handleSettingsOptionView("about_us")} />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("about_us")}>About us</MenuOptionText>
                      </MDBCol>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <i className={"fa fa-credit-card "+css`color: ${COLORS.GRAY_ICONS}; width: 5.22vh; height: 4.1vh; margin-left: 0.39vh;`} onClick={() => handleSettingsOptionView("bank_account")} />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("bank_account")}>Bank Account</MenuOptionText>
                      </MDBCol>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img src="../assets/img/contact-us-settings.png" alt="edit profile" onClick={() => handleSettingsOptionView("contact_us")} />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("contact_us")}>Contact Us</MenuOptionText>
                      </MDBCol>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img src="../assets/img/privacy-policy-settings.png" alt="edit profile" onClick={() => handleSettingsOptionView("privacy_policy")} />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("privacy_policy")}>Privacy Policy</MenuOptionText>
                      </MDBCol>
                      <MDBCol md="2" className="mt-1 mb-1">
                          <img src="../assets/img/terms-and-conditions-settings.png" alt="edit profile" />
                      </MDBCol>
                      <MDBCol md="10" className="mt-1 mb-1">
                          <MenuOptionText onClick={() => handleSettingsOptionView("terms")}>Terms {'&'} Conditions</MenuOptionText>
                      </MDBCol>
                  </MDBRow>
              </MDBCol>
          </MDBCol>
          <MDBCol md="8">
              {(optionSelected === "profile") && renderEditProfile()}
              {(optionSelected === "change_password") &&
              (<>
                  <MDBCol md="12">
                      <TextTile5>Change Password</TextTile5>
                  </MDBCol>
                  <ContainerSettingsOptions>
                      <Text391>Keep your data safe by creating a password that is complex and long enough. It should be easy for you to remember but hard for other to guess.</Text391>
                      <TextTile5></TextTile5>
                      <MDBRow className="mt-3 mb-3">
                          <MDBCol md="9">
                              <TextInput name="current_password" title="CURRENT PASSWORD" />
                          </MDBCol>
                      </MDBRow>
                      <MDBRow className="mt-3 mb-3">
                          <MDBCol md="9">
                              <TextInput name="new_password" title="NEW PASSWORD" />       
                          </MDBCol>
                      </MDBRow>
                      <MDBRow className="mt-3 mb-3">
                          <MDBCol md="9">
                              <TextInput name="confirm_password" title="CONFIRM PASSWORD" />
                          </MDBCol>
                      </MDBRow>
                  </ContainerSettingsOptions>
                  <InputButton2 name="send_form_submit" title="Save Changes" color="dark" />
              </>)}
              {(optionSelected === "company_details") && (
                  <>
                      <MDBCol md="12">
                          <TextTile5>Edit Profile</TextTile5>
                      </MDBCol>
                      <ContainerSettingsOptions>
                          <TextTile5 style={{ borderBottom: "1px solid #DCE3EA", paddingBottom: "22px" }}>Company Details</TextTile5>
                          <MDBCol md="12" className="mt-3 mb-3">
                              <img
                                  alt="upload for your profile user"
                                  src="../assets/img/photo-edit-profile-5219768.png"
                                  style={{ marginLeft: "-20px" }}
                              />
                          </MDBCol>
                          <MDBRow className="mt-3 mb-3">
                              <MDBCol md="6">
                                  <TextInput name="company_name" title="COMPANY NAME" />    
                              </MDBCol>
                              <MDBCol md="6">
                                  <TextInput name="registration_number" title="REGISTRATION NUMBER" />
                              </MDBCol>
                          </MDBRow>
                          <MDBRow className="mt-3 mb-3">
                              <MDBCol md="6">
                                  <TextInput name="email_address" title="EMAIL ADDRESS" />    
                              </MDBCol>
                              <MDBCol md="6">
                                  <TextInput name="mobile_number" title="MOBILE NUMBER" />
                              </MDBCol>
                          </MDBRow>
                          <div style={{ paddingBottom: "4.25vh" }}>
                              <p className={css`
                                  margin-top: 2vh;
                                  margin-bottom: 2vh;
                              `}>
                                  Business Hours
                              </p>
                              <GrayHorizontalLine />
                              <table className="dropdown-custom-select-business-hours">
                                  <tr>
                                  <td>
                                      <InputDropdown dropdownTitle="From" onSelect={() => { } } options={getTimeOptions()} children={undefined} style={{ backgroundColor: COLORS.GRAY_INPUT }} />
                                  </td>
                                  <td>
                                      <InputDropdown dropdownTitle="To" onSelect={() => { } } options={getTimeOptions()} children={undefined} />
                                  </td>
                                  </tr>
                              </table>
                          </div>
                          <GrayHorizontalLine />
                          <div className={css`
                              display: flex;
                              flex-wrap: wrap;
                              margin-top: 3.5vh;
                              margin-right: 3.85vh;
                          `}>
                              {(!!addressFieldsElements && addressFieldsElements.length > 0) && (addressFieldsElements.map((field) => field))}
                          </div>
                          <div style={{ marginRight: "3.85vh", paddingBottom: "4.25vh" }}>
                          <p className={css`
                              margin-top: 2vh;
                              margin-bottom: 2vh;
                          `}>
                              Social Links
                          </p>
                          <>
                              <InputGroupPrepend img="../assets/img/Vectorimg-google-prepend.png" containerStyle={{ width: "45%" }} placeholder="https://" />
                              <InputGroupPrepend img="../assets/img/Vectorimg-fb-prepend.png" containerStyle={{ width: "45%", marginTop: "0.65vh" }} placeholder="https://" />
                              <InputGroupPrepend img="../assets/img/Vectorimg-twitter-prepend.png" containerStyle={{ width: "45%", marginTop: "0.65vh" }} placeholder="https://" />
                          </>
                          </div>
                      </ContainerSettingsOptions>
                      {/* <InputButton2 name="send_form_submit" title="Save Changes" color="dark" /> */}
                  </>
              )}
              {(optionSelected === "about_us") && (
                  <>
                      <MDBCol md="12">
                          <br/>
                          <img alt="about us default no info" src="../assets/img/about-us-empty-pane.png" />
                      </MDBCol>
                  </>
              )}
              {(optionSelected === "contact_us") && (
                  <>
                      <MDBCol md="12">
                          <TextTile5>Contact Us</TextTile5>
                      </MDBCol>
                      <img alt="contact us phone number +3587860506010" src="../assets/img/misc -plancontact-us-number-option.png" />
                      <MDBCol md="12">
                          <br/>
                          <TextTile5>How can we help?</TextTile5>
                          <br/>
                          <Text391>This privacy policy describes how Substance collects, uses and discloses information, and what choices you have with respect to that information.</Text391>
                          <br/>
                          <Text391>When we refer to "Substance", we mean the substance entity that will act as the controller or processor of your information, as explained in more detail in the "Identifying the data Controller and Processor" section bellow.</Text391>
                          <br/>
                      </MDBCol>
                      <MDBCol md="12">
                          <TextTile5>Contact Us</TextTile5>
                          <br/>
                          <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                          <br/>
                      </MDBCol>
                      <MDBCol md="12">
                          <TextTile5>Book a Demo</TextTile5>
                          <br/>
                          <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                          <br/>
                      </MDBCol>
                      <MDBCol md="12">
                          <TextTile5>Get Inspired</TextTile5>
                          <br/>
                          <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                          <br/>
                      </MDBCol>
                      <MDBCol md="12">
                          <TextTile5>Become a Partner</TextTile5>
                          <br/>
                          <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                          <br/>
                      </MDBCol>
                  </>
              )}
              {(optionSelected === "privacy_policy") && (
                  <>
                      <MDBCol md="12">
                          <TextTile5>Privacy Policy</TextTile5>
                      </MDBCol>
                      <MDBCol md="12">
                          <TextTile5 style={{ fontSize: "1.65rem", marginTop: "3.15vh", marginBottom: "0.55vh" }}>Effective: August 5, 2021</TextTile5>
                          <MDBCol md="12">
                              <br/>
                              <TextTile5>How can we help?</TextTile5>
                              <br/>
                              <Text391>This privacy policy describes how Substance collects, uses and discloses information, and what choices you have with respect to that information.</Text391>
                              <br/>
                              <Text391>When we refer to "Substance", we mean the substance entity that will act as the controller or processor of your information, as explained in more detail in the "Identifying the data Controller and Processor" section bellow.</Text391>
                              <br/>
                          </MDBCol>
                          <TextTile5 style={{ fontSize: "1.15rem", marginTop: "3.15vh", marginBottom: "0.55vh" }}>Table of Contents:</TextTile5>
                          <ul className={css`
                              color: #FF7F4C;
                          `}>
                              <li>Aplicability of this Privacy Policy</li>
                              <li>Information We Collect and Receive</li>
                              <li>How We Use Information</li>
                              <li>Data Retention</li>
                              <li>How We Share and Disclose Information</li>
                              <li>Security</li>
                              <li>Age Limitations</li>
                              <li>Changes to this Privacy Policy</li>
                              <li>International Data Transfers</li>
                              <li>Data Protection Officer</li>
                              <li>Identifiying the Data Controller and Processor</li>
                              <li>Your Rights</li>
                              <li>California Privacy Rights</li>
                              <li>Data Protection Authority</li>
                              <li>Contacting Slack</li>
                          </ul>
                          <MDBCol md="12">
                              <TextTile5>Aplicability of this Privacy Policy</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Information We Collect and Receive</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>How We Use Information</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Data Retention</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>How We Share and Disclose Information</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Security</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Age Limitations</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Changes to this Privacy Policy</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>International Data Transfers</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Data Protection Officer</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <TextTile5>Identifiying the Data Controller and Processor</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus.</Text391>
                              <br/>
                          </MDBCol>
                          <br/>
                      </MDBCol>
                  </>
              )}
              {(optionSelected === "terms") && (
                  <>
                      <MDBCol md="12">
                          <TextTile5>Terms {'&'} Conditions</TextTile5>
                      </MDBCol>
                      <MDBCol md="12">
                          <MDBCol md="12">
                              <br/>
                              <TextTile5>Privacy Policy</TextTile5>
                              <br/>
                              <Text391>This privacy policy describes how Substance collects, uses and discloses information, and what choices you have with respect to that information.</Text391>
                              <br/>
                              <Text391>When we refer to "Substance", we mean the substance entity that will act as the controller or processor of your information, as explained in more detail in the "Identifying the data Controller and Processor" section bellow.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <br/>
                              <TextTile5>Click {'&'} Collect Policy</TextTile5>
                              <br/>
                              <Text391>This privacy policy describes how Substance collects, uses and discloses information, and what choices you have with respect to that information.</Text391>
                              <br/>
                              <Text391>When we refer to "Substance", we mean the substance entity that will act as the controller or processor of your information, as explained in more detail in the "Identifying the data Controller and Processor" section bellow.</Text391>
                              <br/>
                          </MDBCol>
                          <MDBCol md="12">
                              <br/>
                              <TextTile5>Order Cancellation Policy</TextTile5>
                              <br/>
                              <Text391>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales dolor eu orci cursus, tristique porta libero hendrerit. Suspendisse vestibulum metus non lobortis tempus. Quisque non cursus felis, sit amet lacinia sem. Proin tortor purus, mollis non pulvinar at, vestibulum nec erat. Aliquam erat volutpat. Suspendisse vitae purus eu arcu auctor mollis vel quis orci. Praesent blandit metus vitae lacus pellentesque, in volutpat arcu vehicula. Curabitur suscipit dictum urna sed efficitur. Sed fermentum sed nisi at lacinia. Quisque vitae vulputate sapien. Vivamus porttitor nulla a ligula congue, at imperdiet nunc bibendum. Donec sollicitudin magna sed nunc mollis pulvinar.</Text391>
                              <br/>
                          </MDBCol>
                      </MDBCol>
                  </>
              )}
              {(optionSelected === "bank_account") && (
                  <>
                      {/* <InputButton2 name="add_bank_account" title="Add bank account" color="primary"/> */}
                  </>
              )}
            </MDBCol>
        </MDBRow>
      </div>
    </MainContainer>
    <EditStudentDetailsModal
      show={showEditStudentDetailsModal}
      profilePicture={profilePic}
      details={student}
      onClose={handleCloseStudentDetailsModal}
    />
  </>
);

  return (
    <RequireAuth>
      {renderContent()}
    </RequireAuth>
  );
};

export default StudentProfile;