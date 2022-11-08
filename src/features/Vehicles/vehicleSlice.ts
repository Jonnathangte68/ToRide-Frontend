import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchVehicles } from './vehicleAPI';

export interface AddStudentUserForm {
  password: string;
  email: string;
  is_student: boolean;
  is_owner: boolean;
  is_active: boolean;
  is_school_staff: boolean;
  is_staff: boolean;
};

export interface VehicleElement {
  id?: number;
  mobile_number?: number;
  photo?: any;
  address?: string;
  city?: string;
  zip_code?: number;
  state?: string;
  country?: string;
  due_amount?: number;
  emergecy_contact_name?: string;
  emergecy_contact_phone?: number;
  emergecy_contact_relationship?: string;
  physical_status?: string;
  license_number?: string;
  license_issue_date?: string;
  glasses?: string;
  student: number;
  school: number;
  location: number;
};

export interface VehicleState {
    fetchVehicleStatus: 'idle' | 'success' | 'error';
    storeVehicleStatus: 'idle' | 'success' | 'error';

    vehicles: VehicleElement[];

    isAddingVehicle: boolean;
    isShowingVehicle: boolean;
}

const initialState: VehicleState = {
    fetchVehicleStatus: 'idle',
    storeVehicleStatus: 'idle',
    vehicles: [],
    isAddingVehicle: false,
    isShowingVehicle: false
};

// export const storeStudent = createAsyncThunk(
//   '/api/student/students',
//   async (newStudent: AddOwnerForm, { rejectWithValue, getState }) => {
//     const newUser: AddStudentUserForm = {
//       email: newStudent?.email,
//       password: generateString(25),
//       is_student: true,
//       is_owner: false,
//       is_active: false,
//       is_staff: false,
//       is_school_staff: false
//     };
//     const response = await sendStudent(newStudent, newUser, rejectWithValue);
//     return { ...response };
//   }
// );

export const fetchAllVehicles = createAsyncThunk(
    '/api/student/transactions',
    //eslint-disable-next-line
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchVehicles(rejectWithValue);
      return { payload: response };
    }
);

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setIsAddingVehicle: (state, action: PayloadAction<boolean>) => {
      console.log("is showing false");
      state.isShowingVehicle = false;
      state.isAddingVehicle = action.payload;
    },
    setIsShowingVehicle: (state, action: PayloadAction<boolean>) => {
      state.isAddingVehicle = false;
      state.isShowingVehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(storeStudent.pending, (state) => {
    //       state.storeStudentStatus = 'idle';
    //       state.isAddingStudent = true;
    //   })
    //   .addCase(storeStudent.fulfilled, (state, action) => {
    //       state.storeStudentStatus = 'success';
    //       state.isAddingStudent = false;
    //   })
    //   .addCase(storeStudent.rejected, (state) => {
    //       state.storeStudentStatus = 'error';
    //       state.isAddingStudent = true;
    //   })
      .addCase(fetchAllVehicles.pending, (state) => {
        state.fetchVehicleStatus = 'idle';
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.fetchVehicleStatus = 'success';
        state.vehicles = action.payload.payload;
        console.log("on fetch students.");
        console.log("response. ", state.vehicles);
      })
      .addCase(fetchAllVehicles.rejected, (state) => {
        state.fetchVehicleStatus = 'error';
      });
  },
});

export const { setIsAddingVehicle, setIsShowingVehicle } = vehicleSlice.actions;

// export const getTransactions = (state: RootState) => state.transaction.transactions;

export default vehicleSlice.reducer;
