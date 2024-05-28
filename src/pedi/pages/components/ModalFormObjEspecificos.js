import React from 'react'
import { useState, } from 'react';
import {useCreateObjetivosEspecificosMutation} from '../../services/pediApi'
import { AiFillTrophy } from "react-icons/ai";

export default function ModalFormObjEspecificos({ id_obj_estrategico }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const [isOpen, setIsOpen] = useState(false);

    const [objetivo, setObjetivo] = useState('')
    const [observacion, setObservacion] = useState('')

    const [createObjetivos, { data, isSuccess }] = useCreateObjetivosEspecificosMutation()


    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        //updDocumento([user.access,id, documento])
        setIsOpen(false)
    };

    const guardarCambios= (e) => {
        createObjetivos([user.access,objetivo,id_obj_estrategico,observacion, userDatos.id ])
      
        setObjetivo('')
        setObservacion('')
        
        closeModal()
        
    };


    return (
        <>
            <button className="bg-blue-600 hover:bg-blue-800  text-xs text-white font-bold py-1 px-1 rounded" onClick={openModal}>
           Registrar
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-96 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold">Objetivos Específicos</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>
                            {/* Cuerpo del modal */}
                            <div className="relative p-6 flex-auto">
                                {/* Campos de texto y número */}
              
                                <div className="mb-4">
                                    <label className="block text-xs font-bold mb-2">Objetivo:</label>
                                    <textarea
                                        type="text"
                                        rows = {2}
                                        value={objetivo}
                                        onChange={(e) => setObjetivo(e.target.value)}
                                        className="text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-xs font-bold mb-2">Observación:</label>
                                    <textarea
                                        type="text"
                                        rows = {2}
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                        className=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                            </div>
                            {/* Pie del modal */}
                            <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">

                                <button
                                    onClick={guardarCambios}
                                    className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
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
