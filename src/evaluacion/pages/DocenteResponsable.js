import React, { useState } from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useGetDocumentosResponsableQuery } from '../services/evaluacionApi'
import ModalSubirArchivo from '../components/ModalSubirArchivo'
import ModalDeleteArchivo from '../components/ModalDeleteArchivo'
import { RUTA_SERVIDOR } from '../../ApiRoutes'
import Select from "react-select"
import { useGetUsuariosDocentesQuery } from '../../usuarios/services/usuariosApi'
import { FaEye } from "react-icons/fa";
import ModalRevisarDocumento from '../components/ModalRevisarDocumento'
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


//DOCUMENTOS POR DOCENTE RESPONSABLE
export default function DocenteResponsable() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
   


    const { data: dataDocumentos, isSuccess: isSuccessDocumentos } = useGetDocumentosResponsableQuery({
        access: user.access,
        responsableID: docenteSeleccionado ? docenteSeleccionado : null
    })

    console.log(dataDocumentos)

    const { data: dataDocentes, isSuccess: isSuccessDocentes } = useGetUsuariosDocentesQuery(user.access)
    return (

        <div>
           
            <Navbar_dashboard />
            <div className="mb-4 gap-4 w-1/4">
                <label htmlFor="responsable" className="block text-sm font-semibold text-gray-500  " >Docente responsable:</label>
                <Select
                    options={dataDocentes}
                    onChange={(selectedOption) => setDocenteSeleccionado(selectedOption.value)}

                    required
                    className='shadow-md'
                />
            </div>
            <div>
                {isSuccessDocumentos ?
                    <table className='m-5'>
                        <thead>
                            <tr className="bg-lime-900 text-white text-xs  py-2 px-8 text-center">
                                <th>#</th>
                                <th>Criterio</th>
                                <th>Subcriterio</th>
                                <th>Indicador</th>
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
                                    <td className='text-xs border border-gray-400'>
                                        <div>{item.indicador}</div>
                                        <div className='text-red-500 text-xs'>*{item.responsableIndicador}*</div>
                                    </td>
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
                                            {(userDatos.id === item.responsableID || userDatos.is_rectora || userDatos.is_coor_estrategico) && (
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
                                    <td>
                                    {userDatos.is_rectora &&(
                                            <ModalRevisarDocumento
                                            documentoID={item.documentoID}
                                            />
                                        )}
                                        {item.observacion_documento}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    :
                    <>Seleccione un docente</>
                }
            </div>
        </div>
    )
}
