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
import { useGetDependencias_allQuery } from '../../general/services/generalApi'


import ModalPoaEdit from './components/ModalPoaEdit'
import ModalSeguimientoCreate from './components/ModalSeguimientoCreate'
import { RiProjector2Fill } from 'react-icons/ri';
import { EnablenumeroPoaConfig, enableCreateSeguimiento} from '../../ConfiguracionApp'
import { GiConsoleController } from 'react-icons/gi';


export default function SeguimientoPoa() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")


    const { data: dataPedi, isSuccess: isSuccessPedi, } = useGetPediVersionQuery(user.access)

    const { data: dataEstr, isSuccess: isSuccessEstr, } = useGetObjetivosEstr_allQuery(user.access)

    const { data: dataEspe, isSuccess: isSuccessEspe, } = useGetObjetivosEspecificos_allQuery(user.access)
    const { data: dataMeta, isSuccess: isSuccessMeta, } = useGetMetaEspecifico_allQuery(user.access)
    const { data: dataActividades, isSuccess: isSuccessActividades, } = useGetActividades_allQuery(user.access)
    const { data: dataMedioV, isSuccess: isSuccessMedioV, } = useGetMedioVerificacion_allQuery(user.access)
    const { data: dataIndicadorMedioPedi, isSuccess: isSuccessIndicadorMedioPedi } = useGetIndicadorPedi_MedioVerificacion_allQuery(user.access)
    const { data: dataPoa, isSuccess: isSuccessPoa, } = useGetPoaAllQuery(user.access)

    const { data: dataDependencias, isSuccess: isSuccessDependencias, } = useGetDependencias_allQuery(user.access)

    //console.log('****', dataIndicadorMedioPedi)

    let detalle = []



    if (isSuccessEstr && isSuccessEspe && isSuccessMeta && isSuccessActividades && isSuccessMedioV && isSuccessIndicadorMedioPedi && isSuccessPoa && isSuccessDependencias) {
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
                                        pedi: estra.pediNombre,
                                        objetivoEstrategico: estra.sigla,
                                        objetivoEspecifico: espe.nombre,
                                        metaObjetivoEspecifico: metaEspecifico.nombre,
                                        actividad: actividades.nombre,
                                        medio_verificacion: medio.nombre,
                                        medio_verificacion_id: medio.id,
                                        indicadorPedi: indicadorPedi.nombre,
                                        id_indicador: indicadorPedi.id,
                                        nombre: indicadorPedi.nombre,
                                        total: indicadorPedi.total,
                                        anio1: indicadorPedi.anio1,
                                        anio2: indicadorPedi.anio2,
                                        anio3: indicadorPedi.anio3,
                                        anio4: indicadorPedi.anio4,
                                        anio5: indicadorPedi.anio5,
                                        activo: indicadorPedi.activo,
                                        cumple: indicadorPedi.cumple,
                                        observacion: indicadorPedi.observacion,
                                        digitador: indicadorPedi.digitador,
                                        numeroPoa: indicadorPedi.numeroPoa,


                                        entidad: indicadorPedi.entidad,
                                        entidad_id: indicadorPedi.entidadResponsable,
                                        representanteDependencia_id: indicadorPedi.representante_id,
                                        // representante_id: indicadorPedi.representante_id,
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
                    detalle[indexDet]['eje1'] = poa.eje1
                    detalle[indexDet]['eje2'] = poa.eje2
                    detalle[indexDet]['eje3'] = poa.eje3
                    detalle[indexDet]['eje4'] = poa.eje4
                    detalle[indexDet]['eje5'] = poa.eje5
                    detalle[indexDet]['eje6'] = poa.eje6
                    detalle[indexDet]['eje7'] = poa.eje7
                    detalle[indexDet]['eje8'] = poa.eje8
                    detalle[indexDet]['eje9'] = poa.eje9
                    detalle[indexDet]['eje10'] = poa.eje10
                    detalle[indexDet]['eje11'] = poa.eje11
                    detalle[indexDet]['eje12'] = poa.eje12

                    detalle[indexDet]['activo'] = poa.activo
                    detalle[indexDet]['observacion'] = poa.observacion
                    detalle[indexDet]['NumeroSeguimiento'] = poa.NumeroSeguimiento
                    //detalle[indexDet]['indicadorPedi'] = poa.indicadorPedi
                    detalle[indexDet]['digitador'] = poa.digitador

                    detalle[indexDet]['idPoa'] = poa.id

                }
            })
            
        })
       // mostrartabla = true
       // mostrartabla2 = false

    }
  //  console.log('detalle',detalle)




    return (
        <DashboardPedi>
            <h1>Seguimiento</h1>

            <div className=" inset-0 flex items-center justify-center  focus:outline-none">


                    <table className="shadow-md">
                        <thead >
                            <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                                <td>#</td>
                                <td>Pedi</td>
                                <td>O. Estratégico</td>
                                <td>O. Específico</td>
                                <td>Meta</td>
                                <td>Actividad</td>
                                <td>Medio verificación</td>
                                <td>indicador</td>
                                <td>T pedi</td>
                               
                                <td>Año</td>
                                <td>Total</td>
                                <td>Resp</td>
                                <td>m1</td>
                                <td>m2</td>
                                <td>m3</td>
                                <td>m4</td>
                                <td>m5</td>
                                <td>m6</td>
                                <td>m7</td>
                                <td>m8</td>
                                <td>m9</td>
                                <td>m10</td>
                                <td>m11</td>
                                <td>m12</td>
                                <td></td>


                            </tr>
                        </thead>

                        <tbody>


                            {detalle.reverse().map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                                    <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.pedi}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.objetivoEstrategico}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.objetivoEspecifico}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.metaObjetivoEspecifico}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.actividad}</td>
                                    <td className="border border-gray-400 text-xs px-2"> {item.medio_verificacion}</td>
                                    <td className="border border-gray-400 text-xs px-2"> {item.indicadorPedi}</td>
                                    <td className="border border-gray-400 text-xs px-2"> {item.total}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.anio}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.totalAnio}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.entidad}</td>
                                    {/* <td className="border border-gray-400 text-xs px-2">{item.pro1}</td> */}
                                    <td className= {item.eje1 >= item.pro1 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro1}</div> <div>{item.eje1}</div></td>
                                    <td className= {item.eje2 >= item.pro2 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'} ><div className=' border-b-2 border-gray-500'>{item.pro2}</div> <div>{item.eje2}</div></td>
                                    <td className= {item.eje3 >= item.pro3 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro3}</div> <div>{item.eje3}</div></td>
                                    <td className= {item.eje4 >= item.pro4 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro4}</div> <div>{item.eje4}</div></td>
                                    <td className= {item.eje5 >= item.pro5 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro5}</div> <div>{item.eje5}</div></td>
                                    <td className= {item.eje6 >= item.pro6 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro6}</div> <div>{item.eje6}</div></td>
                                    <td className= {item.eje7 >= item.pro7 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro7}</div> <div>{item.eje7}</div></td>
                                    <td className= {item.eje8 >= item.pro8 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro8}</div> <div>{item.eje8}</div></td>
                                    <td className= {item.eje9 >= item.pro9 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro9}</div> <div>{item.eje9}</div></td>
                                    <td className= {item.eje10 >= item.pro10 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro10}</div> <div>{item.eje10}</div></td>
                                    <td className= {item.eje11 >= item.pro11 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro11}</div> <div>{item.eje11}</div></td>
                                    <td className= {item.eje12 >= item.pro12 ? 'border border-gray-400 text-xs px-2' : 'border border-gray-400 text-xs px-2 bg-red-200'}><div className=' border-b-2 border-gray-500 '>{item.pro12}</div> <div>{item.eje12}</div></td>
                                    <td >
                                        { item.representanteDependencia_id == userDatos.id  && enableCreateSeguimiento ?
                                    <ModalSeguimientoCreate
                                      info_poa={item}
                                      indicadorPedi={[item.indicadorPedi, item.total]}
                                            />
                                            : 
                                            <></>
                                        }
                                  


                                    </td>

                                </tr>



                            ))}


                        </tbody>

                    </table>
         

            </div>



        </DashboardPedi>





    )
}
