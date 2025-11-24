import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'your-secret-key-123',
        }),
    ],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
