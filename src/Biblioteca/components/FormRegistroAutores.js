import {useCreateAutorMutation} from '../services/bibliotecaApi'

import { useState } from 'react'


export default function FormRegistroAutores() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [createAutor,{data:dataAutor, isSucces:isSuccesAutor}] = useCreateAutorMutation()

  


   

    const [ubicacion, SetUbicacion] = useState('')
   

    const handleSubmit = (e) => {
        e.preventDefault()
        const nombres = e.target.elements.nombres.value.trim()
        const estado = 1
        const observacion = e.target.elements.observacion.value.trim()
        createAutor([user.access, nombres,estado,  observacion, userDatos.id ])
        
        e.target.elements.nombres.value = null
        e.target.elements.observacion.value = null
  
    }


    return (
        <form onSubmit={handleSubmit}>

            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-bold leading-7 text-gray-900 ">Datos de Autores</h2>


                    <div className="sm:col-span-4">
                        <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombres
                        </label>
                        <div className="mt-2 w-1/2">
                            <input
                                type="text"
                                name="nombres"
                                id="nombres"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>



                    <div className="sm:col-span-4">
                        <label htmlFor="observacion" className="block text-sm font-medium leading-6 text-gray-900">
                            Observacion
                        </label>
                        <div className="mt-2 w-1/2">
                            <input
                                type="text"
                                name="observacion"
                                id="observacion"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>






                    <div className="mt-6 flex items-center justify-end gap-x-6">

                        <button
                            type="submit"
                            
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>



        </form>
    )
}