import React from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import { useCreateUbicacionObraMutation, useGetListUbicacionObrasQuery } from '../services/bibliotecaApi'
import MUIDataTable from 'mui-datatables';
import ModalUbicaciones from './components/ModalUbicaciones'

export default function UbicacionObras() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")


    const [createUbicacion, { data: dataCreate, isSuccess: isSuccessCreate, isLoading: isLoadingAction }] = useCreateUbicacionObraMutation()

    const { data, isSuccess, isLoading, isError, error } = useGetListUbicacionObrasQuery(user.access)
    const columns = [
        {
            name: 'ubicacion',
            label: 'ubicacion'
        },
        {
            name: 'id',
            label: ' ',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                            {userDatos.is_adminBiblioteca ?
                                <ModalUbicaciones
                                    id={value}
                                    nombre_doc_default={tableMeta.rowData[0]}
                                />
                                :
                                <>
                                </>
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

        const ubicacion = e.target.elements.ubicacion.value.trim()

        createUbicacion([user.access, ubicacion])
    }
    return (
        <DashboardBibliotecaAdmin>
            {userDatos.is_adminBiblioteca ?
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12 ">
                            <h2 className="text-xl font-bold leading-7 text-gray-900 ">Ubicación Obras</h2>

                            <div className='grid grid-cols-2'>

                                <div className="">
                                    <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                        Ubicacón
                                    </label>
                                    <div className="mt-2 w-1/2">
                                        <input
                                            type="text"
                                            name="ubicacion"
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

            {isLoading ?
                <div> <p className=''>Cargando...</p></div>
                :
                <MUIDataTable
                    title={'Ubicaciones'}
                    data={data}
                    columns={columns}
                    options={options}

                />
            }
        </DashboardBibliotecaAdmin>

    )
}
