import React from 'react'
import ModalCreateDocumento from '../components/ModalCreateDocumento'
import ModalSubirArchivo from '../components/ModalSubirArchivo'
import ModalDeleteArchivo from '../components/ModalDeleteArchivo'
import ModalEditDocumento from '../components/ModalEditDocumento'

import { RUTA_SERVIDOR } from '../../ApiRoutes';



export default function CriterioDataTable({ dataCriterios }) {
  console.log('dataCriterios', dataCriterios)
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

    if(rowSpanMapIndicador[item.indicador]){
      rowSpanMapIndicador[item.indicador] += 1
    }else{
      rowSpanMapIndicador[item.indicador] =1 
    }
  })





  return (
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
        </tr>
      </thead>
      <tbody>
        {dataCriterios.map((item, index) => {
          const isFirstEvidencia = index === 0 || dataCriterios[index - 1].evidencia !== item.evidencia
          const isFirstIndicador = index === 0 || dataCriterios[index-1].indicador !== item.indicador
          return (
            <tr key={index} className="border border-gray-400 text-xs px-2 text-center">
              <td className='border border-gray-400' >{index + 1}</td>
              <td className='border border-gray-400' >{item.subcriterio}</td>

              {
                isFirstIndicador &&
                <td rowSpan={rowSpanMapIndicador[item.indicador]} className={index%2 === 0 ? "bg-gray-200" : ""}> {item.indicador_numeral} </td>
              }
              {
                isFirstIndicador &&
                <td rowSpan={rowSpanMapIndicador[item.indicador]} className={index%2 ===0 ? 'border border-gray-400 bg-gray-200':'border border-gray-400'}>
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


              <td className={(item.archivo || item.link) ? 'border-t border-b border-l border-gray-400 bg-green-200' : 'border-t border-b border-l border-gray-400'}>
                {
                  item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> {item.documento}</a>)
                }

                {
                  item.link && (<a href={`${item.link}`} target="_blank"> {item.documento}</a>)
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
                  {(userDatos.id === item.responsableID || userDatos.is_rectora || userDatos.is_coor_estrategico) && (
                    <div>
                      {(item.archivo || item.link) ?
                        <ModalDeleteArchivo documentoID={item.documentoID} />
                        :
                        <ModalSubirArchivo documentoID={item.documentoID} />
                      }
                    </div>

                  )
                  }
                </div> </td>






            </tr>
          )

        })
        }
      </tbody>
    </table>

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
