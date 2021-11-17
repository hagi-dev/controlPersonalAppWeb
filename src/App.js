import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario'
import Asistencias from './containers/Asistencias';
import Personal from './containers/Personal';
import Contrato from './containers/Contrato';

const App = () => {
    return (
        <div className="contenedor">
            <Contrato/>
        </div>
    )
}

export default App;
