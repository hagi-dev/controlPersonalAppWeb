import React from 'react';
import '../assets/Styles/components/Usuario.scss';
import perfil from '../assets/static/perfil.jpg';
import Cookies from 'universal-cookie';
import userIcon from '../assets/static/user.svg'

const Usuario = () => {
    const cookies = new Cookies();
    const [visivilidad, setVisivilidad] = React.useState(false);
    const cerrar=()=>{
        localStorage.clear();
        cookies.remove('usuario');
        window.location.href = '/home';
    }
    const ver= () => {
        setVisivilidad(!visivilidad);
    }
    return (
        <div className="Usuario">
            <div style={visivilidad ? {display:"block"}:{display:"none"}} className="Usuario__navBar">
                <div className="Usuario__navBar__nav">
                    <nav>
                        <ul>
                            <li onClick={cerrar}>Cerrar Sesión</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div onClick={ver} className="Usuario__nombre">{cookies.get("usuario")}</div>
            <div className="Usuario__imgPerfil">
                <img onClick={ver} src={userIcon} alt="foto perfil" />
            </div>
        </div>
    )
}

export default Usuario;
