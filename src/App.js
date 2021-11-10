import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario';
import RegistrarTipo from './containers/RegistrarTipo';

const App = () => {
    return (
        <div className="contenedor">
            <RegistrarTipo/>
        </div>
    )
}

export default App;
