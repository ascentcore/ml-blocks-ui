import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

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

export const showSlice = createSlice({
    name: 'minigraph',
    initialState: { value: false },
    reducers: {
        showGraphReducer: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { getGraphReducer } = graphSlice.actions;
export const { showGraphReducer } = showSlice.actions;

export default combineReducers({
    graphSlice: graphSlice.reducer,
    showSlice: showSlice.reducer
})
