import React from 'react'
import { useGetPediDataQuery } from '../services/pediApi'
import DashboardPedi from './components/DashboardPedi'




export default function PediData() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data: dataPediData, isSuccess: isSuccessPediData, } = useGetPediDataQuery(user.access)
    console.log(dataPediData)
    return (
        <DashboardPedi>
            <div className=" inset-0 flex items-center justify-center  focus:outline-none">
                {isSuccessPediData ?


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
                                <td>Indicador</td>
                                <td>total</td>
                                <td>Resp</td>

                                <td></td>


                            </tr>
                        </thead>

                        <tbody>


                            {dataPediData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                                    <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.pedi}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.oestrategico}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.oespecifico}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.meta}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.actividad}</td>
                                    <td className="border border-gray-400 text-xs px-2"> {item.medio}</td>
                                    <td className="border border-gray-400 text-xs px-2"> {item.indicadorPedi}</td>
                                    <td className="border border-gray-400 text-xs px-2">{item.totalPedi}</td>


                                    <td className="border border-gray-400 text-xs px-2">{item.responsable}</td>



                                </tr>



                            ))}


                        </tbody>

                    </table>

                    :
                    <p>Cargando...</p>
                }


            </div>



        </DashboardPedi>

    )
}
