import React from 'react'
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai"
import DashboardPedi from './components/DashboardPedi'

import { useLocation, useParams } from 'react-router-dom';
import { useGetMedioVer_actividadQuery } from '../services/pediApi'
import ModalMediosVerificacion from './components/ModalMediosVerificacion'

export default function RegistroMediosVer() {
  const { actividad_id } = useParams()

  const location = useLocation();
  const { pediNombre, estrategicoNombre, especificoNombre, metaNombre, actividadNombre } = location.state;
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const { data, isSuccess } = useGetMedioVer_actividadQuery([user.access, actividad_id])

  return (
    <DashboardPedi>
      <h1>Registro medios de verificación</h1>
      <p className='text-xs'>O. estratégico: {estrategicoNombre}</p>
      <p className='text-xs'>O. específico: {especificoNombre}</p>
      <p className='text-xs'>Meta: {metaNombre}</p>
      <p className='text-xs'>Actividad: {actividadNombre}</p>

      <ModalMediosVerificacion
        id_actividad={actividad_id}
      />
      {isSuccess ?
        <div className=" inset-0 flex items-center justify-center  focus:outline-none">
          <table className="shadow-md">
            <thead >
              <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                <td>#</td>
                <td>Pedi</td>
                <td>O. Estrategico</td>
                <td>O. Especifico</td>
                <td>Meta</td>
                <td>Actividad</td>
                <td>Medio verificacion</td>
                <td> </td>
              </tr>
            </thead>

            <tbody>


              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                  <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                  <td className="border border-gray-400 text-xs px-2">{pediNombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{estrategicoNombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{especificoNombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{metaNombre}</td>
                  <td className="border border-gray-400 text-xs px-2"> {actividadNombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{item.nombre}</td>

                  <td><Link to={`/pedi/registro/indicador/${item.id}`} state={{ pediNombre: pediNombre, estrategicoNombre: estrategicoNombre, especificoNombre: especificoNombre, metaNombre: metaNombre, actividadNombre: actividadNombre, medioNombre: item.nombre }}><AiFillCaretRight /></Link> </td>
                </tr>

              ))}


            </tbody>

          </table>

        </div>
        :
        <>Cargando...</>
      }



    </DashboardPedi>

  )
}
