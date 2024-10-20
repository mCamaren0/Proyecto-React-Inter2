import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserState {
  events: Event[];
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  events: [],
  error: null,
  isAuthenticated: false,
  currentUser: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      console.log(response);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en loginUser:', error);
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          return rejectWithValue('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ocurrió un error desconocido');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en registerUser:', error);
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          return rejectWithValue('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ocurrió un error desconocido');
    }
  }
);

export const fetchUserEvents = createAsyncThunk('user/fetchUserEvents', async (userId: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/events`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.events = [];
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    updateUserEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUserEvents } = userSlice.actions;
export default userSlice.reducer;