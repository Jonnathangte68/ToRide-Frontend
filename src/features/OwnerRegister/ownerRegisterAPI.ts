import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";

export async function fetchLogin(username: string, password: string, rejectWithValue: any) {
  try {
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
  } catch (err) {
    const message = (err as any).response?.data?.message;
    return rejectWithValue(message);
  }
}
