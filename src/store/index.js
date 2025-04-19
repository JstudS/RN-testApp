import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import i18nReducer from './slices/i18nSlice'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'i18n']
}

const rootReducer = combineReducers({
    auth: authReducer,
    i18n: i18nReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }), 
})
export const persistor = persistStore(store)