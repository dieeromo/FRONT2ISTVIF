
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'

import Select from 'react-select';
import { useState } from 'react';
import { useGetListAutoresQuery } from '../services/bibliotecaApi';
import { useNavigate } from 'react-router-dom';



const SeleccionAutores = () => {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data, isSuccess, isLoading, isError, error } = useGetListAutoresQuery(user.access)
    //const [autor, SetAutor] = useState()
    let autor
    const [listaAutores, SetListaAutores] = useState([])

    const handleChance = (event) => {
        //SetAutor(event.value)
        autor = [event.value, event.label]

    }

    const agregarAutor = () => {
        const tempo = [autor, ...listaAutores]
        SetListaAutores(tempo)

    }


    const handleSiguiente = () => {
        navigate(`/biblioteca/registro_obras/`, { state: { data: listaAutores } })

    }


    return (
        <DashboardBibliotecaAdmin>
            {userDatos.is_adminBiblioteca ? 
         

            
            <div>
            <h2>Seleccione al menos un autor</h2>
                <div className='w-1/2'>
                    <Select
                        options={data}
                        onChange={handleChance}
                    />

                </div>

                <button onClick={agregarAutor} className='bg-gray-800 text-white p-1 rounded mt-5'>
                    Agregar
                </button>

                <table className='w-1/2 mt-10 ml-20 justify-center items-center'>
                    <thead className=' border-b-2 bg-white'>
                        <tr>
                            <th> # </th>
                            <th>Nombre</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {listaAutores.map((item, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{item[1]}</td>
                                <td className='text-center'>-</td>
                            </tr>

                        ))}


                    </tbody>
                </table>

                {listaAutores.length == 0 ? <p className='mt-5 bg-red-100 w-1/4'>Seleccione al menos un autor</p> :
                    <button
                        onClick={handleSiguiente}
                        className=" mt-4 rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                    >Siguiente</button>
                }

            </div>
            :
            <p className='bg-red-100 w-1/4'>No esta autorizado para hacer registros</p>
}


        </DashboardBibliotecaAdmin>



    )
}
export default SeleccionAutores