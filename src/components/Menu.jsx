import React from 'react';
import { Link } from 'react-router-dom';
import WhatsApp from './vectors/Whatsapp';
import Messenger from './vectors/Messenger';
import Logo from '../assets/static/logo4.png';
import '../assets/Styles/components/Menu.scss';
const Menu = () => {
    
    return (
        <div className="Menu">
            <div className="Menu__imgLogo">
                <img src={Logo} alt="" />
            </div>
            <div className="Menu__navBar">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/personal">Personal</Link></li>
                        <li><Link to="/contratos">Contratos</Link></li>
                        <li><Link to="/asistencias">Asistencias</Link></li>
                        <li><Link to="/tipo%20trabajador">Tipo de personal</Link></li>
                        <li><Link to="/horarios">Horario</Link></li>
                        <li><Link to="/personal-register">Registro</Link></li>
                        {/* <li><Link to="/sanciones">Sanciones</Link></li>
                        <li><a href="/permisos">Permisos</a></li> */}
                    </ul>
                </nav>
            </div>
            <div className="Menu__contactoPersonal">
                <div className="Menu__contactoPersonal__SubTitle">
                    <a href="#">Contactar Personal</a>
                </div>
                <div className="Menu__contactoPersonal__imgs">
                    <div className="Menu__contactoPersonal__imgs-WhatsApp">
                        <a href=""><WhatsApp /></a>
                    </div>
                    <div className="Menu__contactoPersonal__imgs-Messenger">
                        <a href=""><Messenger/></a>
                    </div>
                </div>
            </div>            
        </div>
    )
}
 

export default Menu;
