
import { useState, } from 'react'
import { useGetCriteriosQuery, useDeleteCriterioMutation } from '../services/criteriosApi'

import FormCriterios from '../components/FormCriterios'
import { useGetUsuariosQuery } from '../../usuarios/services/usuariosApi'
import DashboardAcreditacion from './components/DashboardAcreditacion'
import ModalCriterios from '../components/ModalCriterios'

import { GrLinkNext } from "react-icons/gr";

const CriteriosPage = () => {

    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data, isSuccess, isError, error } = useGetCriteriosQuery(user.access)


    const [deleteCriterio] = useDeleteCriterioMutation()

    return (
        <DashboardAcreditacion>
            <h2 className="text-2xl font-bold">Criterios</h2>
            <div>
                {/* <FormCriterios /> */}
                {
                    isSuccess ? <div >
                        <table className="table-auto w-1/2 shadow-md mt-6 mx-auto">
                            <thead className='bg-gray-200'>
                                <tr className='text-center'>
                                    <th>Numero</th>
                                    <th>Criterio</th>
                                 
                              
                                    <th></th>
                                    {/* <th></th> */}
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <tr key={index} className='border px-4 py-2 text-center'>
                                            <td className='text-sm'>  {item.numeracion} </td>
                                            <td className='text-sm'>{item.criterio}  </td>
                                        
                                      
                                            <td className='text-sm'> <a href={`/acreditacion/subcriterios/${item.id}`}><GrLinkNext /></a></td>
                                            {/* <td> <button onClick={() => { deleteCriterio([user.access, item.id]) }}>Delete</button> </td> */}
                                            <td>

                                                {/* <ModalCriterios
                                                    id={item.id}
                                                    criterio_default={item.criterio}
                                                    fecha_creacion_default={item.fecha_creacion}
                                                    responsable_default={item.responsable}
                                                    responsable_default_id={item.responsable_id}

                                                /> */}



                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                        :
                        <>Cargando...</>
                }
            </div>
        </DashboardAcreditacion>
    )
}
export default CriteriosPage