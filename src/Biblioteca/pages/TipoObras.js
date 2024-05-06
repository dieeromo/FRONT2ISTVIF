import React from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import { useCreateTipoObraMutation, useGetListTipoObrasQuery } from '../services/bibliotecaApi'
import MUIDataTable from 'mui-datatables';
import ModalTiposObras from './components/ModalTiposObras'


export default function TipoObras() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const [createTipoObra, { data: dataCreate, isSuccess: isSuccessCreate, isLoading: isLoadingAction }] = useCreateTipoObraMutation()
    const { data: dataTipos, isSuccess: isSuccessTipos, isLoading: isLoadingTipos, } = useGetListTipoObrasQuery(user.access)
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const columns = [
        {
            name: 'tipo',
            label: 'tipo obra'
        },
        {
            name: 'id',
            label: ' ',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            {userDatos.is_adminBiblioteca ?
                                <ModalTiposObras
                                    id={value}
                                    nombre_doc_default={tableMeta.rowData[0]}

                                />
                                :
                                <> </>
                            }
                        </>




                    )

                }

            }
        },

    ]

    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila

        titleTextStyle: {
            fontSize: '5px', // Establece el tamaño de fuente del título
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tipo = e.target.elements.tipoObra.value.trim()
        createTipoObra([user.access, tipo])
    }
    return (
        <DashboardBibliotecaAdmin>
            {userDatos.is_adminBiblioteca ?
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12 ">
                            <h2 className="text-xl font-bold leading-7 text-gray-900 ">Categoria Obras</h2>

                            <div className='grid grid-cols-2'>

                                <div className="">
                                    <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                        Categoria
                                    </label>
                                    <div className="mt-2 w-1/2">
                                        <input
                                            type="text"
                                            name="tipoObra"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='mt-8 ml-5'>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                :
                <p className='bg-red-100 w-1/4'>No esta autorizado para hacer registros</p>
            }


            <MUIDataTable
                title={'Tipo obras'}
                data={dataTipos}
                columns={columns}
                options={options}

            />



        </DashboardBibliotecaAdmin>

    )
}
