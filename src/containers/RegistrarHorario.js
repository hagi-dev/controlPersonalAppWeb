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
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';


const RegistrarHorario = () => {
    const data =[
        { name: "Raj ", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohainos", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", school:"madrid" },
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Raj" , email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
    ];
        
    const columns = [
        { title: "Name", field: "name", filterPlaceholder:"ingrese nombre" ,align:"left",
        render: (rowData) => <div style={{display:"flex", justifyContent:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.name}</p></div>},
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone", align: "center"},
        {
          title: "Age", field: "age",
        },
        { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
        { title: "City", field: "city",filterPlaceholder:"filter"},
        { title: "School", field: "school", lookup: { madrid: "madrid", barcelona: "barcelona", london: "london" } ,selectedField:"london"},
      ]
    const tabla={
        title:'Lista de Horarios',
        data: data,
        columnas: columns,
    }
    const configButon = {
        title: 'Guardar',
        ancho: '100%',
        marginTop:'50px'
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
                                <div style={{margin:"0", paddingTop:"2%"}}>
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
                                    width = {'45%'}
                                />
                            </div>
                            <div className="RegistrarHorario__fila1">
                                <Boton configButon={configButon}/>
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarHorario__lista" style={{margin:"0"}}>
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegistrarHorario;