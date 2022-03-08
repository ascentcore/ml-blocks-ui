import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = '';

export const ipSlice = createSlice({
    name: 'ip',
    initialState: { value: initialStateValue },
    reducers: {
        setIPReducer: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setIPReducer } = ipSlice.actions;

export default ipSlice.reducer;