import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario'
import {Asistencias} from './containers/Asistencias';

const App = () => {
    return (
        <div className="contenedor">
            <RegistrarHorario/>
        </div>
    )
}

export default App;
