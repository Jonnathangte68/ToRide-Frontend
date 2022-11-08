import styled from "@emotion/styled";
import { MDBCol } from "mdbreact";
import InputSearch from "../../../components/InputSearch/InputSearch";
import MainMenu from "../../../components/MainMenu/MainMenu";
import COLORS from "../../../utils/colors";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import LeftPaneListItems from "../../../components/LeftPaneListItems/Location";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ShowLocation from "../ShowLocation";
import { css } from "@emotion/css";
import InputButton2 from "../../../components/InputButton2/InputButton2";
import { Plus } from "react-bootstrap-icons";
import AddLocationForm from "../AddLocationForm";
import DeleteModal from "../../../components/DeleteModal";
import { deleteLocation, fetchLocation, selectMenuOption, setIsAddingLocation, setIsShowingLocation } from "../../Demo/demoSlice";

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

export default function ManageLocation(props: any) {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.demo.locations);
  const [locationUpdate, setLocationUpdate] = useState();
  const [locationList, setLocationList] = useState<any>();
  const isAddingLocation = useAppSelector((state) => state.demo.isAddingLocation);
  const isShowingLocation = useAppSelector((state) => state.demo.isShowingLocation);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isFetchingLocation = useAppSelector((state) => state.demo.isFetchingLocation);
  const isFetchingLocationError = useAppSelector((state) => state.demo.isFetchingLocationError);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Add Effect when loading screen.
    dispatch(setIsShowingLocation(false));
    dispatch(setIsAddingLocation(false));

    dispatch(selectMenuOption(6));
  }, [dispatch]);

  useEffect(() => {
    if (!!locations && locations.length > 0) {
      const result = locations.map((location: any) => {
        console.log("locations in map 101 ", location);
        return {
          id: location?.id,
          name: location?.name, 
          code: location?.code, // student?.student?.email,
          location_type: location?.location_type,
          is_Active: location?.is_Active,
          selected: false
        };
      });
      console.log("result end ", result);
      setLocationList(result);
    }
  }, [locations, isFetchingLocation, isFetchingLocationError]);

  const handleLocationSelect = (id: number) => {
    unselectItems();
    const locationSelected = locations[id];
    console.log("location selected ", locationSelected);
    setLocationUpdate(locationSelected);
    // color of selected FF4311
    console.log("location list", locationList);
    console.log("locations", locationSelected);
    setLocationList(locationList.map((location) => {
      if (location.id === locationSelected?.id) {
        return {
          ...location,
          selected: true
        };
      }
      return {
        ...location,
        selected: false
      };
    }));
    dispatch(setIsShowingLocation(true));
  };

  const unselectItems = () => {
    if (!!locationList && locationList.length > 0) {
      setLocationList(locationList.map((location) => {
        return {
          ...location,
          selected: false
        };
      }));
    }
  };

  const handleAddLocation = () => {
    setLocationUpdate(null);
    dispatch(setIsAddingLocation(true));
  };

  const handleCallbackForEdit = () => {
    console.log("handle callback for edit lu=", locationUpdate);
    dispatch(setIsAddingLocation(true));
  };

  const handleDelete = (id: number) => {
    console.log("id to delete ", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEraseStudent = () => {
    console.log("erase this.");
    dispatch(deleteLocation(deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    setTimeout(() => {
      dispatch(fetchLocation());
      setLocationUpdate(null);
      setIsShowingLocation(false);
    }, 600);
  };

  const handleEdit = (id: number) => {
    setTimeout(() => {
      dispatch(setIsAddingLocation(true));
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
              <TextTile>Manage Locations</TextTile>
              <Text391>
                {`List of Location (${!!locationList ? locationList.length : "0"})`}
              </Text391>
            </div>
            <div className={css`width: 40%;margin-left: 10%;`}>
              <InputButton2
                name="add_location_button"
                preIcon={<Plus size={16} />}
                title="Add Location"
                color="red"
                onClick={handleAddLocation}
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
          {(!locationList || locationList === 0) && <img src="../assets/img/no-more-location-icon-manage.png"
            alt="no more locations default"
            style={{ marginTop: "15.5vh" }}
          />}
          <LeftPaneListItems
            list={locationList}
            onSelected={handleLocationSelect}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </LeftPaneList>
      </LeftPane>
      <RightPane>
      {(!!isAddingLocation) && <AddLocationForm student={locationUpdate} {...props} />}
      {(!!isShowingLocation) && <ShowLocation location={locationUpdate} callbackForEdit={handleCallbackForEdit} {...props} />}
      {(!isAddingLocation && !isShowingLocation) && (<img
          src="../assets/img/No-moredatano-more-data-messages.png"
          alt="no more data selecting students"
        />)}
      </RightPane>
      <DeleteModal
        title1={"Delete Location?"}
        title2={"Are you sure you want to delete location?"}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAction={handleEraseStudent} />
    </MainContainer>
  )
}
