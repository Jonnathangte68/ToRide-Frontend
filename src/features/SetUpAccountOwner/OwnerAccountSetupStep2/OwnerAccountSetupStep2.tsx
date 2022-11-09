import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useEffect, useState } from "react"
import InputButton from "../../../components/InputButton/InputButton";
import TextInput from "../../../components/TextInput/TextInput";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css"
import InputGroupPrepend from "../../../components/InputGroupPrepend/InputGroupPrepend";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetOwnerProfileUpdate, fetchImageVault, updateOwnerProfile } from "../../Demo/demoSlice";
import ScrollableArea from "../../../utils/scrollable-area";
import PublitioAPI from "publitio_js_sdk";
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET } from "../../../utils/globals";
import WYSIWYGEditor from "../../../components/WYSIWYGEditor";

export default function OwnerAccountSetupStep2(props: any) {
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  const [profilePic, setProfilePic] = useState(null);
  const [fileIDToSet, setFileIDToSet] = useState(null);
  const [, setxaboutus] = useState(null);
  

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
    align-items: flex-end;
    overflow: hidden;
  `;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const setAddressFields = () => {
  //   const addressFieldsContainer = [];
  //   for (let i = 0 ; i < addressCtr ; i++) {
  //     let index = i + 1;
  //     const extraMarginTop = (index > 1) ? { marginTop: "5px" } : {};
  //     addressFieldsContainer.push(
  //       <TextInput name="address" title={`Business Location ${index}`} value="" containerStyle={{ boxSizing: 'border-box', width: '100%', ...extraMarginTop }} />
  //     );
  //   }
  //   setAddressFieldsElements(addressFieldsContainer);
  // };

  // useEffect(() => {
  //   setAddressFields();
  // }, [addressCtr, setAddressFields]);
  

  // const getTimeOptions = () => {
  //   const values: string[] = [];
  //   for (let time in range( 0, 24, 1 )) {
  //     values.push(`${parseInt(time) > 12 ? (parseInt(time)-12) : parseInt(time)}:00 ${parseInt(time) > 12 ? "PM" : "AM"}`);
  //   }
  //   return values;
  // };

  // const handleAddLocationRow = (event: any) => {
  //   event.preventDefault();
  //   console.log("handle add location row");
  //   if (addressCtr < 3) {
  //     let addressCtrInc = addressCtr + 1;
  //     console.log("new counter value", addressCtrInc);
  //     setAddressCtr(addressCtrInc);
  //     return;
  //   }
  // };

  const handleNext = () => {
    const form: HTMLFormElement | null = document.querySelector('form');
    if (!!form) {

      publitio.call(`/files/update/${fileIDToSet}`, 'PUT', {
        id: `owner_profile_company_image_${props?.dataPreload?.user?.email}`,
        title: `owner_profile_company_image_${props?.dataPreload?.user?.email}`,
        description: `owner_profile_company_image_${props?.dataPreload?.user?.email}`,
        tags: `owner,profile_picture,${props?.dataPreload?.user?.email}`,
        privacy: '1',
        option_download: '1'
      }).then(data => { console.log(data) })
        .catch(error => { console.log(error) });


      let formData = new FormData(form);
      let company_name = "";
      let company_registraion_number = "";
      let company_email_address = "";
      let company_mobile_number = "";
      let Social_links_linkdin = "";
      let Social_links_facebook = "";
      let Social_links_twitter = "";
  
      Array.from(formData.entries(), ([key, value]) => {
        if (key === "company_name") {
          console.log("before set company name");
          company_name = value as string;
          console.log("after set company name", company_name);
        }
        if (key === "company_registraion_number") {
          company_registraion_number = value as string;
        }
        if (key === "company_email_address") {
          company_email_address = value as string;
        }
        if (key === "company_mobile_number") {
          company_mobile_number = value as string;
        }
        if (key === "Social_links_linkdin") {
          Social_links_linkdin = value as string;
        }
        if (key === "Social_links_facebook") {
          Social_links_facebook = value as string;
        }
        if (key === "Social_links_twitter") {
          Social_links_twitter = value as string;
        }
        return true;
      });

      const updatedOwner2 = {
        company_name: company_name,
        company_registraion_number: company_registraion_number,
        company_email_address: company_email_address,
        company_mobile_number: company_mobile_number,
        about_us: document.getElementById("htmlAboutContent").textContent,
        Social_links_linkdin: Social_links_linkdin,
        Social_links_facebook: Social_links_facebook,
        Social_links_twitter: Social_links_twitter,
      };
      console.log("this is the upate from FORM 2");
      console.log(updatedOwner2);
      dispatch(updateOwnerProfile(updatedOwner2));
    }
    return props?.onNext();
  };

  useEffect(() => {
    dispatch(resetOwnerProfileUpdate());
    dispatch(fetchImageVault());
    //eslint-disable-next-line
  }, []);
  

  useEffect(() => {
    if (imageList) {
      console.log("a", `${props?.dataPreload?.user?.email}`);
      console.log("b", `owner_profile_company_image_${props?.dataPreload?.user?.email}`);
      console.log("c", imageList);
      const pictureG = imageList?.filter(f => {
          console.log("verify file selected exist", `owner_profile_company_image_${props?.dataPreload?.user?.email}`);
          // console.log("all files", imageList);
        if (f.title === `owner_profile_company_image_${props?.dataPreload?.user?.email}`) {
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

  const handlePictureUpload = (data) => {
    console.log("set this id.->>>", data);
    setFileIDToSet(data?.id);
    console.log("thuim to setjkabsdj",data?.url_thumbnail);
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

const handleOnContentChange = (content: any) => {
  console.log("test incoming content.");
  console.log(content);
  return () => setxaboutus(content);
};
  
console.log("gasjkdbgiuabsoudlg", profilePic);

  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <ImageSteps src="../assets/img/01_Owner A/Side Patterns.png" alt="left pane navigation steps" />


      <ContainerForm>
        <ScrollableArea>



        {/* <div className={"gasdgashsd "+css`
          height: 100%;
          display: flex;
          flex-direction: row;
          padding-top: 13.5vh;
          padding-bottom: 13.5vh;
          overflow-y: auto !important;
        `}> */}


          <div style={{ display: "flex", flex: 1, flexDirection: "column", marginLeft: "29%", paddingLeft: "15%", width: "100%" }}>


              {/* HEAD */}


              <div className="flex-col-hcenter">

              <div className="flex-col" style={{ marginLeft: "19%", marginTop: "11.92%" }}>
                <div className="label-text flex-col-hstart-vstart">
                  <p className="txt-867">Step 2 of 3</p>
                  <p className="txt-6410">Company Details</p>
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

            <div className={css`
              display: flex;
              flex-wrap: wrap;
              width: 66%;
            `}>
                <TextInput name="company_name" value={props?.dataPreload?.company_name} title="Company Name" containerStyle={{ boxSizing: 'border-box', width: '47%', marginRight: '13px' }} />
                <TextInput name="company_registraion_number" value={props?.dataPreload?.company_registraion_number} title="Registration Number" containerStyle={{ boxSizing: 'border-box', width: '47%', marginLeft: '13px' }} />
            </div>



            <div className={css`
              display: flex;
              flex-wrap: wrap;
              margin-top: 3.5vh;
              width: 66%;
            `}>
                <TextInput name="company_email_address" value={props?.dataPreload?.company_email_address} title="Email address" containerStyle={{ boxSizing: 'border-box', width: '47%', marginRight: '13px' }} />
                <TextInput name="company_mobile_number" value={props?.dataPreload?.company_mobile_number} title="Mobile Number" containerStyle={{ boxSizing: 'border-box', width: '47%', marginLeft: '13px' }} />
            </div>




            <div className={css`
              display: flex;
              flex-wrap: wrap;
              margin-top: 3.5vh;
              width: 66%;
            `}>
              <p className={css`
                margin-top: 2vh;
                margin-bottom: 2vh;
                margin-right: 3.85vh;
              `}>
                About us
              </p>
              {/* @ts-ignore */}
              <WYSIWYGEditor defautContent={props?.dataPreload?.about_us} onContentChange={handleOnContentChange} />
            </div>




            <div style={{ marginRight: "3.85vh", paddingBottom: "4.25vh", borderBottom: "1px solid #DCE3EA", width: "66%" }}>
              <p className={css`
                margin-top: 2vh;
                margin-bottom: 2vh;
              `}>
                Social Links
              </p>
              <>
                <InputGroupPrepend defaultValue={props?.dataPreload?.Social_links_linkdin} name="Social_links_linkdin" img="../assets/img/Vectorimg-google-prepend.png" containerStyle={{ width: "75%" }} placeholder="https://" />
                <InputGroupPrepend defaultValue={props?.dataPreload?.Social_links_facebook} name="Social_links_facebook"  img="../assets/img/Vectorimg-fb-prepend.png" containerStyle={{ width: "75%", marginTop: "0.65vh" }} placeholder="https://" />
                <InputGroupPrepend defaultValue={props?.dataPreload?.Social_links_twitter} name="Social_links_twitter"  img="../assets/img/Vectorimg-twitter-prepend.png" containerStyle={{ width: "75%", marginTop: "0.65vh" }} placeholder="https://" />
              </>
            </div>





            <div className={css`
              display: flex;
              flex-wrap: wrap;
            `}>
              <InputButton
                label="Next"
                type="button"
                variant="dark"
                size="sm"
                containerStyle={{ width: "26.15vh", marginTop: "2.5vh", padding: "1.235vh 1.235vh 1.235vh 1.235vh" }}
                onClick={handleNext}
              />
              <InputButton
                label="Previous"
                type="button"
                variant="light"
                size="sm"
                containerStyle={{ width: "26.15vh", marginTop: "2.5vh", marginLeft: "1vh", padding: "1.235vh 1.235vh 1.235vh 1.235vh" }}
                onClick={props?.onPrevious}
              />
            </div>


        {/* JUST SPACE ON THE BOTTOM */}


        <br />
        <br />



        </div>


        {/* </div> */}


        </ScrollableArea>
      </ContainerForm>
    </div>
  )
}
