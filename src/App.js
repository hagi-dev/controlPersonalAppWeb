import React from 'react';
import './assets/Styles/App.scss';
import RegistrarHorario from './containers/RegistrarHorario'
import RegistrarPermiso from './containers/RegistrarPermiso'

const App = () => {
    return (
        <div className="contenedor">
            {/* <RegistrarHorario/> */}
            <RegistrarPermiso/>
        </div>
    )
}

export default App;
