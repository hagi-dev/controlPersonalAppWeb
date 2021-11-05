import React from 'react';
import Menu from './components/Menu';
import './assets/Styles/App.scss';
import Usuario from './components/Usuario';

const App = () => {
    return (
        <div className="contenedor">
            <Menu/>
            <Usuario/>
        </div>
    )
}

export default App;
