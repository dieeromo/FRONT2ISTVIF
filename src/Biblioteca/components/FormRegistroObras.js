//import {usePutCriteriosMutation} from '../services/criteriosApi'
import Select from 'react-select'
import { useGetCategoriaObraQuery, useGetTipoObraQuery, 
    useGetMaterialObraQuery, useGetEstadoObraQuery, 
    useGetListUbicacionObrasQuery } from '../services/bibliotecaApi'

import { useState } from 'react'
import { useCreateObraMutation, useCreateObraAutorMutation } from '../services/bibliotecaApi'
import { useNavigate } from 'react-router-dom'

export default function FormRegistroObras({ autores }) {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const [createObraAutor, { data: dataObraAction, isSuccess: isSuccessObraAction }] = useCreateObraAutorMutation()
    const [createObra, { data: dataCreate, isSuccess: isSuccessCreate, isLoading: isLoadingAction, isError: isErrorCreate, error:errorCreate }] = useCreateObraMutation()

    const { data: dataCategoria, isLoading: isLoadingCategoria } = useGetCategoriaObraQuery(user.access)
    const { data: dataTipoObra, isLoading: isLoadingTipoOnra } = useGetTipoObraQuery(user.access)
    const { data: dataMaterialObra, isLoading: isLoadingMaterialOnra } = useGetMaterialObraQuery(user.access)
    const { data: dataEstadoObra, isLoading: isLoadingEstadoOnra } = useGetEstadoObraQuery(user.access)
    const { data: dataUbicacionObra, isLoading: isLoadingUbicacionObra } = useGetListUbicacionObrasQuery(user.access)

    const [categoria, SetCategoria] = useState('')
    const [tipoObra, SetTipoObra] = useState('')
    const [tipoMaterial, SetTipoMaterial] = useState('')
    const [ubicacion, SetUbicacion] = useState('')

    


    const handleSubmit = async (e) => {
        e.preventDefault()
        const titulo = e.target.elements.titulo.value.trim()
        //const autor = e.target.elements.autor.value.trim()
        const autor = ''
        const anio = e.target.elements.anio.value.trim()
        const editorial = e.target.elements.editorial.value.trim()
        const tomo = e.target.elements.tomo.value.trim()
        const codigo = e.target.elements.codigo.value.trim()
        const observacion = e.target.elements.observacion.value.trim()
        try {
            const obraGuardada = await createObra([
                user.access,
                codigo,
                titulo,
                editorial,
                autor,
                anio,
                tomo,
                ubicacion,
                categoria,
                tipoObra,
                tipoMaterial,
                dataEstadoObra[0].id,
                observacion,
                userDatos.id,
            ]).unwrap()

            //await Promise.all(
            autores.map(async (autoresID) => {
                //console.log('autores', autoresID[0])
                await createObraAutor([user.access, parseInt(autoresID[0]), obraGuardada.id, userDatos.id, observacion])

            })

            // )
           // console.log('Obra guardada correctamente con id:', obraGuardada);
            navigate('/biblioteca/lista/obras_autores')


        } catch (error) {
            console.error('Error al guardar la obra:', error);

        }



    }











    return (
        <form onSubmit={handleSubmit}>


            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-bold leading-7 text-gray-900 ">Datos de obra</h2>


                    <div className="sm:col-span-4">
                        <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                            Titulo de la obra
                        </label>
                        <div className="mt-2 w-1/2">
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </div>
                    </div>

                    {/* <div className="sm:col-span-4">
                        <label htmlFor="autor" className="block text-sm font-medium leading-6 text-gray-900">
                            Autor/es
                        </label>
                        <div className="mt-2 w-1/2">
                            <input
                                type="text"
                                name="autor"
                                id="autor"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="anio" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Año de publicacion
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="anio"
                                    id="anio"
                                    autoComplete="given-name"
                                    className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="editorial" className="block text-sm font-medium leading-6 text-gray-900">
                                Editorial
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="editorial"
                                    id="editorial"
                                    autoComplete="family-name"
                                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="tomo" className="block text-sm font-medium leading-6 text-gray-900">
                            Tomo
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="tomo"
                                id="tomo"
                                autoComplete="family-name"
                                className="block w-1/8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </div>
                    </div>


                    <h2 className="text-xl font-bold leading-7 text-gray-900 mt-10 border-t-2">Datos de registro</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="codigo" className="block text-sm font-medium leading-6 text-gray-900 ">
                                Codigo de identificación
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="codigo"
                                    id="codigo"
                                    autoComplete="given-name"
                                    className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                Ubicacion de la obra
                            </label>
                            <div className="mt-2">
                                <Select
                                    options = {dataUbicacionObra}
                                    onChange={(selectedOption) => SetUbicacion(selectedOption.value)}
                                    className='text-xs w-1/2'
                                    />
                            </div>
                        </div>




                    </div>





                    <div className="mt-10 grid grid-cols-3 ">


                        <div className="mr-20">
                            <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                Categoria
                            </label>
                            <div className="mt-2">
                                {isLoadingCategoria ? <></> :
                                    <select
                                        onChange={(e) => (SetCategoria(e.target.value))}
                                        id="categoria"
                                        name="categoria"

                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Selecione una categoria</option>
                                        {dataCategoria.map((item) =>
                                            <option key={item.id} value={item.id}> {item.label}</option>
                                        )}

                                    </select>
                                }
                            </div>
                        </div>

                        <div className="mr-20">
                            <label htmlFor="tipoObra" className="block text-sm font-medium leading-6 text-gray-900">
                                Tipo de obra
                            </label>
                            <div className="mt-2">
                                {isLoadingTipoOnra ? <></> :
                                    <select
                                        onChange={(e) => (SetTipoObra(e.target.value))}
                                        id="tipoObra"
                                        name="tipoObra"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Selecione el tipo de obra</option>
                                        {dataTipoObra.map((item) =>
                                            <option value={item.id} key={item.id}> {item.label}</option>
                                        )}

                                    </select>
                                }
                            </div>
                        </div>



                        <div className="">
                            <label htmlFor="tipoMaterial" className="block text-sm font-medium leading-6 text-gray-900">
                                Tipo de material
                            </label>
                            <div className="mt-2">
                                {isLoadingMaterialOnra ? <></> :
                                    <select
                                        onChange={(e) => (SetTipoMaterial(e.target.value))}
                                        id="tipoMaterial"
                                        name="tipoMaterial"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Selecione el tipo de material</option>
                                        {dataMaterialObra.map((item) =>
                                            <option key={item.id} value={item.id}> {item.label}</option>
                                        )}
                                    </select>
                                }
                            </div>
                        </div>

                    </div>

                    <div className='grid grid-cols-2'>
                        <div className="mt-2">
                            <label htmlFor="observacion" className="block text-sm font-medium leading-6 text-gray-900">
                                Observacion
                            </label>
                            <div className="">
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
                            {isErrorCreate ? <p className='bg-red-100 ml-5'>Error: revise los datos ingresados</p> : <></>}
                        </div>
                    </div>













                </div>
            </div>



        </form>
    )
}