import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useGetMetaEspecifico_EspecificoQuery, } from '../services/pediApi'
import DashboardPedi from './components/DashboardPedi'
import { AiFillCaretRight } from "react-icons/ai"
import { Link } from "react-router-dom";
import ModalFormMeta from './components/ModalFormMeta'

export default function RegistroMetas() {
    const { especifico_id } = useParams()
    const location = useLocation();
    const { pediNombre, estrategicoNombre,especificoNombre } = location.state;
    console.log('especifico id', especifico_id)
    console.log('datos entrada metas', pediNombre, estrategicoNombre)
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data, isSuccess } = useGetMetaEspecifico_EspecificoQuery([user.access, especifico_id])
    console.log(data)

    return (
        <DashboardPedi>
            <h1>Registro Meta</h1>
            <p className='text-xs'>O. estratégico: {estrategicoNombre}</p>
            <p className='text-xs'>O. específico: {especificoNombre}</p>
            <ModalFormMeta
            id_obj_especifico = {especifico_id }
            />

            <div className=" inset-0 flex items-center justify-center  focus:outline-none  ">
            <table  className="shadow-md">
                <thead>
                    <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                        <td>#</td>
                        <td>Pedi</td>
                        <td>O. Estrategico</td>
                        <td>O. Especifico</td>
                        <td>Meta</td>
                        <td></td>
                    </tr>
                </thead>
                {isSuccess ?
                    <tbody>

                        {data.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                                <td className="border border-gray-400 text-xs px-2 py-1">{index+1}</td>
                                <td className="border border-gray-400 text-xs px-2 py-1">{pediNombre}</td>
                                <td className="border border-gray-400 text-xs px-2">{estrategicoNombre}</td>
                                <td className="border border-gray-400 text-xs px-2">{especificoNombre}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.nombre}</td>
                                <td><Link to={`/pedi/registro/actividades/${item.id}` } state={{pediNombre:pediNombre, estrategicoNombre:estrategicoNombre, especificoNombre:especificoNombre, metaNombre:item.nombre}}><AiFillCaretRight /></Link> </td>
                            </tr>

                        ))}


                    </tbody>
                    :
                    <>Cargando...</>
                }
            </table>

            </div>

        </DashboardPedi>
    )
}
