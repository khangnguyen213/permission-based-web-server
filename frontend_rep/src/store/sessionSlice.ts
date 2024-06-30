import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { authApi } from '@/service/authApi';
import { type } from 'os';

export const initialState: {
  loading: boolean;
  data: {
    id: string;
    email: string;
    role: string;
  } | null;
} = {
  loading: false,
  data: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    initializeSession: (state) => {
      state.loading = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    // viết các action bất động bộ
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload.err) {
        state.data = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        state.loading = false;
      } else {
        state.data = action.payload.data;
        state.loading = false;
      }
    });
  },
});

const fetchUserData = createAsyncThunk('session/fetchData', async () => {
  let response = await authApi.getData();
  return response;
});

export const SessionStore = (state: RootState) => state.session; // get state
export const sessionActions = {
  ...sessionSlice.actions,
  fetchUserData,
};
export default sessionSlice.reducer;
