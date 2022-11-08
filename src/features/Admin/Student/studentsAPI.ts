import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";
import { AddStudentUserForm, StudentElement } from "./studentsSlice";

export async function sendStudent(form: StudentElement, user: AddStudentUserForm, rejectWithValue: any) {
    try {
        console.log("studentsAPI sendStudent");
        console.log("form ", form);
        const addStudentAxiosInstance = axios.create();
        const newUser = await addStudentAxiosInstance.post(`${SERVER_BASE_API}/admin/api/auth/users/`, user);
        form.student = newUser.data?.id;
        const resp = await addStudentAxiosInstance.post(`${SERVER_BASE_API}/admin/students`, form);
        console.log("request resp.data", resp.data);
        return resp.data;
    } catch (err) {
        const message = JSON.stringify((err as any).response?.data);
        console.log("message", message);
        return rejectWithValue(message);
    }
}

export async function fetchStudents(rejectWithValue: any) {
    try {
        const fetchStudentsAxiosInstance = axios.create();
        const resp = await fetchStudentsAxiosInstance.get(`${SERVER_BASE_API}/student/students`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}
