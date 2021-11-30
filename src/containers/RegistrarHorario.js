import React,{useState,useEffect} from 'react';
import '../assets/Styles/components/RegistrarHorario.scss';
import {TextField,MenuItem} from '@material-ui/core';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import AddCircle  from '@material-ui/icons/AddCircle';
import '../assets/Styles/components/Tabla.scss';
import Inputs from '../components/Inputs';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {KeyboardTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';

const RegistrarHorario = () => {
    const dias=[
        {detalle:'L-V',id:'1'},
        {detalle:'Lunes',id:'2'},
        {detalle:'Martes',id:'3'},       
        {detalle:'Miercoles',id:'4'},        
        {detalle:'Jueves',id:'5'},    
        {detalle:'Viernes',id:'6'},
    ]
    const [data, setData ] = useState([]);
    const [valorTipoTrabajador, setValorTipoTrabajador] =useState('');
    const [dias1, setDias1] =useState('');
    const [horaEntrada, setHoraEntrada] = useState(new Date('2014-08-18T08:00:00'));
    const [horaSalida, setHoraSalida] = useState(new Date('2014-08-18T18:00:00'));
    const [inicioReceso, setInicioReceso] = useState(new Date('2014-08-18T12:00:00'));
    const [finReceso, setfinReceso] = useState(new Date('2014-08-18T13:00:00'));
    const [getData , setGetData ] = useState({
        tipoTrabajador: '',
        horaEntrada: horaEntrada.toLocaleTimeString(),
        horaSalida: horaSalida.toLocaleTimeString(),
        inicioReceso:inicioReceso.toLocaleTimeString(),
        finReceso: finReceso.toLocaleTimeString(),
        dias: '',
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
    const prueba = async e => {
        console.log(`este es el evento: ${e}`);
        const {name,value} = e.target;
        setValorTipoTrabajador(e.target.value);
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }
    const prueba2 = async e => {
        await console.log(`este es el evento: ${e}`);
        await setHoraEntrada(e);
        await setGetData((prevState)=>({ ...prevState, ['horaEntrada']: e.toLocaleTimeString()}));  
    }
    const prueba3 = async e => {
        await console.log(`este es el evento: ${e}`);
        await setHoraSalida(e);
        await setGetData((prevState)=>({ ...prevState, ['horaSalida']: e.toLocaleTimeString()}));  
    }
    const prueba4 = async e => {
        await console.log(`este es el evento: ${e}`);
        await setInicioReceso(e);
        await setGetData((prevState)=>({ ...prevState, ['inicioReceso']: e.toLocaleTimeString()}));  
    }
    const prueba5 = async e => {
        await console.log(`este es el evento: ${e}`);
        await setfinReceso(e);
        await setGetData((prevState)=>({ ...prevState, ['finReceso']: e.toLocaleTimeString()}));  
    }
    const prueba6 = async e => {
        setDias1(e.target.value);
        setGetData((prevState)=>({ ...prevState, ['dias']: e.target.value}));  
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
                            <MuiPickersUtilsProvider style={{width:'100%'}} utils={DateFnsUtils} >
                                <KeyboardTimePicker
                                    name="horaEntrada"
                                    margin="normal"
                                    id="time-picker"
                                    label="Hora de Entrada"
                                    style={{width:'48%'}}
                                    value={horaEntrada}
                                    onChange={prueba2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                                <KeyboardTimePicker
                                    name="horaSalida"
                                    margin="normal"
                                    style={{width:'48%'}}
                                    id="time-picker"
                                    label="Hora de Salida"
                                    value={horaSalida}
                                    onChange={prueba3}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            </div>
                            <div className="RegistrarHorario__fila">
                                <MuiPickersUtilsProvider style={{width:'100%'}} utils={DateFnsUtils} >
                                    <KeyboardTimePicker
                                        name="inicioReceso"
                                        margin="normal"
                                        id="time-picker"
                                        label="Inicio Receso"
                                        style={{width:'48%'}}
                                        value={inicioReceso}
                                        onChange={prueba4}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        name="finReceso"
                                        margin="normal"
                                        style={{width:'48%'}}
                                        id="time-picker"
                                        label="Fin Receso"
                                        value={finReceso}
                                        onChange={prueba5}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="RegistrarHorario__fila">
                                <TextField
                                    id="outlined-select"
                                    select
                                    label="día(s)"
                                    value={dias1}
                                    width="100%"
                                    helperText="selecciona por favor los dias de trabajo"
                                    name="dias"
                                    onChange={prueba6}
                                    >
                                    {dias.map((option) => (
                                        <MenuItem key={option.id} value={option.detalle}>
                                        {option.detalle}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="RegistrarHorario__fila1" width='100%'>
                                <button className="button" style={{width:'100%'}} ><h5>Guardar</h5></button>
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