import React from 'react'
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';  
import Tabla_Personal from '../components/Tabla_Personal'; 
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import ComboBox from '../components/ComboBox';
import Buton from '../components/Buton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: { 
       position: "absolute", 
       bottom: 0 , 
       marginBottom:9,
       width: "66%"
    },
  });

const Asistencias = () => {
  const classes = useStyles();
    const configInput = {
        ancho: '300px',
        title: 'DNI / NOMBRES',
        type: 'text'
    } 
    const configButon1 = {
        title: 'Registrar Nuevo',
        ancho: '90%'
    }
    const configButon2 = {
        title: 'Ver Contratos',
        ancho: '90%'
    }
    const configButon3 = {
        title: 'Buscar',
        ancho: '90%', 
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

                <div className="RegistrarHorario__cuerpo-titulo" style={{width:"100%", display:'flex', justifyContent:"space-between", padding: "0 10vw"}}> 
                    <div style={{width: "30%", height: "24vh", margin: "-21px 0 0 -60px" , width:"60vw"}}> 
                        <h2 style={{marginBottom:"6px"}}>Personal</h2>
                        
     
                        <div style={{display: "flex", alignItems: "flex-end", justifyContent:"space-around", height: "14vh"}}>
                            <Inputs
                                    configInput={configInput}
                                    />
                            
                            <ComboBox
                                     
                                    text = {"Motivo"}
                                    todoList = {todoList}
                                    width = {'300px'}
                                    />  
                        </div>
                    </div>

                    <div style={{width: "30%", height: "24vh" }}> 
                        <Buton configButon={configButon1}/> 
                        <Buton configButon={configButon2}/> 
                        <Buton configButon={configButon3}/> 
                    </div>
                </div> 
                    
                <div  style={{width: "100%", height: "87%", display: 'flex', justifyContent:'center'}}>
                    <div className={classes.root}>
                        <Tabla_Personal/>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export {Asistencias}