import React from 'react';
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
                        <li><a href="">Home</a></li>
                        <li><a href="">Personal</a></li>
                        <li><a href="">Contratos</a></li>
                        <li><a href="">Asistencias</a></li>
                        <li><a href="">Tipo de personal</a></li>
                        <li><a href="">Horario</a></li>
                        <li><a href="">Sanciones </a></li>
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
