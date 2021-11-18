import React from 'react';
import '../assets/Styles/components/RegistrarTipo.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import Boton from '../components/Buton';
import perfil from '../assets/static/perfil.jpg';

const RegistrarTipo = () => {
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
        render: (rowData) => <div style={{display:"flex", justifyContent:"flex-start",alignItems:"center",}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.name}</p></div>},
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
        title:'Lista de Tipo de Trabajador',
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
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarTipo;