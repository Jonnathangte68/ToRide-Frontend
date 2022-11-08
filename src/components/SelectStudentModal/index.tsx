import _ from "lodash";
import { MDBCol, MDBRow } from "mdbreact";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchStudent } from "../../features/Demo/demoSlice";
import InputButton from "../InputButton/InputButton";
import InputSearch from "../InputSearch/InputSearch";
import LeftPaneListItems from "../LeftPaneListItems/StudentSelector";

const SelectStudentModal = (props: any) => {
    const [studentList, setStudentList] = useState<any>();
    const [, setShowDeleteModal] = useState(false);
    const [, setDeleteId] = useState(null);
    
    const students = useAppSelector((state) => state.demo.students);
    const imageList = useAppSelector((state) => state.demo.userImageVault);
    const dispatch = useAppDispatch();

    useEffect(() => {

        console.log("useeffect check selected elements, ", props?.selection);

        if (!!students && students.length > 0) {
          const result = students.map((student: any) => {
            const pictureG = imageList?.filter(f => {
              if (f.title === `vehicle_profile_picture_${student?.mobile_number}_${student?.student?.username}`) {
                  return true;
              }
              return false;
            });

            console.log("is selected check condition", _.includes(props?.selection, student?.id));            

            return {
              id: student?.id,
              title: student?.first_name + " " + student?.last_name, 
              sub: student?.student?.email, // student?.student?.email,
              description: student.mobile_number,
              selected: (props?.selection && props?.selection.length > 0) ? _.includes(props?.selection, student?.id) : false,
              image: (!!pictureG && pictureG.length > 0 && !!pictureG?.[0]?.url_thumbnail) ? pictureG?.[0]?.url_thumbnail : "../assets/img/picture-upload-picture.png",
            };
          });
          console.log("result end ", result);
          setStudentList(result);
        }
    }, [imageList, props?.selection, students, props?.show]);

    useEffect(() => {
        dispatch(fetchStudent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStudentUpdate = (id: number) => {
        const studentSelected = { ...students[id] };
        // Set the picture uploaded.
        const pictureG = imageList?.filter(f => {
            console.log("verify file selected exist", `vehicle_profile_picture_${studentSelected?.mobile_number}_${studentSelected?.student?.email}`);
            // console.log("all files", imageList);
          if (f.title === `vehicle_profile_picture_${studentSelected?.mobile_number}_${studentSelected?.student?.email}`) {
              return true;
          }
          return false;
        });
    
        console.log("picture set", pictureG);
    
        if (!!pictureG && pictureG.length > 0) {
          studentSelected.photo = pictureG?.[0]?.url_thumbnail;
        } else {
          studentSelected.photo = null;
        }
    
        console.log("final vehicle", studentSelected);
        // color of selected FF4311
        console.log("student list", studentList);
        console.log("student", studentSelected);
        setStudentList(studentList.map((student) => {
          if (student.id === studentSelected?.id) {
            return {
              ...student,
              selected: !student.selected
            };
          }
          return {
            ...student
          };
        }));
    };

    const handleDelete = (id: number) => {
        console.log("id to delete ", id);
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleSubmit = () => {
        return props?.onSubmit(studentList.filter(st => st.selected === true).map(st => st.id));
    };

    const handleEnteredModal = () => {
        console.log("on entered.");
        if (!!students && students.length > 0) {
            const result = students.map((student: any) => {
              const pictureG = imageList?.filter(f => {
                if (f.title === `vehicle_profile_picture_${student?.mobile_number}_${student?.student?.username}`) {
                    return true;
                }
                return false;
              });
  
              console.log("is selected check condition", _.includes(props?.selection, student?.id));            
  
              return {
                id: student?.id,
                title: student?.first_name + " " + student?.last_name, 
                sub: student?.student?.email, // student?.student?.email,
                description: student.mobile_number,
                selected: _.includes(props?.selection, student?.id),
                image: (!!pictureG && pictureG.length > 0 && !!pictureG?.[0]?.url_thumbnail) ? pictureG?.[0]?.url_thumbnail : "../assets/img/picture-upload-picture.png",
              };
            });
            setStudentList(result);
        }
    };


    console.log("refresh list");
    console.log("studentList", studentList);

    return (
        <>
            <Modal
                show={props?.show}
                onHide={props?.onClose}
                onEntered  = {handleEnteredModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <MDBRow>
                        <MDBCol md="7">
                            <p style={{ fontSize: "1.45rem", fontWeight: "700", paddingTop: "0.75vh" }}>Choose The Students</p>
                            <p style={{ fontSize: "1.15rem", paddingTop: "0.75vh" }}>Select every student to assign</p>
                        </MDBCol>
                        <MDBCol md="5">
                            <InputSearch placeholder="Search by name..." only />
                        </MDBCol>
                    </MDBRow>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ height: "55vh", overflowY: "auto", textAlign: "center" }}>
                        <LeftPaneListItems
                            list={studentList}
                            onSelected={handleStudentUpdate}
                            onDelete={handleDelete}
                        />
                        {(!students || students.length === 0) && <img src="../assets/img/no-more-users-chat.png"
                            alt="no more users default"
                            style={{ marginTop: "15.5vh" }}
                        />}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <InputButton variant="light" onClick={props?.onClose} label="Cancel" containerStyle={{ width: "47.25%" }} />
                <InputButton variant="danger" label="Confirm" containerStyle={{ width: "47.25%" }} onClick={handleSubmit} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SelectStudentModal;
