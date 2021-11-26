import React,{useState,useEffect} from 'react' 
import '../assets/Styles/components/RegistrarContrato.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import TablaContrato from '../components/TablaContrato';
import Modal from '../components/Modal';
import RegistrarPersonal from './RegistrarPersonal';
import '../assets/Styles/components/Buton.scss'

const RegistrarContrato = () => {
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const configInput = {
        ancho: '100%',
        title: 'DNI Trabajador',
        type: 'text',
        name: 'Dni',
        anchoContenedor:'50%'
    }
    const configInput2 = {
        ancho: '95%',
        title: 'Fecha de Inicio',
        type: 'date',
        paddingLetf:"0%",
        paddingRight:"0%",
        name: ''
    }
    const configInput3 = {
        ancho: '100%',
        title: 'Fecha de fin',
        paddingLetf:"7%",
        paddingRight:"0%",
        type: 'date',
        name: ''
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
        ancho: '20%',
        marginTop:'0px',
        alto: '30px',
        id:'contrato__agregar'
    }
    const configButon4 = {
        title: 'Agregar',
        ancho: '20%',
        marginTop:'0px',
        alto: '30px',
    }
    const configButon5 = {
        title: 'Cancelar',
        ancho: '20%',
        marginTop:'0px',
        alto: '30px',
        id:'CancelarModal',
    }
    const todoList = [
        { text: '10:00 AM', id:'500'},
        { text: '10:00 AM',id:'1'},
        { text: '10:00 AM', id:'2'},
        { text: '10:00 AM', id:'3'}
      ]
    const prueba = () => {}
    return (
        <div className="RegistrarContrato">
             <div className="RegistrarContrato__menu">
                <Menu/> 
            </div>
            <div className="RegistrarContrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarContrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarContrato__cuerpo-titulo">
                    <h1>Contratos</h1>
                </div>
                <div className="RegistrarContrato__cuerpo-contenido">
                    <div className="RegistrarContrato__registrar">
                        <div className="RegistrarContrato__registrar-titulo"><h2>Registrar Contratos</h2></div>
                            <div className="RegistrarContrato__Combos">
                                <div className="RegistrarContrato__fila1">
                                    <Inputs
                                        configInput={configInput}
                                    />
                                    <div>
                                        <IconButton onClick={() => cambiarEstadoModal1(!estadoModal1)} aria-label="Agregar">
                                            <SearchIcon fontSize="large" />
                                        </IconButton> 
                                    </div>
                                </div> 
                                <div className="RegistrarContrato__fila2">
                                    <ComboBox
                                        text = {"Area"}
                                        todoList = {todoList}
                                        width = {'45%'}
                                    />
                                    <ComboBox
                                        text = {"Cargo"}
                                        todoList = {todoList}
                                        width = {'45%'}
                                    />     
                                </div>  
                                <div className="RegistrarContrato__fila3" >
                                    <Inputs
                                        configInput={configInput2}
                                    /> 
                                    <Inputs
                                        configInput={configInput3}
                                    />
                                </div>                                
                            </div>                        
                    </div>
                    <div className="RegistrarContrato__tabla">
                        <div className="RegistrarContrato__fila">
                            <ComboBox
                                text = {"Horario"}
                                todoList = {todoList}
                                width = {'70%'}
                            />   
                            <Boton configButon={configButon2}/>   
                        </div>
                        <TablaContrato/>
                    </div>
                </div>
                <div className="RegistrarContrato__botones">
                    <Boton configButon={configButon}/> 
                    <Boton configButon={configButon3}/> 
                </div> 
            </div>
            <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} alto='200px' ancho='400px'>
                <h1 className="h1">¿ La persona no esta registrado desea registrarlo?</h1>
                <div style={{width:"100%",height:"40px",display:"flex",justifyContent:"space-around"}}>
                    <button className="button" style={{width:"30%",height:"30px"}}><h5>Registrar</h5></button>
                    <button className="button" onClick={() => cambiarEstadoModal1(!estadoModal1)} style={{width:"30%",height:"30px"}}><h5>Cancelar</h5></button>
                </div>
            </Modal>
            {/* <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}  alto='100%' ancho='90%'>
                <RegistrarPersonal/>
            </Modal> */}
        </div>
    )
}

export default RegistrarContrato