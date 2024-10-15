import React, { useState } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import {
    useGetListAutoresObras_todosQuery,
    useGetListAutoresObras_filterQuery
} from '../services/bibliotecaApi'
import CargaDocumentoModal from '../components/CargaObrasModal'
import MUIDataTable from 'mui-datatables';
import CargaObrasModal from '../components/CargaObrasModal';
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import { IoReaderOutline } from "react-icons/io5"
import ModalListaBiblioteca from './components/ModalListaBiblioteca'

const ListaObrasAutores = () => {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const [page, setPage] = useState(1)
    const [page_size, sepPageSize] = useState(100)
    const [autor, setAutor] = useState('')
    const [obra, setObra] = useState('')

    const handleAutor = (event) => {
        setAutor(event.target.value);
    };

    const handleObra = (event) => {
        setObra(event.target.value);
    };


    const { data: dataObras, isLoading: isLoadingObras, isFetching: isFetchingObras } = useGetListAutoresObras_filterQuery({ access: user.access, page: page, page_size: page_size, autor: autor, obra: obra })


    return (
        <DashboardBibliotecaAdmin>

            <div className="mb-4">
                <label className="mr-2 text-sm">Buscar por autor:</label>
                <input
                    type="text"

                    value={autor}
                    onChange={handleAutor}
                    className="border border-neutral-700 "
                    placeholder="Ingrese el nombre"
                />
            </div>

            <div className="mb-4">
                <label className="mr-2 text-sm">Buscar por obra:</label>
                <input
                    type="text"

                    value={obra}
                    onChange={handleObra}
                    className="border border-neutral-700 "
                    placeholder="Ingrese la obra"
                />
            </div>
            {(isFetchingObras || isLoadingObras) ?
                <LoadingSpinner />
                :
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-xs text-center">#</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Autor</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Titulo</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Año</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Tipo</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Material</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Digitador</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Cargar</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Eliminar</th>


                        </tr>
                    </thead>
                    <tbody>
                        {dataObras?.results.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.autor}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.anio_publicacion}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_material} {item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> < IoReaderOutline className='h-5 w-5' /> </a>)}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.digitador_name}</td>
                                <td className="py-2 px-4 border-b text-xs text-center"> {item.id} <CargaObrasModal id={item.obra_id} /> </td>
                                <td className="py-2 px-4 border-b text-xs text-center">  <ModalListaBiblioteca id={parseInt(item.obra_id)} /> </td>




                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </DashboardBibliotecaAdmin>



    )
}
export default ListaObrasAutores