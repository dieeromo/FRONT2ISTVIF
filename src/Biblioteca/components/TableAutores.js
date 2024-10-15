


// import { RUTA_SERVIDOR } from '../../ApiRoutes';

// import { IoReaderOutline } from "react-icons/io5"
// import { MdUpload } from "react-icons/md"
import LoadingSpinner from '../pages/components/LoadingSpinner'
import { useGetListAutoresQuery } from '../services/bibliotecaApi';
import ModalAutores from '../pages/components/ModalAutores'





const TableAutores = ({ autor }) => {
    const user = JSON.parse(localStorage.getItem('user') || "{}")


    const { data, isLoading, isFetching } = useGetListAutoresQuery({ access: user.access, autor: autor })

   


    return (
        <>
        {(isLoading || isFetching) ? <LoadingSpinner/>:
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-2 px-4 border-b text-xs text-center">#</th>
                        <th className="py-2 px-4 border-b text-xs text-center">Nombre</th>
                        <th className="py-2 px-4 border-b text-xs text-center">Estado</th>
                        <th className="py-2 px-4 border-b text-xs text-center">Observación</th>
                        <th className="py-2 px-4 border-b text-xs text-center">Digitador</th>
                        <th></th>



                    </tr>
                </thead>
                <tbody>
                    {data?.results.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-b text-xs text-center">{item.nombres}</td>
                            <td className="py-2 px-4 border-b text-xs text-center">{item.estado}</td>
                            <td className="py-2 px-4 border-b text-xs text-center">{item.observacion}</td>
                            <td className="py-2 px-4 border-b text-xs text-center">{item.digitadorName}</td>
                            <td><ModalAutores
                         
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
}

        </>

    )
}

export default TableAutores;
