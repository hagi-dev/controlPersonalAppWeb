import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario'
import Asistencias from './containers/Asistencias';
import RegistrarPermiso from './containers/RegistrarPermiso';
import RegistrarSancion from './containers/RegistrarSancion';
import RegistrarContrato from './containers/RegistrarContrato';
import Personal from './containers/Personal';
import RegistrarTipo from './containers/RegistrarTipo';
import Contrato from './containers/Contrato';
import TablaContrato from './components/TablaContrato';

const App = () => {
    return (
        <div className="contenedor">
            <TablaContrato/>
        </div>
    )
}

export default App;
