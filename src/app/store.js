import {configureStore} from '@reduxjs/toolkit'
import {authApi} from '../services/authApi'
import authReducer from '../features/authSlice'
import authDatosReducer from '../features/authDatosSlice'

import {setupListeners} from '@reduxjs/toolkit/query/react'
import { authDatosApi } from '../services/authDatosApi'
//import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        authDatos: authDatosReducer,
        
        [authApi.reducerPath]:authApi.reducer,
        [authDatosApi.reducerPath]:authDatosApi.reducer,


    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

export const AppDispatch = store.dispatch;
export const RootState = store.getState();
setupListeners(store.dispatch)