import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateString from '../../utils/generateString';
import { fetchStaffs, sendStaff } from './staffAPI';

export interface StaffElement {
  id?: number;
  mobile_number?: number;
  photo?: any;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: number;
  emergency_contact_relation?: string;
  license_number?: string;
  license_issue_date?: string;
  license_end_date?: string;
  physical_status?: string;
  glasses?: string;
  school: number;
  school_staff: number;
};

export interface StaffState {
    fetchStaffStatus: 'idle' | 'success' | 'error';
    storeStaffStatus: 'idle' | 'success' | 'error';

    staffs: StaffElement[];

    isAddingStaff: boolean;
    isShowingStaff: boolean;
}

const initialState: StaffState = {
    fetchStaffStatus: 'idle',
    storeStaffStatus: 'idle',
    staffs: [],
    isAddingStaff: false,
    isShowingStaff: false
};

export const storeStaff = createAsyncThunk(
  '/api/owner/staffs/store',
  async (newStudent: any, { rejectWithValue, getState }) => {
    const newUser = {
      email: newStudent?.email,
      password: generateString(25),
      is_student: true,
      is_owner: false,
      is_active: false,
      is_staff: false,
      is_school_staff: false
    };
    const response = await sendStaff(newStudent, newUser, rejectWithValue);
    return { ...response };
  }
);

export const fetchAllStaffs = createAsyncThunk(
    '/api/owner/staffs',
    //eslint-disable-next-line
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchStaffs(rejectWithValue);
      return { payload: response };
    }
);

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setIsAddingStaff: (state, action: PayloadAction<boolean>) => {
      state.isShowingStaff = false;
      state.isAddingStaff = action.payload;
    },
    setIsShowingStaff: (state, action: PayloadAction<boolean>) => {
      state.isAddingStaff = false;
      state.isShowingStaff = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeStaff.pending, (state) => {
          state.storeStaffStatus = 'idle';
          state.isAddingStaff = true;
      })
      .addCase(storeStaff.fulfilled, (state, action) => {
          state.storeStaffStatus = 'success';
          state.isAddingStaff = false;
      })
      .addCase(storeStaff.rejected, (state) => {
          state.storeStaffStatus = 'error';
          state.isAddingStaff = true;
      })
      .addCase(fetchAllStaffs.pending, (state) => {
        state.fetchStaffStatus = 'idle';
      })
      .addCase(fetchAllStaffs.fulfilled, (state, action) => {
        state.fetchStaffStatus = 'success';
        state.staffs = action.payload.payload;
        console.log("on fetch staffs.");
        console.log("response. ", state.staffs);
      })
      .addCase(fetchAllStaffs.rejected, (state) => {
        state.fetchStaffStatus = 'error';
      });
  },
});

export const { setIsAddingStaff, setIsShowingStaff } = staffSlice.actions;

// export const getTransactions = (state: RootState) => state.transaction.transactions;

export default staffSlice.reducer;
