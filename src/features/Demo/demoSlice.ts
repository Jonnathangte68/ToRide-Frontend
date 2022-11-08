/* eslint-disable no-shadow-restricted-names */
import { CombinedState, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import PublitioAPI from 'publitio_js_sdk';
import { RootState } from '../../app/store';
import generateString from '../../utils/generateString';
import { getAuthHeader, HEADERS_DEFAULT } from '../../utils/getAuthHeaders';
import { PUBLITIO_API_KEY, PUBLITIO_API_SECRET, SERVER_BASE_API } from '../../utils/globals';
import { AuthState } from '../Auth/authSlice';
import { LocationState } from '../Location/locationSlice';
import { StaffState } from '../Staff/staffSlice';
import { TransactionState } from '../Transaction/transactionSlice';
import { VehicleState } from '../Vehicles/vehicleSlice';
import jwt_decode from "jwt-decode";

type GlobalStateType = CombinedState<{
  auth: AuthState;
  ownerRegister: AuthState;
  transaction: TransactionState;
  students: TransactionState;
  staff: StaffState;
  vehicle: VehicleState;
  location: LocationState;
  simulator: TransactionState;
  demo: DemoState;
}>;

export interface DemoState {

    // Data Sources
    users: any;
    owners: any;
    students: any;
    staffs: any;
    vehicles: any;
    classes: any;
    locations: any;
    transactions: any;
    ownerProfiles: any;
    userImageVault: any;
    calendars: any;
    global_location?: any;

    // Auth

    userlogin: any;
    userName?: string;
    remmeberMe: boolean;
    userLoginError?: any;

    // States

    isAddingStudent: boolean;
    isShowingStudent: boolean;
    isAddingStaff: boolean;
    isShowingStaff: boolean;
    isAddingVehicle: boolean;
    isShowingVehicle: boolean;
    isShowingClass: boolean;
    isAddingClass: boolean;
    isShowingClassInformation: boolean;
    isAddingLocation: boolean;
    isShowingLocation: boolean;
    isAddingTransaction: boolean;
    isShowingTransaction: boolean;

    // async fetch status
    isFetchingOwnerProfiles: 'idle' | 'success' | 'error';
    isFetchingVehicles: 'idle' | 'success' | 'error';
    isFetchingTransactions: 'idle' | 'success' | 'error';
    isFetchingStudent: 'idle' | 'success' | 'error';
    isFetchingLocation: 'idle' | 'success' | 'error';
    isFetchingClass: 'idle' | 'success' | 'error';
    isFetchingVehicle: 'idle' | 'success' | 'error';
    isFetchingStaff: 'idle' | 'success' | 'error';

    isUpdatingOwnerProfile: 'idle' | 'success' | 'error';

    isFetchingStudentError?: string;
    isFetchingTransactionError?: string;
    isFetchingLocationError?: string;
    isFetchingClassError?: string;
    isFetchingVehicleError?: string;
    isFetchingStaffError?: string;
    registerStudentError?: any;
    updateOwnerProfileError?: any;

    // UI controls
    menuOptionSelected: number;
}

const initialState: DemoState = {
    users: [],
    owners: [],
    students: [],
    staffs: [],
    vehicles: [],
    classes: [],
    locations: [],
    transactions: [],
    userlogin: {},
    ownerProfiles: {},
    userImageVault: [],
    calendars: [],

    remmeberMe: false,

    isAddingStudent: false,
    isShowingStudent: false,
    isAddingStaff: false,
    isShowingStaff: false,
    isAddingVehicle: false,
    isShowingVehicle: false,
    isShowingClass: false,
    isAddingClass: false,
    isShowingClassInformation: false,
    isAddingLocation: false,
    isShowingLocation: false,
    isAddingTransaction: false,
    isShowingTransaction: false,

    isFetchingOwnerProfiles: 'idle',
    isFetchingVehicles: 'idle',
    isFetchingTransactions: 'idle',

    isFetchingStudent: 'idle',
    isFetchingLocation: 'idle',
    isFetchingClass: 'idle',
    isFetchingVehicle: 'idle',
    isFetchingStaff: 'idle',
    isUpdatingOwnerProfile: 'idle',

    menuOptionSelected: 0
};


/** Files management */
const publitio = new PublitioAPI(PUBLITIO_API_KEY, PUBLITIO_API_SECRET);


export const addVehicleBackend = createAsyncThunk(
  '/api/admin/vehicles',
  async (newVehicle: any, { rejectWithValue, getState }) => {
    try {
      const vehicleForm = {
        v_model: newVehicle?.model,
        v_type: newVehicle?.vehicle_type,
        vin: newVehicle?.vin,
        license_plate_id: newVehicle?.plate,
        color: newVehicle?.color,
        odo_meter: newVehicle?.odometer,
        service_date: newVehicle?.service_date,
        insurance_due_date: newVehicle?.insurance_date,
        oil_change_date: newVehicle?.oil_change_due_date,
        inspection_date: newVehicle?.inspection_due_date,
        tire_rotation_date: newVehicle?.tire_rotation_due_date,
        photo: newVehicle?.photo,
        location: 1
      };
      const addStaffAxiosInstance = axios.create();
      const resp = await addStaffAxiosInstance.post(`${SERVER_BASE_API}/admin/vehicles`, vehicleForm);
      return resp.data;
  } catch (err) {
      const message = (err as any).response?.data?.message;
      return rejectWithValue(message);
  }
  }
);

export const authOwner = createAsyncThunk(
  '/api/auth/sign-in/',
  async (userSignin: any, { rejectWithValue, getState }) => {
    try {
      const userSignInForm = {
        email: userSignin?.username,
        password: userSignin?.password
      };

      const axiosInstance = axios.create();
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/auth/sign-in/`, userSignInForm);

      if (!!resp?.data?.access) {
        const decodedToken = jwt_decode(resp?.data?.access);

        let userType = null;

        if (!!(decodedToken as any)?.is_superuser) {
          userType = "admin";
        }

        if (!!(decodedToken as any)?.is_staff || !!(decodedToken as any)?.is_owner) {
          userType = "owner";
        }

        if (!!(decodedToken as any)?.is_student) {
          userType = "student";
        }
        return { username: userSignin?.username, type: userType, ...resp.data };
      }
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const saveStudent = createAsyncThunk(
  '/api/admin/students/store',
  async (student: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const user: any = {
        id: 1,
        email: student?.email,
        password: generateString(25),
        is_student: true,
        is_owner: false,
        is_active: false,
        is_staff: false,
        is_school_staff: false
      };

      /*
      const fileUpload = {
        files: student?.photo,
        description: `profile_picture_${student?.email}`
      };
      
      const MB = 1000000;
      try {
        const Blob = new Blob([fileReader.result], {
          // This will set the mimetype of the file
          type: fileUpload?.files?.type
        });
        const BlobName = fileUpload?.files?.name;
        if (Blob.size > MB) return new Error('File size is to big');

        // Initializing form data and passing the file as a param
        const formData = new FormData();
        // file - field name, this will help you to read file on backend
        // Blob - main data to send
        // BlobName - name of the file, default it will be name of your input
        formData.append('files', Blob, BlobName);
        // Append json data
        formData.append('some-key', "askdbgahsgoadnlkg")
        formData.append('description', fileUpload?.description)

        // then just send it as a body with post request
        fetch(`${SERVER_BASE_API}/admin/Media_files`, {
        method: 'POST',
        body: formData
        })
        // Handle the rest
        .then()
      } catch (err) {
        console.warn("error uploading file.");
        console.error(err);
      }
      
      console.log("file upload ", fileUpload);
      const newFile = await axiosInstance.post(`${SERVER_BASE_API}/admin/Media_files`, fileUpload);
      console.log("new file created", newFile);
      */


      console.log("student", student);
      const newUser = await axiosInstance.post(`${SERVER_BASE_API}/admin/auth/users/`, user);
      console.log("new user add result", newUser);
      student['student'] = newUser.data?.id;
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/admin/students`, { ...student, location_id: 1 });
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const registerStudentAsync = createAsyncThunk(
  'api/student/register',
  async (student: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const user: any = {
        id: 1,
        email: student?.email,
        password: student?.password,
        is_student: true,
        is_owner: false,
        is_active: true,
        is_staff: false,
        is_school_staff: false
      };
      console.log("student", student);
      const newUser = await axiosInstance.post(`${SERVER_BASE_API}/admin/auth/users/`, user);
      console.log("new user add result", newUser);
      student.student = newUser.data?.id;
      student.location = 1;
      student.glasses = "no";
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/admin/students`, student);
      return resp.data;
    } catch (err) {
      // const message = (err as any).response?.data;
      // return rejectWithValue(message);
      console.log("studen reg err", err);
      console.log("studen reg err?.response", err?.response);
      console.log("studen reg err?.response?.data", err?.response?.data);
      console.log("studen reg err?.response?.data?.message", err?.response?.data?.message);
      const message = {};
      message["error_message"] = (err as any).response?.data;
      message["pre_state"] = student;
      return rejectWithValue(message);
    }
  }
);

export const fetchStudent = createAsyncThunk(
  '/api/admin/students/fetch',
  // eslint-disable-next-line no-shadow-restricted-names
  async (undefined, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/students`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchOwnerProfiles = createAsyncThunk(
  '/api/admin/owners-profiles',
  // eslint-disable-next-line no-shadow-restricted-names
  async (undefined, { rejectWithValue, getState }) => {
    try {
      console.log("dispatched fowners");
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/owners-profiles`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const updateOwnerProfile = createAsyncThunk(
  '/api/admin/owners-profiles/update',
  async (updatedOwner: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const axiosInstance = axios.create();
      // @ts-ignore
      const ownerProfileList = getState()?.demo?.ownerProfiles;
      const locationId = (getState() as any)?.demo?.global_location;
      // @ts-ignore
      const userEmail = getState()?.demo?.userlogin?.username;
      // @ts-ignore
      const ownerProfileIdx = _.findIndex(ownerProfileList, (owner) => owner?.user?.email === userEmail);
      const ownerProfile = ownerProfileList[ownerProfileIdx];
      // ownerProfile.user = ownerProfile?.user?.id;
      console.log("UPDATED OWNER");
      console.log(updatedOwner);
      const payload = { ...ownerProfile, ...updatedOwner };
      payload.user = payload?.user?.id;
      console.log("payload before to go", payload);

      console.log("on update owner assign location.");
      await axiosInstance.post(`${SERVER_BASE_API}/admin/location-owners`, { location_id: locationId, owner_id: 0 });


      const resp = await axiosInstance.put(`${SERVER_BASE_API}/admin/owners-profiles/${ownerProfile?.id}`, payload);
      dispatch(fetchOwnerProfiles());
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const saveStaff = createAsyncThunk(
  '/api/admin/staffs/store',
  async (staff: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const user: any = {
        id: 1,
        email: staff?.email,
        password: generateString(25),
        is_student: true,
        is_owner: false,
        is_active: false,
        is_staff: true,
        is_school_staff: false
      };
      // const userResponse = await axiosInstance.get(`${SERVER_BASE_API}/admin/auth/users/`, { headers });
      // console.log("test response users", userResponse?.data?.[0].id);
      const newUser = await axiosInstance.post(`${SERVER_BASE_API}/admin/auth/users/`, user);
      console.log("new user add result", newUser);
      staff.school_staff = newUser.data?.id;
      console.log("staff add more ", { ...staff, location_id: 1 });
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/admin/staffs`, { ...staff, location_id: 1 });
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchStaff = createAsyncThunk(
  '/api/admin/staffs/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/staffs`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchVehicle = createAsyncThunk(
  '/api/admin/vehicles/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/vehicles`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const saveClass = createAsyncThunk(
  '/api/admin/admin/theory_classes/store',
  async (classe: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      // Temporary remove
      const payload = {
        ...classe,
        class_instructor: 1,
        students: [1],
        location_id: 1
      };
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/admin/theory_classes`, payload);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchClass = createAsyncThunk(
  '/api/admin/admin/theory_classes/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/theory_classes`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchLocation = createAsyncThunk(
  '/api/admin/locations/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/locations`);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const saveLocation = createAsyncThunk(
  '/api/admin/locations/store',
  async (location: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const resp = await axiosInstance.post(`${SERVER_BASE_API}/admin/locations`, location);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  '/api/admin/students/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/students/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/students/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  '/api/admin/staff/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/staffs/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/staffs/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  '/api/admin/vehicles/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/vehicles/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/vehicles/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteClass = createAsyncThunk(
  '/api/admin/theory_classes/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/theory_classes/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/theory_classes/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  '/api/admin/locations/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/locations/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/locations/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const deleteSimulator = createAsyncThunk(
  '/api/admin/simulatores/delete',
  async (student_id: any, { rejectWithValue, getState }) => {
    try {
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      console.log("to delete this", `/admin/simulatores/${student_id}`);
      const resp = await axiosInstance.delete(`${SERVER_BASE_API}/admin/simulatores/${student_id}`, { headers });
      console.log("result delete", resp.data);
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const toggleStudentStatus = createAsyncThunk(
  '/api/admin/student/status',
  async (student_id: any, { rejectWithValue, getState, dispatch }) => {
    try {


      // CHECK HOW TO MODIFY STATUS ONLY NEEDS AN ENDOPOINT REQUEST FOR THIS.

      /*
      console.log("in toggleStudentStatus");
      const axiosInstance = axios.create();
      // @ts-ignore
      const studentList = getState()?.demo?.students;
      // @ts-ignore
      const studentIdx = _.findIndex(studentList, (student) => student?.id === student_id);

      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };      
      const student = studentList[studentIdx];

      const usersRequest = await axiosInstance.get(
        `${SERVER_BASE_API}/admin/auth/users/${student?.student?.id}`,
        { headers }
      );
      const user = (getState() as any)?.demo?.users?.filter(usr => usr?.id === student?.student?.id);
      console.log("users first result",  usersRequest);
      console.log("student test", student);
      console.log("student to update status", user);

      const payload = { ...user };
      payload.is_active = !payload.is_active;

      await axiosInstance.put(`${SERVER_BASE_API}/admin/auth/users/${user?.id}`, payload);
      dispatch(fetchStudent());
      */
    } catch (err) {
      console.error(err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchTransaction = createAsyncThunk(
  '/api/student/transactions',
  async (undefined, { rejectWithValue, getState }) => {
    try {
        const axiosInstance = axios.create();
        const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/transactions`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
  }
);

export const fetchImageVault = createAsyncThunk(
  '/api/images/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      console.log("fetchImageVault start");
        const resp = await publitio.call('/files/list', 'GET', { offset: '0', limit: '1000' });
        console.log("fetchImageVault response", resp);
        console.log("fetchImageVault response data argument", resp.files);
        return resp.files;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  '/api/admin/students/update',
  async (updatedStudent: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const axiosInstance = axios.create();
      // @ts-ignore
      const studentList = getState()?.demo?.students;
      // @ts-ignore
      const studentIdx = _.findIndex(studentList, (student) => student?.student?.email === updatedStudent?.email);
      const student = studentList[studentIdx];
      // ownerProfile.user = ownerProfile?.user?.id;
      console.log("UPDATED STUDENT", updatedStudent);
      console.log(updatedStudent);
      console.log(student);
      console.log(studentList);
      const payload = { ...student, ...updatedStudent };
      payload.user = payload?.user?.id;
      payload.student = payload?.student?.id;
      payload.location = payload?.location?.id;
      payload.school = payload?.location?.school?.id;
      console.log("payload before to go", payload);
      const resp = await axiosInstance.put(`${SERVER_BASE_API}/admin/students/${student?.id}`, payload);
      dispatch(fetchStudent());
      return resp.data;
    } catch (err) {
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const updateStaff = createAsyncThunk(
  '/api/admin/staffs/update',
  async (updatedStudent: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const axiosInstance = axios.create();
      console.log("update staff in slice.");
      // @ts-ignore
      const studentList = getState()?.demo?.staffs;
      // @ts-ignore
      const studentIdx = _.findIndex(studentList, (student) => {
        console.log("email to check and compare ");
        // @ts-ignore
        console.log("1.", student?.school_staff?.email);
        console.log("2.", updatedStudent?.email);
        // @ts-ignore
        return student?.school_staff?.email === updatedStudent?.email;
      });
      const student = studentList[studentIdx];
      // ownerProfile.user = ownerProfile?.user?.id;
      console.log("UPDATED STUDENT", updatedStudent);
      console.log(updatedStudent);
      console.log(student);
      console.log(studentList);
      const payload = { ...student, ...updatedStudent };
      payload.school_staff = payload?.school_staff?.id;
      console.log("payload before to go", payload);
      const resp = await axiosInstance.put(`${SERVER_BASE_API}/admin/staffs/${student?.id}`, payload);
      dispatch(fetchStaff());
      return resp.data;
    } catch (err) {
      console.error(err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const updateVehicle = createAsyncThunk(
  '/api/admin/vehicles/update',
  async (updatedStudent: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const axiosInstance = axios.create();
      console.log("update staff in slice.");
      // @ts-ignore
      const studentList = getState()?.demo?.staffs;
      // @ts-ignore
      const studentIdx = _.findIndex(studentList, (student) => student?.id === updatedStudent?.id);
      const student = studentList[studentIdx];
      // ownerProfile.user = ownerProfile?.user?.id;
      console.log("UPDATED STUDENT", updatedStudent);
      console.log(updatedStudent);
      console.log(student);
      console.log(studentList);
      const payload = { ...student, ...updatedStudent };
      console.log("payload before to go", payload);
      const resp = await axiosInstance.put(`${SERVER_BASE_API}/admin/vehicles/${student?.id}`, payload);
      dispatch(fetchStaff());
      return resp.data;
    } catch (err) {
      console.error(err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const updateLocation = createAsyncThunk(
  '/api/admin/locations/update',
  async (updatedStudent: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const axiosInstance = axios.create();
      console.log("update staff in slice.");
      // @ts-ignore
      const studentList = getState()?.demo?.locations;

      const studentIdx = _.findIndex(studentList, (student: any) => student?.id === updatedStudent?.id);
      const student = studentList[studentIdx];
      console.log("on update location", student);
      console.log("2-on update location k->", student);
      // student['school'] = student?.school?.id;
      const school_id = student?.school?.id;
      const payload = { ...student, ...updatedStudent, school: school_id };
      const resp = await axiosInstance.put(`${SERVER_BASE_API}/admin/locations/${student?.id}`, payload);
      dispatch(fetchLocation());
      return resp.data;
    } catch (err) {
      console.error(err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const scheduleNewCalendarEvent = createAsyncThunk(
  '/api/calendars/user/events/store',
  async (calendarDetails: any, { rejectWithValue, getState }) => {
    try {

      // INPUT REQUIRED
      // Example
      // E.g
      // This is info from the calender modal.
      // 
      // const calendarDetails = JSON.stringify({
      //   date_start: "2022-15-15",
      //   date_end: "2022-15-16",
      //   student: [1,2,3],
      //   instructor: 1,
      //   class: 0,
      //   vehicle: 0
      // });

      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      const studentList = (getState() as any)?.demo?.students;

      calendarDetails?.student?.map(async (stdId) => {
          // id will come from the selected students in the modal.
          const studentId = studentList.filter(
            st => st.id === stdId
          )?.[0]?.id;

          const calendarName = `student-calendar-${studentId}`;

          const createdCalendars = await axiosInstance.get(
            `${SERVER_BASE_API}/calendars/user/calendars/`,
            { headers }
          );

          let createCalendarResponse = null;
          createCalendarResponse = createdCalendars?.data?.filter(calendar => calendar.name === calendarName);

          // If student doesnt have calendar create 1 automatically

          let calendarId = null;

          if (!!createCalendarResponse && createCalendarResponse.length > 0) {
            calendarId = createCalendarResponse?.[0]?.id;
          }

          if (!calendarId) {
            createCalendarResponse = await axiosInstance.post(
              `${SERVER_BASE_API}/calendars/user/calendars/`,
              {
                name: calendarName,
                color: "black"
              },
              { headers }
            );

            calendarId = createCalendarResponse?.data?.id;
          }

          const rep = await axiosInstance.post(
            `${SERVER_BASE_API}/calendars/user/events/`,
            {
              calendar: calendarId,
              title: `calendar-student-${stdId}-event`,
              description: JSON.stringify(calendarDetails),
            },
            { headers }
          );

          console.log("ADDED CALENDAR EVENT~~~->", rep);

          return null;
      });
    } catch (err) {
      console.log("result error add event.", err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

export const fetchCalendars = createAsyncThunk(
  '/api/calendars/user/events/fetch',
  async (undefined, { rejectWithValue, getState }) => {
    try {
      console.log("xxx76sgaj on trying to get events from user.");
      const axiosInstance = axios.create();
      const token = (getState() as GlobalStateType)?.demo?.userlogin?.access;
      const headers = {
        ...HEADERS_DEFAULT.headers,
        ...getAuthHeader(token),
      };
      const studentList = (getState() as any)?.demo?.students;
      const currentUserUsername = (getState() as GlobalStateType)?.demo?.userlogin?.username;

      console.log("xxx76sgaj 1", studentList);
      console.log("xxx76sgaj 2", currentUserUsername);

      // id will come from the selected students in the modal.
      const studentId = studentList.filter(
        st => st.student?.email === currentUserUsername
      )?.[0]?.id;
      
      console.log("xxx76sgaj 3 student id", studentId);

      const calendarName = `student-calendar-${studentId}`;
      const createdCalendars = await axiosInstance.get(
        `${SERVER_BASE_API}/calendars/user/calendars/`,
        { headers }
      );
      console.log("xxx76sgaj 4 all the calendars", createdCalendars);
      console.log("xxx76sgaj name must match", calendarName);
      const createdCalendarsResponse = createdCalendars?.data?.filter(calendar => calendar.name === calendarName);
      console.log("xxx76sgaj move to calendar", createdCalendarsResponse?.[0]);

      const studentCalendarId = createdCalendarsResponse?.[0]?.id;

      const resp = await axiosInstance.get(
        `${SERVER_BASE_API}/calendars/user/events/`,
        { headers }
      );

      console.log("xxx76sgaj student calendar id", studentCalendarId);

      console.log("xxx76sgaj single events", resp);

      const result = {
        data: resp?.data?.filter(event => event?.calendar === studentCalendarId)
      };

      console.log("xxx76sgaj result end", result);

      return result.data;
    } catch (err) {
      console.log("result error fetch calendar events", err);
      const message = (err as any).response?.data;
      return rejectWithValue(message);
    }
  }
);

// export const getStats = createAsyncThunk(
//   '/api/admin/get-stats',
//   async (undefined, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const axiosInstance = axios.create();

//       const resp = await axiosInstance.get(`${SERVER_BASE_API}/admin/get-stats`);

//       console.log("get stats response.");
//       console.log(resp.data);

//       return resp.data;
//     } catch (err) {
//       const message = (err as any).response?.data;
//       return rejectWithValue(message);
//     }
//   }
// );

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setIsFetchingLocation: (state, action: PayloadAction<any>) => {
      state.isFetchingLocation = action.payload;
    },
    setIsFetchingLocationError: (state, action: PayloadAction<any>) => {
      state.isFetchingLocationError = action.payload;
    },
    setIsFetchingClass: (state, action: PayloadAction<any>) => {
      state.isFetchingClass = action.payload;
    },
    setIsFetchingClassError: (state, action: PayloadAction<any>) => {
      state.isFetchingClassError = action.payload;
    },
    setIsFetchingVehicle: (state, action: PayloadAction<any>) => {
      state.isFetchingVehicle = action.payload;
    },
    setIsFetchingVehicleError: (state, action: PayloadAction<any>) => {
      state.isFetchingVehicleError = action.payload;
    },
    setIsFetchingStaff: (state, action: PayloadAction<any>) => {
      state.isFetchingStaff = action.payload;
    },
    setIsFetchingStaffError: (state, action: PayloadAction<any>) => {
      state.isFetchingStaffError = action.payload;
    },
    setIsFetchingStudent: (state, action: PayloadAction<any>) => {
      state.isFetchingStudent = action.payload;
    },
    setIsFetchingStudentError: (state, action: PayloadAction<any>) => {
      state.isFetchingStudentError = action.payload;
    },
    addOwner: (state, action: PayloadAction<any>) => {
        state.owners.push(action.payload);
    },
    addStudent: (state, action: PayloadAction<any>) => {
      const unverifiedStudent = { ...action.payload };
      unverifiedStudent.is_verified = "";
      state.students.push(unverifiedStudent);
    },
    userlogin: (state, action: PayloadAction<any>) => {
        console.log("prev userlogin", state.userlogin);
        state.userlogin = action.payload;
        console.log("after userlogin", state.userlogin);
    },
    setIsAddingStudent: (state, action: PayloadAction<boolean>) => {
      console.log("set is adding student");
      state.isShowingStudent = false;
      state.isAddingStudent = action.payload;
    },
    setIsShowingStudent: (state, action: PayloadAction<boolean>) => {
      state.isAddingStudent = false;
      state.isShowingStudent = action.payload;
    },
    setIsAddingClass: (state, action: PayloadAction<boolean>) => {
      console.log("set is adding student");
      state.isShowingClassInformation = false;
      state.isShowingClass = false;
      state.isAddingClass = action.payload;
    },
    setIsShowingClass: (state, action: PayloadAction<boolean>) => {
      state.isShowingClassInformation = false;
      state.isAddingClass = false;
      state.isShowingClass = action.payload;
    },
    setIsAddingStaff: (state, action: PayloadAction<boolean>) => {
      state.isShowingStaff = false;
      state.isAddingStaff = action.payload;
    },
    setIsShowingStaff: (state, action: PayloadAction<boolean>) => {
      state.isAddingStaff = false;
      state.isShowingStaff = action.payload;
    },
    setIsAddingVehicle: (state, action: PayloadAction<boolean>) => {
      state.isShowingVehicle = false;
      state.isAddingVehicle = action.payload;
    },
    setIsShowingVehicle: (state, action: PayloadAction<boolean>) => {
      state.isAddingVehicle = false;
      state.isShowingVehicle = action.payload;
    },
    setIsShowingClassInformation: (state, action: PayloadAction<boolean>) => {
      console.log("set is showing class information");
      state.isShowingClass = false;
      state.isAddingClass = false;
      state.isShowingClassInformation = action.payload;
    },
    setIsAddingLocation: (state, action: PayloadAction<boolean>) => {
      state.isShowingLocation = false;
      state.isAddingLocation = action.payload;
    },
    setIsShowingLocation: (state, action: PayloadAction<boolean>) => {
      state.isAddingLocation = false;
      state.isShowingLocation = action.payload;
    },
    // saveStudent: (state, action: PayloadAction<any>) => {
    //   console.log("push to student ", action.payload);
    //   state.students = state.students || [];
    //   console.log("after push ", state.students);
    //   state.students.push(action.payload);
    // },
    // saveStaff: (state, action: PayloadAction<any>) => {
    //   console.log("push to student ", action.payload);
    //   state.staffs = state.staffs || [];
    //   console.log("after push ", state.staffs);
    //   state.staffs.push(action.payload);
    // },
    // saveVehicle: (state, action: PayloadAction<any>) => {
    //   console.log("push to vehicle ", action.payload);
    //   state.vehicles = state.vehicles || [];
    //   console.log("after push ", state.vehicles);
    //   state.vehicles.push(action.payload);
    // },
    selectMenuOption: (state, action: PayloadAction<number>) => {
      console.log("select menu option ", action.payload);
      state.menuOptionSelected = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      try {
        console.log("setUsername", action.payload as string);
        state.userName = action.payload as string;
      } catch (err) {console.log("ERROR: username cannot be fetched.");}
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      try {
        state.remmeberMe = action.payload as boolean;
      } catch (err) {console.log("ERROR: remember me cannot be udpated.");}
    },
    resetStudentRegisterErrors: (state) => {
      state.registerStudentError = undefined;
    },
    resetOwnerProfileUpdate: (state) => {
      state.isUpdatingOwnerProfile = 'idle';
    },
    clearLoginErrors: (state) => {
      state.userLoginError = null;
    },
    getStats: (state, action: PayloadAction<any>) => {
      console.log("get stats line 1140 called.");
      const studentsOnsystem = state.students;
      const owner = action.payload;

      if (owner) {
        console.log("on getStats show owner");

        // hack for debug
        console.log(Object.assign({}, owner));
        console.log(Object.assign({}, studentsOnsystem));
      }
    },
    setGlobalLocation: (state, action: PayloadAction<any>) => {
      state.global_location = null;
    },
    logout: (state) => {
      console.log("doing logout.");
      state.userlogin = {};
      console.log("user ", userlogin);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addVehicleBackend.pending, (state) => {
      state.isFetchingVehicle = 'idle';
      console.log("sending the request to /api/owner/vehicles pending");
    })
    .addCase(addVehicleBackend.fulfilled, (state, action) => {
      state.isFetchingVehicle = 'success';
      console.log("sending the request completed to /api/owner/vehicles pending");
      console.log("result ", action.payload);
    })
    .addCase(addVehicleBackend.rejected, (state, action) => {
      state.isFetchingVehicle = 'error';
      state.isFetchingVehicleError = JSON.stringify(action.payload);
      console.log("sending the request error to /api/owner/vehicles pending");
      console.log("result ", action.payload);
    })
    .addCase(authOwner.pending, (state) => {
      state.userlogin = {};
      state.userLoginError = null;
      console.log("sending the request to /api/auth owner");
    })
    .addCase(authOwner.fulfilled, (state, action) => {
      console.log("sending the request completed to auth owner pending");
      state.userLoginError = null;
      state.userlogin = action.payload;
      console.log("result ", action.payload);
    })
    .addCase(authOwner.rejected, (state, action) => {
      console.log("sending the request error to auth owner error");
      console.log("result ", action.payload);
      state.userLoginError = action.payload;
    })
    .addCase(saveStudent.pending, (state) => {
      state.isFetchingStudent = "idle";
    })
    .addCase(saveStudent.fulfilled, (state, action) => {
      state.isFetchingStudent = "success";
      console.log("result ", action.payload);
    })
    .addCase(saveStudent.rejected, (state, action) => {
      state.isFetchingStudent = "error";
      state.isFetchingStudentError = JSON.stringify(action.payload);
    })
    .addCase(fetchStudent.pending, (state) => {
      state.students = [];
      console.log("sending the request to pending fetch student");
    })
    .addCase(fetchStudent.fulfilled, (state, action) => {
      console.log("sending the request completed to fetch student");
      console.log("result ", action.payload);
      state.students = action.payload;
    })
    .addCase(fetchStudent.rejected, (state, action) => {
      console.log("sending the request error to fetch student");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(fetchOwnerProfiles.pending, (state) => {
      state.ownerProfiles = [];
      state.isFetchingOwnerProfiles = 'idle';
      console.log("sending the request to pending fetch owner profiles");
    })
    .addCase(fetchOwnerProfiles.fulfilled, (state, action) => {
      state.isFetchingOwnerProfiles = 'success';
      console.log("sending the request completed to fetch owner profiles");
      console.log("result ", action.payload);
      state.ownerProfiles = action.payload;
    })
    .addCase(fetchOwnerProfiles.rejected, (state, action) => {
      state.isFetchingOwnerProfiles = 'error';
      console.log("sending the request error to fetch owner profiles");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(saveStaff.pending, (state) => {
      state.isFetchingStaff = 'idle';
      console.log("sending the request to pending add staff");
    })
    .addCase(saveStaff.fulfilled, (state, action) => {
      state.isFetchingStaff = 'success';
      console.log("sending the request completed to save staff");
      console.log("result ", action.payload);
    })
    .addCase(saveStaff.rejected, (state, action) => {
      state.isFetchingStaff = 'error';
      state.isFetchingStaffError = JSON.stringify(action.payload);
      console.log("sending the request error to save staff");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(fetchStaff.pending, (state) => {
      state.staffs = [];
      console.log("sending the request to pending fetch staff");
    })
    .addCase(fetchStaff.fulfilled, (state, action) => {
      console.log("sending the request completed to fetch staff");
      console.log("result ", action.payload);
      state.staffs = action.payload;
    })
    .addCase(fetchStaff.rejected, (state, action) => {
      console.log("sending the request error to fetch staff");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(fetchVehicle.pending, (state) => {
      state.vehicles = [];
      console.log("sending the request to pending fetch vehicle");
      state.isFetchingVehicles = 'idle';
    })
    .addCase(fetchVehicle.fulfilled, (state, action) => {
      state.isFetchingVehicles = 'success';
      console.log("sending the request completed to fetch vehicle");
      console.log("result ", action.payload);
      state.vehicles = action.payload;
    })
    .addCase(fetchVehicle.rejected, (state, action) => {
      state.isFetchingVehicles = 'error';
      console.log("sending the request error to fetch vehicle");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(saveClass.pending, (state) => {
      state.isFetchingClass = "idle";
      console.log("sending the request to pending add class");
    })
    .addCase(saveClass.fulfilled, (state, action) => {
      state.isFetchingClass = "success";
      console.log("sending the request completed to save class");
      console.log("result ", action.payload);
    })
    .addCase(saveClass.rejected, (state, action) => {
      state.isFetchingClass = "error";
      state.isFetchingClassError = JSON.stringify(action.payload);
      console.log("sending the request error to save class");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(fetchClass.pending, (state) => {
      state.classes = [];
      console.log("sending the request to pending fetch class");
    })
    .addCase(fetchClass.fulfilled, (state, action) => {
      console.log("sending the request completed to fetch class");
      console.log("result ", action.payload);
      state.classes = action.payload;
    })
    .addCase(fetchClass.rejected, (state, action) => {
      console.log("sending the request error to fetch class");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(fetchLocation.pending, (state) => {
      state.locations = [];
      console.log("sending the request to pending fetch locations");
    })
    .addCase(fetchLocation.fulfilled, (state, action) => {
      console.log("sending the request completed to fetch locations");
      console.log("result ", action.payload);
      state.locations = action.payload;
    })
    .addCase(fetchLocation.rejected, (state, action) => {
      console.log("sending the request error to fetch locations");
      console.log("result ", JSON.stringify(action.payload));
    })
    .addCase(saveLocation.pending, (state) => {
      state.isFetchingLocation = "idle";
    })
    .addCase(saveLocation.fulfilled, (state, action) => {
      state.isFetchingLocation = "success";
    })
    .addCase(saveLocation.rejected, (state, action) => {
      state.isFetchingLocation = "error";
      state.isFetchingLocationError =  JSON.stringify(action.payload);
    })
    .addCase(fetchTransaction.pending, (state) => {
        state.transactions = [];
        state.isFetchingTransactions = 'idle';
    })
    .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.isFetchingTransactions = 'success';
        const fetchedTransactions = action.payload.payload.map((transaction: any) => {
            return {
                id: transaction.id,
                student_name: transaction.student,
                process: transaction.school,
                total_amount: transaction.total_amount,
                date: transaction.date,
                status: transaction.statue
            }
        });
        state.transactions = fetchedTransactions;
    })
    .addCase(fetchTransaction.rejected, (state) => {
        state.isFetchingTransactions = 'error';
    })
    .addCase(fetchImageVault.pending, (state) => {
      console.log("fetchImageVault request pending");
      state.userImageVault = [];
    })
    .addCase(fetchImageVault.fulfilled, (state, action) => {
      console.log("fetchImageVault request fulfilled");
      console.log("publitio result", action.payload);
      state.userImageVault = action.payload;
    })
    .addCase(fetchImageVault.rejected, (state, action) => {
      console.log("fetchImageVault request rejected");
      console.log("error third party asset management publitio", action.payload);
    })
    .addCase(fetchCalendars.pending, (state) => {
      state.calendars = [];
    })
    .addCase(fetchCalendars.fulfilled, (state, action) => {
      console.log("fetchCalendars request fulfilled");
      state.calendars = action.payload;
    })
    .addCase(fetchCalendars.rejected, (state, action) => {
      console.log("fetchCalendars request rejected");
    })
    .addCase(registerStudentAsync.rejected, (state, action) => {
      // @ts-ignore
      state.registerStudentError = action.payload;
    })
    .addCase(updateOwnerProfile.pending, (state, action) => {
      state.isUpdatingOwnerProfile = 'idle';
    })
    .addCase(updateOwnerProfile.fulfilled, (state, action) => {
      state.isUpdatingOwnerProfile = 'success';
    })
    .addCase(updateOwnerProfile.rejected, (state, action) => {
      state.isUpdatingOwnerProfile = 'error';
      state.updateOwnerProfileError = action.payload;
    })
  },
});

export const { setIsFetchingStudent, setIsFetchingStudentError, setIsFetchingStaff, setIsFetchingStaffError, setIsFetchingVehicle, setIsFetchingVehicleError, setIsFetchingClass, setIsFetchingClassError, setIsFetchingLocation, setIsFetchingLocationError, setIsShowingLocation, setIsAddingLocation, setIsShowingClassInformation, setIsShowingClass, setUsername, setRememberMe, selectMenuOption, addStudent, setIsAddingVehicle, setIsShowingVehicle, addOwner, userlogin, setIsAddingStudent, setIsAddingClass, setIsShowingStudent, setIsAddingStaff, setIsShowingStaff, resetStudentRegisterErrors, resetOwnerProfileUpdate, clearLoginErrors, getStats, setGlobalLocation, logout } = demoSlice.actions;

export const getDemoUser = (state: RootState) => state.demo.userlogin;
export const getUser = (state: RootState) => state.demo.userlogin;
// export const getUser = (state: RootState) => state.auth.user;
// export const getValueStored = (state: RootState) => state.auth.valueStored;

export default demoSlice.reducer;
