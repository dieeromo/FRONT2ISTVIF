
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
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'



function App() {
  
  return (
    <div >
      <BrowserRouter>
      {/* < SessionExpirationNotifier/> */}
        <Routes>
          <Route path='/' element={<Navigate to='/auth' replace />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/salir' element={<Salir/>} />

          <Route path='/acreditacion/landing' element={<LandingAcreditacion/>} />
          <Route path='/acreditacion/criterios' element={<CriteriosPage />} />
          <Route path='/acreditacion/subcriterios/:id' element={<SubcriteriosPage />} />
          <Route path='/acreditacion/indicadores/:id' element={<IndicadoresPage />} />
          <Route path='/acreditacion/evidencia/:id' element={<EvidenciaPage />} />
          <Route path='/acreditacion/documentos/:id' element={<DocumentosPage />} />
          <Route path='/acreditacion/documentos/todos' element={<DocumentosTodos />} />
          <Route path='/acreditacion/documentos/create/:id' element={<DocumentosCreatePage />} />

          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
