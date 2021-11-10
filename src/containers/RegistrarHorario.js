import React from 'react';
import '../assets/Styles/components/RegistrarHorario.scss';
import ComboBox from '../components/ComboBox';
import { makeStyles } from '@material-ui/styles';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import AddCircle  from '@material-ui/icons/AddCircle';
import '../assets/Styles/components/Tabla.scss'


const RegistrarHorario = () => {
    const configButon = {
        title: 'Guardar',
        ancho: '100%'
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
                    <h1>Horarios</h1>
                </div>
                <div className="RegistrarHorario__cuerpo-contenido">
                    <div className="RegistrarHorario__registrar">
                        <div className="RegistrarHorario__registrar-titulo"><h2>Registrar Horario</h2></div>
                        <div className="RegistrarHorario__Combos">
                            <div className="RegistrarHorario__fila">
                                <ComboBox
                                    text = {"Dirigido"}
                                    todoList = {todoList}
                                    width = {"78%"}
                                />
                                <div style={{margin:"0", paddingTop:"4%"}}>
                                    <IconButton aria-label="Agregar">
                                    <AddCircle fontSize="large" />
                                    </IconButton> 
                                </div>
                            </div>
                            <div className="RegistrarHorario__fila">
                                <ComboBox
                                    text = {"Hora de entrada"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />
                                <ComboBox
                                    text = {"Hora de salida"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />
                            </div>
                            <div className="RegistrarHorario__fila">
                                <ComboBox
                                    text = {"Inicio Receso"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />
                                <ComboBox
                                    text = {"Fin de Receso"}
                                    todoList = {todoList}
                                    width = {'45%'}
                                />
                            </div>
                            <div className="RegistrarHorario__fila">
                                <ComboBox
                                    text = {"Días"}
                                    todoList = {todoList}
                                    width = {'64%'}
                                />
                            </div>
                            <div className="RegistrarHorario__fila1">
                                <Boton configButon={configButon}/>
                            </div>
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
export default RegistrarHorario;