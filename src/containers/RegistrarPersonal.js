import React, {useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/RegistrarPersonal.scss';
import '../assets/Styles/components/Buton.scss';
import SearchIcon from '@material-ui/icons/Search';
import TablaHuella from '../components/TablaHuellas';
import Menu from '../components/Menu';
import {TextField,MenuItem} from '@material-ui/core';
import Perfil from '../components/Usuario';

const RegistrarPersonal = () => {
    const [filtro, setFiltro] = React.useState(0);
    const [getData,setData] = useState({
        id: '',
        dni:'',
        nombre:'',
        paterno:'',
        materno:'',
        sexo:'',
        fechaNacimiento:'',
        telefono:'',
        foto:'',
        
    });
    const [getDataHuella,setData2] = useState([]);
    const todoList = [
        { text: '10:00 AM', id:'500'},
        { text: '10:00 AM',id:'1'},
        { text: '10:00 AM', id:'2'},
        { text: '10:00 AM', id:'3'}
      ]

	return (
		<div className="RegistrarPersonal">
             <div className="RegistrarPersonal__menu">
                <Menu/> 
            </div>
            <form className="RegistrarPersonal__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarPersonal__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarPersonal__cuerpo-titulo">
                    <h1>Personal</h1>
                </div>
                <div className="RegistrarPersonal__cuerpo-contenido">
                    <div className="RegistrarPersonal__registrar">
                        <div className="RegistrarPersonal__registrar-titulo"><h2>Registrar Personal</h2></div>
                            <div className="RegistrarPersonal__Combos">
                                <div className="RegistrarPersonal__fila1">
                                    <TextField
                                        id="outlined-select-currency"
                                        label="Dni"
                                        value={''}
                                        required
                                        style={{width:"40%"}}
                                        helperText=""
                                        name="dni"
                                        onChange={getSelection}
                                        >
                                    </TextField>   
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
                                <div className="RegistrarPersonal__fila2">
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
                                <div className="RegistrarPersonal__fila2">
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
                                <div className="RegistrarPersonal__fila2">
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
                            </div>                        
                    </div>
                    <div className="RegistrarPersonal__tabla">
                        <div className="RegistrarPersonal__fila">
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
                            <button className="button" style={{width:"30%"}}><h5>Agregar</h5></button>   
                        </div>
                        <TablaHuella/>
                    </div>
                </div>
                <div className="RegistrarPersonal__botones">
                    <button className="button" style={{width:"40%"}}><h5>Guardar</h5></button>
                    <button className="button" style={{width:"40%"}}><h5>Cancelar</h5></button>
                </div>
                <div className="RegistrarPersonal__Cerrar"><ion-icon  name="close-circle-outline"></ion-icon></div>
            </form>
        </div>
	);
}
 
export default RegistrarPersonal;
