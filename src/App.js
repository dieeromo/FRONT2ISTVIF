import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Salir from './pages/Salir'
import Landing from './pages/Landing'



//ACREDITACION
import CriteriosPage from './acreditacion/pages/CriteriosPage';
import SubcriteriosPage from './acreditacion/pages/SubcriteriosPage';
import IndicadoresPage from './acreditacion/pages/IndicadoresPage';
import LandingAcreditacion from './acreditacion/pages/LandingAcreditacion'
import EvidenciaPage from './acreditacion/pages/EvidenciaPage'
import DocumentosTodos from './acreditacion/pages/DocumentosTodos'
import DocumentosPage from './acreditacion/pages/DocumentosPage'
import DocumentosCreatePage from './acreditacion/pages/DocumentosCreatePage'
import PendientesDocumentos from './acreditacion/pages/PendientesDocumentos'
///BIBLIOTECA
import LandingBiblioteca from './biblioteca/pages/LandingBiblioteca'
import RegistroObras from './biblioteca/pages/RegistroObras'
import AutoresObra from './biblioteca/pages/AutoresObra'
import SeleccionAutores from './biblioteca/pages/SeleccionAutores'
import ListaObrasAutores from './biblioteca/pages/ListaObrasAutores'
import FiltroObras from './biblioteca/pages/FiltroObras'
import PresentacionObrasTitulo from './biblioteca/pages/PresentacionObrasTitulo'
import UbicacionObras from './biblioteca/pages/UbicacionObras'
import CategoriaObra from './biblioteca/pages/CategoriaObra'
import TipoObras from './biblioteca/pages/TipoObras'
//  GENERAL
import LandingServiciosAdmin from './general/pages/LandingServiciosAdmin'
import BolsaEmpleoPublic from './general/pages/BolsaEmpleoPublic';
import BolsaEmepleoAdmin from './general/pages/BolsaEmepleoAdmin';

//INVENTARIO
import LandingInventario from './inventario/pages/LandingInventario'
import RegisterInventario from './inventario/pages/RegisterInventario';
import ListInventario from './inventario/pages/ListInventario'

//PEDI

import RegistroPedi2 from './pedi/pages/RegistroPedi2'
import TablaPedi from './pedi/pages/TablaPedi'
import Poa from './pedi/pages/Poa'
import RegistroObjetivosEst from './pedi/pages/RegistroObjetivosEst'
import RegistroObjetivosEsp from './pedi/pages/RegistroObjetivosEsp'
import RegistroMetas from './pedi/pages/RegistroMetas'
import RegistroActividades from './pedi/pages/RegistroActividades'
import RegistroMediosVer from './pedi/pages/RegistroMediosVer'
import RegistroIndicador from './pedi/pages/RegistroIndicador'
import Poa2 from './pedi/pages/Poa2'
import SeguimientoPoa from './pedi/pages/SeguimientoPoa'
import PediData from './pedi/pages/PediData'
import PoaData from './pedi/pages/PoaData'
// PEA
import Asignatura from './pea/pages/Asignatura'
import Curso from './pea/pages/Curso'
import GeneralidadesPEA from './pea/pages/GeneralidadesPEA'



function App() {

  return (
    <div >
      <BrowserRouter>
        {/* < SessionExpirationNotifier/> */}
        <Routes>
          {/* Pea */}
          <Route path='/pea/asignatura' element={<Asignatura />} />
          <Route path='/pea/curso' element={<Curso />} />
          <Route path='/pea/generalidades' element={<GeneralidadesPEA />} />


          {/* Acreditacion */}
          <Route path='/' element={<Navigate to='/landing' replace />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/salir' element={<Salir />} />

          <Route path='/acreditacion/landing' element={<LandingAcreditacion />} />
          <Route path='/acreditacion/criterios' element={<CriteriosPage />} />
          <Route path='/acreditacion/subcriterios/:id' element={<SubcriteriosPage />} />
          <Route path='/acreditacion/indicadores/:id' element={<IndicadoresPage />} />
          <Route path='/acreditacion/evidencia/:id' element={<EvidenciaPage />} />
          <Route path='/acreditacion/documentos/:id' element={<DocumentosPage />} />
          <Route path='/acreditacion/documentos/todos' element={<DocumentosTodos />} />
          <Route path='/acreditacion/documentos/create/:id' element={<DocumentosCreatePage />} />
          <Route path='/acreditacion/mispendientes' element={<PendientesDocumentos />} />


          {/* BIBLIOTECA */}
          <Route path='/biblioteca/landing' element={<LandingBiblioteca />} />
          <Route path='/biblioteca/registro_obras' element={<RegistroObras />} />


          {/* <Route path="/biblioteca/registro_obras/:autores" element={<RegistroObras animate={true} />} /> */}


          <Route path='/biblioteca/autores' element={<AutoresObra />} />
          <Route path='/biblioteca/seleccion/autores' element={<SeleccionAutores />} />
          <Route path='/biblioteca/lista/obras_autores' element={<ListaObrasAutores />} />
          <Route path='/biblioteca/filtro/obras' element={<FiltroObras />} />
          <Route path='/biblioteca/presentacion/titulo/:id' element={< PresentacionObrasTitulo />} />
          <Route path='/biblioteca/ubicacion/obras' element={< UbicacionObras />} />
          <Route path='/biblioteca/categoria/obras' element={< CategoriaObra/>} />
          <Route path='/biblioteca/tipo/obras' element={< TipoObras/>} />

          {/* GENERAL */}
          <Route path='/general/admin/landing/servicios' element={< LandingServiciosAdmin />} />

          <Route path='/general/public/bolsa' element={< BolsaEmpleoPublic />} />
          <Route path='/general/admin/bolsa' element={< BolsaEmepleoAdmin />} />

          {/* INVENTARIO */}
          <Route path='/inventario/landing' element={< LandingInventario/>} />
          <Route path='/inventario/register' element={< RegisterInventario/>} />
          <Route path='/inventario/list' element={< ListInventario/>} />

            {/* PEDI */}
            
            <Route path='/pedi/registro2' element={< RegistroPedi2/>} />
            <Route path='/pedi' element={< TablaPedi/>} />
            <Route path='/pedi/poa' element={< Poa/>} />
            <Route path='/pedi/poa2' element={< Poa2/>} />
            <Route path='/pedi/seguimiento/poa' element={< SeguimientoPoa/>} />
            <Route path='/pedi/registro/objetivos/:pedi_id' element={< RegistroObjetivosEst/>} />
            <Route path='/pedi/registro/objetivos/especificos/:estrategico_id' element={< RegistroObjetivosEsp/>} />
            <Route path='/pedi/registro/metas/:especifico_id' element={< RegistroMetas/>} />
            <Route path='/pedi/registro/actividades/:meta_id' element={< RegistroActividades/>} />
            <Route path='/pedi/registro/medios/:actividad_id' element={< RegistroMediosVer/>} />
            <Route path='/pedi/registro/indicador/:medio_id' element={< RegistroIndicador/>} />
            <Route path='/pedi/pedidata' element={< PediData/>} />
            <Route path='/pedi/poadata' element={< PoaData/>} />
           











        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
