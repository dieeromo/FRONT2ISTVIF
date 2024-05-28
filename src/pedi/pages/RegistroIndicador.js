import React from 'react'
import DashboardPedi from './components/DashboardPedi'
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';
import { useGetIndicadorMedio_pediQuery} from '../services/pediApi'
import { AiFillCaretRight } from "react-icons/ai"
import ModalIndicadorPedi from './components/ModalIndicadorPedi'


export default function RegistroIndicador() {
    const { medio_id } = useParams()
    const location = useLocation();
    const { pediNombre, estrategicoNombre, especificoNombre, metaNombre, actividadNombre, medioNombre } = location.state;

    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const {data, isSuccess} = useGetIndicadorMedio_pediQuery([user.access, medio_id])
    console.log(data)
   

  return (
    <DashboardPedi>
            <h1>Registro indocadores PEDI</h1>
      <p className='text-xs'>O. estratégico: {estrategicoNombre}</p>
      <p className='text-xs'>O. específico: {especificoNombre}</p>
      <p className='text-xs'>Meta: {metaNombre}</p>
      <p className='text-xs'>Actividad: {actividadNombre}</p>
      <p className='text-xs'>Medio de verificacion: {medioNombre }</p>
      <ModalIndicadorPedi 
      id_medio={medio_id}
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
                <td>indicador</td>
                <td>total</td>
                <td>Resp</td>
                <td>año 1</td>
                <td>año 2</td>
                <td>año 3</td>
                <td>año 4</td>
                <td>año 5</td>
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
                  <td className="border border-gray-400 text-xs px-2"> {medioNombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{item.nombre}</td>
                  <td className="border border-gray-400 text-xs px-2">{item.total}</td>
                  <td className="border border-gray-400 text-xs px-2">{item.entidad}</td>
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
        <>Cargando...</>
      }



    </DashboardPedi>

  )
}
