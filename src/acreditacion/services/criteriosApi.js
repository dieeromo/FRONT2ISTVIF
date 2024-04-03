import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {RUTA_SERVIDOR} from '../../ApiRoutes'

export const criteriosApi = createApi({

    reducerPath: 'criteriosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({
 
        ////////
        getCriterios: builder.query({
            query: (access) => {
                return {
                    url: `/criterios/list/`,
                    method: 'GET',
                    headers: {Authorization: `JWT ${access}`},
                }
            },
          
        }),
        //////

        getCriterios: builder.query({
            query: (parametros) => {
                return {
                    url: `/criterios/list/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros}` },
                }
            }
        }),
        
        //////////
        putCriterios: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/criterios/post/`,
                    method: 'POST',
                    body:{
                        'criterio':parametros[0],
                        'fecha_creacion':parametros[2]
                    },
                    headers: { Authorization: `JWT ${parametros[1]}` },
                }
            },
       
        }),
        //////////
        updCriterios: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/criterios/put/`,
                    method: 'PUT',
                    body:{
                        'id':parametros[1],
                        'criterio':parametros[2],
                        'fecha_creacion':parametros[3]
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
      
        }),
        ///////
        deleteCriterio:builder.mutation({
            query:(parametros) => {
                return {
                    url : '/criterios/delete/',
                    method: 'DELETE',
                    body:{  'id':parametros[1] },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
         
        }),

        //////////
        getSubCriterios: builder.query({
            query: (parametros) => {
                return {
                    url: `/subcriterios/list_por_criterio/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            }
        }),
        /////////////
        getIndicadores: builder.query({
            query: (parametros) => {
                return {
                    url: `/indicadores/list_por_subcriterio/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            }
        }),
        ///////
        getEvidencias: builder.query({
            query: (parametros) => {
                return {
                    url: `/evidencias/list_por_indicador/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            }
        }),
        //////
        getDocumentos_evidencia: builder.query({
            query: (parametros) => {
                return {
                    url: `/documentos_acreditacion/list/filter/${parametros[1]}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
            providesTags:['getDocumetos_evidencia']
       
        }),

        //////

        getDocumentos: builder.query({
            query: (access) => {
                return {
                    url: `/documentos_acreditacion/list/all/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
      
        }),
  
        /////
        deleteEntradaDocumento:builder.mutation({
            query:(parametros) => {
                return {
                    url : '/documentos_acreditacion/delete/entrada/',
                    method: 'DELETE',
                    body:{  'id':parametros[1] },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
           
        }),

        /////
        putNombreDocumento: builder.mutation({
            query: (parametros) => {
                return {
                    url: `/documentos_acreditacion/put/nombre_documento/`,
                    method: 'PUT',
                    body:{
                        'id':parametros[1],
                        'documento':parametros[2],
                    },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
        
        }),
        //////
        cargaDocumento: builder.mutation({
            query: (parametros) => {
                console.log('ID',parametros[1])
                return {
                    url: `/documentos_acreditacion/subir_archivo/`,
                    method: 'PUT',
                    body:parametros[1],
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                         Authorization: `Bearer ${parametros[0]}` 
                    },
                }
            },
          
        }),
        /////
        deleteArchivo:builder.mutation({
            query:(parametros) => {
                console.log('pararara',parametros)
                return {
                    url : '/documentos_acreditacion/delete/nombre_documento/',
                    method: 'DELETE',
                    body:{  'id':parametros[1] },
                    headers: { Authorization: `JWT ${parametros[0]}` },
                }
            },
        
        }),
        //////
        postDocumentoEntrada: builder.mutation({
            query: (parametros) => {
                const id_evidencia = parametros[9]
                const id_responsable = parametros[10]
                return {
                    url: `/documentos_acreditacion/register/${id_evidencia}/${id_responsable}/`,
                    method: 'POST',
                    body:{
                        'numeracion':parametros[1],
                        'documento':parametros[2],
        
                        'observacion': parametros[3],
                        'digitador':parametros[4],
                
                        'fecha_limite':parametros[5],
                        
                        'carrera':parametros[6],
                        'coor_institucionales':parametros[7],
                        'otras_comisiones': parametros[8],
                    },
                    headers:{ Authorization: `JWT ${parametros[0]}` },
                }
            },
            invalidatesTags:['getDocumetos_evidencia']
      
        }),

        /////



    })
})

export const { 
    usePutCriteriosMutation,
    useUpdCriteriosMutation,
    useGetCriteriosQuery,
    useDeleteCriterioMutation,

    useGetSubCriteriosQuery, 
    useGetIndicadoresQuery,
    useGetEvidenciasQuery,

    usePostDocumentoEntradaMutation,
    useGetDocumentosQuery,              // pedir todos los documentos
    useGetDocumentos_evidenciaQuery,
    useCargaDocumentoMutation,
    useDeleteArchivoMutation,

    useDeleteEntradaDocumentoMutation,  // eliminar entrada documento
    usePutNombreDocumentoMutation,
} = criteriosApi
