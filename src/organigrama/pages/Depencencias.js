import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useGetDependenciasQuery } from '../services/organigramaApi'
import ModalCreteDependencia from './ModalCreteDependencia'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaEye } from "react-icons/fa";
import ModalEditDependencia from './ModalEditDependencia'


export default function Depencencias() {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
   


    const { data, isLoading, isFetching } = useGetDependenciasQuery({ access: user.access })
    console.log('data',data)

    return (


        <div >
            <Navbar_dashboard />
            <h2 className='font-bold text-center mt-5'> Depencencias intitucionales</h2>

            <div className='m-5'>
                {(userDatos.is_secretaria || userDatos.is_rectora) &&  <ModalCreteDependencia />}


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
                                        {(userDatos.is_secretaria || userDatos.is_rectora) &&
                                            <ModalEditDependencia
                                                id={item.id}
                                                tipoID={item.tipo}
                                                representanteID={item.representante}
                                            />
                                        }
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>

        </div>
    )
}
