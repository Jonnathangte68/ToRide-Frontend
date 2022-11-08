import styled from "@emotion/styled";
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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
// import { fetchAllVehicles, setIsAddingVehicle, setIsShowingVehicle, VehicleElement } from "../vehicleSlice";
import LeftPaneListItems from "../../../components/LeftPaneListItems/Vehicle";
import ShowVehicle from "../ShowVehicle";
import AddVehicleForm from "../AddVehicleForm";
import { deleteVehicle, fetchImageVault, fetchVehicle, selectMenuOption, setIsAddingVehicle, setIsShowingVehicle } from "../../Demo/demoSlice";
import useWindowDimensions from "../../../utils/useWindowDimensions";
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
  minHeight: 100%;
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
    padding-left: 3.92vh;
}
`;

export default function ManageVehicles(props: any) {
  // const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const dispatch = useAppDispatch();
  const [vehicleList, setVehicleList] = useState<any>();
  
  const { height } = useWindowDimensions();

  // const isAddingVehicle = useAppSelector((state) => state.vehicle.isAddingVehicle);
  // const isShowingVehicle = useAppSelector((state) => state.vehicle.isShowingVehicle);
  const isAddingVehicle = useAppSelector((state) => state.demo.isAddingVehicle);
  const vehicles = useAppSelector((state) => state.demo.vehicles);
  const isShowingVehicle = useAppSelector((state) => state.demo.isShowingVehicle);
  const user = useAppSelector((state) => state.demo.userlogin);
  const imageList = useAppSelector((state) => state.demo.userImageVault);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const [vehicleUpdate, setVehicleUpdate] = useState();

  useEffect(() => {
    dispatch(setIsAddingVehicle(false));
    dispatch(setIsShowingVehicle(false));

    dispatch(fetchVehicle());
    dispatch(selectMenuOption(4));
    dispatch(fetchImageVault());
  }, [dispatch]);

  useEffect(() => {
    if (!!vehicles && vehicles.length > 0) {
      const result = vehicles.map((vehicle: any, idx: number) => {
        const pictureG = imageList?.filter(f => {
          if (f.title === `vehicle_profile_picture_${vehicle?.license_plate_id}_${user?.username}`) {
              return true;
          }
          return false;
        });
        return {
          id: vehicle?.id,
          title: `Vehicle ${++idx}`,
          sub: vehicle?.v_type, // student?.student?.email,
          description: vehicle?.odo_meter,
          col_1: vehicle?.vin,
          col_2: vehicle?.license_plate_id,
          col_3: vehicle?.v_model,
          image: (!!pictureG && pictureG.length > 0 && !!pictureG?.[0]?.url_thumbnail) ? pictureG?.[0]?.url_thumbnail : "../assets/img/picture-upload-picture.png",
        };
      });
      setVehicleList(result);
    }
  }, [imageList, user?.username, vehicles]);

  const handleAddVehicle = () => {
    unselectItems();
    setVehicleUpdate(null);
    dispatch(setIsAddingVehicle(true));
  };

  const handleVehicleUpdate = (id: number) => {
    unselectItems();
    const vehicleSelected = { ...vehicles[id] };
    // Set the picture uploaded.
    const pictureG = imageList?.filter(f => {
        console.log("verify file selected exist", `vehicle_profile_picture_${vehicleSelected?.license_plate_id}_${user?.username}`);
        // console.log("all files", imageList);
      if (f.title === `vehicle_profile_picture_${vehicleSelected?.license_plate_id}_${user?.username}`) {
          return true;
      }
      return false;
    });

    console.log("picture set", pictureG);

    if (!!pictureG && pictureG.length > 0) {
      vehicleSelected.photo = pictureG?.[0]?.url_thumbnail;
    } else {
      vehicleSelected.photo = null;
    }

    console.log("final vehicle", vehicleSelected);

    setVehicleUpdate(vehicleSelected);
    setVehicleList(vehicleList.map((vsd) => {
      if (vsd.id === vehicleSelected?.id) {
        return {
          ...vsd,
          selected: true
        };
      }
      return {
        ...vsd,
        selected: false,
      };;
    }));
    dispatch(setIsShowingVehicle(true));
  };

  const unselectItems = () => {
    if (!!vehicleList && vehicleList.length > 0) {
      setVehicleList(vehicleList.map((vsh) => {
        return {
          ...vsh,
          selected: false
        };
      }));
    }
  };

  const handleCallbackForEdit = () => {
    dispatch(setIsAddingVehicle(true));
  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteVehicle(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      dispatch(fetchVehicle());
      setVehicleUpdate(null);
      setIsShowingVehicle(false);
    }, 600);
  };

  const handleEdit = (id: number) => {
    setTimeout(() => {
      dispatch(setIsAddingVehicle(true));
    }, 2000);
  };

  return (
    <MainContainer>
      <MainMenu />
      <LeftPane style={{ height: height }}>
        <LeftPaneHeader style={{ borderBottom: "1px solid " + COLORS.GRAY_SLIGHT }}>
          <div className={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          `}>
            <div className={css`width: 50%;`}>
              <TextTile>Manage Vehicles</TextTile>
              <Text391>
                {`List of Vehicles (${!!vehicleList ? vehicleList.length : "0"})`}
              </Text391>
            </div>
            <div className={css`width: 40%;margin-left: 10%;`}>
              <InputButton2
                name="add_vehicle_button"
                preIcon={<Plus size={16} />}
                title="Add New"
                color="red"
                onClick={handleAddVehicle}
                class={css`padding-left: 0px !important; padding-right: 0px !important; margin-left: 2.45%; width: 100%;background-color:${COLORS.RED} !important;line-height: 0.15vh;border-radius:7px;`}
              />
            </div>
          </div>
        </LeftPaneHeader>
        <LeftPaneSearchbox>
          <MDBCol md="12">
            <form className="form-inline">
              <InputSearch placeholder="Search by name or model..." />
            </form>
          </MDBCol>
          {/* <InputButton type="button" icon={<MDBIcon icon="search"  icon="lightbulb" size="4x"/>} /> */}
        </LeftPaneSearchbox>
        <LeftPaneList>
          {(!vehicles || vehicles.length === 0) && <img src="../assets/img/no-more-vehicle-list-empty.png"
            alt="no more vehicles default"
            style={{ marginTop: "15.5vh" }}
          />}
          <LeftPaneListItems list={vehicleList} onSelected={handleVehicleUpdate} onDelete={handleDelete} onEdit={handleEdit} />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
        {(!!isAddingVehicle) && <AddVehicleForm student={vehicleUpdate} {...props} />}
        {(!!isShowingVehicle) && <ShowVehicle student={vehicleUpdate} callbackForEdit={handleCallbackForEdit} />}
        {(!isAddingVehicle && !isShowingVehicle && (!vehicleList || vehicleList.length === 0)) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
        {(!isAddingVehicle && !isShowingVehicle && !!vehicleList && vehicleList.length !== 0) && (<img
          src="../assets/img/no-more-data-vehicle.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Staff?"}
        title2={"Are you sure you want to delete this vehicle?"}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAction={handleEraseStudent} />
    </MainContainer>
  )
}
