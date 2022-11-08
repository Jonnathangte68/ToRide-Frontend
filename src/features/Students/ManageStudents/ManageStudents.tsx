import styled from "@emotion/styled";
import { MDBCol } from "mdbreact";
import InputSearch from "../../../components/InputSearch/InputSearch";
import MainMenu from "../../../components/MainMenu/MainMenu";
import COLORS from "../../../utils/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import AddStudentForm from "../AddStudentForm/AddStudentForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LeftPaneListItems from "../../../components/LeftPaneListItems";
import ShowStudent from "../ShowStudent";
import DeleteModal from "../../../components/DeleteModal";
import { deleteStudent, fetchImageVault, fetchStudent, selectMenuOption, setIsAddingStudent, setIsShowingStudent, toggleStudentStatus } from "../../Demo/demoSlice";
import { StudentElement } from "../studentsSlice";

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
    overflow: hidden !important;
}
`;

export default function ManageStudents(props: any) {
  const dispatch = useAppDispatch();
  // const isAddingStudent = useAppSelector((state) => state.students.isAddingStudent);
  // const students = useAppSelector((state) => state.students.students);
  // const isShowingStudent = useAppSelector((state) => state.students.isShowingStudent);
  const isAddingStudent = useAppSelector((state) => state.demo.isAddingStudent);
  const students = useAppSelector((state) => state.demo.students);
  const isShowingStudent = useAppSelector((state) => state.demo.isShowingStudent);
  const [studentList, setStudentList] = useState<any>();
  
  const [studentUpdate, setStudentUpdate] = useState<StudentElement | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [setid,] = useState<number | undefined>(undefined);

  const user = useAppSelector((state) => state.demo.userlogin);
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  
  const handleAddStudent = () => {
    unselectItems();
    setStudentUpdate(null);
    dispatch(setIsAddingStudent(true));
  };

  const showStudentAfterSave = (id: any) => {
    console.log("t7", students);
    console.log("t8", id);
    setStudentUpdate(students[id]);
    dispatch(setIsShowingStudent(true));
  };

  console.log("is showing student ", isShowingStudent);
  console.log("is adding student ", isAddingStudent);
  

  useEffect(() => {
    dispatch(setIsAddingStudent(false));
    dispatch(setIsShowingStudent(false));

    dispatch(selectMenuOption(2));
    // dispatch(fetchAllStudents());
    dispatch(fetchStudent());
    dispatch(fetchImageVault());
  }, [dispatch]);

  useEffect(() => {
    if (!!students && students.length > 0) {
      const result = students.map((student: any) => {
        const pictureG = imageList?.filter(f => {
          if (f.title === `student_profile_picture_${student?.mobile_number}`) {
              return true;
          }
          return false;
        });

        console.log("profile picture show student photo w/id q5inDpZ0   ==>", pictureG);
        
        console.log("student in map 101 ", student);
        return {
          id: student?.id,
          title: student?.first_name + " " + student?.last_name, 
          sub: student?.student?.email, // student?.student?.email,
          description: student.mobile_number,
          selected: false,
          image: (!!pictureG && pictureG.length > 0 && !!pictureG?.[pictureG.length - 1]?.url_thumbnail) ? pictureG?.[pictureG.length - 1]?.url_thumbnail : "../assets/img/picture-upload-picture.png",
          status: student?.student?.is_active,
        };
      });
      console.log("result end ", result);
      setStudentList(result);
    }
  }, [imageList, user?.username, students]);

  const unselectItems = () => {
    if (!!studentList && studentList.length > 0) {
      setStudentList(studentList.map((student) => {
        return {
          ...student,
          selected: false
        };
      }));
    }
  };

  const handleStudentUpdate = (id: number) => {
    unselectItems();
    const studentSelected = { ...students[id] };
    // Set the picture uploaded.
    const pictureG = imageList?.filter(f => {
        console.log("verify file selected exist", `student_profile_picture_${studentSelected?.mobile_number}`);
        // console.log("all files", imageList);
      if (f.title === `student_profile_picture_${studentSelected?.mobile_number}`) {
          return true;
      }
      return false;
    });

    if (!!pictureG && pictureG.length > 0) {
      studentSelected.photo = pictureG?.[pictureG.length - 1]?.url_thumbnail;
    } else {
      studentSelected.photo = null;
    }

    console.log("final vehicle", studentSelected);

    setStudentUpdate(studentSelected);
    // color of selected FF4311
    console.log("student list", studentList);
    console.log("student", studentSelected);
    setStudentList(studentList.map((student) => {
      if (student.id === studentSelected?.id) {
        return {
          ...student,
          selected: true
        };
      }
      return {
        ...student,
        selected: false
      };
    }));
    dispatch(setIsShowingStudent(true));
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (id: number) => {
    setTimeout(() => {
      dispatch(setIsAddingStudent(true));
    }, 2000);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteStudent(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      dispatch(fetchStudent());
      setStudentUpdate(null);
      setIsShowingStudent(false);
    }, 600);
  };

  console.log("students", students);

  const handleCallbackForEdit = () => {
    dispatch(setIsAddingStudent(true));
  };

  const handleStatusChange = (studentId) => {
    console.log("toggle this status", studentId);
    dispatch(toggleStudentStatus(studentId));
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
              <TextTile>Manage Students</TextTile>
              <Text391>
                {`List of Students (${!!studentList ? studentList.length : "0"})`}
              </Text391>
            </div>
            <div className={css`width: 40%;margin-left: 10%;`}>
              <InputButton2
                name="add_student_button"
                preIcon={<Plus size={16} />}
                title="Add New"
                color="red"
                onClick={handleAddStudent}
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
          {(!students || students.length === 0) && <img src="../assets/img/no-more-users-chat.png"
            alt="no more users default"
            style={{ marginTop: "15.5vh" }}
          />}
          <LeftPaneListItems
            list={studentList}
            onSelected={handleStudentUpdate}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showStatusField={true}
            onStatusChange={(id) => handleStatusChange(id)}
          />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
        {(!!isAddingStudent) && <AddStudentForm id={setid} student={studentUpdate} onShowStudentAfterSave={showStudentAfterSave} {...props} />}
        {(!!isShowingStudent) && <ShowStudent student={studentUpdate} callbackForEdit={handleCallbackForEdit} />}
        {(!isAddingStudent && !isShowingStudent && (!studentList || studentList.length === 0)) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
        {(!isAddingStudent && !isShowingStudent && !!studentList && studentList.length !== 0) && (<img
          src="../assets/img/no-more-data-student.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Student?"}
        title2={"Are you sure you want to delete student?"}
        show={showDeleteModal}
        onClose={handleModalClose}
        onAction={handleEraseStudent}
      />
    </MainContainer>
  )
}
