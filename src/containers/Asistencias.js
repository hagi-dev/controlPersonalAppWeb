import React from 'react'
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';  
import Tabla from '../components/Tabla'; 
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import ComboBox from '../components/ComboBox';
import Buton from '../components/Buton';
import { makeStyles } from '@material-ui/core/styles';
import perfil from '../assets/static/perfil.jpg';



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
    { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
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
                        <Tabla tabla={tabla}/>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export {Asistencias}