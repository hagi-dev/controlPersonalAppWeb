import React from 'react';
import '../assets/Styles/components/Usuario.scss';
import perfil from '../assets/static/perfil.jpg';

const Usuario = () => {
    return (
        <div className="Usuario">
            <div className="Usuario__navBar">
                <div className="Usuario__navBar__nav">
                    <nav>
                        <ul>
                            <li><a href="">Cambiar Nombre</a></li>
                            <li><a href=""></a>Modificar Login</li>
                            <li><a href=""></a>Cerrar Sesión</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="Usuario__nombre">Karina</div>
            <div className="Usuario__imgPerfil">
                <img src={perfil} alt="foto perfil" />
            </div>
        </div>
    )
}

export default Usuario;
