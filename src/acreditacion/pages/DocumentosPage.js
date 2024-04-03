import { useParams } from 'react-router-dom';
import DashboardAcreditacion from './components/DashboardAcreditacion'
import { useGetDocumentos_evidenciaQuery, useDeleteArchivoMutation } from '../services/criteriosApi'
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import CargaDocumentoModal from '../components/CargaDocumentoModal'
import DeleteArchivoModal from '../components/DeleteArchivoModal'
import DocTodosModal from '../components/DocTodosModal'
import DeleteEntradaDocTodosModal from '../components/DeleteEntradaDocTodosModal'
import { IoReaderOutline } from "react-icons/io5"



const DocumentosPage = () => {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  const { data, isSuccess, isLoading, isError, error } = useGetDocumentos_evidenciaQuery([user.access, id])
  console.log(data)
  const [deleteArchivo] = useDeleteArchivoMutation()

  return (
    <DashboardAcreditacion>
      {userDatos.is_administrativo3 ?
        <div className='pt-5 pb-3 text-xs text-blue-600 '>
          <a href={`/acreditacion/documentos/create/${id}`}> + Nuevo documento</a>
        </div>
        :
        <>
        </>
      }


      {isSuccess ?

        <div className='m-8'>


          <p className='text-sm'>{data[0].criterio} - {data[0].subCriterio} - {data[0].indicador}</p>

          <table className=" m-2 pt-10 shadow-md  " >
            <thead className='bg-gray-200  '>
              <tr className='text-center'>

                <th className='pt-4 text-xs'>Evidencia</th>
                <th className='pt-4 text-xs'>Key</th>
                <th className='pt-4 text-xs'>Doc</th>
                <th className='pt-4 text-xs'>Cargar</th>
                <th className='pt-4 text-xs'> Resp</th>
                <th className='pt-4 text-xs'>Ver</th>
                <th className='pt-4 text-xs'>Entrega</th>
                <th className='pt-4 text-xs'>Carrera</th>
                <th className='pt-4 text-xs'>Coord. Inst.</th>
                <th className='pt-4 text-xs'>Otras</th>
                <th className='pt-4 text-xs'>Responsable</th>
                <th className='pt-4 text-xs'></th>


              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <tr key={index} className='border px-4 py-1 text-center'>
                    <td className='pt-4 px-2 text-xs'>{item.evidencia}</td>
                    <td className='pt-4 px-2 text-xs'>{item.numeracion}</td>
                    <td className='pt-4 px-2 text-xs'> {item.documento}</td>
                    <td className='pt-4 px-2 text-xs'>
                      <div>
                        <div>
                          {userDatos.id == item.responsable_id ? <CargaDocumentoModal id={item.id} indicador_id={item.indicador_id} /> : <>  </>}
                        </div>
                        <div>
                          {userDatos.id == item.responsable_id ? <DeleteArchivoModal id={item.id} /> : <>  </>}

                        </div>

                      </div>

                    </td>
                    <td className='pt-4 text-xs'>{item.responsable}</td>
                    <td className='pt-4 px-2 text-xs'> {item.archivo ? <a href={RUTA_SERVIDOR + item.archivo} ><IoReaderOutline className='w-5 h-5' /></a> : <> </>} </td>
                    <td className='pt-4 px-2 text-xs'>{item.fecha_limite}</td>
                    <td className='pt-4 text-xs'>{item.coor_carrera}</td>
                    <td className='pt-4 text-xs' >{item.coor_institucionales}</td>
                    <td className='pt-4 px-2 text-xs'>{item.otras_comisiones}</td>
                    <td className='pt-4 text-xs'>{item.responsable}</td>
                    <td className='pt-4 text-xs'>

                      <div>
                        <div>
                          {userDatos.is_administrativo3 ? <DocTodosModal id={item.id} nombre_doc_default={item.documento} /> : <>  </>}
                        </div>
                        <div>
                          {userDatos.is_administrativo3 ? <DeleteEntradaDocTodosModal id={item.id} /> : <>  </>}
                        </div>

                      </div>
               
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
        :
        <>Cargando...</>

      }





    </DashboardAcreditacion >

  )
}

export default DocumentosPage