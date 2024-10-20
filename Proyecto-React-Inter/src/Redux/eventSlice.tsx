// eventSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  createdBy: number;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedEvents: Event[]; // Add selectedEvents property
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  selectedEvents: [], // Initialize selectedEvents
};

const validateEventData = (eventData: { name: string; description: string; date: string; createdBy: number }) => {
    if (!eventData.name || !eventData.description || !eventData.date || !eventData.createdBy) {
      throw new Error('Todos los campos son obligatorios');
    }
    console.log('Datos del evento validados:', eventData);
}


export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
  try {
    console.log('Fetching events...');
    const response = await fetch('http://localhost:3000/events');
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Eventos recibidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return rejectWithValue((error as Error).message);
  }
});

export const registerEvent = createAsyncThunk('events/registerEvent', async (eventData: { name: string; description: string; date: string; createdBy: number }, { rejectWithValue }) => {
  try {
    validateEventData(eventData); // Validar los datos antes de enviarlos
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Evento registrado:', data);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const enrollInEvents = createAsyncThunk('events/enrollInEvents', async (enrollmentData: { userId: number; eventIds: number[] }, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/register-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrollmentData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Inscripción en eventos:', data);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers:{
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
    },
    selectEvent(state, action: PayloadAction<Event>) {
      state.selectedEvents.push(action.payload);
    },
    clearSelectedEvents(state) {
      state.selectedEvents = [];
    },
    updatedSelectedEvents(state, action: PayloadAction<Event[]>) {
      state.selectedEvents = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEvents, addEvent, selectEvent, clearSelectedEvents ,updatedSelectedEvents} = eventSlice.actions;
export default eventSlice.reducer;