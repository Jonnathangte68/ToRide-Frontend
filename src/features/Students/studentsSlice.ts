import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateString from '../../utils/generateString';
import { fetchStudents, sendStudent } from './studentsAPI';

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
    storeStudentError?: string;

    students: StudentElement[];

    isAddingStudent: boolean;
    isShowingStudent: boolean;
}

const initialState: TransactionState = {
    fetchStudentStatus: 'idle',
    storeStudentStatus: 'idle',
    students: [],
    isAddingStudent: false,
    isShowingStudent: false
};

export const storeStudent = createAsyncThunk(
  '/api/student/students',
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
    //eslint-disable-next-line
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchStudents(rejectWithValue);
      return { payload: response };
    }
);

export const studentsSlice = createSlice({
  name: 'students',
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
          state.storeStudentError = undefined;
          state.isAddingStudent = true;
      })
      .addCase(storeStudent.fulfilled, (state, action) => {
          state.storeStudentStatus = 'success';
          state.storeStudentError = undefined;
          state.isAddingStudent = false;
      })
      .addCase(storeStudent.rejected, (state, action) => {
          state.storeStudentStatus = 'error';
          console.log("error and payload, ", action.payload);
          state.storeStudentError = action.payload as string;
          state.isAddingStudent = true;
      })
      .addCase(fetchAllStudents.pending, (state) => {
        state.fetchStudentStatus = 'idle';
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.fetchStudentStatus = 'success';
        state.students = action.payload.payload;
        console.log("on fetch students.");
        console.log("response. ", state.students);
      })
      .addCase(fetchAllStudents.rejected, (state) => {
        state.fetchStudentStatus = 'error';
      });
  },
});

export const { setIsAddingStudent, setIsShowingStudent } = studentsSlice.actions;

// export const getTransactions = (state: RootState) => state.transaction.transactions;

export default studentsSlice.reducer;
