import React,{useState} from 'react'
import Select from 'react-select'
import DashboardBibliotecaAdmin from '../../components/DashboardBibliotecaAdmin'
import { useGetListTitulos_filterNuevoQuery, useGetListUbicacionObrasQuery } from '../../../services/bibliotecaApi'


export default function Obras() {

    const [page_size, setPageSize] = useState(50);
    const [page, setPage] = useState(1);
  const [ubicacion, SetUbicacion] = React.useState('')
  const [titulo, setTitulo] = React.useState('')

  const { data: dataUbicacion } = useGetListUbicacionObrasQuery()
  
  const { data } = useGetListTitulos_filterNuevoQuery({ ubicacionid: ubicacion, titulo: titulo, page: page, page_size: page_size })


  const handlePageSize = (e) => {
        setPageSize(Number(e.target.value));
    };

    // Función para manejar la página anterior
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Función para manejar la página siguiente
    const handleNextPage = () => {
        if (data?.next) {
            setPage(page + 1);
        }
    };
  return (
    <>
      <DashboardBibliotecaAdmin>
        <div className='flex gap-x-2 items-center mb-4'>
          <h1 className='text-xl '>Obras</h1>
          <span className='text-gray-500 text-xl'>{data?.count}</span>
           

        </div>
       
        <div className='grid grid-cols-3'>
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

           <div className="mb-4 w-1/3">
                <label className="block text-xs font-semibold text-gray-500  ">Tamaño página:</label>
                    <input
                        type="number"
                        placeholder="Tamaño de pagina"
                        name='page_size'
                        value={page_size > 0 ? page_size : ''}


                        onChange={handlePageSize}
                        className="px-4 py-1 border rounded w-full text-xs"
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

           <div className="flex justify-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={!data?.previous}
                    className="bg-gray-300 px-1 text-sm bg-white rounded  disabled:opacity-50 mx-4"
                >
                    Anterior
                </button>
                <span className='mx-5 text-base'>Página {page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={!data?.next}
                    className="bg-gray-300 px-1 text-sm bg-white rounded  disabled:opacity-50 mx-4"
                >
                    Siguiente
                </button>
            </div>
      </DashboardBibliotecaAdmin>
    </>
  )
}
