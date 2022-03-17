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

export const statusesSlice = createSlice({
    name: 'statuses',
    initialState: {},
    reducers: {
        setStatuses: (state, action) => {
            state.value = action.payload
        },
    },
})

export const showSlice = createSlice({
    name: 'minigraph',
    initialState: { value: true },
    reducers: {
        showGraphReducer: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { getGraphReducer } = graphSlice.actions;
export const { setStatuses } = statusesSlice.actions;
export const { showGraphReducer } = showSlice.actions;

export default combineReducers({
    graphSlice: graphSlice.reducer,
    showSlice: showSlice.reducer,
    statuses: statusesSlice.reducer
})
