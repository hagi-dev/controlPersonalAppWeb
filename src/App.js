import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario';
import RegistrarTipo from './containers/RegistrarTipo';

const App = () => {
    return (
        <div className="contenedor">
            <RegistrarHorario/>
        </div>
    )
}

export default App;
