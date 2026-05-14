import { configureStore,combineReducers } from '@reduxjs/toolkit'
import user from './slices/user.slice'
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt'
import apiSlice from '../services/api/apiSlice';

const rootReducers = combineReducers({
    user,
    [apiSlice.reducerPath]: apiSlice.reducer
});

const encryptionKey = import.meta.env.VITE_APP_ENCRYPT_KEY
const encryptor = encryptTransform({
    secretKey: encryptionKey,
    onError: (error) => {
        console.error("Encryption error: ",error)
    }
}); //encryptor for persistor to encrypt the data that is stored in local storage

const persistConfig = {
    key: "root",
    storage,
    transforms: [encryptor],
    // blacklist
} // Configuration of persistor

const persistedReducer = persistReducer(persistConfig,rootReducers); //persist reducer to store state in local storage

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,REHYDRATE,REGISTER,PURGE,PAUSE,PERSIST]
            }
        })

})

const persistor = persistStore(store);

export { store,persistor }
