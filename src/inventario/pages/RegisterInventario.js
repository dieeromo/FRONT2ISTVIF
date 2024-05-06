import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardInventario from './components/DashboardInventario'
import {
    useGetTipoAssetQuery,
    useGetEstadoAssetQuery,
    useGetUbicacionAssetQuery,
    useCreateAssetMutation
} from '../services/inventarioApi'

import { useGetUsuariosDocentesQuery } from '../../usuarios/services/usuariosApi'
import Select from "react-select"
import { useState } from 'react'

export default function RegisterInventario() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataTipoAsset, isSuccess: isSuccessTipoAsset } = useGetTipoAssetQuery(user.access)
    const { data: dataEstadoAsset, isSuccess: isSuccessEstadoAsset } = useGetEstadoAssetQuery(user.access)
    const { data: dataUbicacionAsset, isSuccess: isSuccessUbicacionAsset } = useGetUbicacionAssetQuery(user.access)
    const { data: dataDocentes, isSuccess: isSuccessDocentes } = useGetUsuariosDocentesQuery(user.access)

    const [tipoAs, setTipoAs] = useState('')
    const [estadoAs, setEstadoAs] = useState('')
    const [ubicacionAs, setUbicacionAs] = useState('')
    const [asignado, setAsignado] = useState('')


    const [createAsset, { data: dataObraAction, isSuccess: isSuccessObraAction }] = useCreateAssetMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cod_unico = e.target.elements.cod_unico.value.trim()
        const cod_senescyt = e.target.elements.cod_senescyt.value.trim()
        const cod_instituto = e.target.elements.cod_instituto.value.trim()
        const descripcion = e.target.elements.descripcion.value.trim()
        const materiales = e.target.elements.materiales.value.trim()
        const marca = e.target.elements.marca.value.trim()
        const modelo = e.target.elements.modelo.value.trim()
        const serie = e.target.elements.serie.value.trim()
        const color = e.target.elements.color.value.trim()
        const observacion = e.target.elements.observacion.value.trim()

        console.log('unico', cod_unico)
        console.log('senes', cod_senescyt)
        console.log('ist', cod_instituto)
        console.log('descr', descripcion)
        console.log('mate', materiales)
        console.log('marca', marca)
        console.log('tipo', tipoAs)
        console.log('ubicacion', ubicacionAs)
        console.log('dig', userDatos.id)
        console.log('asig', asignado)
        console.log('estado', estadoAs)
        try {
            const assetGuardado = await createAsset([
                user.access,
                cod_unico,
                cod_senescyt,
                cod_instituto,
                tipoAs,
                descripcion,
                materiales,
                marca,
                modelo,
                serie,
                color,
                estadoAs,
                ubicacionAs,
                asignado,
                userDatos.id,
                observacion
            ]).unwrap()
            navigate('/inventario/list')

        } catch (error) {
            console.log('error al registrar el asset')
        }



    }


    return (
        <DashboardInventario>
            {userDatos.is_adminInventario ?

                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-xl font-bold leading-7 text-gray-900 ">Registro Inventario</h2>

                            <div className='grid grid-cols-3'>
                                <div className="">
                                    <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cod único
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="cod_unico"
                                            id="cod_unico"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cod Senescyt
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="cod_senescyt"
                                            id="cod_senescyt"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>


                                <div className="">
                                    <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cod Instituto
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="cod_instituto"
                                            id="cod_instituto"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>

                            </div>



                            <div className='grid grid-cols-3'>
                                <div className="mx-2">
                                    <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                        Descripcion
                                    </label>
                                    <div className=" w-full">
                                        <input
                                            type="text"
                                            name="descripcion"
                                            id="descripcion"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <label htmlFor="materiales" className="block text-sm font-medium leading-6 text-gray-900">
                                        Materiales
                                    </label>
                                    <div className=" w-full">
                                        <input
                                            type="text"
                                            name="materiales"
                                            id="materiales"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>


                                <div className="">
                                    <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                        Marca
                                    </label>
                                    <div className=" w-full">
                                        <input
                                            type="text"
                                            name="marca"
                                            id="marca"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className='grid grid-cols-3'>
                                <div className="mx-2">
                                    <label htmlFor="modelo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Modelo
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="modelo"
                                            id="modelo"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">
                                        Serie
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="serie"
                                            id="serie"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>


                                <div className="">
                                    <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                                        Color
                                    </label>
                                    <div className=" w-1/2">
                                        <input
                                            type="text"
                                            name="color"
                                            id="color"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className='grid grid-cols-3'>
                                <div className="mb-4">
                                    <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900">Tipo asset:</label>
                                    <Select

                                        options={dataTipoAsset}
                                        onChange={(selectedOption) => setTipoAs(selectedOption.value)}
                                        className='shadow-md text-gray-900 text-xs w-1/2'
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                                        Estado:</label>
                                    <Select

                                        options={dataEstadoAsset}
                                        onChange={(selectedOption) => setEstadoAs(selectedOption.value)}
                                        className='shadow-md text-gray-900 text-xs w-1/2'
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="Ubicación" className="block text-sm font-medium leading-6 text-gray-900">
                                        Ubicacion:</label>
                                    <Select

                                        options={dataUbicacionAsset}
                                        onChange={(selectedOption) => setUbicacionAs(selectedOption.value)}
                                        className='shadow-md text-gray-900 text-xs w-1/2'
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='grid grid-cols-3'>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="asignado" className="block text-sm font-medium leading-6 text-gray-900">
                                Asignado:</label>
                            <Select

                                options={dataDocentes}
                                onChange={(selectedOption) => setAsignado(selectedOption.value)}
                                className='shadow-md text-gray-900 text-xs '
                            />
                        </div>

                        <div className="">
                            <label htmlFor="observacion" className="block text-sm font-medium leading-6 text-gray-900">
                                Observacion
                            </label>
                            <div className=" w-full">
                                <input
                                    type="text"
                                    name="observacion"
                                    id="observacion"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>

                        <div className="mt-8 ml-5">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Guardar
                            </button>
                        </div>

                    </div>
                </form>
                : 
                <p className='bg-red-100 w-1/4'>No esta autorizado para realizar registros</p>
            }



        </DashboardInventario>

    )
}
