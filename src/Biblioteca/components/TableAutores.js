
import MUIDataTable from 'mui-datatables';

import { RUTA_SERVIDOR } from '../../ApiRoutes';

import { IoReaderOutline } from "react-icons/io5"
import { MdUpload } from "react-icons/md"
import { useGetListAutoresQuery } from '../services/bibliotecaApi';
import ModalAutores from '../pages/components/ModalAutores'





export default function TableAutores() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data, isSuccess, isLoading, isError, error } = useGetListAutoresQuery(user.access)
    //console.log(data)

    const columns = [
        {
            name: 'nombres',
            label: 'nombre'
        },
        {
            name: 'estado',
            label: 'estado'
        },
        {
            name: 'observacion',
            label: 'observacion'
        },
        {
            name: 'id',
            label: '  ',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            {userDatos.is_adminBiblioteca ?
                            <ModalAutores
                                id={value}
                                nombres={tableMeta.rowData[0]}
                                estado={tableMeta.rowData[1]}
                                observacion={tableMeta.rowData[2]}
                                digitador={tableMeta.rowData[4]}

                            />
                            :
                            <> </>
                }
                        </div>




                    )

                }

            }
        },
        {
            name: 'digitador',
            label: 'digitador'
        },




    ]

    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila

        titleTextStyle: {
            fontSize: '5px', // Establece el tamaño de fuente del título
        },
    };




    return (
        <>
            {isLoading ?
                <div> <p className=''>Cargando...</p></div>
                :
                <MUIDataTable
                    title={'Autores'}
                    data={data}
                    columns={columns}
                    options={options}

                />
            }

        </>

    )
}