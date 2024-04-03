import DashboardAcreditacion from './components/DashboardAcreditacion'
import { useGetDocumentosDocenteQuery} from '../services/criteriosApi'


import DocTodosModal from '../components/DocTodosModal'

import MUIDataTable from 'mui-datatables';
import DeleteEntradaDocTodosModal from '../components/DeleteEntradaDocTodosModal'
import { RUTA_SERVIDOR } from '../../ApiRoutes';

import { IoReaderOutline } from "react-icons/io5"


import CargaDocumentoModal from '../components/CargaDocumentoModal'


export default function PendientesDocumentos() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")


    const { data, isSuccess, isLoading, isError, error } = useGetDocumentosDocenteQuery([user.access,userDatos.id])
    console.log(data)


    const columns = [
        {
            name: 'criterio',
            //label: <span className='text-xs font-bold'>Criterio</span>,
            label: 'Criterio',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                        </div>
                    )
                },
                
            }
        },
        {
            name: 'subCriterio',
            //label: <span className='text-xs font-bold'>Sub criterio</span>,
            label: 'Sub criterio',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'indicador_key',
            //label: <span className='text-xs font-bold'>Key</span>,
            label: 'Key Ind',
            options: {
                customBodyRender: (value, tableMeta) =>
                (
                    <p className='text-blue-600 text-xs'>{tableMeta.rowData[2]}</p>
                )
            },
            filter:false,

        },
        {
            name: 'indicador',
            //label: <span className='text-xs font-bold'>Indicador</span>,
            label: 'Indicador',
            options: {
                customBodyRender: (value) => {


                    return (
                        <div >
                            <p className='text-blue-600 text-xs'>{value}</p>
                        </div>

                    )
                }
            }

        },
        {
            name: 'evidencia_key',
            //label: <span className='text-xs font-bold'>Key</span>,
            label: 'Key Evi',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-red-700 text-xs text-center w-10'>{value}</p>
                        </div>
                    )
                },
            }
        },
        {
            name: 'evidencia',
            //label: <span className='text-xs font-bold'>Evidencia</span>,
            label: 'Evidencia',
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div className='w-40 '>
                            {tableMeta.rowData[11] == userDatos.id ?
                                <div className=''>
                                    <a href={`/acreditacion/documentos/${tableMeta.rowData[12]}`} className='text-green-700 text-[9px]'>{value}</a>
                                </div>
                                :
                                <p className='text-red-700 text-[9px]'>{value}</p>
                            }
                            
                        </div>
                    )
                },
                filter:false,
            }
        },
        {
            name: 'numeracion',
            //label: <span className='text-xs font-bold'>#</span>,
            label: '#',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                        </div>
                    )
                },
                filter:false,
            }
        },
        {
            name: 'documento',
            //label: <span className='text-xs font-bold'>Documento</span>,
            label: 'Documento',
            options: {
                customBodyRender: (value, tableMeta) => {

                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                            {userDatos.is_administrativo3 ?
                                <div className='grid grid-cols-2 '>

                                    <DocTodosModal
                                        nombre_doc_default={value}
                                        id={tableMeta.rowData[10]}
                                    />

                                    <DeleteEntradaDocTodosModal
                                        id={tableMeta.rowData[10]}
                                    />
                                </div>
                                :
                                <></>
                            }

                        </div>
                    )
                },
                filter:false,
            }
        },
        {
            name: 'archivo',
            //label: <span className='text-xs font-bold'>Ver</span>,
            label: 'Ver',
            options: {
                customBodyRender: (value, tableMeta) => {
                    console.log(userDatos.id)
                    return (
                        <div >
                            {
                                value ?
                                    <a href={RUTA_SERVIDOR + `${value}`} target="_blank"> < IoReaderOutline className='h-4 w-5' /> </a>
                                    :
                                    <div>

                                    </div>
                            }
                        </div>
                    )
                },
                filter:false,
            }
        },
        {
            name: 'responsable',
            //label: <span className='text-xs font-bold'>Responsable</span>,
            label: 'Responsable',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div >
                            <p className='text-xs'>{value}</p>
                        </div>
                    )
                }
            }
        },
        {
            name: 'id',
            label: 'id doc',
            options:{
                filter:false,
                display:false
                
            }
        },
        {
            name: 'responsable_id',
            label: 'id responsable',
            options:{
                filter:false,
                display:false
                
            }
        },
        {
            name: 'evidencia_id',
            label: 'id evidencia',
            options:{
                filter:false,
                display:false
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
        <DashboardAcreditacion>
            {isLoading ?
            <div><p>Cargando...</p></div>
            :

            <MUIDataTable
            title={`Documentos asignados a ${userDatos.first_name} ${userDatos.last_name}`}
            data={data}
            columns={columns}
            options={options}

        />

            }
           



        </DashboardAcreditacion>

    )
}