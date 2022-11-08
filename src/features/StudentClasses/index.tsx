import styled from "@emotion/styled";
import { MDBCol } from "mdbreact";
import React, { useEffect, useState } from "react";
import StudentHeader from "../../components/Headers/StudentHeader";
import 'react-circular-progressbar/dist/styles.css';
import COLORS from "../../utils/colors";
import InputSearch from "../../components/InputSearch/InputSearch";
import LeftPaneListItems from "../../components/LeftPaneListItems/Classes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchClass, setIsShowingClass, setIsShowingClassInformation } from "../Demo/demoSlice";
import ShowClass from "../Classes/ShowClass";
import ClassInformation from "../Classes/ShowClass/ClassInformation";
import RequireAuth from "../Auth/RequireAuth";

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
  overflow-x: hidden !important;
  overflow-y: auto !important;
`;

const LeftPane = styled.div`
  background-color: ${COLORS.GRAY_PANE};
  width: 33.33%;
  height: 100%;
  flex-display: column;
  align-items: space-between;
  justify-content: space-between;
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
  overflow-x: hidden;
`;

const RightPane = styled.div`
  flex: 1;
  width: 66.67vh;
  text-align: center;
  justify-content: center;
  align-items: center;
}
`;

const StudentClasses = () => {
    const dispatch = useAppDispatch();

    const classes = useAppSelector((state) => state.demo.classes);

    const [classList, setClassList] = useState<any>();
    const [classUpdate, setClassUpdate] = useState();
    const [, setShowDeleteModal] = useState(false);
    const isShowingClass = useAppSelector((state) => state.demo.isShowingClass);
    const isShowingClassInformation = useAppSelector((state) => state.demo.isShowingClassInformation);

    useEffect(() => {
      dispatch(setIsShowingClass(false));
      dispatch(setIsShowingClassInformation(false));
      dispatch(fetchClass());
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
            status: null,
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

    const handleDelete = (id: number) => {
      console.log("id to delete ", id);
      setShowDeleteModal(true);
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

    const renderContent = () => (
      <>
        <StudentHeader />
        <MainContainer>
          <LeftPane>
            <LeftPaneSearchbox>
              <MDBCol md="12">
                <form className="form-inline">
                  <InputSearch placeholder="Search by name..." />
                </form>
              </MDBCol>
              {/* <InputButton type="button" icon={<MDBIcon icon="search"  icon="lightbulb" size="4x"/>} /> */}
            </LeftPaneSearchbox>
            <LeftPaneList>
              {/* {(!classes || classes.length === 0) && <img src="../assets/img/no-more-class-empty.png"
                alt="no more users default"
                style={{ marginTop: "15.5vh" }}
                />} */}
              <LeftPaneListItems
                list={classList}
                onSelected={handleClassUpdate}
                onDelete={handleDelete}
              />
            </LeftPaneList>
          </LeftPane>
          <RightPane>
            {(!!isShowingClass) && <ShowClass student={classUpdate} disableEditing />}
            {(!!isShowingClassInformation) && <ClassInformation student={classUpdate} disableEditing />}
            {/* {(!isAddingClass && !isShowingClass && !isShowingClassInformation) && (<img
              src="../assets/img/No-moredatano-more-data-messages.png"
              alt="no more data selecting students"
            />)} */}
            {(!isShowingClass && !isShowingClassInformation) && (<img
              src="../assets/img/No-moredatano-more-data-messages.png"
              alt="no more data selecting students"
            />)}
          </RightPane>
        </MainContainer>
      </>
    );

    return (
      <RequireAuth>
        {renderContent()}
      </RequireAuth>
    );
};

export default StudentClasses;