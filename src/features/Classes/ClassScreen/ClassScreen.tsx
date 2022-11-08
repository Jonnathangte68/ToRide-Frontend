import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";
import InputSearch from "../../../components/InputSearch/InputSearch";
import MainMenu from "../../../components/MainMenu/MainMenu";
import COLORS from "../../../utils/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteClass, fetchClass, selectMenuOption, setIsAddingClass, setIsShowingClass, setIsShowingClassInformation } from "../../Demo/demoSlice";
import LeftPaneListItems from "../../../components/LeftPaneListItems/Classes";
import { css } from "@emotion/css";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import DeleteModal from "../../../components/DeleteModal";
import AddClassForm from "../AddClassForm";
import ShowClass from "../ShowClass";
import React from "react";
import ClassInformation from "../ShowClass/ClassInformation";

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

export default function ManageClasses(props: any) {
  const dispatch = useAppDispatch();

  const classes = useAppSelector((state) => state.demo.classes);

  const [classList, setClassList] = useState<any>();
  const [classUpdate, setClassUpdate] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isAddingClass = useAppSelector((state) => state.demo.isAddingClass);
  const isShowingClass = useAppSelector((state) => state.demo.isShowingClass);
  const isShowingClassInformation = useAppSelector((state) => state.demo.isShowingClassInformation);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddStudent = () => {
    // unselectItems();
    setClassUpdate(null);
    dispatch(setIsAddingClass(true))
  };

  // "id": 1,
  // "name": "class1",
  // "instructor_sub1": "instructor1",
  // "instructor_sub2": "instructor2",
  // "class_size": 2,
  // "class_date_start": "2022-07-20",
  // "total_number_of_sessions": 2,
  // "total_number_of_sessions_day": 3,
  // "number_of_extra_sessions": 5,
  // "session_1": "17:09:00",
  // "weekday": "TU",
  // "material_programe_compilation_list": "sagsg",
  // "material_link": "http://goldfish-app-wuj8y.ondigitalocean.app/media/piggy-bank-solid.svg",
  // "class_instructor": 2,
  // "students": [
  //     2
  // ]

  useEffect(() => {
    dispatch(setIsAddingClass(false));
    dispatch(setIsShowingClass(false));
    dispatch(setIsShowingClassInformation(false));
    dispatch(fetchClass());

    dispatch(selectMenuOption(5));
  }, [dispatch]);

  useEffect(() => {
    if (!!classes && classes.length > 0) {
      const result = classes.map((vhs: any) => {
        console.log("class in map 101 ", vhs);
        return {
          id: vhs?.id,
          title: vhs?.name, 
          col_1: vhs?.class_size, // student?.student?.email,
          col_2: vhs?.class_instructor?.first_name,
          col_3: vhs?.class_date_start,
          status: "gasd",
          selected: false
        };
      });
      console.log("result end ", result);
      setClassList(result);
    }
  }, [classes]);

  const handleClassUpdate = (id: number) => {
    unselectItems();
    const classSelected = classes[id];
    console.log("class selected ", classSelected);
    setClassUpdate(classSelected);
    // color of selected FF4311
    console.log("class list", classList);
    console.log("class", classSelected);
    setClassList(classList.map((student) => {
      if (student.id === classSelected?.id) {
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
    dispatch(setIsShowingClass(true));
  };

  const unselectItems = () => {
    if (!!classList && classList.length > 0) {
      setClassList(classList.map((cls) => {
        return {
          ...cls,
          selected: false
        };
      }));
    }
  };

  const handleCallbackForEdit = () => {
    dispatch(setIsAddingClass(true));
  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteClass(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      dispatch(fetchClass());
      setClassUpdate(null);
      setIsShowingClass(false);
    }, 600);
  };

  const handleEdit = (id: number) => {
    setTimeout(() => {
      dispatch(setIsAddingClass(true));
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
              <TextTile>Manage Classes</TextTile>
              <Text391>
                {`List of Classes (${!!classList ? classList.length : "0"})`}
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
              <InputSearch placeholder="Search by name..." />
            </form>
          </MDBCol>
          {/* <InputButton type="button" icon={<MDBIcon icon="search"  icon="lightbulb" size="4x"/>} /> */}
        </LeftPaneSearchbox>
        <LeftPaneList>
          {(!classes || classes.length === 0) && <img src="../assets/img/no-more-class-empty.png"
            alt="no more users default"
            style={{ marginTop: "15.5vh" }}
            />}
          <LeftPaneListItems
            list={classList}
            onSelected={handleClassUpdate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
        {(!!isAddingClass) && <AddClassForm student={classUpdate} {...props} />}
        {(!!isShowingClass) && <ShowClass student={classUpdate} callbackForEdit={handleCallbackForEdit}  />}
        {(!!isShowingClassInformation) && <ClassInformation student={classUpdate} />}
        {(!isAddingClass && !isShowingClass && !isShowingClassInformation) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Class?"}
        title2={"Are you sure you want to delete class?"}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAction={handleEraseStudent} />
    </MainContainer>
  )
}
