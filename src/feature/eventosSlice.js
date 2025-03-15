import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_BASE } from '../config'

// obtener todos los eventos
export const obtenerEventos = createAsyncThunk("eventos/obtenerEventos", async () => {
    try {
        const response = await axios.get(`${URL_BASE}/Evento/obtenerEventos`);
        return response.data;
    } catch (e) {
        return e.error;
    }
});

//agregar un evento
export const agregarEvento = createAsyncThunk("eventos/agregarEvento", async (evento) => {
    const response = await axios.post(`${URL_BASE}/Evento/agregarEvento`, evento);
    return response.data;
});

//actualizar un evento
export const actualizarEvento = createAsyncThunk("eventos/actualizarEvento", async (evento) => {
    await axios.put(`${URL_BASE}/Evento/actualizarEvento`, evento);
    return evento;
});

//eliminar un evento
export const eliminarEvento = createAsyncThunk("eventos/eliminarEvento", async (id) => {
    await axios.delete(`${URL_BASE}/Evento/eliminarEvento/${id}`);
    return id;
});

// Slice de eventos
export const eventosSlice = createSlice({
    name: "eventos",
    initialState: {
        eventos: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(obtenerEventos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(obtenerEventos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.eventos = action.payload;
            })
            .addCase(obtenerEventos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(agregarEvento.fulfilled, (state, action) => {
                state.eventos.push(action.payload);
            })
            .addCase(actualizarEvento.fulfilled, (state, action) => {
                const index = state.eventos.findIndex((e) => e.id === action.payload.id);
                if (index !== -1) state.eventos[index] = action.payload;
            })
            .addCase(eliminarEvento.fulfilled, (state, action) => {
                state.eventos = state.eventos.filter((evento) => evento.id !== action.payload);
            });
    },
});

