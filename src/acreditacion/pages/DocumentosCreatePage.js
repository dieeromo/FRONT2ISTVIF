
import Select from "react-select"
import DashboardAcreditacion from './components/DashboardAcreditacion'
import { useGetCarreraQuery, useGetCoordinacionesQuery, useGetOtrasComisionesQuery, } from '../../general/services/generalApi'
import {usePostDocumentoEntradaMutation} from '../services/criteriosApi'
import { useGetUsuariosQuery } from '../../usuarios/services/usuariosApi'
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function DocumentosCreatePage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataCarrera, isSuccess: isSuccesscarrera } = useGetCarreraQuery(user.access)
    const { data: dataCoordinaciones, isSuccess: isSuccessCoordinaciones } = useGetCoordinacionesQuery(user.access)
    const { data: dataOtras, isSuccess: isSuccessOtras } = useGetOtrasComisionesQuery(user.access)
    const { data: dataDocentes, isSuccess: isSuccessDocentes } = useGetUsuariosQuery([user.access])

    const [carrera, SetCarrera] = useState('')
    const [coordinacion, SetCoordinacion] = useState('')
    const [otras, SetOtras] = useState('')
    const [responsable, SetResponsable] = useState('')
    const [fechaLimite, SetFechaLimite] = useState('');



    const [postDocEntrada] = usePostDocumentoEntradaMutation()



    const handleSubmit = (e) => {

        e.preventDefault()
        const numeracion = e.target.elements.numeracion.value.trim()
        const documento = e.target.elements.documento.value.trim()
        const observacion = e.target.elements.observacion.value.trim()

        postDocEntrada([
            user.access,
            numeracion,
            documento,
            observacion,
            userDatos.id,
            fechaLimite,
            carrera,
            coordinacion,
            otras,
            id,
            responsable
          
        ])

        navigate(`/acreditacion/documentos/${id}/`)




    }


    return (
        <DashboardAcreditacion >
            <form onSubmit={handleSubmit} method="POST" action="#">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div></div>

                    <div className="mb-4">
                        <label htmlFor="numeracion" className="block text-lg font-semibold text-gray-500">* Numeración:</label>
                        <textarea
                            type="text"
                            name="numeracion"
                            rows={2}
                            className="w-full  p-2 border rounded-md shadow-md "
                            placeholder="Número de documento"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="documento" className="block text-lg font-semibold text-gray-500">* Documento:</label>
                        <textarea
                            type="text"
                            name="documento"
                            rows={2}
                            className="w-full p-2 border rounded-md shadow-md "
                            placeholder="Nombre de documento"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="observacion" className="block text-lg font-semibold text-gray-500">Observación:</label>
                        <textarea
                            type="text"
                            name="observacion"
                            rows={2}
                            className="w-full p-2 border rounded-md shadow-md "
                            placeholder="Observación"
                        />
                    </div>



                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div></div>

                    <div className="mb-4">
                        <label htmlFor="carrera" className="block text-lg font-semibold text-gray-500 shadow-md ">Carrera:</label>
                        <Select options={dataCarrera}
                            className='shadow-md'
                            onChange={(selectedOption) => SetCarrera(selectedOption.value)}
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="coordinaciones_institucionales" className="block text-lg font-semibold text-gray-500 shadow-md ">Coordinaciones institucionales:</label>
                        <Select

                            options={dataCoordinaciones}
                            onChange={(selectedOption) => SetCoordinacion(selectedOption.value)}

                            className='shadow-md'
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="otras_comisiones" className="block text-lg font-semibold text-gray-500 shadow-md ">Otras comisiones:</label>
                        <Select

                            options={dataOtras}
                            onChange={(selectedOption) => SetOtras(selectedOption.value)}


                            className='shadow-md'
                        />
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

                    <div></div>
                    <div className="mb-4">
                        <label htmlFor="responsable" className="block text-lg font-semibold text-gray-500  " >* Docente responsable:</label>
                        <Select
                            options={dataDocentes}
                            onChange={(selectedOption) => SetResponsable(selectedOption.value)}

                            required
                            className='shadow-md'
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div></div>
                    <div className="mb-4">
                        <label htmlFor="fecha_limite" className="block text-lg font-semibold text-gray-500 shadow-md ">* Fecha entrega:</label>
                        <input
                            type="date"
                            onChange={(e) => SetFechaLimite(e.target.value)}
                            name="fecha_limite"
                            className="w-full p-2 border rounded-md shadow-md "
                            required
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div></div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Guardar
                    </button>

                </div>
            </form>


        </DashboardAcreditacion>
     

    )
}