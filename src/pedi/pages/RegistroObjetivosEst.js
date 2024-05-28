import React from 'react'
import { useParams } from 'react-router-dom';
import DashboardPedi from './components/DashboardPedi'
import { useLocation } from 'react-router-dom';
import { useGetObjetivosEstr_pediQuery } from '../services/pediApi'
import ModalFormObjEstrategicos from './components/ModalFormObjEstrategicos'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";

export default function RegistroObjetivosEst() {
  const navigate = useNavigate()
  const { pedi_id } = useParams()

  const location = useLocation();
  const { data_pedi } = location.state;
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const { data, isSuccess, isLoading, isError, error } = useGetObjetivosEstr_pediQuery([user.access, pedi_id])
  console.log(data)
  const handleSiguiente = (e) => {

    navigate(`/pedi/registro/objetivos/especificos/${10}`, { state: { data_objetivosEstrategicos: { pediNombre: data.pediNombre } } })
  }


  return (
    <DashboardPedi>
      <div>Registro Objetivos Estratégicos</div>
      <ModalFormObjEstrategicos
        id_pedi={pedi_id}
      />
      {isSuccess ?
        <div className=" inset-0 flex items-center justify-center  focus:outline-none  ">
          <table className="shadow-md">
            <thead>
              <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                <td>Pedi</td>
                <td>Objetivo Estratégico</td>
                <td>Sigla</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                  <td className="border border-gray-400 text-xs px-2">  {data_pedi.pediNombre}</td>
                  <td className="border border-gray-400 text-xs px-2 ">  {item.nombre}</td>
                  <td className="border border-gray-400 text-xs px-2">  {item.sigla}</td>
                  {/* <td>  <button onClick={handleSiguiente(item.objetivo_estrategico)}>Next</button></td> */}
                  {/* <td><a href={`/pedi/registro/objetivos/especificos/${item.id}`}> next</a></td> */}
                  <td className="text-xs px-2"><Link to={`/pedi/registro/objetivos/especificos/${item.id}`} state={{ pediNombre: data_pedi.pediNombre, estrategicoNombre: item.nombre }}><AiFillCaretRight /></Link> </td>

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
