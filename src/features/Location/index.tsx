import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RequireAuth from "../Auth/RequireAuth";
import { fetchLocation } from "../Demo/demoSlice";
import LocationScreen from "./LocationScreen/LocationScreen";

export default function Location(props: any) {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.demo.locations);

  console.log("locations from state global demo ", locations);

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);
  
  return (
    <RequireAuth>
        <LocationScreen locationList={locations} {...props} />
    </RequireAuth>
  )
}
