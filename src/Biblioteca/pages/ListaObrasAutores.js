import React, { useState } from 'react'

import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import { useGetListAutoresObras_todosQuery } from '../services/bibliotecaApi'
import CargaDocumentoModal from '../components/CargaObrasModal'
import MUIDataTable from 'mui-datatables';
import CargaObrasModal from '../components/CargaObrasModal';
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import { IoReaderOutline } from "react-icons/io5"
import ModalListaBiblioteca from './components/ModalListaBiblioteca'

const ListaObrasAutores = () => {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data, isSuccess, isLoading, isError, error } = useGetListAutoresObras_todosQuery(user.access)

    console.log(data)
    const columns = [
        {
            name: 'autor',
            label: 'Autor'

        },
        {
            name: 'obra',
            label: 'titulo',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            {tableMeta.rowData[6] % 2 == 0

                                ?
                                <div className='bg-green-100'>
                                    {value}
                                </div>
                                :
                                <div className='bg-red-100'>
                                    {value}
                                </div>
                            }

                        </div>

                    )
                }
            }
        },
        {
            name: 'anio_publicacion',
            label: 'Año'
        },
        {
            name: 'tipo_obra',
            label: 'Tipo'
        },
        {
            name: 'tipo_material',
            label: 'Material',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            {value}
                            <div>
                                {value === 'Digital' || value==='Digital-fisico' ? <CargaObrasModal id={tableMeta.rowData[6]} /> : <></>}
                            </div>

                        </div>
                    )
                }
            }
        },
        {
            name: 'digitador_name',
            label: 'Digitador'
        },
        {
            name: 'obra_id',
            label: 'id',
            options: {
                filter: false,
                display: false

            }
        },
        {
            name: 'archivo',
            label: 'ver',
            options: {
                customBodyRender: (value) => {
                    console.log(value)

                    return (
                        <div >
                            {
                                value ?
                                    <a href={RUTA_SERVIDOR + `/media/${value}`} target="_blank"> < IoReaderOutline className='h-5 w-5' /> </a>
                                    :
                                    <div>

                                    </div>
                            }
                        </div>
                    )
                },
                filter: false,
            }
        },
        {
            name: '',
            label: '',
            options: {
                customBodyRender: (value,tableMeta) => {
                    console.log(value)

                    return (
                        <ModalListaBiblioteca id={tableMeta.rowData[6]}  />
                    )
                },
                filter: false,
            }
        },
    ]
    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila

        titleTextStyle: {
            fontSize: '5px', // Establece el tamaño de fuente del título
        },
    };




    return (
        <DashboardBibliotecaAdmin>
            {isLoading ? <> Cargando...</> :
                <MUIDataTable
                    title={'Obras biblioteca'}
                    data={data}
                    columns={columns}
                    options={options}

                />
            }

        </DashboardBibliotecaAdmin>



    )
}
export default ListaObrasAutores