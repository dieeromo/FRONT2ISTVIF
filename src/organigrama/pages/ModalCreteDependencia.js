import React from 'react'
import Select from "react-select"
import { useState, } from 'react';

import {usePostDependenciaMutation, useGetTipoDependenciasQuery} from '../services/organigramaApi'
import {useGetUsuariosDocentesQuery} from '../../usuarios/services/usuariosApi'



export default function ModalCreteDependencia({ }) {



    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data:dataDocentes, isLoading:isLoadingDocente, isFetching:isFetchingDocente, isSuccess:isSuccessDocente } = useGetUsuariosDocentesQuery( user.access )
  

    const { data:dataTipoDependencia, isSuccess:isSuccessTipoDependencia } = useGetTipoDependenciasQuery( {access:user.access} )

    const [fecha, SetFecha] = useState('');
    const [responsable, setResponsable] = useState('');
    const [tipo, setTipo] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [crearDependencia] = usePostDependenciaMutation()


    const guardarCambios = async (e) => {
        e.preventDefault()

        const nombre = e.target.elements.nombre.value.trim()
        const siglas = e.target.elements.siglas.value.trim()
        const formData = new FormData()
        formData.append('nombre', nombre)
        formData.append('siglas', siglas)
        formData.append('tipo', tipo)
        formData.append('representante', responsable)
        formData.append('digitador', userDatos.id)
        formData.append('fecha', fecha)
        if (archivo) {
            formData.append('archivoDesignacion', archivo)
        }
   


        try {
           
            //const viviendaCreada = await crearVivienda({ access: user.access, rest: rest }).unwrap()
            const viviendaCreada = await crearDependencia({ access: user.access, rest: formData }).unwrap()
            alert('Datos enviados correctamente');

  
        } catch (error) {
            console.log('ERRROR', error)

        }
        closeModal()

    }

    return (
        <>
            <button className="bg-green-400 hover:bg-green-600 text-xs font-bold mt-1 py-1 px-1 rounded" onClick={openModal}>
                Crear dependencia
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Crear dependencia</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='POST' className='p-5'>
                            {isSuccessDocente  && (
                                        <div className="mb-1">
                                            <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Responsable</label>

                                            <Select
                                                options={dataDocentes}
                                                onChange={(selectedOption) => {
                                                    setResponsable(selectedOption.value)  
                                                }}

                                                className='shadow-md'
                                            />
                                        </div>
                                    )}






                                <div className="grid grid-cols-1  gap-2">

                                    <div className="mb-1 mr-1">
                                        <label className="block text-xs font-semibold text-gray-500  ">Nombre dependencia:</label>
                                        <input
                                            required
                                            type="text"
                                            name="nombre"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className='grid grid-cols-2'>
                                        <div className="mb-1 mr-1">
                                            <label className="block text-xs font-semibold text-gray-500  ">Sigla:</label>
                                            <input
                                                required
                                                type="text"
                                                name="siglas"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>



                                        {isSuccessTipoDependencia  && (
                                        <div className="mb-1">
                                            <label htmlFor="nacionalidad" className="block text-xs font-semibold text-gray-500  " >Tipo</label>

                                            <Select
                                                options={dataTipoDependencia}
                                                onChange={(selectedOption) => {
                                                    setTipo(selectedOption.value)  
                                                }}

                                                className='shadow-md'
                                            />
                                        </div>
                                    )}


                                        <div className=" ">
                                            <div className="mb-1">
                                                <label htmlFor="fecha_limite" className="block text-xs font-semibold text-gray-500 shadow-md ">Fecha designacion responsable:</label>
                                                <input
                                                    type="date"
                                                    name="fecha"
                                                    onChange={(e) => SetFecha(e.target.value)}
                                                    className="w-full p-2 border rounded-md shadow-md "
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>








                                    <div className='grid grid-cols-2 gap-2'>










                                    </div>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='shadow-md'>
                                            <label className="block text-xs font-semibold text-gray-500  ">Doc designación</label>
                                            <input
                                                type="file"
                                                accept="pdf/*"
                                                onChange={(e) => setArchivo(e.target.files[0])}
                                                className='text-xs'
                                                required


                                            />
                                        </div>

                                   

                                    </div>







                                    <button
                                        type="submit"
                                        className="bg-indigo-500 w-1/4 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Guardar
                                    </button>

                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
