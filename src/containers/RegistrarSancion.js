import React from 'react' 
import '../assets/Styles/components/RegistrarSancion.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Nivel from '../components/Nivel';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';


const RegistrarSancion = () => {
    const data =[
        { name: "Raj ", email: "Raj@g", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohainos", email: "mohan@g", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@g", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@g", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Neha", email: "neha@g", phone: 7845621301, age: 25, gender: "F", city: "Patna", school:"madrid" },
        { name: "Mohan", email: "mohan@g", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@g", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@g", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Raj" , email: "Raj@g", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohan", email: "mohan@g", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@g", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@g", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
    ];
        
    const columns = [
        { title: "Name", field: "name", filterPlaceholder:"ingrese nombre" ,align:"left",
        render: (rowData) => <div style={{display:"flex", justifyContent:"flex-start",alignItems:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.name}</p></div>},
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone", align: "center"},
        {
          title: "Age", field: "age", width: "100px",
        },
        { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
        { title: "City", field: "city",filterPlaceholder:"filter"},
        { title: "School", field: "school", lookup: { madrid: "madrid", barcelona: "barcelona", london: "london" } ,selectedField:"london"},
      ]
    const tabla={
        title:'Lista de Sancions',
        data: data,
        columnas: columns,
    }
    const configInput = {
        ancho: '100%',
        title: 'Trabajador',
        type: 'text'
    }
    const configInput2 = {
        ancho: '100%',
        title: 'Fecha de Inicio',
        type: 'date',
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
        <div className="RegistrarSancion">
             <div className="RegistrarSancion__menu">
                <Menu/> 
            </div>
            <div className="RegistrarSancion__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarSancion__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarSancion__cuerpo-titulo">
                    <h1>Sancions</h1>
                </div>
                <div className="RegistrarSancion__cuerpo-contenido">
                    <div className="RegistrarSancion__registrar">
                        <div className="RegistrarSancion__registrar-titulo"><h2>Registrar Sancions</h2></div>
                        <div className="RegistrarSancion__Combos">
                            <div className="RegistrarSancion__fila1">
                                <Inputs
                                    configInput={configInput}
                                />
                                <div>
                                    <IconButton aria-label="Agregar">
                                        <SearchIcon fontSize="large" />
                                    </IconButton> 
                                </div>
                            </div> 
                            <div className="RegistrarSancion__fila">
                                <ComboBox
                                    text = {"Motivo"}
                                    todoList = {todoList}
                                    width = {'100%'}
                                />     
                            </div>  
                            <div className="RegistrarSancion__fila">
                                <Nivel config={""}/>
                            </div> 
                            <Boton configButon={configButon}/> 
                        </div>                        
                    </div> 
                    <div className="RegistrarSancion__lista" style={{margin:"0"}}>
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarSancion;
