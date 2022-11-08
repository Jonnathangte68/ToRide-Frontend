import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import authReducer from '../features/Auth/authSlice';
import ownerRegisterReducer from '../features/OwnerRegister/ownerRegisterSlice';
import transactionSlice from '../features/Transaction/transactionSlice';
import studentsSlice from '../features/Students/studentsSlice';
import staffSlice from '../features/Staff/staffSlice';
import vehicleSlice from '../features/Vehicles/vehicleSlice';
import locationSlice from '../features/Location/locationSlice';
import simulatorSlice from '../features/Simulator/simulatorSlice';
import demoSlice from '../features/Demo/demoSlice';

const reducers = combineReducers({
  auth: authReducer,  
  ownerRegister: ownerRegisterReducer,
  transaction: transactionSlice,
  students: studentsSlice,
  staff: staffSlice,
  vehicle: vehicleSlice,
  location: locationSlice,
  simulator: simulatorSlice,
  demo: demoSlice,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // you can also type middlewares manually
        thunk as ThunkMiddleware
      )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
