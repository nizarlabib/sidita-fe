import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/user'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore ,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  
const persistConfigUser = {
    key: 'user',
    storage,
}


const userReducer = persistReducer(persistConfigUser, userSlice)

export const store = configureStore({
    reducer: {
      user:userReducer,
    },
    
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
  })
  
  export const persistor = persistStore(store)
  
