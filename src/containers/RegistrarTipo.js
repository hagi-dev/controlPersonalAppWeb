import React from 'react';
import '../assets/Styles/components/RegistrarTipo.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import Boton from '../components/Buton';

const RegistrarTipo = () => {
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
        <div className="RegistrarTipo">
             <div className="RegistrarTipo__menu">
                <Menu/> 
            </div>
            <div className="RegistrarTipo__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarTipo__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarTipo__cuerpo-titulo">
                    <h1>Tipo Trabajador</h1>
                </div>
                <div className="RegistrarTipo__cuerpo-contenido">
                    <div className="RegistrarTipo__registrar">
                        <div className="RegistrarTipo__registrar-titulo"><h2>Registrar Tipo Trabajador</h2></div>
                        <div className="RegistrarTipo__Combos">
                            <div className="RegistrarTipo__fila">
                                <ComboBox
                                    text = {"Area:"}
                                    todoList = {todoList}
                                    width = {"100%"}
                                />
                            </div>
                            <div className="RegistrarTipo__fila">
                                <ComboBox
                                    text = {"Cargo"}
                                    todoList = {todoList}
                                    width = {'100%'}
                                />
                            </div>
                            <div className="RegistrarTipo__fila1">
                                <Boton configButon={configButon}/>
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarTipo__lista" style={{margin:"0"}}>
                        <Tabla/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarTipo;