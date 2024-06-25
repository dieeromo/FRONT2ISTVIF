import React from 'react'
import { useGetPediDataQuery } from '../services/pediApi'
import DashboardPedi from './components/DashboardPedi'




export default function PediData() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data: dataPediData, isSuccess: isSuccessPediData, } = useGetPediDataQuery(user.access)

    return (
        <DashboardPedi>
            <div className=" inset-0 flex items-center justify-center  focus:outline-none">
                {isSuccessPediData ?
                    <div>
                        <h1>Plan Estratégico de Desarrollo Institucional {dataPediData[0].pedi}</h1>
                        <table className="shadow-md">
                            <thead >
                                <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                                    <td>#</td>

                                    <td>Obj. Estr</td>
                                    <td>Obj. Esp</td>
                                    <td>Meta</td>
                                    <td>Actividad</td>
                                    <td>Medio verificación</td>
                                    <td>Indicador</td>
                                    <td>Total</td>
                                    <td>Responsable</td>
                                    <td>Año 1</td>
                                    <td>Año 2</td>
                                    <td>Año 3</td>
                                    <td>Año 4</td>
                                    <td>Año 5</td>

                                    <td></td>


                                </tr>
                            </thead>

                            <tbody>


                                {dataPediData.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                                        <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.oestrategico_sigla}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.oespecifico}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.meta}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.actividad}</td>
                                        <td className="border border-gray-400 text-xs px-2"> {item.medio}</td>
                                        <td className="border border-gray-400 text-xs px-2"> {item.indicadorPedi}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.totalPedi}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.responsable_sigla}</td>

                                        <td className="border border-gray-400 text-xs px-2">{item.anio1}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.anio2}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.anio3}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.anio4}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.anio5}</td>



                                    </tr>



                                ))}


                            </tbody>

                        </table>

                    </div>




                    :
                    <p>Cargando...</p>
                }


            </div>



        </DashboardPedi>

    )
}
