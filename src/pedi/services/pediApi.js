import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

export const pediApi = createApi({
    reducerPath: 'pediApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getPediVersion: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/pedi/pedi/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getObjetivosEstr_pedi: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/objetivos_estrategicos/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },

                }
            },
            providesTags: ['objetivosEstrategicos_pedi']
        }),
        ////////
        getObjetivosEstr_all: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/pedi/estrategicos/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
        }),
        ///
        createObjetivosEstrategicos: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/estrategicos/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'sigla': parametros[2],

                        'pedi': parametros[3],
                        'observacion': parametros[4],
                        'digitador': parametros[5],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['objetivosEstrategicos_pedi']

        }),
        ////////
        getObjetivosEspecifico_Estrategico: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/objetivos_especificos/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },

                }
            },
            providesTags: ['objetivosEspecificos_estrategico']

        }),
        ////////
        getObjetivosEspecificos_all: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/pedi/especificos/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
        }),
        ////////
        getMetaEspecifico_Especifico: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/metas_especificos/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags: ['objetivosMeta_especificos']
        }),

        ////////
        getMetaEspecifico_all: builder.query({
            query: (access) => {
                return {
                    url: '/pedi/pedi/metas_especificos/',
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),

        ////////
        getActividades_all: builder.query({
            query: (access) => {
                return {
                    url: '/pedi/pedi/actividades/',
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),
        ////////
        getMedioVerificacion_all: builder.query({
            query: (access) => {
                return {
                    url: '/pedi/pedi/medio_verificacion/',
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),
        ////////
        getIndicadorPedi_MedioVerificacion_all: builder.query({
            query: (access) => {
                return {
                    url: '/pedi/pedi/indicador_medio_pedi/',
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
        }),

        ////////
        getActividad_meta: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/actividades_meta/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags: ['actividad_especificos']

        }),


        ////////
        getMedioVer_actividad: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/medio_verificacion/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags: ['medioVerificacion_actividad']
        }),

        ////////
        getIndicadorMedio_pedi: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/indicador_pedi/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags: ['indicadorPedi_medio']
        }),
        ///
        ///
        createObjetivosEspecificos: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/especificos/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'objetivo_estrategico': parametros[2],
                        'observacion': parametros[3],
                        'digitador': parametros[4],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['objetivosEspecificos_estrategico']

        }),
        ///
        createMeta_ObjEspe: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/metas_especificos/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'objetivo_especifico': parametros[2],
                        'observacion': parametros[3],
                        'digitador': parametros[4],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['objetivosMeta_especificos']

        }),

        ///
        createActividades_meta: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/actividades/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'meta_objetivo': parametros[2],
                        'observacion': parametros[3],
                        'digitador': parametros[4],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['actividad_especificos']

        }),
        ///
        createMedioVerificacion: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/medio_verificacion/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'actividad_meta': parametros[2],
                        'observacion': parametros[3],
                        'digitador': parametros[4],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['medioVerificacion_actividad']

        }),


        createIndicador_pedi: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/indicador_medio_pedi/',
                    method: 'POST',
                    body: {
                        'nombre': parametros[1],
                        'total': parametros[2],
                        'anio1': parametros[3],
                        'anio2': parametros[4],
                        'anio3': parametros[5],
                        'anio4': parametros[6],
                        'anio5': parametros[7],
                        'medio_verificacion': parametros[8],
                        'observacion': parametros[9],
                        'digitador': parametros[10],
                        'entidadResponsable': parametros[11],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['indicadorPedi_medio']

        }),
        ////

        updateIndicador_pedi: builder.mutation({
            query: (parametros) => {

                return {
                    url: `/pedi/pedi/indicador_medio_pedi/${parametros[15]}/`,
                    method: 'PUT',
                    body: {
                        'nombre': parametros[1],
                        'total': parametros[2],
                        'anio1': parametros[3],
                        'anio2': parametros[4],
                        'anio3': parametros[5],
                        'anio4': parametros[6],
                        'anio5': parametros[7],
                        'medio_verificacion': parametros[8],
                        'entidadResponsable': parametros[9],
                        'activo': parametros[10],
                        'cumple': parametros[11],


                        'observacion': parametros[12],
                        'digitador': parametros[13],

                        'numeroPoa': parametros[14],

                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['indicadorPedi_medio']

        }),

        ////
        createPoa: builder.mutation({
            query: (parametros) => {

                return {
                    url: '/pedi/pedi/poa/',
                    method: 'POST',
                    body: {
                        'indicadorPedi': parametros[1],
                        'anio': parametros[2],
                        'totalAnio': parametros[3],
                        'pro1': parametros[4],
                        'pro2': parametros[5],
                        'pro3': parametros[6],
                        'pro4': parametros[7],
                        'pro5': parametros[8],
                        'pro6': parametros[9],
                        'pro7': parametros[10],
                        'pro8': parametros[11],
                        'pro9': parametros[12],
                        'pro10': parametros[13],
                        'pro11': parametros[14],
                        'pro12': parametros[15],
                        'observacion': parametros[16],
                        'digitador': parametros[17],


                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['indicadorPedi_medio', 'poa_all']

        }),
        /////
        getPoaAll: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/pedi/poa/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['poa_all']
        }),

        /////
        getPoa_indicador: builder.query({
            query: (parametros) => {
                return {
                    url: `/pedi/poa/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags: ['poa_indicador']
        }),

        ////
        updatePoa: builder.mutation({
            query: (parametros) => {
                console.log('parametros', parametros)


                return {
                    url: `/pedi/pedi/poa/${parametros[32]}/`,
                    method: 'PUT',
                    body: {

                        "anio": parametros[1],
                        "totalAnio": parametros[2],
                        "pro1": parametros[3],
                        "pro2": parametros[4],
                        "pro3": parametros[5],
                        "pro4": parametros[6],
                        "pro5": parametros[7],
                        "pro6": parametros[8],
                        "pro7": parametros[9],
                        "pro8": parametros[10],
                        "pro9": parametros[11],
                        "pro10": parametros[12],
                        "pro11": parametros[13],
                        "pro12": parametros[14],
                        "eje1": parametros[15],
                        "eje2": parametros[16],
                        "eje3": parametros[17],
                        "eje4": parametros[18],
                        "eje5": parametros[19],
                        "eje6": parametros[20],
                        "eje7": parametros[21],
                        "eje8": parametros[22],
                        "eje9": parametros[23],
                        "eje10": parametros[24],
                        "eje11": parametros[25],
                        "eje12": parametros[26],
                        "activo": parametros[27],
                        "observacion": parametros[28],
                        "NumeroSeguimiento": parametros[29],
                        "indicadorPedi": parametros[30],
                        "digitador": parametros[31]


                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags: ['indicadorPedi_medio', 'poa_all']

        }),
        /////
        getPediData: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/pedidata/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['pedidata']
        }),
        /////
        getPoaData: builder.query({
            query: (access) => {
                return {
                    url: `/pedi/poadata/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['poadata']
        }),





    }),




})


export const {

    useGetPediVersionQuery,
    useGetObjetivosEstr_pediQuery,
    useGetObjetivosEstr_allQuery,
    useCreateObjetivosEstrategicosMutation,

    useGetObjetivosEspecifico_EstrategicoQuery,
    useGetObjetivosEspecificos_allQuery,

    useGetMetaEspecifico_EspecificoQuery,
    useCreateMeta_ObjEspeMutation,
    useGetMetaEspecifico_allQuery,

    useCreateObjetivosEspecificosMutation,

    useGetActividades_allQuery,
    useGetActividad_metaQuery,
    useCreateActividades_metaMutation,

    useGetMedioVerificacion_allQuery,

    useGetIndicadorPedi_MedioVerificacion_allQuery,
    useCreateIndicador_pediMutation,
    useUpdateIndicador_pediMutation,


    useGetMedioVer_actividadQuery,
    useCreateMedioVerificacionMutation,

    useGetIndicadorMedio_pediQuery,

    useCreatePoaMutation,
    useGetPoa_indicadorQuery,
    useGetPoaAllQuery,
    useUpdatePoaMutation,
    useGetPediDataQuery,
    useGetPoaDataQuery,


} = pediApi
