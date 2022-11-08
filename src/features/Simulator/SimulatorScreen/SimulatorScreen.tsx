import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";
import InputSearch from "../../../components/InputSearch/InputSearch";
import MainMenu from "../../../components/MainMenu/MainMenu";
import COLORS from "../../../utils/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { css } from "@emotion/css";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import LeftPaneListItems from "../../../components/LeftPaneListItems/Simulator";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setIsAddingSimulator, setIsShowingSimulator } from "../simulatorSlice";
import AddSimulatorForm from "../AddSimulatorForm";
import { deleteSimulator, selectMenuOption } from "../../Demo/demoSlice";
import DeleteModal from "../../../components/DeleteModal";

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
  padding: 2.14vh;
  overflow-y: auto;
`;

const RightPane = styled.div`
width: 100%;
    text-align: center;
}
`;

export default function ManageSimulator(props: any) {
  const dispatch = useAppDispatch();
  const isAddingSimulator = useAppSelector((state) => state.simulator.isAddingSimulator);
  const isShowingSimulator = useAppSelector((state) => state.simulator.isShowingSimulator);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(selectMenuOption(9));
  }, [dispatch]);
  
  const handleAddSimulator = () => dispatch(setIsAddingSimulator(true));

  const handleSimulatorUpdate = () => {

  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteSimulator(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      // dispatch(fetchSimulator());
      // setSimulatorUpdate(null);
      setIsShowingSimulator(false);
    }, 600);
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
              <TextTile>Manage Simulator</TextTile>
              <Text391>
                {`List of Simulator (${!!props?.simulatorList && props?.simulatorList.length})`}
              </Text391>
            </div>
            <div className={css`width: 40%;margin-left: 10%;`}>
              <InputButton2
                name="add_student_button"
                preIcon={<Plus size={16} />}
                title="Add Simulator"
                color="red"
                onClick={handleAddSimulator}
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
          {(!props?.simulatorList || props?.simulatorList.length === 0) && <img
            src="../assets/img/no-more-simulator-empty.png"
            alt="no more data selecting simulators"
            style={{ marginTop: "15.5vh" }}
          />}
          <LeftPaneListItems
            list={props?.simulatorList}
            onSelected={handleSimulatorUpdate}
            onDelete={handleDelete}
          />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
      {(!!isAddingSimulator && <AddSimulatorForm />)}
      {(!isAddingSimulator && !isShowingSimulator) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Student?"}
        title2={"Are you sure you want to delete this simulator?"}
        show={showDeleteModal}
        onClose={handleModalClose}
        onAction={handleEraseStudent}
      />
    </MainContainer>
  )
}
