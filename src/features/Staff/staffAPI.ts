import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";

export async function sendStaff(form: any, user: any, rejectWithValue: any) {
    try {
        const addStaffAxiosInstance = axios.create();
        const newUser = await addStaffAxiosInstance.post(`${SERVER_BASE_API}/admin/auth/users/`, user);
        form.staff = newUser.data?.id;
        const resp = await addStaffAxiosInstance.post(`${SERVER_BASE_API}/admin/staffs`, form);
        console.log("request resp.data", resp.data);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}

export async function fetchStaffs(rejectWithValue: any) {
    try {
        console.log("fetchStaffs list first test.");
        const fetchStaffAxiosInstance = axios.create();
        const resp = await fetchStaffAxiosInstance.get(`${SERVER_BASE_API}/admin/staffs`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}
