import styled from "@emotion/styled";
import { MDBCol, MDBRow } from "mdbreact";
import MainMenu from "../../../components/MainMenu/MainMenu";
import { css } from "@emotion/css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import TextInput from "../../../components/TextInput/TextInput";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputDropdown from "../../../components/InputSelect/InputSelect";
import COLORS from "../../../utils/colors";
import { range } from "lodash";
import InputGroupPrepend from "../../../components/InputGroupPrepend/InputGroupPrepend";
import AddLocation from "../../../components/AddLocation/AddLocation";
import GrayHorizontalLine from "../../../components/GeometricShapes/GrayHorizontalLine";
import { logout } from "../../Demo/demoSlice";
import { getAuthHeader } from "../../../utils/getAuthHeaders";
import PublitioAPI from "publitio_js_sdk";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../../utils/globals";

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



export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.demo.userlogin);
  const ownerProfiles = useAppSelector((state) => state.demo.ownerProfiles);
  const [optionSelected, setOptionSelected] = useState<string>("profile");
  const [profilePic, setProfilePic] = useState({ id: null, url_thumbnail: "../assets/img/photo-edit-profile-5219768.png" });
  const [addressCtr, setAddressCtr] = useState<number>(1);
  const [addressFieldsElements, setAddressFieldsElements] = useState<JSX.Element[]>();
  const [ownerFirstName, setOwnerFirstName] = useState(null);
  const [ownerLastName, setOwnerLastName] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);
  const [ownerPhone, setOwnerPhone] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [ownerCity, setOwnerCity] = useState(null);
  const [ownerState, setOwnerState] = useState(null);
  const [ownerZip, setOwnerZip] = useState(null);
  const imageList = useAppSelector((state) => state.demo.userImageVault);

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  const handleLogout = () => {
    // dispatch(logout());
    dispatch(logout());
    navigate("/sign-in", { replace: true });
  };

  const handleAddLocationRow = (event: any) => {
    event.preventDefault();
    console.log("handle add location row");
    if (addressCtr < 3) {
      let addressCtrInc = addressCtr + 1;
      console.log("new counter value", addressCtrInc);
      setAddressCtr(addressCtrInc);
      return;
    }
  };

  const setAddressFields = () => {
    const addressFieldsContainer = [];
    for (let i = 0 ; i < addressCtr ; i++) {
      let index = i + 1;
      const extraMarginTop = (index > 1) ? { marginTop: "5px" } : {};
      addressFieldsContainer.push(
        <TextInput name="address" title={`Business Location ${index}`} value="" containerStyle={{ boxSizing: 'border-box', width: '100%', ...extraMarginTop }} />
      );
    }
    setAddressFieldsElements(addressFieldsContainer);
  };

  const handleSettingsOptionView = (value: string) => {
      if (value === "bank_account") {
        // const headers = {
        //     ...HEADERS_DEFAULT.headers,
        //     ...getAuthHeader(userLogged?.access),
        //   };
        // axios.get('https://goldfish-app-wuj8y.ondigitalocean.app/api/payments/account/', { headers })
        // .then(function (response) {
        //     window.location = 'https://goldfish-app-wuj8y.ondigitalocean.app/api/payments/account/';
        // })
        // .catch(function(error) {
        //     console.log("error axios redirect ", error);
        // })
        // const cookies = new Cookies();
        // cookies.set('Authorization', getAuthHeader(userLogged?.access), { path: 'https://goldfish-app-wuj8y.ondigitalocean.app/api/payments/account/' });
        // console.log(cookies.get('Authorization')); // Pacman
        // window.location.href = 'https://goldfish-app-wuj8y.ondigitalocean.app/api/payments/account/';
        
        
        
        console.log("test auth header", Object.values(getAuthHeader(userLogged?.access))[0]);
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

  const handlePictureUpload = (data) => {
    console.log(data);

    console.log("publitio update file id ", data?.id);
  
    publitio.call(`/files/update/${data?.id}`, 'PUT', {
        id: `owner_profile_picture_${ownerPhone}`,
        title: `owner_profile_picture_${ownerPhone}`,
        description: `owner_profile_picture_${ownerPhone}`,
        tags: `owner,profile_picture,${ownerPhone}`,
        privacy: '1',
        option_download: '1'
      }).then(d => {
        setProfilePic(d);
      })
  };

  const handleClickProfielPic = () => {
        console.log("handleClickProfielPic");
    const element = document.getElementById('upload');
    console.log("element after get", element);
    element?.click();
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
    setAddressFields();
    // eslint-disable-next-line
  }, [addressCtr]);

  useEffect(() => {
      if (ownerProfiles) {
        console.log("owner info", ownerProfiles);
        const owner = ownerProfiles.filter(owprofile => owprofile.user.email === userLogged?.username)?.[0];
        if (owner) {
            setOwnerFirstName(owner?.first_name);
            setOwnerLastName(owner?.last_name);
            setOwnerEmail(owner?.user?.email);
            setOwnerPhone(owner?.mobile_number);
            setOwnerCity(owner?.city);
            setOwnerState(owner?.state);
            setOwnerZip(owner?.zip_code);
            setOwnerAddress(owner?.address);

            if (!!owner?.mobile_number) {
                console.log("is true mobile number # owner");
                console.log("list", imageList);
                const pictureG = imageList?.filter(f => {
                  if (f.title === `owner_profile_picture_${owner['mobile_number']}`) {
                      return true;
                  }
                  return false;
                });
                console.log("pciture g", pictureG);
                setProfilePic((!!pictureG && pictureG.length > 0 && !!pictureG?.[pictureG.length - 1]?.url_thumbnail)
                  ? pictureG?.[pictureG.length - 1]
                  : { id: null, url_thumbnail: "../assets/img/photo-edit-profile-5219768.png" }
                );
            }
        }
        console.log("OWNER AS", owner);
      }
  }, [ownerProfiles, imageList, userLogged?.username]);
  

  return (
    <MainContainer>
      <MainMenu />
        <div className={css`
            width: 100%;
            height: 100%;
            padding: 10vh 35vh;
        `}>
        <MDBRow>
            <MDBCol md="4">
                <MDBCol md="12">
                    <TextTile>Settings</TextTile>
                    <Text391>Update and manage your account</Text391>
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
                        <MDBCol md="2" className="mt-1 mb-1">
                            <img src="../assets/img/sr-parlementsr-parlement-company-details.png" alt="edit profile" />
                        </MDBCol>
                        <MDBCol md="10" className="mt-1 mb-1">
                            <MenuOptionText onClick={() => handleSettingsOptionView("company_details")}>Company Details</MenuOptionText>
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
                <MDBCol md="12" className="mt-5 mb-5">
                    <img src="../assets/img/log-out-button-setting.png" alt="edit profile" onClick={handleLogout}/>
                </MDBCol>
            </MDBCol>
            <MDBCol md="8">
                {(optionSelected === "profile") &&
                (
                <>
                <MDBCol md="12">
                    <TextTile5>Edit Profile</TextTile5>
                </MDBCol>
                <ContainerSettingsOptions>
                    <TextTile5 style={{ borderBottom: "1px solid #DCE3EA", paddingBottom: "22px" }}>Owner Information</TextTile5>
                    <MDBCol md="12" className="mt-3 mb-3">
                        {(profilePic?.url_thumbnail !== "../assets/img/photo-edit-profile-5219768.png") && <img
                            alt="student add profile pic"
                            src={profilePic?.url_thumbnail}
                            style={{ borderRadius: "50%", width: "14.5vh", height: "14.5vh", border: `8px double ${COLORS.ORANGE}` }}
                            onClick={handleClickProfielPic}
                        />}
                        {(profilePic?.url_thumbnail === "../assets/img/photo-edit-profile-5219768.png") && <img
                            alt="upload for your profile user"
                            src={profilePic?.url_thumbnail}
                            style={{ marginLeft: "-20px" }}
                            onClick={handleClickProfielPic}
                        />}
                        <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ display: "none" }}></input>
                    </MDBCol>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="6">
                            <TextInput name="first_name" title="FIRST NAME" value={ownerFirstName} onChange={(value) => setOwnerFirstName(value)} />    
                        </MDBCol>
                        <MDBCol md="6">
                            <TextInput name="last_name" title="LAST NAME" value={ownerLastName} onChange={(value) => setOwnerLastName(value)} />  
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="6">
                            <TextInput name="email_address" title="EMAIL ADDRESS" value={ownerEmail} onChange={(value) => setOwnerEmail(value)} />  
                        </MDBCol>
                        <MDBCol md="6">
                            <TextInput name="mobile_number" title="MOBILE NUMBER" value={ownerPhone} onChange={(value) => setOwnerPhone(value)} />  
                        </MDBCol>
                    </MDBRow>
                    <TextTile5 style={{ borderBottom: "1px solid #DCE3EA", paddingBottom: "22px" }}>Address</TextTile5>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="12">
                            <TextInput name="address" title="ADDRESS" value={ownerAddress} onChange={(value) => setOwnerAddress(value)} />  
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3 mb-3">
                        <MDBCol md="4">
                            <TextInput name="city" title="CITY" value={ownerCity} onChange={(value) => setOwnerCity(value)} />  
                        </MDBCol>
                        <MDBCol md="4">
                            <TextInput name="state" title="STATE" value={ownerState} onChange={(value) => setOwnerState(value)} />  
                        </MDBCol>
                        <MDBCol md="4">
                            <TextInput name="zip_code" title="ZIP CODE" value={ownerZip} onChange={(value) => setOwnerZip(value)} />  
                        </MDBCol>
                    </MDBRow>
                    </ContainerSettingsOptions>
                    <InputButton2 name="send_form_submit" title="Save Changes" color="dark" />
                    {/* <InputButton2 name="send_form_submit" title="Save Changes" color="dark" /> */}
                </>)}
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
                            <p style={{ marginRight: "3.85vh" }}>Business Location<AddLocation onClick={handleAddLocationRow} /></p>
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
                            <TextTile5>About us</TextTile5>
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
  )
}
