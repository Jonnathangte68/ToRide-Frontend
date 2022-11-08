import axios from "axios";
import { SERVER_BASE_API } from "../../utils/globals";
import { TransactionForm } from "./transactionSlice";

export async function sendTransaction(form: TransactionForm, rejectWithValue: any) {
    try {
        const addTransactionAxiosInstance = axios.create();
        const resp = await addTransactionAxiosInstance.post(`${SERVER_BASE_API}/admin/transactions`, {
            total_amount: form?.total_amount,
            statue: form?.statue,
            student: form?.student,
            school: form?.school,
            location: form?.location,
            message: form?.message
        });
        console.log("request resp.data", resp.data);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}

export async function fetchTransactions(rejectWithValue: any) {
    try {
        const addTransactionAxiosInstance = axios.create();
        const resp = await addTransactionAxiosInstance.get(`${SERVER_BASE_API}/admin/transactions`);
        return resp.data;
    } catch (err) {
        const message = (err as any).response?.data?.message;
        return rejectWithValue(message);
    }
}
