import React, { useState } from 'react'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'

import TableAutores from '../components/TableAutores'
import { useCreateAutorMutation } from '../services/bibliotecaApi'



const AutoresObra = () => {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  

    const [autor, setAutor] = useState('')
    const handleAutor = (event) => {
        setAutor(event.target.value);
    };
    const [observacion, setObservacion] = useState('')
    const handleObservacion = (event) => {
        setObservacion(event.target.value);
    };

    const [createAutor, { data: dataAutor, isSucces: isSuccesAutor }] = useCreateAutorMutation()

    const handleSubmit = (e) => {
        e.preventDefault()

        const estado = 1

        createAutor([user.access, autor, estado, observacion, userDatos.id])

        setAutor('')
        setObservacion('')

    }

    return (
        <DashboardBibliotecaAdmin>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
                    <div className="mx-2">
                        <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombres
                        </label>
                        <div className="mt-2 w-full">
                            <input
                                value={autor}
                                onChange={handleAutor}


                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mx-2">
                        <label htmlFor="observacion" className="block text-sm font-medium leading-6 text-gray-900">
                            Observación
                        </label>
                        <div className="mt-2 ">
                            <input
                                value={observacion}
                                onChange={handleObservacion}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


         


                </div>
             
             {userDatos.is_adminBiblioteca && (
                <div className="mt-6 flex items-center  mx-2">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
                )}
            </form>


            <TableAutores
                autor={autor}

            />

        </DashboardBibliotecaAdmin>
    )
}
export default AutoresObra