import { useParams } from 'react-router-dom';
import DashboardAcreditacion from './components/DashboardAcreditacion'
import { useGetEvidenciasQuery } from '../services/criteriosApi'
import { GrLinkNext } from "react-icons/gr";
const EvidenciaPage = () => {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data, isSuccess, isLoading, isError, error } = useGetEvidenciasQuery([user.access, id])
    console.log(data)

    return (
        <DashboardAcreditacion>
        <h2 className="text-2xl font-bold">Evidencia</h2>
        <div>
            {/* <FormCriterios /> */}
            {
                isSuccess ? <div >
                    <table className="table-auto w-1/2 shadow-md mt-6 mx-auto">
                        <thead className='bg-gray-200'>
                            <tr className='text-center'>
                                <th>Criterio</th>
                                <th>Subcriterio</th>
                                <th>Indicador</th>
                                <th>Numeración</th>
                                <th>Evidencia</th>
                                <th></th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={index} className='border px-4 py-2 text-center'>
                                        <td>  {item.criterio} </td>
                                        <td>{item.subCriterio}</td>
                                        <td>{item.indicador}  </td>
                                        <td>{item.numeracion}  </td>
                                        <td>{item.evidencia}  </td>
                                        <td> <a href={`/acreditacion/documentos/${item.id}`}><GrLinkNext /></a></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                    :
                    <>Cargando...</>
            }
        </div>
    </DashboardAcreditacion>
    )
}

export default EvidenciaPage