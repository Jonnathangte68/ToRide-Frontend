import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { fetchTransactions, sendTransaction } from './transactionAPI';

export interface TransactionForm {
    total_amount: number;
    statue: number;
    student: number;
    school: number;
    location: number;
    message: string;
}

export interface TransactionElement {
    id: number,
    total_amount: string,
    date: string,
    statue: string,
    student: number,
    school: number,
    location: number,
    message: string
}

export interface TransactionState {
    fetchTransactionStatus: 'idle' | 'success' | 'error';
    storeTransactionStatus: 'idle' | 'success' | 'error';

    transactions: TransactionElement[];
}

const initialState: TransactionState = {
    fetchTransactionStatus: 'idle',
    storeTransactionStatus: 'idle',

    transactions: []
};

export const storeTransaction = createAsyncThunk(
  '/api/student/transactions',
  async (newTransaction: TransactionForm, { rejectWithValue, getState }) => {
    const response = await sendTransaction(newTransaction, rejectWithValue);
    return { ...response };
  }
);

export const fetchAllTransaction = createAsyncThunk(
    '/api/student/transactions',
    // eslint-disable-next-line no-shadow-restricted-names
    async (undefined, { rejectWithValue, getState }) => {
      const response = await fetchTransactions(rejectWithValue);
      return { payload: response };
    }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllTransaction.pending, (state) => {
            state.fetchTransactionStatus = 'idle';
        })
        .addCase(fetchAllTransaction.fulfilled, (state, action) => {
            state.fetchTransactionStatus = 'success';
            console.log("ft1", action.payload);
            const fetchedTransactions = action.payload.payload.map((transaction: TransactionElement) => {
                return {
                    id: transaction.id,
                    student_name: transaction.student,
                    process: transaction.school,
                    total_amount: transaction.total_amount,
                    date: transaction.date,
                    status: transaction.statue
                }
            });
            console.log("fetchAllTransaction.fulfilled");
            console.log("ft", fetchedTransactions);
            state.transactions = fetchedTransactions;
        })
        .addCase(fetchAllTransaction.rejected, (state) => {
            state.fetchTransactionStatus = 'error';
        });
  },
});

export const getTransactions = (state: RootState) => state.transaction.transactions;

export default transactionSlice.reducer;
