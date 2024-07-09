import React, { useState } from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'
import { useGetEvaluacionEvidenciaQuery, useGetCriteriosQuery, useGetEvaluacionEvidencia_modeloCriterioQuery } from '../services/evaluacionApi'
import CriterioButton from '../components/CriterioButton'
import CriterioDataTable from '../components/CriterioDataTable'


export default function EvaluacionEvidencia() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  const { data, isSuccess } = useGetEvaluacionEvidenciaQuery(user.access)
  const { data: dataCriterios, isSuccess: isSuccessCriterios } = useGetCriteriosQuery(user.access)

  const [selectedCriterioId, setSelectedCriterioId] = useState(null);

  const { data: dataEvaluacion, isLoading: isLoadingEvaluacion, isSuccess:isSuccessEvaluacion } = useGetEvaluacionEvidencia_modeloCriterioQuery({ access: user.access, criterio_id: selectedCriterioId, modelo_id: 1 }, {
    skip: selectedCriterioId === null,
  });

  //const { data: dataEvaluacion, isLoading: isLoadingEvaluacion} = useGetEvaluacionEvidencia_modeloCriterioQuery({access:user.access, criterio_id:1, modelo_id:1})
 

  const handleCriterioClick = (criterioId) => {
    setSelectedCriterioId(criterioId);
  };


  return (
    <div>
      <Navbar_dashboard />
      <div>
        {isSuccessCriterios ?
          <div>
            {dataCriterios.map((item) => (
              <CriterioButton key={item.id} criterio={item} onClick={handleCriterioClick} />
            )
            )}
             <a href='/evaluacion/documentos/responsable' className=''>Mis pendientes</a>
             {userDatos.is_rectora && <a href='/evaluacion/documentos/docente' className='ml-4'>Por docente</a>}
          </div>
          :
          <>Cargando criterios</>
        }
       
      </div>

      <div>
        {selectedCriterioId && (
          <div>
            {isSuccessEvaluacion ?
              
              <CriterioDataTable
              dataCriterios={dataEvaluacion}
            />
              :
              <p>cargando datos</p>
            }
          </div>

        )}
      </div>










    </div>
  )
}
