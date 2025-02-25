import React from 'react';
import '../assets/Styles/App.scss';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import RegistrarHorario from '../containers/RegistrarHorario'
import Asistencias from '../containers/Asistencias';
import RegistrarPermiso from '../containers/RegistrarPermiso';
import RegistrarSancion from '../containers/RegistrarSancion';
import RegistrarContrato from '../containers/RegistrarContrato';
import RegistrarPersonal2 from '../containers/RegistrarPersonal2';
import Personal from '../containers/Personal';
import RegistrarTipo from '../containers/RegistrarTipo';
import Contrato from '../containers/Contrato';
import TablaContrato from '../components/TablaContrato';
import Home from '../containers/Home';
import Login from '../containers/Login';
import PersonalRegister from '../containers/PersonalRegister';
import RecoveryPassword from '../containers/RecoveryPassword';
import VerifyEmail from '../containers/VerifyEmail';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/horarios" element={<RegistrarHorario/>} />
                <Route exact path="/asistencias" element={<Asistencias/>} />
                <Route exact path="/permisos" element={<RegistrarPermiso/>} />
                <Route exact path="/sanciones" element={<RegistrarSancion/>} />
                <Route exact path="/registro-contratos/:idContrato" element={<RegistrarContrato/>} />
                <Route exact path="/registrar%20personal" element={<RegistrarPersonal2/>} />
                <Route exact path="/personal" element={<Personal/>} />
                <Route exact path="/tipo%20trabajador" element={<RegistrarTipo/>} />
                <Route exact path="/contratos" element={<Contrato/>} />
                <Route exact path="/verify-email" element={<VerifyEmail/>} />
                <Route exact path="/recovery-password" element={<RecoveryPassword/>} />
                <Route exact path="/personal-register" element={<PersonalRegister/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
