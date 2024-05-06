import React from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import MUIDataTable from 'mui-datatables';
import { useCreateCategoriaObraMutation, useGetListCategoriaObrasQuery } from '../services/bibliotecaApi'
import Modalcategorias from './components/Modalcategorias'

export default function CategoriaObra() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    console.log(userDatos)

    const [createCategoria, { data: dataCreate, isSuccess: isSuccessCreate, isLoading: isLoadingAction }] = useCreateCategoriaObraMutation()
    const { data, isSuccess, isLoading, isError, error } = useGetListCategoriaObrasQuery(user.access)


    const columns = [
        {
            name: 'categoria',
            label: 'categoria'
        },
        {
            name: 'id',
            label: ' ',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <>
                        {userDatos.is_adminBiblioteca ? 
                            <Modalcategorias
                                id={value}
                                nombre_doc_default={tableMeta.rowData[0]}

                            />
                            :
                            <></>
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
        const categoria = e.target.elements.categoria.value.trim()
        console.log(categoria)
        createCategoria([user.access, categoria])
    }
    return (
        <DashboardBibliotecaAdmin>
            { userDatos.is_adminBiblioteca ? 
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
                                        name="categoria"
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
                    title={'Categoria obras'}
                    data={data}
                    columns={columns}
                    options={options}

                />
            }


        </DashboardBibliotecaAdmin>

    )
}
