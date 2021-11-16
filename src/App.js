import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario'
import {Asistencias} from './containers/Asistencias.js';

const App = () => {
    return (
        <div className="contenedor">
            <Asistencias/>
        </div>
    )
}

export default App;
