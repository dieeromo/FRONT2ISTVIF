import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RUTA_SERVIDOR} from '../ApiRoutes'



export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:RUTA_SERVIDOR
    }),
    endpoints:(builder) =>({
        loginUser: builder.mutation({
            query:({email,password}) =>{
                return{
                    url: '/auth/jwt/create/',
                    method: 'POST',
                    body:{email,password}
                }
            }
        }),

        registerUser: builder.mutation({
            query:({email, first_name, last_name, password, re_password}) =>{
                return{
                    url: '/auth/users/',
                    method: 'POST',
                    body:{email, first_name, last_name, password, re_password}
                }
            }
        }),

    })
})

export  const {
    useLoginUserMutation,
    useRegisterUserMutation 
}=authApi