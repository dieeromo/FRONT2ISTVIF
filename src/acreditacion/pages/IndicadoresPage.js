import { useParams } from 'react-router-dom';
import { useGetIndicadoresQuery } from '../services/criteriosApi'
import DashboardAcreditacion from './components/DashboardAcreditacion'
import { GrLinkNext } from "react-icons/gr";
export default function IndicadoresPage() {
    const { id } = useParams()


    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data, isSuccess, isLoading, isError, error } = useGetIndicadoresQuery([user.access, id])
 

    return (
        <DashboardAcreditacion>
        <h2 className="text-2xl font-bold">Indicadores</h2>
        <div>
            {/* <FormCriterios /> */}
            {
                isSuccess ? <div >
                    <table className="table-auto w-1/2 shadow-md mt-6 mx-auto">
                        <thead className='bg-gray-200'>
                            <tr className='text-center'>
                                <th>Criterio</th>
                                <th>Subcriterio</th>
                                <th>Numeración</th>
                                <th>Indicador</th>
                                <th></th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={index} className='border px-4 py-2 text-center'>
                                        <td>  {item.criterio} </td>
                                        <td>{item.subCriterio}</td>
                                        <td>{item.numeracion}  </td>
                                        <td>{item.indicador}  </td>
                                        <td> <a href={`/acreditacion/evidencia/${item.id}`}><GrLinkNext /></a></td>
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