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
//  GENERAL
import LandingServiciosAdmin from './general/pages/LandingServiciosAdmin'
import BolsaEmpleoPublic from './general/pages/BolsaEmpleoPublic';
import BolsaEmepleoAdmin from './general/pages/BolsaEmepleoAdmin';

//INVENTARIO
import LandingInventario from './inventario/pages/LandingInventario'




function App() {

  return (
    <div >
      <BrowserRouter>
        {/* < SessionExpirationNotifier/> */}
        <Routes>
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

          {/* GENERAL */}
          <Route path='/general/admin/landing/servicios' element={< LandingServiciosAdmin />} />

          <Route path='/general/public/bolsa' element={< BolsaEmpleoPublic />} />
          <Route path='/general/admin/bolsa' element={< BolsaEmepleoAdmin />} />

          {/* INVENTARIO */}
          <Route path='/inventario/landing' element={< LandingInventario/>} />





        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
