import React from 'react'
import Select from 'react-select'
import DashboardBibliotecaAdmin from '../../components/DashboardBibliotecaAdmin'
import { useGetListTitulos_filterNuevoQuery, useGetListUbicacionObrasQuery } from '../../../services/bibliotecaApi'


export default function Obras() {


  const [ubicacion, SetUbicacion] = React.useState('')
  const [titulo, setTitulo] = React.useState('')

  const { data: dataUbicacion } = useGetListUbicacionObrasQuery()
  const { data } = useGetListTitulos_filterNuevoQuery({ ubicacionid: ubicacion, titulo: titulo })


  return (
    <>
      <DashboardBibliotecaAdmin>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl '>Obras</h1>
           

        </div>
       
        <div className='grid grid-cols-2'>
              <div className="">
          <label className="block text-xs font-medium leading-6 text-gray-500">Ubicacion de la obra</label>
          <div className="">
            <Select
              options={dataUbicacion}
              onChange={(selectedOption) => SetUbicacion(selectedOption.value)}
              className='text-xs w-1/2'
            />
          </div>
        </div>

        <div className="">
          <label className="block text-xs font-medium leading-6 text-gray-500">Titulo de la obra</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="text-xs w-1/2 py-2"
            placeholder="Ingrese el titulo de la obra"
          />
        </div>

        </div>

    

        <table className="min-w-full bg-white border border-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-xs text-center">#</th>
              <th className="py-2 px-4 border-b text-xs text-center">Titulo</th>
              <th className="py-2 px-4 border-b text-xs text-center">Codigo</th>
              <th className="py-2 px-4 border-b text-xs text-center">Tipo obra</th>
              <th className="py-2 px-4 border-b text-xs text-center">Material</th>
              <th className="py-2 px-4 border-b text-xs text-center">Ubicacion</th>




            </tr>
          </thead>
          <tbody>
            {data?.results.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.titulo}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.codigo}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_obra}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_material}</td>
                <td className="py-2 px-4 border-b text-xs text-center">{item.ubicacionName}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </DashboardBibliotecaAdmin>
    </>
  )
}
