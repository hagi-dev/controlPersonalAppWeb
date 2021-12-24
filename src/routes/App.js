import React,{useEffect} from 'react';
import '../assets/Styles/App.scss';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import RegistrarHorario from '../containers/RegistrarHorario'
import Asistencias from '../containers/Asistencias';
import RegistrarPermiso from '../containers/RegistrarPermiso';
import Login from '../containers/Login';
import RegistrarSancion from '../containers/RegistrarSancion';
import RegistrarContrato from '../containers/RegistrarContrato';
import RegistrarPersonal from '../containers/RegistrarPersonal';
import Personal from '../containers/Personal';
import RegistrarTipo from '../containers/RegistrarTipo';
import Contrato from '../containers/Contrato';
import TablaContrato from '../components/TablaContrato';
import Home from '../containers/Home';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/horarios" element={<RegistrarHorario/>} />
                <Route exact path="/asistencias" element={<Asistencias/>} />
                <Route exact path="/permisos" element={<RegistrarPermiso/>} />
                <Route exact path="/sanciones" element={<RegistrarSancion/>} />
                <Route exact path="/registro%20contratos" element={<RegistrarContrato/>} />
                <Route exact path="/registrar%20personal" element={<RegistrarPersonal/>} />
                <Route exact path="/personal" element={<Personal/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/tipo%20trabajador" element={<RegistrarTipo/>} />
                <Route exact path="/contratos" element={<Contrato/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
