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


} from '../services/pediApi'

import ModalPoa from './components/ModalPoa'

export default function TablaPedi() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data: dataPedi, isSuccess: isSuccessPedi, } = useGetPediVersionQuery(user.access)

    const { data: dataEstr, isSuccess: isSuccessEstr, } = useGetObjetivosEstr_allQuery(user.access)

    const { data: dataEspe, isSuccess: isSuccessEspe, } = useGetObjetivosEspecificos_allQuery(user.access)
    const { data: dataMeta, isSuccess: isSuccessMeta, } = useGetMetaEspecifico_allQuery(user.access)
    const { data: dataActividades, isSuccess: isSuccessActividades, } = useGetActividades_allQuery(user.access)
    const { data: dataMedioV, isSuccess: isSuccessMedioV, } = useGetMedioVerificacion_allQuery(user.access)
    const { data: dataIndicadorMedioPedi, isSuccess: isSuccessIndicadorMedioPedi } = useGetIndicadorPedi_MedioVerificacion_allQuery(user.access)

    let detalle = []
    console.log('datameta',dataMeta)



    if (isSuccessEstr && isSuccessEspe && isSuccessMeta && isSuccessActividades && isSuccessMedioV && isSuccessIndicadorMedioPedi) {
        dataEstr.forEach(function (estra, indexEstra, arrayEstra) {
            console.log('estra')
            dataEspe.forEach(function (espe, indexEspe, arrayEspe) {
                console.log('espe')
                dataMeta.forEach(function (metaEspecifico, indexMeta, arraymeta) {
                    console.log('meta')
                    dataActividades.forEach(function (actividades) {
                        console.log('actividades')
                        dataMedioV.forEach(function (medio) {
                            console.log('medio')
                            dataIndicadorMedioPedi.forEach(function (indicadorPedi) {
                                console.log('indicador')
                                if (espe.objetivo_estrategico == estra.id) {
                                    if (metaEspecifico.objetivo_especifico == espe.id && actividades) {
                                        console.log('si pasa')

                                    }
                                }
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
                                        entidad: indicadorPedi.entidad
                                    })
                                    console.log(detalle)
                                }
                            })
                        })
                    })
                })
            })
        })
    }



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
            label: 'total',
            options: {
                customBodyRender: (value,tableMeta) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                            <ModalPoa 
                            indicadorPedi={[tableMeta.rowData[5], tableMeta.rowData[6]]}
                            indicador_id = {tableMeta.rowData[13]}
                            />
                        </div>
                    )
                }
            }
        },
        {
            name: 'entidad',
            label: 'responsable'
        },
        {
            name: 'anio1',
            label: '1'
        },
        {
            name: 'anio2',
            label: '2'
        },
        {
            name: 'anio3',
            label: '3'
        },
        {
            name: 'anio4',
            label: '4'
        },
        {
            name: 'anio5',
            label: '5'
        },
        {
            name: 'id_indicador',
            label: 'id'
        },


    ]
    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila


    };
    return (
        <DashboardPedi>
            <MUIDataTable
                title={'PEDI'}
                data={detalle}
                columns={columns}
                options={options}

            />
              <ModalPoa
       indicadorPedi={['iiiii', 44]}
              />

        </DashboardPedi>
      




    )
}
