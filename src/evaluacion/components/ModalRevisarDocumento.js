import React from 'react'
import Select from "react-select"
import { useState, useEffect } from 'react';
import { useGetDocumentoIDQuery, usePutDocumentoMutation, useGetPeriodoAcademicoQuery } from '../services/evaluacionApi'
import { useGetUsuariosDocentesQuery } from '../../usuarios/services/usuariosApi'

import { FiCheckSquare } from "react-icons/fi";

export default function ModalRevisarDocumento({ documentoID }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataDocumento, isSuccess: isSuccessDocumento } = useGetDocumentoIDQuery({ access: user.access, documentoID: documentoID })

    const estadoDocumento = [
        {
            value: 1,
            label: 'Por revisar'
        },
        {
            value: 2,
            label: 'Aprobado'
        },
        {
            value: 3,
            label: 'Corregir'
        },
    ]
    const [calificacion, setCalificacion] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };





    const [revisarDocumento] = usePutDocumentoMutation()
    const guardarCambios = async (e) => {
        const observacion = e.target.elements.observacion.value.trim()
        e.preventDefault()


        const tempo = {
            ...dataDocumento,
            estado: calificacion,
            observacion:observacion,


        }
        try {
            await revisarDocumento({ access: user.access, documentoID: documentoID, rest: tempo }).unwrap()

        } catch (error) {
            console.log('error subida', error)
        }
        closeModal()

    }
    return (
        <>
            <button className='mx-1' onClick={openModal}>
                <FiCheckSquare />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Revisión documento</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT'>
                                {isSuccessDocumento ?

                                    <div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Observacion:</label>
                                            <input
                                                type="text"
                                                name="observacion"
                                                defaultValue={dataDocumento.observacion}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>




                                        <div className="mb-4">
                                            <label htmlFor="responsable" className="block text-lg font-semibold text-gray-500  " >Calificacion:</label>

                                            <Select
                                                options={estadoDocumento}
                                                onChange={(selectedOption) => setCalificacion(selectedOption.value)}

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
