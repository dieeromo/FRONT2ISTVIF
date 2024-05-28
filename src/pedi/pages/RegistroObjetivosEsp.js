import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import DashboardPedi from './components/DashboardPedi'
import { useGetObjetivosEspecifico_EstrategicoQuery } from '../services/pediApi'
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai"
import ModalFormObjEspecificos from './components/ModalFormObjEspecificos'

export default function RegistroObjetivosEsp() {
  const { estrategico_id } = useParams()
  const location = useLocation();
  const { pediNombre, estrategicoNombre } = location.state;
  console.log('pediNombre', pediNombre)

  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data, isSuccess, isLoading, isError, error } = useGetObjetivosEspecifico_EstrategicoQuery([user.access, estrategico_id])

  console.log(data)
  return (
    <DashboardPedi>
      <h1>Registro de objetivos especificos</h1>
      <ModalFormObjEspecificos
      id_obj_estrategico  = {estrategico_id}

      />
      {
        isSuccess ?
          <div className=" inset-0 flex items-center justify-center  focus:outline-none  ">
            <table className="shadow-md">
              <thead>
                <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                  <td>#</td>
                  <td>Pedi</td>
                  <td>O. estratégico</td>
                  <td>O. especifico</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                      <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                      <td className="border border-gray-400 text-xs px-2">{pediNombre}</td>
                      <td className="border border-gray-400 text-xs px-2">{estrategicoNombre}</td>
                      <td className="border border-gray-400 text-xs px-2">{item.nombre}</td>
                      <td className=" text-xs px-2"><Link to={`/pedi/registro/metas/${item.id}`} state={{ pediNombre: pediNombre, estrategicoNombre: estrategicoNombre, especificoNombre:item.nombre }}><AiFillCaretRight /></Link> </td>
                    </tr>

                  ))
                }


              </tbody>
            </table>

          </div>

          :
          <>Cargando...</>
      }



    </DashboardPedi>




  )
}

