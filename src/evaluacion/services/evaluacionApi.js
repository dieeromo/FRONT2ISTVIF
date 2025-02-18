import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RUTA_SERVIDOR } from '../../ApiRoutes'




export const evaluacionApi = createApi({
    reducerPath: 'evaluacionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: RUTA_SERVIDOR
    }),
    endpoints: (builder) => ({

        ////////
        getEvaluacionEvidencia: builder.query({
            query: (access) => {
                return {
                    url: `/evaluacion/evaluacion_evidencia/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getSubcriterio_por_criterio: builder.query({
            query: ({access,criterio_id}) => {
                return {
                    url: `/evaluacion/evaluacion_subcriterio_criterio/?criterio_id=${criterio_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        /////
        getIndicador_por_Subcriterio: builder.query({
            query: ({access,subcriterio_id}) => {
                return {
                    url: `/evaluacion/evaluacionindicador__subcriterio/?subcriterio_id=${subcriterio_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getIndicador_por_Subcriterio'],

        }),
        //////
        getDocumento_por_indicador_all: builder.query({
            query: ({access,criterio_id,subcriterio_id,indicador_id}) => {
                return {
                    url: `/evaluacion/evaluacion_documento__indicador_all/?criterio_id=${criterio_id}&subcriterio_id=${subcriterio_id}&indicador_id=${indicador_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getEvaluacionEvidencia_modeloCriterio'],
            invalidatesTags: ['getIndicador_por_Subcriterio']

        }),
        ////////
        getEvaluacionEvidencia_modeloCriterio: builder.query({
            query: ({ access, criterio_id, modelo_id }) => {
                return {
                    url: `/evaluacion/evaluacion_evidencia_modelocriterio/?criterio_id=${criterio_id}&modelo_id=${modelo_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getDocumento_por_indicador_all']

        }),
        ////////
        ////////
        getCriterios: builder.query({
            query: (access) => {
                return {
                    url: `/evaluacion/evaluacion/criterios`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        /////////



        ////////
        createDocumentoEvaluacion: builder.mutation({
            query: ({ access, rest }) => {

                return {
                    url: '/evaluacion/evaluacion/documentos/',
                    method: 'POST',
                    body: rest,
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio','getDocumento_por_indicador_all']

        }),
        ///////
        ////////
        getDocumentoID: builder.query({
            query: ({ access, documentoID }) => {
                return {
                    url: `/evaluacion/evaluacion/documentos/${documentoID}/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getDocumentoID']

        }),
        ////
        putDocumento: builder.mutation({
            query: ({ access, documentoID, rest }) => {
                return {
                    url: `/evaluacion/evaluacion/documentos/${documentoID}/`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${access}` },
                    body: rest,
                }
            },
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio', 'getDocumentoID', 'getDocumentosResponsable','getDocumento_por_indicador_all']

        }),
        ///////
        updateEstado2: builder.mutation({
            query: ({ access, documentoID, estado2, observacion }) => ({
                url: `/evaluacion/evaluacion/documentos/${documentoID}/`,
                method: 'PATCH',
                body: { estado2, observacion },
            }),
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio', 'getDocumentoID', 'getDocumentosResponsable','getDocumento_por_indicador_all']
        }),
        /////
        deleteArchivoEvaluacion: builder.mutation({
            query: ({ access, documentoID }) => {
                return {
                    url: '/evaluacion/deletearchivo/',
                    method: 'DELETE',
                    body: { 'documentoID': documentoID },
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio', 'getDocumentosResponsable','getDocumento_por_indicador_all']

        }),
        //////
        ////////
        getPeriodoAcademico: builder.query({
            query: (access) => {
                return {
                    url: `/evaluacion/evaluacion/periodo/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },

        }),
        ////////
        getDocumentosResponsable: builder.query({
            query: ({ access, responsableID }) => {
                return {
                    url: `/evaluacion/evaluacion_documento_responsable/?responsable_id=${responsableID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getDocumentosResponsable']

        }),
        ////////
        getEstadistica_total_documentos: builder.query({
            query: ({ access}) => {
                return {
                    url: `/evaluacion/estadistica_total_documentos/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: ['getEstadistica_total_documentos']

        }),
          ////////
          getEstadistica_indicador_documentos: builder.query({
            query: ({ access}) => {
                return {
                    url: `/evaluacion/estadistica_indicador_documentos/`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags: [' getEstadistica_indicador_documentos']

        }),


        ////


    })

})



export const {
    useGetDocumento_por_indicador_allQuery,
    useGetEvaluacionEvidenciaQuery,
    useGetSubcriterio_por_criterioQuery,
    useGetIndicador_por_SubcriterioQuery,
    useGetEvaluacionEvidencia_modeloCriterioQuery,
    useGetCriteriosQuery,
    useCreateDocumentoEvaluacionMutation,
    useGetDocumentoIDQuery,

    usePutDocumentoMutation,
    useDeleteArchivoEvaluacionMutation,
    useGetPeriodoAcademicoQuery,
    useGetDocumentosResponsableQuery,
    useUpdateEstado2Mutation,
    useGetEstadistica_total_documentosQuery,
    useGetEstadistica_indicador_documentosQuery,


} = evaluacionApi