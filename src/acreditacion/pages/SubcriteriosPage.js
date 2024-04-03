import { useParams } from 'react-router-dom';
import { useGetSubCriteriosQuery } from '../services/criteriosApi'
import DashboardAcreditacion from './components/DashboardAcreditacion'
import { GrLinkNext } from "react-icons/gr";
export default function SubcriteriosPage() {
    const {id} = useParams()


    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const { data, isSuccess, isError, error } = useGetSubCriteriosQuery([user.access, id])

    console.log(data)
    //console.log(data)

    return (
        <DashboardAcreditacion>
        <h2 className="text-2xl font-bold">SubCriterios</h2>
        <div>
            {/* <FormCriterios /> */}
            {
                isSuccess ? <div >
                    <table className="table-auto w-1/2 shadow-md mt-6 mx-auto">
                        <thead className='bg-gray-200'>
                            <tr className='text-center'>
                                <th>Criterio</th>
                                <th>Número</th>
                                <th>Subcriterio</th>
                                <th></th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={index} className='border px-4 py-2 text-center'>
                                        <td>  {item.criterio} </td>
                                        <td>{item.numeracion}  </td>
                                        <td>{item.subCriterio}</td>
                                
                                        <td> <a href={`/acreditacion/indicadores/${item.id}`}><GrLinkNext /></a></td>
                                        {/* <td> <button onClick={() => { deleteCriterio([user.access, item.id]) }}>Delete</button> </td> */}
                      
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