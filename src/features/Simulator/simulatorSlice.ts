import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateString from '../../utils/generateString';
import { fetchSimulators, sendSimulator } from './simulatorAPI';

export interface TransactionState {
    fetchSimulatorStatus: 'idle' | 'success' | 'error';
    storeSimulatorStatus: 'idle' | 'success' | 'error';
    storeSimulatorError?: string;

    simulators: any[];

    isAddingSimulator: boolean;
    isShowingSimulator: boolean;
}

const initialState: TransactionState = {
    fetchSimulatorStatus: 'idle',
    storeSimulatorStatus: 'idle',
    simulators: [],
    isAddingSimulator: false,
    isShowingSimulator: false
};

export const storeStudent = createAsyncThunk(
  '/api/student/simulators',
  async (newStudent: any, { rejectWithValue }) => {
    //eslint-disable-next-line
    const newUser: any = {
      email: newStudent?.email,
      password: generateString(25),
      is_student: true,
      is_owner: false,
      is_active: false,
      is_staff: false,
      is_school_staff: false
    };
    const response = await sendSimulator(newStudent, rejectWithValue);
    return { ...response };
  }
);

export const fetchAllSimulators = createAsyncThunk(
    '/api/student/simulatores',
    //eslint-disable-next-line
    async (undefined, { rejectWithValue }) => {
      const response = await fetchSimulators(rejectWithValue);
      return { payload: response };
    }
);

export const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setIsAddingSimulator: (state, action: PayloadAction<boolean>) => {
      state.isShowingSimulator = false;
      state.isAddingSimulator = action.payload;
    },
    setIsShowingSimulator: (state, action: PayloadAction<boolean>) => {
      state.isAddingSimulator = false;
      state.isShowingSimulator = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeStudent.pending, (state) => {
          state.storeSimulatorStatus = 'idle';
          state.storeSimulatorError = undefined;
          state.isAddingSimulator = true;
      })
      .addCase(storeStudent.fulfilled, (state, action) => {
          state.storeSimulatorStatus = 'success';
          state.storeSimulatorError = undefined;
          state.isAddingSimulator = false;
      })
      .addCase(storeStudent.rejected, (state, action) => {
          state.storeSimulatorStatus = 'error';
          console.log("error and payload, ", action.payload);
          state.storeSimulatorError = action.payload as string;
          state.isAddingSimulator = true;
      })
      .addCase(fetchAllSimulators.pending, (state) => {
        state.fetchSimulatorStatus = 'idle';
      })
      .addCase(fetchAllSimulators.fulfilled, (state, action) => {
        state.fetchSimulatorStatus = 'success';
        state.simulators = action.payload.payload;
        console.log("on fetch simulators.");
        console.log("response. ", state.simulators);
      })
      .addCase(fetchAllSimulators.rejected, (state) => {
        state.fetchSimulatorStatus = 'error';
      });
  },
});

export const { setIsAddingSimulator, setIsShowingSimulator } = simulatorSlice.actions;

export default simulatorSlice.reducer;
