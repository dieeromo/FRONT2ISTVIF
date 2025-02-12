import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useParams } from 'react-router-dom';
import {useGetDependenciaIDhistorialQuery} from '../services/organigramaApi'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaEye } from "react-icons/fa";

export default function DependenciaDetalle() {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data, isLoading, isFetching } = useGetDependenciaIDhistorialQuery({ access: user.access, id:id })
    console.log(data)
  return (
   <>
   <Navbar_dashboard/>
   Detalle dependencia


   {(isLoading || isFetching) ?
                    <LoadingSpinner />
                    :

                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b text-xs text-center">#</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Dependencia</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Sigla</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Tipo</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Responsable</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Fecha designacion</th>
                                <th className="py-2 px-4 border-b text-xs text-center">Designación</th>
                                <th></th>


                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index} className={`${item.pagado ? 'bg-green-100' : ''}`}>
                                    <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>

                                    <td className="py-2 px-4 border-b text-xs text-center">
                                        <a href={`dependencias/detalle/${item.id}`} className=" hover:text-gray-300"> {item.nombre}</a>
                                    </td>
                                    <td className="py-2 px-4 border-b text-xs text-center">{item.siglas}</td>
                                    <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_name}</td>
                                    <td className="py-2 px-4 border-b text-xs text-center">{item.representante_name}</td>
                                    <td className="py-2 px-4 border-b text-xs text-center">{item.fecha}</td>
                                    <td className="py-2 px-4 border-b text-xs text-center">
                                        {
                                            item.archivoDesignacion && (<a href={`${item.archivoDesignacion}`} target="_blank"> <FaEye /></a>)
                                        }

                                    </td>

                                    <td>
                                      
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
   </>
  )
}
