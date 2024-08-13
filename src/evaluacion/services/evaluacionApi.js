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
        ////////
        getEvaluacionEvidencia_modeloCriterio: builder.query({
            query: ({ access, criterio_id, modelo_id }) => {
                return {
                    url: `/evaluacion/evaluacion_evidencia_modelocriterio/?criterio_id=${criterio_id}&modelo_id=${modelo_id}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },

                }
            },
            providesTags: ['getEvaluacionEvidencia_modeloCriterio']

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
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio']

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
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio', 'getDocumentoID','getDocumentosResponsable']

        }),
        ///////
        updateEstado2: builder.mutation({
            query: ({ access,documentoID, estado2, observacion }) => ({
              url: `/evaluacion/evaluacion/documentos/${documentoID}/`,
              method: 'PATCH',
              body: { estado2,observacion },
            }),
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio', 'getDocumentoID','getDocumentosResponsable']
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
            invalidatesTags: ['getEvaluacionEvidencia_modeloCriterio','getDocumentosResponsable']

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
            query: ({access,responsableID}) => {
                return {
                    url: `/evaluacion/evaluacion_documento_responsable/?responsable_id=${responsableID}`,
                    method: 'GET',
                    headers: { Authorization: `JWT ${access}` },
                }
            },
            providesTags:['getDocumentosResponsable']

        }),


        ////


    })

})



export const {
    useGetEvaluacionEvidenciaQuery,
    useGetEvaluacionEvidencia_modeloCriterioQuery,
    useGetCriteriosQuery,
    useCreateDocumentoEvaluacionMutation,
    useGetDocumentoIDQuery,

    usePutDocumentoMutation,
    useDeleteArchivoEvaluacionMutation,
    useGetPeriodoAcademicoQuery,
    useGetDocumentosResponsableQuery,
    useUpdateEstado2Mutation,


} = evaluacionApi