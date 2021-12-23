import React from 'react';
import TablaHuella from '../components/TablaHuellas';
import {TextField,MenuItem} from '@material-ui/core';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import '../assets/styles/components/registrarHuella.scss';
import '../assets/Styles/components/Buton.scss';


const RegistrarHuella = () => {
    React.useEffect(() => {
        localStorage.getItem('token')?"":window.location.href='/login';
    },[]);
    return (
        <div className="RegistrarHuella"> 
             <div className="RegistrarHuella__menu">
                <Menu/> 
            </div>
            <form className="RegistrarHuella__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarHuella__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarHuella__cuerpo-titulo">
                    <h1>Personal</h1>
                </div>
                <div className="RegistrarHuella__cuerpo-contenido">
                    <div className="RegistrarHuella__registrar">
                        <div className="RegistrarHuella__registrar-titulo"><h2>Registrar Huella</h2></div>
                                                    
                    </div>
                    <div className="RegistrarHuella__tabla">
                        <div className="RegistrarHuella__fila">
                        <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Area"
                                    value={''}
                                    required
                                    style={{width:"60%"}}
                                    helperText=""
                                    name="area"
                                    onChange={getSelection}
                                    >
                                </TextField>    
                        </div>
                        <TablaHuella/>
                    </div>
                </div>
                <div className="RegistrarHuella__botones">
                    <button className='Button' style={{width:'30%'}}>Guardar</button> 
                    <button className='Button'style={{width:'30%'}}>Cancelar</button>
                </div>
                <div className="RegistrarHuella__Cerrar"><ion-icon  name="close-circle-outline"></ion-icon></div>
            </form>
        </div>
    )
}

export default RegistrarHuella;
