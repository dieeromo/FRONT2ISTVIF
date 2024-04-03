import {configureStore} from '@reduxjs/toolkit'
import {authApi} from '../services/authApi'
import authReducer from '../features/authSlice'

import { authDatosApi } from '../services/authDatosApi'
import authDatosReducer from '../features/authDatosSlice'

import {criteriosApi} from '../acreditacion/services/criteriosApi'

import {usuariosApi} from '../usuarios/services/usuariosApi'

import {generalApi} from '../general/services/generalApi'
import {setupListeners} from '@reduxjs/toolkit/query/react'


export const store = configureStore({
    reducer:{
        authDatos: authDatosReducer,
        [authApi.reducerPath]:authApi.reducer,

        auth: authReducer,
        [authDatosApi.reducerPath]:authDatosApi.reducer,
        
       // criterios : criteriosReducer, para acreditacion
        [criteriosApi.reducerPath]: criteriosApi.reducer,
      
        [usuariosApi.reducerPath]:usuariosApi.reducer,

        [generalApi.reducerPath]:generalApi.reducer,
        
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware, 
        authDatosApi.middleware,
        criteriosApi.middleware,
        usuariosApi.middleware,
        generalApi.middleware,
        )
})


export const AppDispatch = store.dispatch;
export const RootState = store.getState();
setupListeners(store.dispatch)