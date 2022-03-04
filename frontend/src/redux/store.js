import { configureStore } from '@reduxjs/toolkit';
import ipReducer from './ip-reducer'
import graphReducer from './graph-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
    reducer: {
        ip: ipReducer,
        graph: graphReducer
    },
}, composeWithDevTools()
);
