import React from 'react'
import ModalCreateDocumento from '../components/ModalCreateDocumento'
import ModalSubirArchivo from '../components/ModalSubirArchivo'
import ModalSubirArchivo2 from '../components/ModalSubirArchivo2'
import ModalDeleteArchivo from '../components/ModalDeleteArchivo'
import ModalEditDocumento from '../components/ModalEditDocumento'
import ModalRevisarDocumento from './ModalRevisarDocumento'
import { FaEye } from "react-icons/fa";
import { RUTA_SERVIDOR } from '../../ApiRoutes';


const getBgColor = (estado) => {
  switch (estado) {
    case 1:  //por revisar
      return 'bg-blue-200';
    case 2: //aprobado
      return 'bg-green-200';
    case 3: // corregir
      return 'bg-orange-300';
    case 0: // sin subir
      return 'bg-red-300';
    default:
      return 'bg-gray-200'; // Color de fondo por defecto si el estado_documento no es 1, 2 o 3
  }
}



export default function CriterioDataTable({ dataCriterios }) {

  
 

 

  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  //let datos = dataCriterios
  const rowSpanMapEvidencia = {}
  const rowSpanMapIndicador = {}

  const esResponsable = (indicador, userID) => {
    return (
      indicador.responsableIndicadorID === userID || indicador.corresponsableIndicador1ID === userID || indicador.corresponsableIndicador2ID === userID || indicador.corresponsableIndicador3ID === userID || indicador.corresponsableIndicador4ID === userID || indicador.corresponsableIndicador5ID === userID
    )
  }

  dataCriterios.forEach((item) => {
    if (rowSpanMapEvidencia[item.evidencia]) {
      rowSpanMapEvidencia[item.evidencia] += 1
    } else {
      rowSpanMapEvidencia[item.evidencia] = 1
    }

    if (rowSpanMapIndicador[item.indicador]) {
      rowSpanMapIndicador[item.indicador] += 1
    } else {
      rowSpanMapIndicador[item.indicador] = 1
    }
  })

  return (
  <div>
    <div className='grid grid-cols-4 w-3/4 mt-3'>

      <div className='bg-red-200 text-center text-sm py-1'>Sin subir</div>
      <div className='bg-blue-200 text-center text-sm py-1'>Subido por aprobar</div>
      <div className='bg-green-200 text-center text-sm py-1'>Aprobado</div>
      <div className='bg-orange-300 text-center text-sm py-1'>Realizar correciones y volver a subir</div>
    </div>
        <table className='m-5'>
      <thead>
        <tr className="bg-lime-900 text-white text-xs  py-2 px-8 text-center">
          <th>#</th>
          <th>Subcriterio</th>
          <th>#Ind</th>
          <th>Indicador</th>
          <th>#Ev</th>
          <th>Evidencia</th>
          <th>Documento</th>
          <th></th>
          <th></th>

          <th>Responsable</th>
          <th>Obs.</th>
        </tr>
      </thead>
      <tbody>
        {dataCriterios.map((item, index) => {
          const isFirstEvidencia = index === 0 || dataCriterios[index - 1].evidencia !== item.evidencia
          const isFirstIndicador = index === 0 || dataCriterios[index - 1].indicador !== item.indicador
          return (
            <tr key={index} className="border border-gray-400 text-xs px-2 text-center">
              <td className='border border-gray-400' >{index + 1}</td>
              <td className='border border-gray-400' >{item.subcriterio}</td>

              {
                isFirstIndicador &&
                <td rowSpan={rowSpanMapIndicador[item.indicador]} className={index % 2 === 0 ? "bg-gray-200" : ""}> {item.indicador_numeral} </td>
              }
              {
                isFirstIndicador &&
                <td rowSpan={rowSpanMapIndicador[item.indicador]} className={index % 2 === 0 ? 'border border-gray-400 bg-gray-200' : 'border border-gray-400'}>
                  <div>{item.indicador}</div>
                  <div className='text-red-500'>* {item.responsableIndicador} *</div>
                  <div className='text-xs'>{item.corresponsableIndicador1}</div>
                  <div className='text-xs'>{item.corresponsableIndicador2}</div>
                  <div className='text-xs'>{item.corresponsableIndicador3}</div>
                  <div className='text-xs'>{item.corresponsableIndicador4}</div>
                  <div className='text-xs'>{item.corresponsableIndicador5}</div>
                </td>
              }
              {isFirstEvidencia &&
                <td rowSpan={rowSpanMapEvidencia[item.evidencia]} className='border border-gray-400' >
                  {item.evidencia_numeral}
                  <>
                    {(esResponsable(item, userDatos.id) || userDatos.is_rectora || userDatos.is_coor_estrategico) && (<ModalCreateDocumento
                      evidenciaID={item.evidenciaID}
                    />
                    )}
                  </>
                </td>
              }

              {isFirstEvidencia &&
                <td rowSpan={rowSpanMapEvidencia[item.evidencia]} className='border border-gray-400' >
                  {item.evidencia}
                </td>
              }


              <td className={`px-6 py-4 ${getBgColor(item.estado_documento)}`}>
                {
                  item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> {item.documento} <FaEye /></a>)
                }

                {
                  item.link && (<a href={`${item.link}`} target="_blank"> {item.documento} <FaEye /> </a>)
                }
                {
                  (!item.link && !item.archivo) && <>{item.documento}</>
                }

              </td>
              <td>
                {item.periodoAcademico}
              </td>

              <td className='border-t border-b border-r border-gray-400'>

                {item.documento && (
                  <div>
                    {(esResponsable(item, userDatos.id) || userDatos.is_rectora || userDatos.is_coor_estrategico) && (
                      <ModalEditDocumento
                        documentoID={item.documentoID}
                        responsableName={item.responsable}
                        responsableID={item.responsableID}
                        periodoName={item.periodoAcademico}
                        periodoID={item.periodoAcademicoID}
                      />
                    )}


                  </div>

                )}



              </td>

              <td className='border border-gray-400 text-xs'> {item.responsable}
                <div>
                  {((userDatos.id === item.responsableID || userDatos.is_rectora || userDatos.is_coor_estrategico)&&item.estado_documento != 2) && (
                    <div>
                      {(item.archivo || item.link) ?
                        <ModalDeleteArchivo documentoID={item.documentoID} />
                        :
                        <ModalSubirArchivo2 documentoID={item.documentoID} />
                      }
                    </div>

                  )
                  }
                </div>
              </td>

              <td>
                {userDatos.is_rectora && (
                  <ModalRevisarDocumento
                    documentoID={item.documentoID}
                  />
                )}

                {item.observacion_documento}
              </td>






            </tr>
          )

        })
        }
      </tbody>
    </table>
  </div>


    //   <table className='m-5'>
    //   <thead>
    //     <tr className="bg-lime-900 text-white text-xs  py-2 px-8 text-center">
    //     <th>#</th>
    //       <th>Subcriterio</th>
    //       <th>#Ind</th>
    //       <th>Indicador</th>
    //       <th>#Ev</th>
    //       <th>Evidencia</th>
    //       <th>Documento</th>
    //       <th>ver</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {dataCriterios.map((item,index) => (
    //       <tr key={index} className="border border-gray-400 text-xs px-2 text-center">
    //         <td>{index+1}</td>
    //         <td>{item.subcriterio}</td>
    //         <td>{item.indicador_numeral}</td>
    //         <td>{item.indicador}</td>
    //         <td>
    //           {item.evidencia_numeral} 
    //           <ModalCreateDocumento
    //           evidenciaID={item.evidenciaID}
    //           />

    //           </td>
    //         <td>{item.evidencia}

    //         </td>
    //         <td>{item.documento }      <ModalSubirArchivo
    //         documentoID={item.documentoID}
    //         /></td>
    //         <td>
    //           {
    //             item.archivo ?
    //             <a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> Ver</a>
    //             :
    //             <> </>
    //           }

    //         </td>

    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
}
