import React, { useState } from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import {
  useGetEvaluacionEvidenciaQuery,
  useGetSubcriterio_por_criterioQuery,
  useGetIndicador_por_SubcriterioQuery,
  useGetCriteriosQuery,
  useGetEvaluacionEvidencia_modeloCriterioQuery,
  useGetDocumento_por_indicador_allQuery
} from '../services/evaluacionApi'
import CriterioButton from '../components/CriterioButton'
import CriterioDataTable from '../components/CriterioDataTable'
import LoadingSpinner from '../components/LoadingSpinner'


export default function EvaluacionEvidenciaFiltro() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  const { data, isSuccess } = useGetEvaluacionEvidenciaQuery(user.access)
  const { data: dataCriterios, isSuccess: isSuccessCriterios, isLoading: isLoadingCriterios, isFetching: isFetchingCriterios } = useGetCriteriosQuery(user.access)

  const [selectedCriterioId, setSelectedCriterioId] = useState(null);
  const [selectedSubCriterioId, setSelectedSubCriterioId] = useState([]);
  const [selectedIndicadorId, setSelectedIndicadorId] = useState([]);

  const { data: dataSub, isLoading: isLoadingSub, isSuccess: isSuccessSub, isFetching: isFetchingSub } = useGetSubcriterio_por_criterioQuery({ access: user.access, criterio_id: selectedCriterioId, modelo_id: 1 }, {
    skip: selectedCriterioId === null,
  });
  console.log('subcriterios', dataSub)



  const { data: dataInd, isLoading: isLoadingInd, isSuccess: isSuccessInd, isFetching: isFetchingInd } = useGetIndicador_por_SubcriterioQuery({ access: user.access, subcriterio_id: selectedSubCriterioId, modelo_id: 1 }, {
    skip: selectedCriterioId === null,
  });
  console.log('indicadores', dataInd)




  const { data: dataEvaluacion, isLoading: isLoadingEvaluacion, isSuccess: isSuccessEvaluacion, isFetching: isFetchingEvaluacion } = useGetDocumento_por_indicador_allQuery({ access: user.access, criterio_id: selectedCriterioId, subcriterio_id: selectedSubCriterioId, indicador_id: selectedIndicadorId, modelo_id: 1 }, {
    skip: selectedCriterioId === null,
  });

  //console.log('data evaluacion', dataEvaluacion)


  const handleCriterioClick = (criterioId) => {
    setSelectedCriterioId(criterioId);
  };

  const handleSubCriterioClick = (subcriterioId) => {
    setSelectedSubCriterioId(subcriterioId);
  };

  const handleIndicadorClick = (indicadorId) => {
    setSelectedIndicadorId(indicadorId);
  };


  return (
    <div>
      <Navbar_dashboard />
      <div className='text-xs text-gray-500 mb-1'>Evidencia de acuerdo al modelo de evaluación</div>
      <div>
        {(isFetchingCriterios || isLoadingCriterios) ?
          <LoadingSpinner />
          :
          <div>

            {dataCriterios.map((item) => (
              <CriterioButton key={item.id} criterio={item} onClick={handleCriterioClick} />
            )
            )}
            <a href='/evaluacion/documentos/responsable' className='mr-4 text-xs'>Mis pendientes</a>
            <a href='/evaluacion/estadistica' className='text-xs'>Estadistica</a>
            {userDatos.is_rectora && <a href='/evaluacion/documentos/docente' className='ml-4 text-xs'>Por docente</a>}
          </div>

        }

      </div>

      <div>
        {(isFetchingSub || isLoadingSub) ?
          <LoadingSpinner />
          :
          <div>
            {
              (Array.isArray(dataSub)) && dataSub.length > 0 ?
                <div className=''>
                  {dataSub.map((item) => (
                    <CriterioButton key={item.id} criterio={item} onClick={handleSubCriterioClick} />
                  )
                  )}

                </div>
                :
                <p className='text-xs'>
                  Seleccione un criterio
                </p>
            }
          </div>
        }
      </div>




      <div>
        {(isFetchingInd || isLoadingInd) ?
          <LoadingSpinner />
          :
          <div>
            {
              (Array.isArray(dataInd)) && dataInd.length > 0 ?
                <div >
                  {dataInd.map((item) => (
                    <CriterioButton key={item.id} criterio={item} onClick={handleIndicadorClick } />
                  )
                  )}
                </div>
                :
                <p className='text-xs'> Seleccione un subcriterio </p>
            }
          </div>
        }

      </div>




      <div>
        {(Array.isArray(dataInd)) && dataInd.length > 0 && (
          <div>
            {(isLoadingEvaluacion || isFetchingEvaluacion) ?
              <LoadingSpinner />
              :
              <div>
                { (Array.isArray(dataEvaluacion)) && dataEvaluacion.length > 0 &&
                   <CriterioDataTable
                   dataCriterios={dataEvaluacion}
                 />

                }
               
              </div>


            }
          </div>


        )}
      </div>










    </div>
  )
}
