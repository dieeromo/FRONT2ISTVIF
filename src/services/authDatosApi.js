import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authDatosApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8002'
    }),
    endpoints:(builder) =>({
        getUser: builder.query({
            query : (access) =>{
                return{
                    url: `/auth/users/me/`,
                    method:'GET',
                    headers: {Authorization : `JWT ${access}`},
                }
            }
        })

    })
})


export  const {useGetUserQuery}=authDatosApi