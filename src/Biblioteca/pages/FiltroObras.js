import React, { useState } from 'react';
import DashboardVisitante from '../../pages/components/DashboardVisitante'
import { useGetListAutoresObras_filterAbiertoQuery } from '../services/bibliotecaApi'
import LoadingSpinner from './components/LoadingSpinner'
import { IoReaderOutline } from "react-icons/io5"
import { RUTA_SERVIDOR } from '../../ApiRoutes';

export default function FiltroObras() {

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(100);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset to first page when page size changes
    };

    const [searchOption, setSearchOption] = useState('titulo');

    const [autor, setAutor] = useState('');
    const handleAutor = (event) => {
        setAutor(event.target.value);
        setTitulo('')
    };

    const [titulo, setTitulo] = useState('');
    const handleTitulo = (event) => {
        setTitulo(event.target.value);
        setAutor('')
    };


    const handleOptionChange = (e) => {
        setSearchOption(e.target.value);
    }


    const { data, isLoading, isFetching } = useGetListAutoresObras_filterAbiertoQuery({ autor: autor, obra: titulo, page:page, page_size:pageSize })

    return (
        <DashboardVisitante>
            <div className="flex flex-col items-center mt-8 mb-4">
                <h2 className='mb-4 text-lg fond-bold'>Biblioteca ISTVIF</h2>
                <div className="flex justify-center">
                    <div className="mr-4">
                        <input
                            type="radio"
                            id="titulo"
                            name="searchOption"
                            value="titulo"
                            checked={searchOption === 'titulo'}
                            onChange={handleOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="titulo">Buscar por Título</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="autor"
                            name="searchOption"
                            value="autor"
                            checked={searchOption === 'autor'}
                            onChange={handleOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="autor">Buscar por Autor</label>
                    </div>
                </div>
                <div className="mt-4">
                    {searchOption === 'titulo' && (
                        <div className="mx-2">

                            <div className="mt-2 w-full">
                                <input
                                    value={titulo}
                                    onChange={handleTitulo}
                                    autoComplete="given-name"
                                    placeholder='Búsqueda por título'
                                    className="text-center"
                                />
                            </div>
                        </div>

                    )}
                    {searchOption === 'autor' && (

                        <div className="mx-2">

                            <div className="mt-2 w-full">
                                <input
                                    value={autor}
                                    onChange={handleAutor}
                                    autoComplete="given-name"
                                    placeholder='Búsqueda por autor'
                                    className="text-center"
                                />
                            </div>
                        </div>

                    )}
                </div>
            </div>


            <div className="mb-4 ml-4">
            <label className="mr-2 text-xs">Tamaño hoja:</label>
            <select
              className="px-4 py-1 border rounded text-xs"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={2}>2</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
            </select>
          </div>
            

            {(isLoading || isFetching) ? <LoadingSpinner /> :
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-xs text-center">#</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Autor</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Obra</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Año</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Tipo obra</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Tipo material</th>

                            <th></th>



                        </tr>
                    </thead>
                    <tbody>
                        {data?.results.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.autor}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.anio_publicacion}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_material}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> < IoReaderOutline className='h-5 w-5' /> </a>)}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            }

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!data?.previous}
                    className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!data?.next}
                    className="px-2 py-1 bg-blue-500 text-xs text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>


        </DashboardVisitante>


    )
}