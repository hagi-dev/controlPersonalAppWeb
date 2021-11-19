import React,{useState} from 'react' ;
import '../assets/Styles/components/RegistrarPersonal.scss';
import ComboBox from '../components/ComboBox';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import TablaHuella from '../components/TablaHuellas';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';

const RegistrarPersonal = () => {
    const configInput = {
        ancho: '95%',
        title: 'DNI',
        type: 'text',
        name: 'Dni',
        paddingLetf:"0%",
        paddingRight:"0%",
    }
    const configInput2 = {
        ancho: '100%',
        title: 'Nombre',
        type: 'text',
        name: 'Nombre',
        paddingLetf:"9%",
        paddingRight:"0%",
    }
    const configInput3 = {
        ancho: '100%',
        title: 'Apellidos',
        type: 'text',
        name: 'apellidos',
        paddingLetf:"12%",
        paddingRight:"0%",
    }
    const configInput4 = {
        ancho: '95%',
        title: 'Fecha de Nacimiento',
        type: 'date',
        name: 'fechaNacimiento',
        paddingLetf:"0%",
        paddingRight:"0%",
    }
    const configInput5 = {
        ancho: '100%',
        title: 'Subir Foto',
        border:"0px",
        padding:"0",
        name: 'foto',
        type: 'file',
        paddingLetf:"9%",
        paddingRight:"0%",
    }
    const configInput6 = {
        ancho: '46%',
        title: 'Telefono',
        type: 'number',
        name: 'telefono',
    }
    const configButon = {
        title: 'Guardar',
        ancho: '45%',
        marginTop:'50px',
        id:'contrato__guardar'
    }
    const configButon3 = {
        title: 'Cancelar',
        ancho: '45%',
        marginTop:'50px',
        id:'contrato__cancelar'
    }
    const configButon2 = {
        title: 'Agregar',
        ancho: '30%',
        marginTop:'0px',
        alto: '30px',
        id:'contrato__agregar'
    }
    const todoList = [
        { text: '10:00 AM', id:'500'},
        { text: '10:00 AM',id:'1'},
        { text: '10:00 AM', id:'2'},
        { text: '10:00 AM', id:'3'}
      ]

	return (
		<div className="RegistrarContrato">
             <div className="RegistrarContrato__menu">
                <Menu/> 
            </div>
            <form className="RegistrarContrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarContrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarContrato__cuerpo-titulo">
                    <h1>Personal</h1>
                </div>
                <div className="RegistrarPersonal__cuerpo-contenido">
                    <div className="RegistrarPersonal__registrar">
                        <div className="RegistrarPersonal__registrar-titulo"><h2>Registrar Personal</h2></div>
                            <div className="RegistrarPersonal__Combos">
                                <div className="RegistrarPersonal__fila1">
                                    <Inputs
                                        configInput={configInput}
                                    />
                                    <Inputs
                                        configInput={configInput2}
                                    />
                                </div> 
                                <div className="RegistrarPersonal__fila2">
                                    <ComboBox
                                        text = {"Genero"}
                                        todoList = {todoList}
                                        width = {'45%'}
                                    />    
                                    <Inputs
                                        configInput={configInput3}
                                    /> 
                                </div>  
                                <div className="RegistrarPersonal__fila2">
                                    <Inputs
                                            configInput={configInput4}
                                    />
                                    <Inputs
                                        configInput={configInput5}
                                    />
                                </div> 
                                <div className="RegistrarPersonal__fila2">
                                    <Inputs
                                                configInput={configInput6}
                                        />
                                </div>                               
                            </div>                        
                    </div>
                    <div className="RegistrarPersonal__tabla">
                        <div className="RegistrarPersonal__fila">
                            <ComboBox
                                text = {"Horario"}
                                todoList = {todoList}
                                width = {'60%'}
                            />   
                            <Boton configButon={configButon2}/>   
                        </div>
                        <TablaHuella/>
                    </div>
                </div>
                <div className="RegistrarPersonal__botones">
                    <Boton configButon={configButon}/> 
                    <Boton configButon={configButon3}/> 
                </div>
                <div className="RegistrarPersonal__Cerrar"><ion-icon  name="close-circle-outline"></ion-icon></div>
            </form>
        </div>
	);
}
 
export default RegistrarPersonal;
