import React from 'react' 
import '../assets/Styles/components/RegistrarPermiso.scss';
import ComboBox from '../components/ComboBox';
import { makeStyles } from '@material-ui/styles';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss'

const RegistrarPermiso = () => {
    const configInput = {
        ancho: '90%',
        title: 'Trabajador',
        type: 'text'
    }
    const configInput2 = {
        ancho: '90%',
        title: 'Fecha de Inicio',
        type: 'date'
    }
    const configButon = {
        title: 'Guardar',
        ancho: '90%'
    }
    const todoList = [
        { text: '10:00 AM', id:'500'},
        { text: '10:00 AM',id:'1'},
        { text: '10:00 AM', id:'2'},
        { text: '10:00 AM', id:'3'}
      ]
    return (
        <div className="RegistrarHorario">
             <div className="RegistrarHorario__menu">
                <Menu/> 
            </div>
            <div className="RegistrarHorario__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarHorario__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarHorario__cuerpo-titulo">
                    <h1>Permisos</h1>
                </div>
                <div className="RegistrarHorario__cuerpo-contenido">
                    <div className="RegistrarHorario__registrar">
                        <div className="RegistrarHorario__registrar-titulo"><h2>Registrar Permisos</h2></div>
                        <div className="RegistrarHorario__Combos">
                            <div className="RegistrarHorario__fila">
                                <Inputs
                                    configInput={configInput}
                                />
                                <div style={{ paddingTop:"4%"}}>
                                    <IconButton aria-label="Agregar">
                                        <SearchIcon fontSize="large" />
                                    </IconButton> 
                                </div>
                            </div> 
                            <ComboBox
                                text = {"Motivo"}
                                todoList = {todoList}
                                width = {'90%'}
                            />   
                            <Inputs
                                configInput={configInput2}
                            /> 
                            <ComboBox
                                text = {"Motivo"}
                                todoList = {todoList}
                                width = {'90%'}
                            />  
                            <Boton configButon={configButon}/> 
                        </div>                        
                    </div>
                    <div className="RegistrarHorario__lista" style={{margin:"0"}}>
                        <Tabla/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarPermiso
