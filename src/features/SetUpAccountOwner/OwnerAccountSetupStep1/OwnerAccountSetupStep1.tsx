import { css } from "@emotion/css";
import styled from "@emotion/styled";
import PublitioAPI from "publitio_js_sdk";
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import InputButton from "../../../components/InputButton/InputButton";
import TextInput from "../../../components/TextInput/TextInput";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../../utils/globals";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { fetchImageVault, updateOwnerProfile } from "../../Demo/demoSlice";
import "./style.css"

export default function OwnerAccountSetup(props: any) {
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  const updateOwnerProfileError = useAppSelector((state) => state.demo.updateOwnerProfileError);
  const isUpdatingOwnerProfile = useAppSelector((state) => state.demo.isUpdatingOwnerProfile);
  const [profilePic, setProfilePic] = useState(null);
  const [fileIDToSet, setFileIDToSet] = useState(null);
  

  const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);

  const ImageSteps = styled.img`
    position: fixed;
    left: 0;
    top: 0;
    height: ${height}px;
    max-height: ${height}px;
    width: 31.50%;
  `;

  const ContainerForm = styled.form`
    background-color: rgba(255, 255, 255, 1);
    width: 68.50%;
    height: ${height};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    margin-left: 15%;
    overflow-y: auto !important;
  `;

  const handleSubmit = () => {
    const form: HTMLFormElement | null = document.querySelector('form');
    if (!!form) {

      publitio.call(`/files/update/${fileIDToSet}`, 'PUT', {
        id: `owner_profile_image${props?.dataPreload?.user?.email}`,
        title: `owner_profile_image${props?.dataPreload?.user?.email}`,
        description: `owner_profile_image${props?.dataPreload?.user?.email}`,
        tags: `owner,profile_picture,${props?.dataPreload?.user?.email}`,
        privacy: '1',
        option_download: '1'
      }).then(data => { console.log(data) })
        .catch(error => { console.log(error) });

      let formData = new FormData(form);
      let firstName = "";
      let lastName = "";
      let phone = "";
      let address = "";
      let city = "";
      let zip = "";
      let state = "";
  
      Array.from(formData.entries(), ([key, value]) => {
        if (key === "first_name") {
          firstName = value as string;
        }
        if (key === "last_name") {
          lastName = value as string;
        }
        if (key === "mobile_number") {
          phone = value as string;
        }
        if (key === "address") {
          address = value as string;
        }
        if (key === "city") {
          city = value as string;
        }
        if (key === "zip") {
          zip = value as string;
        }
        if (key === "state") {
          state = value as string;
        }
        return true;
      });

      const updatedOwner = {
        first_name: firstName,
        last_name: lastName,
        mobile_number: phone,
        address: address,
        city: city,
        zip_code: zip,
        state: state,
      };

      console.log("debug stage 1: handle submit update owner profile");
      console.log("debug stage 1: values", updatedOwner);

      dispatch(updateOwnerProfile(updatedOwner));
    }
  };

  useEffect(() => {
    dispatch(fetchImageVault());
  }, [dispatch]);
  

  useEffect(() => {
    if (imageList) {
      console.log("a", `${props?.dataPreload?.user?.email}`);
      console.log("b", `owner_profile_image${props?.dataPreload?.user?.email}`);
      console.log("c", imageList);
      const pictureG = imageList?.filter(f => {
          console.log("verify file selected exist", `owner_profile_image${props?.dataPreload?.user?.email}`);
          // console.log("all files", imageList);
        if (f.title === `owner_profile_image${props?.dataPreload?.user?.email}`) {
            return true;
        }
        return false;
      });
      console.log("after picture search.", pictureG);
      if (!!pictureG && pictureG.length > 0) {
        setProfilePic(pictureG?.[0]?.url_thumbnail);
        console.log("ppic", pictureG?.[0]?.url_thumbnail);
      } else {
        setProfilePic(null);
      }
    }
  }, [imageList, props?.dataPreload]);

  useEffect(() => {
    if (isUpdatingOwnerProfile === "error") {
      console.log("is updating owner profile error");
      console.log(updateOwnerProfileError);
      props?.onDisplayError("Error: Please verify your details and field every required field.");
    } else if (isUpdatingOwnerProfile === "success") {
      // @ts-ignore
      props?.onDisplayAlert("Profile has been udpated.");
      return props?.onSubmit();
    }
    //eslint-disable-next-line
  }, [isUpdatingOwnerProfile]);
  

  const handlePictureUpload = (data) => {
    console.log("set this id.->>>", data);
    setFileIDToSet(data?.id);
    setProfilePic(data?.url_thumbnail);
  };

  const handleNewFileUpload = (event) => {
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

  const handleClickProfielPic = () => {
    console.log("handleClickProfielPic");
    const element = document.getElementById('upload');
    console.log("element after get", element);
    element?.click();
  };

  console.log("owner account setup step 1");
  console.log(props?.dataPreload?.user);
  
  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <ImageSteps src="../assets/img/01_Owner A/Side Patterns.png" alt="left pane navigation steps" />
      {/* <ScrollableArea> */}
        <ContainerForm>
          <div className={css`
          height: 100%;
          display: flex;
          flex-direction: row;
          padding-top: 13.5vh;
          padding-bottom: 13.5vh;
          `}>
            <div className="flex-col-hcenter">


              {/* HEAD */}


              <div className="flex-col-hcenter">

                <div className="flex-col" style={{ marginLeft: "50%" }}>
                  <div className="label-text flex-col-hstart-vstart">
                    <p className="txt-867">Step 1 of 3</p>
                    <p className="txt-6410">Owner Information</p>
                    <p className="txt-073 flex-hcenter">
                      Please enter the following details to proceed further
                    </p>
                  </div>
                  {!profilePic && (<div className="picture flex-col-hstart-vstart" style={{ borderStyle: "dashed" }}>
                    <p className="txt-025 flex-hcenter" onClick={handleClickProfielPic}>Add Photo</p>
                  </div>)}
                  {!!profilePic && (<img alt="profile owner" src={profilePic} onClick={handleClickProfielPic} style={{ borderRadius: "50%", width: "14.5vh", height: "14.5vh", marginBottom: "5vh" }} />)}
                  <input type="file" accept="image/*" id="upload" onChange={handleNewFileUpload} style={{ display: "none" }}></input>
                </div>


              </div>


              {/* FORM */}


              <div className="flex-col" style={{ width: "100%", marginLeft: "33%", paddingLeft: "10%", paddingRight: "10%" }}>


                  {/* FIRST NAME & LAST NAME */}

                  <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    width: 66%;
                  `}>
                    <TextInput name="first_name" title="First Name" defaultValue={props?.dataPreload?.first_name} containerStyle={{ boxSizing: 'border-box', width: '43%', marginRight: '13px' }} />
                    <TextInput name="last_name" title="Last Name" defaultValue={props?.dataPreload?.last_name} containerStyle={{ boxSizing: 'border-box', width: '43%', marginLeft: '13px' }} />
                  </div>

                  {/* EMAIL & MOBILE PHONE */}

                  <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 3.5vh;
                    width: 66%;
                  `}>
                    <TextInput extraProps={"readonly"} name="email_address" title="Email address" defaultValue={props?.dataPreload?.user?.email} containerStyle={{ boxSizing: 'border-box', width: '43%', marginRight: '13px' }} />
                    <TextInput name="mobile_number" title="Phone" defaultValue={props?.dataPreload?.mobile_number} containerStyle={{ boxSizing: 'border-box', width: '43%', marginLeft: '13px' }} />
                  </div>

                  {/* ADDRESS */}

                  <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 3.5vh;
                    padding-left: .20vw;
                    width: 66%;
                  `}>
                    <TextInput name="address" title="Address" defaultValue={props?.dataPreload?.address} containerStyle={{ boxSizing: 'border-box', width: '90.5%' }} />
                  </div>

                  {/* CITY & STATE & ZIP */}

                  <div className={css`
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 3.5vh;
                    padding-bottom: 4vh;
                    width: 66%;
                  `}>
                    <TextInput name="city" title="City" defaultValue={props?.dataPreload?.city} containerStyle={{ boxSizing: 'border-box', width: '28.22%', marginRight: '12px' }} />
                    <TextInput name="state" title="State" defaultValue={props?.dataPreload?.state} containerStyle={{ boxSizing: 'border-box', width: '28.22%', marginLeft: '12px' }} />
                    <TextInput name="zip" title="Zip Code" defaultValue={props?.dataPreload?.zip_code} containerStyle={{ boxSizing: 'border-box', width: '28.22%', marginLeft: '12px' }} />
                  </div>

                  {/* SEPARATOR BOTTOM LINE */}

                  <hr style={{ border: "1px solid #DCE3EA;", height: ".003vh", width: "59.55%" }}/>

                  {/* NEXT -> CONTINUE */}

                  <InputButton
                    label="Next"
                    type="button"
                    variant="dark"
                    size="sm"
                    containerStyle={{ width: "26.15vh", marginTop: "2.5vh", padding: "1.235vh 1.235vh 1.235vh 1.235vh" }}
                    onClick={handleSubmit}
                  />


              </div>

            </div>
          </div>
        </ContainerForm>
      {/* </ScrollableArea> */}
    </div>
  )
}
