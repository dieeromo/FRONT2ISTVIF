
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'

import Select from 'react-select';
import { useState } from 'react';
import { useGetListAutoresQuery } from '../services/bibliotecaApi';
import { useNavigate } from 'react-router-dom';



const SeleccionAutores = () => {
    const navigate = useNavigate()


    const user = JSON.parse(localStorage.getItem('user') || "{}")
 

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


    const handleSiguiente = ()=>{
        navigate(`/biblioteca/registro_obras/`, {state:{data:listaAutores}})

    }


    return (
        <DashboardBibliotecaAdmin>

            Seleccion autores
            <Select
                options={data}
                onChange={handleChance}
            />
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
                            <td>{index + 1}</td>
                            <td>{item[1]}</td>
                            <td>de</td>
                        </tr>

                    ))}


                </tbody>
            </table>
            {listaAutores.length == 0 ? <>Seleccione al menos un autor</> : 
            <button onClick={handleSiguiente} className='text-red-500 m-2' >Siguiente</button>
            }

            
        </DashboardBibliotecaAdmin>



    )
}
export default SeleccionAutores