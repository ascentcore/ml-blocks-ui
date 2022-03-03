import { configureStore } from '@reduxjs/toolkit';
import ipReducer from './ip-reducer'
import graphReducer from './graph-reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const ipDataPersistConfig = {
    key: 'ip',
    storage: storage,
};

export const store = configureStore({
    reducer: {
        ip: persistReducer(ipDataPersistConfig, ipReducer),
        graph: graphReducer
    }
});
