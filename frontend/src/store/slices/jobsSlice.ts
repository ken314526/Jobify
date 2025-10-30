import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Job, JobsState, User } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const API_URL = `${API_BASE}/jobs`;

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch jobs'
      );
    }
  }
);

export const fetchMyJobs = createAsyncThunk(
  'jobs/fetchMine',
  async (user: User, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = user.role === 'Admin' ? `${API_URL}` : `${API_URL}/my`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch your jobs'
      );
    }
  }
);

export const addJob = createAsyncThunk(
  'jobs/add',
  async (job: Omit<Job, 'id' | 'postedDate' | 'status'>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.post(
        `${API_URL}`,
        job,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.job ?? res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to create job'
      );
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/update',
  async (job: Job, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.put(`${API_URL}/${job._id}`, job, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.job ?? res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to update job'
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`${API_URL}/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return jobId;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to delete job'
      );
    }
  }
);

export const toggleJobStatus = createAsyncThunk(
  'jobs/toggleStatus',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.put(
        `${API_URL}/${jobId}/toggle-status`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.job ?? res.data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to toggle job status'
      );
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleJobStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        
        const index = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobsSlice.reducer;
