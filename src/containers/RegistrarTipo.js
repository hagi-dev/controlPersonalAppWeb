import React, {useState,useEffect} from 'react';
import '../assets/Styles/components/RegistrarTipo.scss';
import ComboBox from '../components/ComboBox';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import Boton from '../components/Buton';
import perfil from '../assets/static/perfil.jpg';
import {TextField,MenuItem} from '@material-ui/core';

const RegistrarTipo = () => {
    const [area, setArea] = useState('');
    const[cargo, setCargo] = useState('');
    const [respuesta, setRespuesta] = useState([]);
    const [getData , setGetData ] = useState({
        area: '',
        cargo:'',
    });
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
    const areas = [
        { nombre: 'Almacen', id:0},
        { nombre: 'Ventas',id:1},
        { nombre: 'Marketing y diseño', id:2}
      ]
    const cargosAlmacen = [
        { nombre: 'supervisor', id:'0'},
        { nombre: 'personal',id:'1'}
    ]
    const cargosVentas = [
        { nombre: 'asesor de ventas', id:'0'},
        { nombre: 'supervisor',id:'1'},
        { nombre: 'cajero',id:'2'}
    ]
    const cargosDyM = [
        { nombre: 'Marketero', id:'0'},
        { nombre: 'Diseñador grafico',id:'1'},
        { nombre: 'Community Manager',id:'2'}
    ]
    const setAddSelection1 = (e) => {
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setArea(e.target.value);
        setGetData((prevState)=>({ ...prevState, [name]: value}));  

    }
    const setAddSelection2 = (e) => {
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setCargo(e.target.value);
        setGetData((prevState)=>({ ...prevState, [name]: value}));  

    }
    const enviarPost = async() => {
            await fetch('http://127.0.0.1:3000/api/TipoTrabajador/registrar',{
                method:'POST',
                body: JSON.stringify(getData),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response => response.json())
            .then(data=>setRespuesta(data)).catch(err=>console.log('hubo un error: ',err)); 
            await console.log(respuesta);
    }
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
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Area"
                                    value={area}
                                    style={{width:"200%"}}
                                    helperText="Please select your currency"
                                    name="area"
                                    onChange={setAddSelection1}
                                    >
                                    {areas.map((option) => (
                                        <MenuItem key={option.id} value={option.nombre}>
                                        {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="RegistrarTipo__fila">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Cargo"
                                    value={cargo}
                                    style={{width:"200%"}}
                                    helperText="Please select your currency"
                                    name="cargo"
                                    onChange={setAddSelection2}
                                    >
                                    {area==="Almacen"?cargosAlmacen.map((option1) => (
                                        <MenuItem key={option1.id} value={option1.nombre}>
                                        {option1.nombre}
                                        </MenuItem>
                                    )) : area==="Ventas"?cargosVentas.map((option2) =>  (
                                        <MenuItem key={option2.id} value={option2.nombre}>
                                        {option2.nombre}
                                        </MenuItem>
                                    )):cargosDyM.map((option3) =>   (
                                        <MenuItem key={option3.id} value={option3.nombre}>
                                        {option3.nombre}
                                        </MenuItem>
                                    )) }
                                </TextField>
                            </div>
                            <div className="RegistrarTipo__fila1">
                                <button className="button" onClick={enviarPost} style={{width:"100%"}}><h5>Guardar</h5></button>
                                <h5>{respuesta.status}</h5>        
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarTipo__lista" style={{margin:"0"}}>
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
            {console.log(getData)}
        </div>
    )
}

export default RegistrarTipo;