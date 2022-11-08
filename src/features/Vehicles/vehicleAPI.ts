import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";

// export async function sendStudent(form: StudentElement, user: AddStudentUserForm, rejectWithValue: any) {
//     try {
//         const addStudentAxiosInstance = axios.create();
//         const newUser = await addStudentAxiosInstance.post(`${SERVER_BASE_API}/owner/api/auth/users/`, user);
//         form.student = newUser.data?.id;
//         const resp = await addStudentAxiosInstance.post(`${SERVER_BASE_API}/student/students`, form);
//         console.log("request resp.data", resp.data);
//         return resp.data;
//     } catch (err) {
//         const message = (err as any).response?.data?.message;
//         return rejectWithValue(message);
//     }
// }

export async function fetchVehicles(rejectWithValue: any) {
    try {
        const fetchVehiclesAxiosInstance = axios.create();
        const resp = await fetchVehiclesAxiosInstance.get(`${SERVER_BASE_API}/admin/vehicles`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}
