import React, { useState } from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useGetDocumentosResponsableQuery } from '../services/evaluacionApi'
import ModalSubirArchivo from '../components/ModalSubirArchivo'
import ModalDeleteArchivo from '../components/ModalDeleteArchivo'
import { RUTA_SERVIDOR } from '../../ApiRoutes'
import Select from "react-select"
import { useGetUsuariosDocentesQuery } from '../../usuarios/services/usuariosApi'
export default function DocenteResponsable() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
    console.log(docenteSeleccionado)


    const { data: dataDocumentos, isSuccess: isSuccessDocumentos } = useGetDocumentosResponsableQuery({
        access: user.access,
        responsableID: docenteSeleccionado ? docenteSeleccionado : null
    })

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
                                    <td className={(item.archivo || item.link) ? 'border-t border-b border-l border-gray-400 bg-green-200' : 'border-t border-b border-l border-gray-400'}>
                                        {
                                            item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> {item.documento}</a>)
                                        }

                                        {
                                            item.link && (<a href={`${item.link}`} target="_blank"> {item.documento}</a>)
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
