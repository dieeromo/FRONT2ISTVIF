import React from 'react'
import DashboardInventario from './components/DashboardInventario'
import { useGetInventarioTodoQuery } from '../services/inventarioApi'
import MUIDataTable from 'mui-datatables';
import ModalInventario from './components/ModalInventario'


export default function ListInventario() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data, isSuccess, isLoading, isError, error } = useGetInventarioTodoQuery(user.access)
    console.log(data)



    const columns = [
        {
            name: 'cod_unico',
            label: 'cod Unico',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'cod_senescyt',
            label: 'cod Senescyt',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'cod_instituto',
            label: 'cod ISTVIF',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'descripcion',
            label: 'descripcion',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }

        },
        {
            name: 'modelo',
            label: 'modelo',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'serie',
            label: 'serie',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'color',
            label: 'color',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'marca',
            label: 'marca',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },

        {
            name: 'asignado_name',
            label: 'Asignado',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'ubicacion_name',
            label: 'ubicacion',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs text-center'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'digitador_name',
            label: 'digitador',
            options: {
                display: false,
            }
        },
        {
            name: '',
            label: '',
            options: {
                customBodyRender: (value,tableMeta) => {
                    
                    return (
               <ModalInventario id= {parseInt(tableMeta.rowData[12])}/>
                    )
                }
            }
        },
        {
            name: 'id',
            label: '',
            options: {
                display: false,
            }
        },
    ]
    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila

        titleTextStyle: {
            fontSize: '5px', // Establece el tamaño de fuente del título
        },
        responsive: 'horizontal'
    };

    return (
        <DashboardInventario>
            <button className='bg-blue-900 rounded text-white mb-2'>
                <a href='/inventario/register'> Nuevo registro</a>  </button>


                <MUIDataTable
                    title={'Lista de assets'}
                    data={data}
                    columns={columns}
                    options={options}
                />

    



        </DashboardInventario>

    )
}




