import React from 'react'
import Select from "react-select"
import { useState,useEffect } from 'react';
import { useGetDocumentoIDQuery, usePutDocumentoMutation,useGetPeriodoAcademicoQuery } from '../services/evaluacionApi'
import { useGetUsuariosDocentesQuery } from '../../usuarios/services/usuariosApi'
import { FiEdit3 } from "react-icons/fi";

export default function ModalEditDocumento({ documentoID, responsableName, responsableID, periodoName, periodoID }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataDocumento, isSuccess: isSuccessDocumento } = useGetDocumentoIDQuery({ access: user.access, documentoID: documentoID })
   
    const { data: dataDocentes, isSuccess: isSuccessDocentes } = useGetUsuariosDocentesQuery(user.access)
    const [responsable, SetResponsable] = useState(responsableID)

    const { data: dataPeriodo, isSuccess: isSuccessPeriodo } = useGetPeriodoAcademicoQuery(user.access)
    const [periodo, SetPeriodo] = useState(periodoID)
  
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };





    const [subirArchivo] = usePutDocumentoMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()
        const documento = e.target.elements.documento.value.trim()

        const tempo = {
            ...dataDocumento,
            nombre: documento,
            responsable: responsable,
            periodoAcademico: periodo,

        }
        try {
            await subirArchivo({ access: user.access, documentoID: documentoID, rest: tempo }).unwrap()

        } catch (error) {
            console.log('error subida', error)
        }
        closeModal()

    }
    return (
        <>
            <button className="bg-gray-100 hover:bg-green-300  font-bold py-1 px-1 rounded" onClick={openModal}>
            <FiEdit3 />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Editar documento</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT'>
                                {isSuccessDocumento && isSuccessDocentes ?

                                <div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Documento:</label>
                                        <input
                                            type="text"
                                            name="documento"
                                            id="pro11"
                                            defaultValue={dataDocumento.nombre}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="responsable" className="block text-lg font-semibold text-gray-500  " >Docente responsable:</label>

                                        <Select
                                            options={dataDocentes}
                                            onChange={(selectedOption) => SetResponsable(selectedOption.value)}
                                            defaultValue={{value:responsableID,label:responsableName}} 
                                            required
                                            className='shadow-md'
                                        />
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="responsable" className="block text-lg font-semibold text-gray-500  " >Periodo académico:</label>

                                        <Select
                                            options={dataPeriodo}
                                            onChange={(selectedOption) => SetPeriodo(selectedOption.value)}
                                            defaultValue={{value:periodoID,label:periodoName}} 
                                            required
                                            className='shadow-md'
                                        />
                                    </div>
                              



                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Guardar
                                    </button>

                                </div>
                                :
                                <>Cargando...</>
}



                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
