import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateString from '../../utils/generateString';
import { fetchStudents, sendStudent } from './certificateAPI';

export interface AddStudentUserForm {
  password: string;
  email: string;
  is_student: boolean;
  is_owner: boolean;
  is_active: boolean;
  is_school_staff: boolean;
  is_staff: boolean;
};

export interface StudentElement {
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

export interface AddOwnerForm {
  email: string;
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



export interface TransactionState {
    fetchStudentStatus: 'idle' | 'success' | 'error';
    storeStudentStatus: 'idle' | 'success' | 'error';

    certificate: StudentElement[];

    isAddingStudent: boolean;
    isShowingStudent: boolean;
}

const initialState: TransactionState = {
    fetchStudentStatus: 'idle',
    storeStudentStatus: 'idle',
    certificate: [],
    isAddingStudent: false,
    isShowingStudent: false
};

export const storeStudent = createAsyncThunk(
  '/api/student/certificate',
  async (newStudent: AddOwnerForm, { rejectWithValue, getState }) => {
    const newUser: AddStudentUserForm = {
      email: newStudent?.email,
      password: generateString(25),
      is_student: true,
      is_owner: false,
      is_active: false,
      is_staff: false,
      is_school_staff: false
    };
    const response = await sendStudent(newStudent, newUser, rejectWithValue);
    return { ...response };
  }
);

export const fetchAllStudents = createAsyncThunk(
    '/api/student/transactions',
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchStudents(rejectWithValue);
      return { payload: response };
    }
);

export const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    setIsAddingStudent: (state, action: PayloadAction<boolean>) => {
      state.isShowingStudent = false;
      state.isAddingStudent = action.payload;
    },
    setIsShowingStudent: (state, action: PayloadAction<boolean>) => {
      state.isAddingStudent = false;
      state.isShowingStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeStudent.pending, (state) => {
          state.storeStudentStatus = 'idle';
          state.isAddingStudent = true;
      })
      .addCase(storeStudent.fulfilled, (state, action) => {
          state.storeStudentStatus = 'success';
          state.isAddingStudent = false;
      })
      .addCase(storeStudent.rejected, (state) => {
          state.storeStudentStatus = 'error';
          state.isAddingStudent = true;
      })
      .addCase(fetchAllStudents.pending, (state) => {
        state.fetchStudentStatus = 'idle';
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.fetchStudentStatus = 'success';
        state.certificate = action.payload.payload;
        console.log("on fetch certificate.");
        console.log("response. ", state.certificate);
      })
      .addCase(fetchAllStudents.rejected, (state) => {
        state.fetchStudentStatus = 'error';
      });
  },
});

export const { setIsAddingStudent, setIsShowingStudent } = certificateSlice.actions;

// export const getTransactions = (state: RootState) => state.transaction.transactions;

export default certificateSlice.reducer;
