import { configureStore, createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: "pagination",
    initialState: {
        offset: 0,
    },
    reducers: {
        nextPage: (state) => {
            state.offset += 10;
        },
        prevPage: (state) => {
            state.offset = Math.max(0, state.offset - 10);
        },
    },
});

export const { nextPage, prevPage } = paginationSlice.actions;

export const store = configureStore({
    reducer: {
        pagination: paginationSlice.reducer,
    },
});
