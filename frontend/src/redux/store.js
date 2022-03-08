import { configureStore } from '@reduxjs/toolkit';
import ipReducer from './ip-reducer'
import showGraphReducer from './graph-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import graphReducer from './graph-reducer';

const ipDataPersistConfig = {
    key: 'ip',
    storage: storage,
};

export const store = configureStore({
    reducer: {
        ip: persistReducer(ipDataPersistConfig, ipReducer),
        graph: graphReducer,
        minigraph: showGraphReducer
    },
}, composeWithDevTools()
);
