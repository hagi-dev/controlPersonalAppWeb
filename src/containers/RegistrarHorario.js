import React,{useState,useEffect} from 'react';
import '../assets/Styles/components/RegistrarHorario.scss';
import ComboBox from '../components/ComboBox';
import { makeStyles } from '@material-ui/styles';
import {TextField,MenuItem} from '@material-ui/core';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import AddCircle  from '@material-ui/icons/AddCircle';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import Inputs from '../components/Inputs';
import TimePicker from '@mui/lab/TimePicker';

const usesStyles = makeStyles((theme)=>({
    inputMaterial:{
        width:'90%',
    }
}));
const RegistrarHorario = () => {
    const styles=usesStyles();
    const [data, setData ] = useState([]);
    const [valorTipoTrabajador, setValorTipoTrabajador] =useState('');
    const [horaEntrada, setHoraEntrada] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [getData , setGetData ] = useState({
        tipoTrabajador: '',
        horaEntrada: '',
        horaSalida: '',
        inicioReceso: '',
        finReceso: '',
    });
    const [data2, setData2 ] = useState([]);
    const hoy = new Date();
    const formatearFecha = (fecha) => {
        let fecha1= new Date(fecha);
        let dia = fecha1.getDate();
        let mes = fecha1.getMonth() + 1;
        let anio = fecha1.getFullYear();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        return anio + '/' + mes + '/' + dia;
    }

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/horario')
        .then(response => response.json())
        .then(data=> setData(data));

        fetch('http://127.0.0.1:3000/api/tipoTrabajador')
        .then(response => response.json())
        .then(data=> setData2(data[0]));
    },[]);
        
        
    const columns = [
        { title: "Dirigido", field: "dirigido", filterPlaceholder:"ingrese nombre" ,align:"left",width:'150px',},
        { title: "Dias", field: "detalle" ,align:"left"},
        { title: "Horario", field: "horaEntrada",width:'250px',
        render: (rowData) => <p>{`${rowData.horaEntrada} AM-${rowData.horaSalida} PM`}</p>},
        { title: "Receso", field: "inicioReceso",width:'250px',
        render: (rowData) => <p>{`${rowData.inicioReceso} PM-${rowData.finReceso} PM`}</p>},
      ]
    const tabla={
        title:'Lista de Horarios',
        data: data[0],
        columnas: columns,
    } 
    const configButon = {
        title: 'Guardar',
        ancho: '100%',
        marginTop:'50px'
    }
    const configInput = {
        ancho: '95%',
        title: 'Hora entrada',
        type: 'time',
        name: 'horaEntrada',
        paddingLetf:"0%",
        paddingRight:"0%",
    }
    const configInput2 = {
        ancho: '100%',
        title: 'Hora Salida',
        type: 'time',
        name: 'horaSalida',
        paddingLetf:"9%",
        paddingRight:"0%",
    }
    const configInput3 = {
        ancho: '95%',
        title: 'Inicio Receso',
        type: 'time',
        name: 'inicioReceso',
        paddingLetf:"0%",
        paddingRight:"0%",
    }
    const configInput4 = {
        ancho: '100%',
        title: 'fin Receso',
        type: 'time',
        name: 'finReceso',
        paddingLetf:"9%",
        paddingRight:"0%",
    }
    const prueba = e => {
        const {name,value} = e.target;
        setValorTipoTrabajador(e.target.value);
        setHoraEntrada(e.target.value); 
        setHoraSalida(e.target.value);
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }
    return (
        <div className="RegistrarHorario">
            {console.log(data[0])}
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
                                <TextField
                                id="outlined-select-currency"
                                select
                                label="Dirigido"
                                value={valorTipoTrabajador}
                                width="78%"
                                helperText="Please select your currency"
                                name="tipoTrabajador"
                                onChange={prueba}
                                >
                                {data2.map((option) => (
                                    <MenuItem key={option.id} value={option.nombre}>
                                    {option.nombre}
                                    </MenuItem>
                                ))}
                                </TextField>
                                <div style={{margin:"0", paddingTop:"2%"}}>
                                    <IconButton aria-label="Agregar">
                                    <AddCircle fontSize="large" />
                                    </IconButton> 
                                </div>
                            </div>
                            <div className="RegistrarHorario__fila">
                            <TimePicker
                                label="Hora Entrada"
                                name="horaEntrada"
                                value={horaEntrada}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Hora Salida"
                                name="horaSalida"
                                value={horaSalida}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </div>
                            <div className="RegistrarHorario__fila">
                                <Inputs
                                    configInputs={configInput3}
                                />
                                <Inputs
                                    configInputs={configInput4}
                                />
                            </div>
                            {/* <div className="RegistrarHorario__fila">
                                <ComboBox
                                    text = {"Días"}
 
                                    width = {'45%'}
                                /> 
                            </div> */}
                            <div className="RegistrarHorario__fila1">
                                <button className="button" onClick={prueba}><h5>Guardar</h5></button>
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarHorario__lista" style={{margin:"0"}}>
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
            {console.log(getData)}
        </div>
    )
}
export default RegistrarHorario;