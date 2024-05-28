import React from 'react'
import { useState, } from 'react';
import {useCreateObjetivosEstrategicosMutation} from '../../services/pediApi'

export default function ModalFormObjEstrategicos({ id_pedi }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const [isOpen, setIsOpen] = useState(false);
    const [sigla, setSigla] = useState('')
    const [objetivo, setObjetivo] = useState('')
    const [observacion, setObservacion] = useState('')

    const [createObjetivos, { data, isSuccess }] = useCreateObjetivosEstrategicosMutation()


    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        //updDocumento([user.access,id, documento])
        setIsOpen(false)
    };

    const guardarCambios= (e) => {
        createObjetivos([user.access,objetivo,sigla,id_pedi,observacion, userDatos.id ])
        setSigla('')
        setObjetivo('')
        setObservacion('')
        
        closeModal()
        
    };


    return (
        <>
            <button className='bg-blue-900 text-white mt-4 p-2 rounded hover:text-gray-300' onClick={openModal}>
               Registrar
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-96 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold">Objetivos Estratégicos</h3>
                                <button
                                    //onClick={onClose}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            {/* Cuerpo del modal */}
                            <div className="relative p-6 flex-auto">
                                {/* Campos de texto y número */}
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-2">Sigla:</label>
                                    <input
                                        type="text"
                                        value={sigla}
                                        onChange={(e) => setSigla(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-2">Objetivo:</label>
                                    <input
                                        type="text"
                                        rows = {2}
                                        value={objetivo}
                                        onChange={(e) => setObjetivo(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-2">Observacion:</label>
                                    <input
                                        type="text"
                                        rows = {2}
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-2">Número Entero:</label>
                                    <input
                                        type="number"
                                        // value={numeroEntero}
                                        //   onChange={(e) => setNumeroEntero(parseInt(e.target.value))}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            {/* Pie del modal */}
                            <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                                <button
                                    onClick={closeModal}
                                    className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={guardarCambios}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>

    )
}
