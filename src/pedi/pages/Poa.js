import React from 'react'
import MUIDataTable from 'mui-datatables';
import DashboardPedi from './components/DashboardPedi'
import {
    useGetPediVersionQuery,
    useGetObjetivosEstr_allQuery,

    useGetObjetivosEspecificos_allQuery,
    useGetMetaEspecifico_allQuery,
    useGetActividades_allQuery,
    useGetMedioVerificacion_allQuery,
    useGetIndicadorPedi_MedioVerificacion_allQuery,
    useGetPoaAllQuery,
 



} from '../services/pediApi'

import ModalPoa from './components/ModalPoa'
import { RiProjector2Fill } from 'react-icons/ri';

export default function Poa() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data: dataPedi, isSuccess: isSuccessPedi, } = useGetPediVersionQuery(user.access)

    const { data: dataEstr, isSuccess: isSuccessEstr, } = useGetObjetivosEstr_allQuery(user.access)

    const { data: dataEspe, isSuccess: isSuccessEspe, } = useGetObjetivosEspecificos_allQuery(user.access)
    const { data: dataMeta, isSuccess: isSuccessMeta, } = useGetMetaEspecifico_allQuery(user.access)
    const { data: dataActividades, isSuccess: isSuccessActividades, } = useGetActividades_allQuery(user.access)
    const { data: dataMedioV, isSuccess: isSuccessMedioV, } = useGetMedioVerificacion_allQuery(user.access)
    const { data: dataIndicadorMedioPedi, isSuccess: isSuccessIndicadorMedioPedi } = useGetIndicadorPedi_MedioVerificacion_allQuery(user.access)
    const { data: dataPoa, isSuccess: isSuccessPoa, } = useGetPoaAllQuery(user.access)
   

    let detalle = []





    if (isSuccessEstr && isSuccessEspe && isSuccessMeta && isSuccessActividades && isSuccessMedioV && isSuccessIndicadorMedioPedi && isSuccessPoa) {
        dataEstr.forEach(function (estra, indexEstra, arrayEstra) {

            dataEspe.forEach(function (espe, indexEspe, arrayEspe) {

                dataMeta.forEach(function (metaEspecifico, indexMeta, arraymeta) {

                    dataActividades.forEach(function (actividades) {

                        dataMedioV.forEach(function (medio) {
                            dataIndicadorMedioPedi.forEach(function (indicadorPedi) {
                                if (espe.objetivo_estrategico == estra.id && metaEspecifico.objetivo_especifico == espe.id && actividades
                                    .meta_objetivo == metaEspecifico.id && medio.actividad_meta == actividades.id && indicadorPedi.medio_verificacion == medio.id
                                ) {
                                    detalle.push({
                                        objetivoEstrategico: estra.sigla,
                                        objetivoEspecifico: espe.nombre,
                                        metaObjetivoEspecifico: metaEspecifico.nombre,
                                        actividad: actividades.nombre,
                                        medio_verificacion: medio.nombre,
                                        indicadorPedi: indicadorPedi.nombre,
                                        id_indicador: indicadorPedi.id,
                                        total: indicadorPedi.total,
                                        anio1: indicadorPedi.anio1,
                                        anio2: indicadorPedi.anio2,
                                        anio3: indicadorPedi.anio3,
                                        anio4: indicadorPedi.anio4,
                                        anio5: indicadorPedi.anio5,
                                        entidad: indicadorPedi.entidad,
                                        // pro1: poa.pro1,
                                        // pro2 : poa.pro2,
                                        // pro3 : poa.pro3,
                                        // pro4: poa.pro4,
                                        // pro5 : poa.pro5,
                                        // pro6 : poa.pro6,
                                        // pro7: poa.pro7,
                                        // pro8 : poa.pro8,
                                        // pro9 : poa.pro9,
                                        // pro10: poa.pro10,
                                        // pro11 : poa.pro11,
                                        // pro12 : poa.pro12,  
                                    })
                                }
                            })
                        })
                    })
                })
            })
        })
    }

    if (isSuccessPoa) {
        detalle.forEach(function (deta, indexDet) {
            dataPoa.forEach(function (poa) {
                if (deta.id_indicador == poa.indicadorPedi) {
                    detalle[indexDet]['anio'] = poa.anio
                    detalle[indexDet]['totalAnio'] = poa.totalAnio
                    detalle[indexDet]['pro1'] = poa.pro1
                    detalle[indexDet]['pro2'] = poa.pro2
                    detalle[indexDet]['pro3'] = poa.pro3
                    detalle[indexDet]['pro4'] = poa.pro4
                    detalle[indexDet]['pro5'] = poa.pro5
                    detalle[indexDet]['pro6'] = poa.pro6
                    detalle[indexDet]['pro7'] = poa.pro7
                    detalle[indexDet]['pro8'] = poa.pro8
                    detalle[indexDet]['pro9'] = poa.pro9
                    detalle[indexDet]['pro10'] = poa.pro10
                    detalle[indexDet]['pro11'] = poa.pro11
                    detalle[indexDet]['pro12'] = poa.pro12

                }
            })
        })

    }

    console.log('data detalle', detalle)




    const columns = [
        {
            name: 'objetivoEstrategico',
            label: 'obj estrategico'
        },
        {
            name: 'objetivoEspecifico',
            label: 'obj especifico'
        },
        {
            name: 'metaObjetivoEspecifico',
            label: 'meta'
        },
        {
            name: 'actividad',
            label: 'actividad'
        },
        {
            name: 'medio_verificacion',
            label: 'medio verificacion'
        },
        {
            name: 'indicadorPedi',
            label: 'Indicador'
        },
        {
            name: 'total',
            label: 't Pedi',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                            <ModalPoa
                                indicadorPedi={[tableMeta.rowData[5], tableMeta.rowData[6]]}
                                indicador_id={tableMeta.rowData[22]}
                                
                            />
                        </div>
                    )
                },
                filter: false,
            }

        },
        {
            name: 'anio',
            label: 'año',

        },
        {
            name: 'totalAnio',
            label: 't año',
            options: {
                filter: false,
            }
        },
        {
            name: 'entidad',
            label: 'responsable'
        },
        {
            name: 'pro1',
            label: '1',
            options: {
                filter: false,
            }


        },
        {
            name: 'pro2',
            label: '2',
            options: {
                filter: false,
            }

        },
        {
            name: 'pro3',
            label: '3',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro4',
            label: '4',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro5',
            label: '5',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro6',
            label: '6',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro7',
            label: '7',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro8',
            label: '8',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro9',
            label: '9',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro10',
            label: '10',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro11',
            label: '11',
            options: {
                filter: false,
            }
        },
        {
            name: 'pro12',
            label: '12',
            options: {
                filter: false,
            }
        },

        {
            name: 'id_indicador',
            label: 'id',
            options: {
                filter: false,
                display: false

            }
        },


    ]
    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila


    };
    return (
        <DashboardPedi>
            <div >
            <p>Registro Poa</p>
            <MUIDataTable
                title={'POA'}
                data={detalle}
                columns={columns}
                options={options}

            />

            </div>



        </DashboardPedi>





    )
}
