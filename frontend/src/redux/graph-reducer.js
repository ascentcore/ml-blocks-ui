import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    graph: []
};

export const graphSlice = createSlice({
    name: 'graph',
    initialState: { value: initialStateValue },
    reducers: {
        getGraphReducer: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getGraphReducer } = graphSlice.actions;

export default graphSlice.reducer;