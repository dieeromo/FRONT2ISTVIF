import React from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery } from '../services/pediApi'

export default function PoaData() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data: dataPoa, isSuccess: isSuccessPoa } = useGetPoaDataQuery(user.access)
    console.log(dataPoa)

    return (
        <DashboardPedi>
            <div>PoaData</div>
            {isSuccessPoa ?
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
                            <td>Total Pedi</td>
                            <td>Responsable</td>
                            <td>Año</td>
                            <td>Total año</td>
                            <td>Mes 1</td>
                            <td>Mes 2</td>
                            <td>Mes 3</td>
                            <td>Mes 4</td>
                            <td>Mes 5</td>
                            <td>Mes 6</td>
                            <td>Mes 7</td>
                            <td>Mes 8</td>
                            <td>Mes 9</td>
                            <td>Mes 10</td>
                            <td>Mes 11</td>
                            <td>Mes 12</td>

                            <td></td>


                        </tr>
                    </thead>

                    <tbody>


                        {dataPoa.map((item, index) => (
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

                                <td className="border border-gray-400 text-xs px-2">{item.anioPoa}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.totalAnio}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro1}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro2}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro3}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro4}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro5}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro6}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro7}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro8}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro9}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro10}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro11}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.pro12}</td>




                            </tr>



                        ))}


                    </tbody>

                </table>
                :
                <>Cargando</>
            }


        </DashboardPedi>

    )
}
