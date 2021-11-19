import React from 'react';
import '../assets/Styles/components/Home.scss';
import ComboBox from '../components/ComboBox';
import { makeStyles } from '@material-ui/styles';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import AddCircle  from '@material-ui/icons/AddCircle';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import mateni from '../assets/static/mati.svg'

const Home = () => {

    return (
        <div className="Home">
             <div className="Home__menu">
                <Menu/> 
            </div>
            <div className="Home__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="Home__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="Home__cuerpo-contenido">
                    <h1 style={{fontFamily:"mulish", fontWeight:"900"}}>En Mantenimiento</h1>
                    <img src={mateni} />
                    
                </div>
            </div>
        </div>
    )
}
export default Home;
