import React from 'react'
import Select from "react-select"
import { useState, useEffect } from 'react';
import {
    useGetInventarioIDQuery,
    useGetTipoAssetQuery,
    useGetEstadoAssetQuery,
    useGetUbicacionAssetQuery,
    usePutInventarioMutation,
} from '../../services/inventarioApi'
import { useGetUsuariosDocentesQuery } from '../../../usuarios/services/usuariosApi'




export default function EditModal({ isOpen1, onClick1, inventarioID }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataInventario, isSuccess: isSuccessInventario } = useGetInventarioIDQuery({ access: user.access, inventarioID: inventarioID })
    const { data: dataTipoAsset, isSuccess: isSuccessTipoAsset } = useGetTipoAssetQuery(user.access)
    const { data: dataEstadoAsset, isSuccess: isSuccessEstadoAsset } = useGetEstadoAssetQuery(user.access)
    const { data: dataUbicacionAsset, isSuccess: isSuccessUbicacionAsset } = useGetUbicacionAssetQuery(user.access)
    const { data: dataDocentes, isSuccess: isSuccessDocentes } = useGetUsuariosDocentesQuery(user.access)

    //console.log('data',dataInventario)


    function FiltrarDatos({ datos, id }) {
        return datos.find(datos => datos.id === id)
    }



    const [tipoAs, setTipoAs] = useState('')
    const [estadoAs, setEstadoAs] = useState('')
    const [ubicacionAs, setUbicacionAs] = useState('')
    const [asignado, setAsignado] = useState('')


    const [editarInventario] = usePutInventarioMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()
        //console.log('filtro',FiltrarDatos({datos:dataEstadoAsset, id:1}).label )
        const cod_senescyt = e.target.elements.cod_senescyt.value.trim()
        const cod_instituto = e.target.elements.cod_instituto.value.trim()
        const descripcion = e.target.elements.descripcion.value.trim()
        const materiales = e.target.elements.materiales.value.trim()
        const marca = e.target.elements.marca.value.trim()
        const modelo = e.target.elements.modelo.value.trim()
        const serie = e.target.elements.serie.value.trim()
        const color = e.target.elements.color.value.trim()
        // const observacion = e.target.elements.observacion.value.trim()
        let estado_tempo
        if (estadoAs === '') {
            estado_tempo = dataInventario.estado
        } else {
            estado_tempo = estadoAs
        }

        let tipo_tempo
        if (tipoAs === '') {
            tipo_tempo = dataInventario.tipo
        } else {
            tipo_tempo = tipoAs
        }

        let ubicacion_tempo
        if (ubicacionAs === '') {
            ubicacion_tempo = dataInventario.ubicacion
        } else {
            ubicacion_tempo = ubicacionAs
        }

        let asignado_tempo
        if (asignado === '') {
            asignado_tempo = dataInventario.asignado
        } else {
            asignado_tempo = asignado
        }


        const tempo = {
            ...dataInventario,
            cod_senescyt: cod_senescyt,
            cod_instituto: cod_instituto,
            tipo: tipo_tempo,
            descripcion: descripcion,
            materiales: materiales,
            marca: marca,
            modelo: modelo,
            serie: serie,
            color: color,

            estado: estado_tempo,
            ubicacion: ubicacion_tempo,
            asignado: asignado_tempo,



        }
        //console.log('tempo',tempo)

        try {
            await editarInventario({ access: user.access, inventarioID: inventarioID, rest: tempo }).unwrap()

        } catch (error) {
            console.log('error subida', error)
        }


        onClick1(false)

    }
    return (
        <>

            {isOpen1 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Editar inventario</h3>
                                <button
                                    onClick={() => onClick1(false)}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT' className='p-3'>
                                {
                                    (isSuccessInventario && isSuccessTipoAsset && isSuccessEstadoAsset && isSuccessUbicacionAsset && isSuccessDocentes) ?

                                        <div>


                                            <div className='grid grid-cols-3 gap-3'>
                                                <div> 
                                                    <div className='text-center'>Cod único:</div>
                                                    <div className='text-center bg-gray-100'> {dataInventario.cod_unico}</div>
                                                    
                                                </div>
                                                <div className="">
                                                    <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                                                        Cod Senescyt:
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="cod_senescyt"
                                                            defaultValue={dataInventario.cod_senescyt}
                                                            //className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                            className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cod Instituto:
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="cod_instituto"
                                                            defaultValue={dataInventario.cod_instituto}
                                                            //className='bg-gray-100 rounded-md border-0 text-center'
                                                            className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                            </div>






                                            <div className="mx-2">
                                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                                    Descripcion
                                                </label>
                                                <div className=" w-full">
                                                    <input
                                                        type="text"
                                                        name="descripcion"
                                                        defaultValue={dataInventario.descripcion}
                                                        className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        required
                                                    />
                                                </div>
                                            </div>


                                            <div className="mx-2">
                                                <label htmlFor="materiales" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                                                    Materiales
                                                </label>
                                                <div className=" w-full">
                                                    <input
                                                        type="text"
                                                        name="materiales"
                                                        defaultValue={dataInventario.materiales}
                                                        className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        required
                                                    />
                                                </div>
                                            </div>




                                            <div className='grid grid-cols-2 mt-3'>

                                                <div className="">
                                                    <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Marca:
                                                    </label>
                                                    <div className=" w-full">
                                                        <input
                                                            type="text"
                                                            name="marca"
                                                            defaultValue={dataInventario.marca}
                                                            className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mx-2">
                                                    <label htmlFor="modelo" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Modelo:
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="modelo"
                                                            defaultValue={dataInventario.modelo}
                                                            className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                        />
                                                    </div>
                                                </div>


                                                <div className="mx-2">
                                                    <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Serie:
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="serie"
                                                            defaultValue={dataInventario.serie}
                                                            className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                        />
                                                    </div>
                                                </div>





                                                <div className="mx-2">
                                                    <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Color:
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="color"
                                                            defaultValue={dataInventario.color}
                                                            className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 mt-2 mb-4'>
                                                <div className="mx-2">
                                                    <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900">Tipo asset:</label>
                                                    <Select
                                                        defaultValue={{ label: FiltrarDatos({ datos: dataTipoAsset, id: dataInventario.tipo }).label, value: parseInt(dataInventario.tipo) }}
                                                        options={dataTipoAsset}
                                                        onChange={(selectedOption) => setTipoAs(selectedOption.value)}
                                                        className='shadow-md text-gray-900 text-xs'
                                                    />
                                                </div>

                                                <div className="mx-2">
                                                    <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Estado:</label>
                                                    <Select
                                                        defaultValue={{ label: FiltrarDatos({ datos: dataEstadoAsset, id: dataInventario.estado }).label, value: parseInt(dataInventario.estado) }}
                                                        options={dataEstadoAsset}
                                                        onChange={(selectedOption) => setEstadoAs(selectedOption.value)}
                                                        className='shadow-md text-gray-900 text-xs'
                                                    />
                                                </div>

                                                <div className="mx-2">
                                                    <label htmlFor="Ubicación" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Ubicacion:</label>
                                                    <Select
                                                        defaultValue={{ label: FiltrarDatos({ datos: dataUbicacionAsset, id: dataInventario.ubicacion }).label, value: dataInventario.ubicacion }}
                                                        options={dataUbicacionAsset}
                                                        onChange={(selectedOption) => setUbicacionAs(selectedOption.value)}
                                                        className='shadow-md text-gray-900 text-xs '
                                                    />
                                                </div>
                                                <div className="mx-2">
                                                    <label htmlFor="asignado" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Asignado:</label>
                                                    <Select
                                                        defaultValue={{ label: FiltrarDatos({ datos: dataDocentes, id: dataInventario.asignado }).label, value: dataInventario.asignado }}
                                                        options={dataDocentes}
                                                        onChange={(selectedOption) => setAsignado(selectedOption.value)}
                                                        className='shadow-md text-gray-900 text-xs '
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        :
                                        <>Cargando modal</>
                                }







                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Guardar
                                </button>






                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen1 ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
