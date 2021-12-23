import React from 'react';
import '../assets/Styles/components/Usuario.scss';
import perfil from '../assets/static/perfil.jpg';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const Usuario = () => {
    const [verCerrarSesion, setVerCerrarSesion] = React.useState(false);
    const cerrarSesion=()=>{      
        cookies.remove('usuario');
        localStorage.clear();
        window.location.href = '/login';
    }
    const versesion=()=>{
        setVerCerrarSesion(!verCerrarSesion);
    }
    return (
        <div className="Usuario">
            <div className="Usuario__navBar" style={{display: verCerrarSesion? "block": "none"}}>
                <div className="Usuario__navBar__nav">
                    <nav>
                        <ul>
                            <li><a style={{fontFamily:"mulish"}} onClick={cerrarSesion}>Cerrar Sesión</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="Usuario__nombre" onClick={versesion}>{cookies.get("usuario")}</div>
            <div className="Usuario__imgPerfil">
                <img src={perfil} alt="foto perfil" />
            </div>
        </div>
    )
}

export default Usuario;
