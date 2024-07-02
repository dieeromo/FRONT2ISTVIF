import React from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery } from '../services/pediApi'
import ModalSeguimientoPoa from './components/ModalSeguimientoPoa'
import { enableCreateSeguimiento, EnablenumeroPoaConfig } from '../../ConfiguracionApp'

export default function SeguimientoPoadata() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")


    const { data: dataPoa, isSuccess: isSuccessPoa } = useGetPoaDataQuery(user.access)

    return (
        <DashboardPedi>

            {isSuccessPoa ?
                <div>
                    <h1>Planificación operativa anual {dataPoa[0].anioPoa} </h1>
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
                                    <td className="border border-gray-400 text-xs px-2"><div className=' border-b-2 border-gray-500 '>{item.eje1}</div> <div>{item.totalAnio}</div></td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje1}</div>   <div>{item.pro1}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '> {item.eje2} </div>  <div>{item.pro2}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje3} </div>  <div>{item.pro3}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2">  <div className=' border-b-2 border-gray-500 '>{item.eje4} </div>  <div>{item.pro4} </div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '> {item.eje5}</div>  <div> {item.pro5}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje6} </div>  <div>{item.pro6}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje7}</div>  <div>{item.pro7}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje8}</div>  <div>{item.pro8}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje9}</div>  <div>{item.pro9}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"><div className=' border-b-2 border-gray-500 '> {item.eje10}</div> <div>{item.pro10}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje11} </div>  <div>{item.pro11} </div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje12} </div>  <div>{item.pro12}</div> </td>
                                    <td>
                                        {item.coordinador_entidad == userDatos.id && enableCreateSeguimiento && EnablenumeroPoaConfig < item.numeroPoa  ?

                                            <ModalSeguimientoPoa
                                                id={item.idPoa}

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

                :
                <>Cargando</>
            }


        </DashboardPedi>

    )
}
