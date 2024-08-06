import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useGetDocumentosResponsableQuery } from '../services/evaluacionApi'
import ModalSubirArchivo from '../components/ModalSubirArchivo'
import ModalDeleteArchivo from '../components/ModalDeleteArchivo'
import { RUTA_SERVIDOR } from '../../ApiRoutes'

import ModalRevisarDocumento from '../components/ModalRevisarDocumento'
import { FaEye } from "react-icons/fa";

const getBgColor = (estado) => {
    switch (estado) {
        case 1:  //por revisar
            return 'bg-blue-200';
        case 2: //aprobado
            return 'bg-green-200';
        case 3: // corregir
            return 'bg-orange-300';
        default:
            return 'bg-red-200'; // Color de fondo por defecto si el estado_documento no es 1, 2 o 3
    }
}


export default function DocumentosResponsable() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataDocumentos, isSuccess: isSuccessDocumentos } = useGetDocumentosResponsableQuery({ access: user.access, responsableID: userDatos.id })
    console.log(dataDocumentos)
    return (

        <div>

            <Navbar_dashboard />
            Documentos pendientes
            <div className='grid grid-cols-4 w-3/4 mt-3'>

                <div className='bg-red-200 text-center text-sm py-1'>Sin subir</div>
                <div className='bg-blue-200 text-center text-sm py-1'>Subido por aprobar</div>
                <div className='bg-green-200 text-center text-sm py-1'>Aprobado</div>
                <div className='bg-orange-300 text-center text-sm py-1'>Realizar correciones y volver a subir</div>
            </div>
            <div>
                {isSuccessDocumentos ?
                    <table className='m-5'>
                        <thead>
                            <tr className="bg-lime-900 text-white text-xs  py-2 px-8 text-center">
                                <th>#</th>
                                <th>Criterio</th>
                                <th>Subcriterio</th>
                                <th>#Ind</th>
                                <th>Indicador</th>
                                <th>#Ev</th>
                                <th>Evidencia</th>
                                <th>Documento</th>
                                <th></th>
                                <th>Observacion</th>

                            </tr>


                        </thead>
                        <tbody>
                            {dataDocumentos.map((item, index) => (
                                <tr key={index} className="border border-gray-400 text-xs px-2 text-center">
                                    <td className='text-xs border border-gray-400'> {index + 1}</td>
                                    <td className='text-xs border border-gray-400'>{item.criterio}</td>
                                    <td>{item.subcriterio}</td>
                                    <td>{item.indicador_numeral}</td>
                                    <td className='text-xs border border-gray-400'>
                                        <div>{item.indicador}</div>
                                        <div className='text-red-500 text-xs'>*{item.responsableIndicador}*</div>

                                    </td>
                                    <td>{item.evidencia_numeral}</td>
                                    <td className='text-xs border border-gray-400'>{item.evidencia}</td>
                                    <td className={`px-6 py-4 ${getBgColor(item.estado_documento)}`} >
                                        {
                                            item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> {item.documento} <FaEye /></a>)
                                        }

                                        {
                                            item.link && (<a href={`${item.link}`} target="_blank"> {item.documento} <FaEye /></a>)
                                        }
                                        {
                                            (!item.link && !item.archivo) && <>{item.documento}</>
                                        }

                                    </td>
                                    <td>
                                        <div>
                                            {((userDatos.id === item.responsableID || userDatos.is_rectora || userDatos.is_coor_estrategico) && item.estado_documento != 2) && (
                                                <div>
                                                    {(item.archivo || item.link) ?
                                                        <ModalDeleteArchivo documentoID={item.documentoID} />
                                                        :
                                                        <ModalSubirArchivo documentoID={item.documentoID} />
                                                    }
                                                </div>

                                            )
                                            }
                                        </div>

                                    </td>
                                    <td>{item.observacion_documento}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    :
                    <>Cargando</>
                }
            </div>
        </div>
    )
}
