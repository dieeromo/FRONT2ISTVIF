
import MUIDataTable from 'mui-datatables';

import { RUTA_SERVIDOR } from '../../ApiRoutes';

import { IoReaderOutline } from "react-icons/io5"
import { MdUpload } from "react-icons/md"
import { useGetListAutoresQuery } from '../services/bibliotecaApi';





export default function TableAutores() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data, isSuccess, isLoading, isError, error } = useGetListAutoresQuery (user.access)

    const columns = [
        {
            name:'nombres',
            label:'nombre'
        },
        {
            name:'observacion',
            label:'observacion'
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