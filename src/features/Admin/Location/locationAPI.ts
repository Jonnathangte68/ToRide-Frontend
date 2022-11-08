import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";

export async function fetchLocations(rejectWithValue: any) {
    try {
        console.log("fetch all locations api.");
        const fetchLocationAxiosInstance = axios.create();
        const resp = await fetchLocationAxiosInstance.get(`${SERVER_BASE_API}/admin/locations`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}
