import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import DocumentoGrafico from '../components/DocumentoGrafico'
import {
    useGetEstadistica_total_documentosQuery,
    useGetEstadistica_indicador_documentosQuery
} from '../services/evaluacionApi'
import * as echarts from 'echarts';

export default function EstadisticaEvaluacion() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataTotal, isSuccess: isSuccessTotal } = useGetEstadistica_total_documentosQuery({ access: user.access })
    console.log(dataTotal)
    let totalDocumento = 0
    let porcentaje_sin_subir = 0
    let porcentaje_por_revisar = 0
    let porcentaje_aprobado = 0
    let porcentaje_por_corregir = 0
    if (isSuccessTotal) {
        if (dataTotal.Sin_subir) {
            totalDocumento = totalDocumento + dataTotal.Sin_subir
        }
        if (dataTotal.Por_revisar) {
            totalDocumento = totalDocumento + dataTotal.Por_revisar
        }
        if (dataTotal.Aprobado) {
            totalDocumento = totalDocumento + dataTotal.Aprobado
        }
        if (dataTotal.Por_corregir) {
            totalDocumento = totalDocumento + dataTotal.Por_corregir
        }

        porcentaje_sin_subir = ((dataTotal.Sin_subir/totalDocumento)*100).toFixed(2)
        porcentaje_por_revisar = ((dataTotal.Por_revisar/totalDocumento)*100).toFixed(2)
        porcentaje_aprobado = ((dataTotal.Aprobado/totalDocumento)*100).toFixed(2)
        porcentaje_por_corregir = ((dataTotal.Por_corregir/totalDocumento)*100).toFixed(2)


    }
    const { data: dataIndicador, isSuccess: isSuccessIndicador } = useGetEstadistica_indicador_documentosQuery({ access: user.access })




    return (
        <div>
            <Navbar_dashboard />
            

            {isSuccessIndicador && (
                <div className='grid grid-cols-2'>
                    
                    <table table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b text-xs text-center">Documento</th>
                                <th className="py-2 px-4 border-b text-xs text-center">#</th>
                                <th className="py-2 px-4 border-b text-xs text-center">%</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td className=" px-4 border-b text-xs text-center">Sin subir</td>
                                <td className=" px-4 border-b text-xs text-center">{dataTotal.Sin_subir}</td>
                                <td className="px-4 border-b text-xs text-center">{porcentaje_sin_subir?<span>{porcentaje_sin_subir} %</span>:<span>0 %</span>}</td>
                            </tr>
                            <tr>
                                <td className=" px-4 border-b text-xs text-center">Por revisar</td>
                                <td className=" px-4 border-b text-xs text-center">{dataTotal.Por_revisar}</td>
                                <td className=" px-4 border-b text-xs text-center">{porcentaje_por_revisar?<span>{porcentaje_por_revisar} %</span>:<span>0 %</span>}</td>
                            </tr>

                            <tr>
                                <td className=" px-4 border-b text-xs text-center">Aprobado</td>
                                <td className=" px-4 border-b text-xs text-center">{dataTotal.Aprobado?<span>{dataTotal.Aprobado}</span>:<span>0</span>}</td>
                                <td className="px-4 border-b text-xs text-center">{porcentaje_aprobado?<span>{porcentaje_aprobado} %</span>:<span>0 %</span>}</td>
                            </tr>

                            <tr>
                                <td className=" px-4 border-b text-xs text-center">Corregir</td>
                                <td className=" px-4 border-b text-xs text-center">{dataTotal.Por_corregir?<span>{dataTotal.Por_corregir}</span>:<span>0</span>}</td>
                                <td className=" px-4 border-b text-xs text-center">{porcentaje_por_corregir?<span>{porcentaje_por_corregir} %</span>:<span>0 %</span>}</td>
                            </tr>
                            <tr>
                                <td className=" px-4 border-b text-xs text-center font-bold">Total</td>
                                <td className="px-4 border-b text-xs text-center font-bold">{totalDocumento}</td>
                                <td className=" px-4 border-b text-xs text-center font-bold">100%</td>
                            </tr>
                          

                        </tbody>
                    </table>
           

              
                    <DocumentoGrafico
                        data={dataTotal}
                    />
                </div>

            )}

        </div>
    )
}
