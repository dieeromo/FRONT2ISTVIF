
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import { useParams } from 'react-router-dom';
import { useGetListFilter_Titulos_idQuery, useGetListFilter_Autores_idObraQuery } from '../services/bibliotecaApi'
import {mostrar_abrir_pdf_conf} from '../../ConfiguracionApp'
import { RUTA_SERVIDOR } from '../../ApiRoutes';

export default function PresentacionObrasTitulo() {
    const { id } = useParams()
    console.log(id)
    const { data, isSuccess } = useGetListFilter_Titulos_idQuery(id)
    const { data: dataAutores, isSuccess: isSuccessAutores } = useGetListFilter_Autores_idObraQuery(id)
    console.log(dataAutores)
    return (
        <DashboardBibliotecaAdmin>
            {isSuccess ?
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-2">{data[0].titulo}</h2>
                        <p className="text-gray-600 text-sm mb-2">Año de publicación: {data[0].anio_publicacion} </p>
                        {isSuccessAutores ? <>
                            {dataAutores.map((item, index) => (
                                <p className="text-gray-600 text-sm mb-4" key={index}>Autor {index+1}: {item.autor} </p>
                            ))}

                        </>
                            :
                            <></>
                        }
                        <p className="text-gray-600 text-sm mb-2">Tipo de obra: {data[0].tipo_obra} </p>
                        <p className="text-gray-600 text-sm mb-4">Tipo de material: {data[0].tipo_material} </p>
                     {
                        data[0].tipo_material == mostrar_abrir_pdf_conf ?
                        <a href={RUTA_SERVIDOR + `/${data[0].archivo}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:text-blue-700">Abrir PDF</a>
                        :
                        <

                        ></>
                     }
                        
                    </div>
                </div>
                :
                <>Cargando...</>

            }

        </DashboardBibliotecaAdmin>



    )
}