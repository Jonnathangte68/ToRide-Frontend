import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLocations } from './locationAPI';

export interface LocationState {
    fetchLocationStatus: 'idle' | 'success' | 'error';
    storeLocationStatus: 'idle' | 'success' | 'error';

    locations: any[];

    isAddingLocation: boolean;
    isShowingLocation: boolean;
}

const initialState: LocationState = {
    fetchLocationStatus: 'idle',
    storeLocationStatus: 'idle',
    locations: [],
    isAddingLocation: false,
    isShowingLocation: false
};

export const storeStaff = createAsyncThunk(
  '/api/owner/locations/store',
  async (newStudent: any, { rejectWithValue, getState }) => {
    // const newUser: AddStudentUserForm = {
    //   email: newStudent?.email,
    //   password: generateString(25),
    //   is_student: true,
    //   is_owner: false,
    //   is_active: false,
    //   is_staff: false,
    //   is_school_staff: false
    // };
    // const response = await sendStudent(newStudent, newUser, rejectWithValue);
    // return { ...response };
  }
);

export const fetchAllLocations = createAsyncThunk(
    '/api/owner/locations',
    //eslint-disable-next-line
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchLocations(rejectWithValue);
      return { payload: response };
    }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsAddingLocation: (state, action: PayloadAction<boolean>) => {
      state.isShowingLocation = false;
      state.isAddingLocation = action.payload;
    },
    setIsShowingLocation: (state, action: PayloadAction<boolean>) => {
      state.isAddingLocation = false;
      state.isShowingLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeStaff.pending, (state) => {
          state.storeLocationStatus = 'idle';
          state.isAddingLocation = true;
      })
      .addCase(storeStaff.fulfilled, (state, action) => {
          state.storeLocationStatus = 'success';
          state.isAddingLocation = false;
      })
      .addCase(storeStaff.rejected, (state) => {
          state.storeLocationStatus = 'error';
          state.isAddingLocation = true;
      })
      .addCase(fetchAllLocations.pending, (state) => {
        state.fetchLocationStatus = 'idle';
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.fetchLocationStatus = 'success';
        state.locations = action.payload.payload;
        console.log("on fetch locations.");
        console.log("response. ", state.locations);
      })
      .addCase(fetchAllLocations.rejected, (state) => {
        state.fetchLocationStatus = 'error';
      });
  },
});

export const { setIsAddingLocation, setIsShowingLocation } = locationSlice.actions;

// export const getTransactions = (state: RootState) => state.transaction.transactions;

export default locationSlice.reducer;
