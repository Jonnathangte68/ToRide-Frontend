import styled from "@emotion/styled";
import { MDBCol } from "mdbreact";
import InputSearch from "../../../components/InputSearch/InputSearch";
import MainMenu from "../../../components/MainMenu/MainMenu";
import { css } from "@emotion/css";
import COLORS from "../../../utils/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LeftPaneListItems from "../../../components/LeftPaneListItems";
// import { fetchAllStaffs, setIsAddingStaff, setIsShowingStaff } from "../staffSlice";
import DeleteModal from "../../../components/DeleteModal";
import ShowStaffForm from "../ShowStaffForm";
import AddStaffForm from "../AddStaffForm";
import { deleteStaff, fetchImageVault, fetchStaff, selectMenuOption, setIsAddingStaff, setIsShowingStaff } from "../../Demo/demoSlice";

const MainContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 9vh;
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const LeftPane = styled.div`
  background-color: ${COLORS.GRAY_PANE};
  width: 27.85%;
  height: 100%;
  flex-display: column;
  align-items: space-between;
  justify-content: space-between;
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

const Text391 = styled.p`
  font-size: 15px;
  font-family: Open Sans, sans-serif;
  font-weight: 500;
  line-height: 160%;
  color: rgba(99, 88, 99, 1);
  word-wrap: break-word;
  color: ${COLORS.ORANGE}
`;

const LeftPaneHeader = styled.div`
  flex: 2;
  height: 10%;
  padding: 1.25vh;
`;

const LeftPaneSearchbox = styled.div`
  flex: 1;
  height: 10%;
  padding: 1.75vh;
`;

const LeftPaneList = styled.div`
  flex: 15;
  height: 80%;
  margin-top: 0vh;
  margin-left: 0.35vh;
  padding: 3.92vh 0px 3.92vh 0px;
  overflow-y: auto;
`;

const RightPane = styled.div`
width: 100%;
    text-align: center;
}
`;

export default function ManageStaff(props: any) {
  const dispatch = useAppDispatch();
  // const staffs = useAppSelector((state) => state.staff.staffs);
  // const isAddingStaff = useAppSelector((state) => state.staff.isAddingStaff);
  // const isShowingStaff = useAppSelector((state) => state.staff.isShowingStaff);
  const staffs = useAppSelector((state) => state.demo.staffs);
  const isAddingStaff = useAppSelector((state) => state.demo.isAddingStaff);
  const isShowingStaff = useAppSelector((state) => state.demo.isShowingStaff);
  const [staffList, setStaffList] = useState<any>();
  const [staffUpdate, setStaffUpdate] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const user = useAppSelector((state) => state.demo.userlogin);
  const imageList = useAppSelector((state) => state.demo.userImageVault);

  const handleAddStaff = () => {
    unselectItems();
    setStaffUpdate(null);
    dispatch(setIsAddingStaff(true));
  };

  const handleStaffUpdate = (id: number) => {
    const sfSelected = { ...staffs[id] };
    // Set the picture uploaded.
    const pictureG = imageList?.filter(f => {
        console.log("verify file selected exist", `vehicle_profile_picture_${sfSelected?.mobile_number}_${user?.username}`);
        // console.log("all files", imageList);
      if (f.title === `vehicle_profile_picture_${sfSelected?.mobile_number}_${user?.username}`) {
          return true;
      }
      return false;
    });

    console.log("picture set", pictureG);

    if (!!pictureG && pictureG.length > 0) {
      sfSelected.photo = pictureG?.[0]?.url_thumbnail;
    } else {
      sfSelected.photo = null;
    }

    console.log("final vehicle", sfSelected);
    setStaffUpdate(sfSelected);
    unselectItems();
    setStaffList(staffList.map((itm) => {
      if (itm.id === sfSelected?.id) {
        return {
          ...itm,
          selected: true
        };
      }
      return {
        ...itm,
        selected: false
      };
    }));
    dispatch(setIsShowingStaff(true));
  };

  useEffect(() => {
    dispatch(setIsAddingStaff(false));
    dispatch(setIsShowingStaff(false));

    dispatch(selectMenuOption(3));

    dispatch(fetchStaff());
    dispatch(fetchImageVault());
  }, [dispatch]);

  useEffect(() => {
    if (!!staffs && staffs.length > 0) {
      const result = staffs.map((stf: any) => {
        const pictureG = imageList?.filter(f => {
          if (f.title === `vehicle_profile_picture_${stf?.mobile_number}_${user?.username}`) {
              return true;
          }
          return false;
        });
        console.log("student in map 101 ", stf);
        return {
          id: stf?.id,
          title: stf?.first_name + " " + stf.last_name,
          sub: stf?.role, // student?.student?.email,
          description: stf.mobile_number,
          image: (!!pictureG && pictureG.length > 0 && !!pictureG?.[0]?.url_thumbnail) ? pictureG?.[0]?.url_thumbnail : "../assets/img/picture-upload-picture.png",
          selected: false
        };
      });
      console.log("result end ", result);
      setStaffList(result);
    }
  }, [imageList, staffs, user?.username]);

  const unselectItems = () => {
    if (!!staffList && staffList.length > 0) {
      setStaffList(staffList.map((student) => {
        return {
          ...student,
          selected: false
        };
      }));
    }
  };

  const handleCallbackForEdit = () => {
    dispatch(setIsAddingStaff(true));
  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteStaff(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      dispatch(fetchStaff());
      setStaffUpdate(null);
      setIsShowingStaff(false);
    }, 600);
  };

  console.log("showing staff form. ", (!!isShowingStaff));

  const handleEdit = (id: number) => {
    setTimeout(() => {
      dispatch(setIsAddingStaff(true));
    }, 2000);
  };
  
  return (
    <MainContainer>
      <MainMenu />
      <LeftPane>
        <LeftPaneHeader style={{ borderBottom: "1px solid " + COLORS.GRAY_SLIGHT }}>
          <div className={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          `}>
            <div className={css`width: 50%;`}>
              <TextTile>Manage Staff</TextTile>
              <Text391>
                {`List of Staffs (${!!staffList ? staffList.length : "0"})`}
              </Text391>
            </div>
            <div className={css`width: 40%;margin-left: 10%;`}>
              <InputButton2
                name="add_student_button"
                preIcon={<Plus size={16} />}
                title="Add New"
                color="red"
                onClick={handleAddStaff}
                class={css`padding-left: 0px !important; padding-right: 0px !important; margin-left: 2.45%; width: 100%;background-color:${COLORS.RED} !important;line-height: 0.15vh;border-radius:7px;`}
              />
            </div>
          </div>
        </LeftPaneHeader>
        <LeftPaneSearchbox>
          <MDBCol md="12">
            <form className="form-inline">
              <InputSearch placeholder="Search by name, email and number" />
            </form>
          </MDBCol>
          {/* <InputButton type="button" icon={<MDBIcon icon="search"  icon="lightbulb" size="4x"/>} /> */}
        </LeftPaneSearchbox>
        <LeftPaneList>
          {(!staffs || staffs.length === 0) && <img src="../assets/img/no-more-staff-dialog.png"
            alt="no more users default"
            style={{ marginTop: "15.5vh" }}
          />}
          <LeftPaneListItems
            list={staffList}
            onSelected={handleStaffUpdate}
            onEdit={handleEdit}
            onDelete={handleDelete} />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
        {(!!isAddingStaff) && <AddStaffForm student={staffUpdate} {...props} />}
        {(!!isShowingStaff) && <ShowStaffForm student={staffUpdate} callbackForEdit={handleCallbackForEdit} />}
        {(!isAddingStaff && !isShowingStaff && (!staffList || staffList.length === 0)) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
        {(!isAddingStaff && !isShowingStaff && !!staffList && staffList.length !== 0) && (<img
          src="../assets/img/no-more-data-student.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Staff?"}
        title2={"Are you sure you want to delete staff?"}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAction={handleEraseStudent} />
    </MainContainer>
  )
}
