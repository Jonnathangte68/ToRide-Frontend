import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_BASE_API } from '../../utils/globals';

interface RegisterOwnerForm {
  school_name: string;
  business_email: string;
  mobile_number: string;
  password: string;
}

export interface AuthState {
  registerOwnerStatus: 'idle' | 'success' | 'error';
  registerOwnerError?: any;
  owners: RegisterOwnerForm[],
}

const initialState: AuthState = {
  registerOwnerStatus: 'idle',

  owners: []
};

export const registerOwnerAsync = createAsyncThunk(
  'api/owner/',
  async (registerOwnerForm: RegisterOwnerForm, { rejectWithValue, getState }) => {
    try {
      const { business_email: username, password } = registerOwnerForm;
      const registerOwnerAxiosInstance = axios.create();
      const resp = await registerOwnerAxiosInstance.post(`${SERVER_BASE_API}/auth/users/`, {
        type: "app/registerOwnerUser",
        email: username,
        password: password,
        is_owner: true,
        is_active: true,
        is_student: false,
        is_school_staff: false,
        is_staff: false,
      });
      console.log("request resp.data", resp.data);
      const { id } = resp.data; 
      console.log("request from user id coming", id);
      const resp2 = await registerOwnerAxiosInstance.post(`${SERVER_BASE_API}/admin/owners-profiles`, {
        user: id
      });
      console.log("response 2", resp2);
      return resp.data;
    } catch(err) {
      console.log("err", err);
      console.log("err?.response", err?.response);
      console.log("err?.response?.data", err?.response?.data);
      console.log("err?.response?.data?.message", err?.response?.data?.message);
      const message = {};
      message["error_message"] = (err as any).response?.data;
      message["pre_state"] = registerOwnerForm;
      return rejectWithValue(message);
    }
  }
);

export const ownerRegisterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetOwnerRegisterErrors: (state, action: PayloadAction<boolean>) => {
      state.registerOwnerError = undefined;
    },
    clearOwnerRegistration: (state, action: PayloadAction<boolean>) => {
      state.registerOwnerStatus = 'idle';
      state.registerOwnerError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOwnerAsync.pending, (state) => {
        state.registerOwnerStatus = 'idle';
      })
      .addCase(registerOwnerAsync.fulfilled, (state, action) => {
        console.log("result owner register", action.payload);
        state.owners.push(action.payload);
        console.log("after register ", state.owners);
        state.registerOwnerStatus = 'success';
      })
      .addCase(registerOwnerAsync.rejected, (state, action) => {
        console.log("rebounce after non right save.");
        console.log(action.payload);
        console.log("map result.");
        state.registerOwnerStatus = 'error';
        // @ts-ignore
        state.registerOwnerError = action.payload;
      });
  },
});

// export const {  } = ownerRegisterSlice.actions;

// export const getUser = (state: RootState) => state.auth.user;
// export const getValueStored = (state: RootState) => state.auth.valueStored;

export const { resetOwnerRegisterErrors, clearOwnerRegistration } = ownerRegisterSlice.actions;

export default ownerRegisterSlice.reducer;
