import React,{useEffect} from 'react';
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
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie';

import DatePicker from 'sassy-datepicker';

const Home = () => {
    const cookies = new Cookies();
    useEffect(()=>{
        localStorage.getItem("mensage")==="usuario y contraseña incorrectos" && localStorage.getItem("token")===undefined ? window.location.href='/login':"" ;
        console.log(localStorage.getItem('token'));
    },[]);
    const onChange = (date) => {
        console.log(date.toString());
      };
    return (
        <div className="Home">
             <div className="Home__menu">
                <Menu/> 
            </div>
            <div className="Home__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="Home__cuerpo-perfil">
                 <Perfil/>
                </div>
                <Box className="Home__cuerpo-contenido" component="span" m={1}>

                    <DatePicker className='sdp' onChange={onChange} />


                </Box>
            </div>
        </div>
    )
}
export default Home;
