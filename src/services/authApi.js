import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8002'
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

     

    })
})


export  const {useLoginUserMutation }=authApi