import React,{useState,useEffect} from 'react' 
import '../assets/Styles/components/RegistrarContrato.scss';
import '../assets/Styles/components/Buton.scss';
import ComboBox from '../components/ComboBox';
import axios from 'axios';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import Boton from '../components/Buton';
import Inputs from '../components/Inputs';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import TablaContrato from '../components/TablaContrato';
import Modal2 from '../components/Modal2';
import Modal3 from '../components/Modal2';
import RegistrarPersonal from './RegistrarPersonal';
import '../assets/Styles/components/Buton.scss';
import {TextField,MenuItem} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {KeyboardDatePicker ,MuiPickersUtilsProvider} from '@material-ui/pickers';
import { DragHandle } from '@material-ui/icons';

const RegistrarContrato = () => {
    const [tipoCargo, setTipoCargo] = useState([]);
    const [dataPersonal, setDataPersonal] = useState([]);
    const[horario,setHorario]=useState([]);
    const [dataHorario, setDataHorario] = useState('');
    const [tipoArea,setTipoArea] = useState([]);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const idHorarios=[];
    const [estadoModal2, cambiarEstadoModal2] = useState(false);
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [area,setArea] = useState('');
    const [cargo,setCargo] = useState('');
    const [dni,setDni] = useState('');
    const [getData,setGetData] = useState({
        id: '',
        fechaInicioContrato:'',
        fechaFinContrato:'',
        dni:'',
        idTipoTrabajador:0,
        idHorarios: [],
        existe: 0
        
    });
    const getSelection=(e)=>{
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }

    useEffect(  async() => {
        fetch('http://127.0.0.1:3000/api/tipoTrabajador/lista/area')
        .then(response => response.json())
        .then(data=> setTipoArea(data));

        fetch('http://127.0.0.1:3000/api/tipoTrabajador/lista/cargo')
        .then(response => response.json())
        .then(data=> setTipoCargo(data));

        fetch('http://127.0.0.1:3000/api/horario')
        .then(response => response.json())
        .then(data=> setHorario(data[0]));
    },[]);

    const enviarPost = async () => {
        await setGetData((prevState)=>({ ...prevState, idTipoTrabajador: cargo}));
        const tabla= await document.getElementById('tabla-contrato');
        const valor=await tabla.rows.length;
        
        for (let index = 1; index < valor; index++) {
            idHorarios.push(tabla.rows[index].cells[0].innerHTML);
        }
        await setGetData((prevState)=>({ ...prevState, idHorarios: idHorarios}));
        await console.log(getData);
        cambiarEstadoModal2(true);

    }

    const enviarPost2 = async () => {
        console.log(getData);
        cambiarEstadoModal2(false);
        await axios.post('http://127.0.0.1:3000/api/contrato/registrar',getData)
                    .then(res => {
                        setRespuesta(res.data);})
                    .catch(err => {
                        console.log(err);
                    });
    }

    const agregarTabla = () => {
        fetch(`http://127.0.0.1:3000/api/horario/${dataHorario}`)
        .then(response => response.json())
        .then(data=> {
            const tabla= document.getElementById('tabla-contrato');
            const fila = tabla.insertRow(-1);
            const celda1 = fila.insertCell(0);
            celda1.textContent = dataHorario;
            const celda2 = fila.insertCell(1);
            celda2.textContent = data[0].detalle;
            const celda3 = fila.insertCell(2);
            celda3.textContent = `${data[0].entrada} - ${data[0].salida}`;
            const celda4 = fila.insertCell(3);
            celda4.textContent = `${data[0].inicioReceso} - ${data[0].finReceso}`;
            const celda5 = fila.insertCell(4);
            let vDellBtn = document.createElement("button");
            vDellBtn.textContent = "Eliminar";
            celda5.appendChild(vDellBtn);

            vDellBtn.addEventListener("click", (e) =>{

                let transactionRow = e.target.parentNode.parentNode;
                transactionRow.remove();
                fDellIDLocalStor(transactionID);
        })
        });
        
    }
    
    const verId=async(e)=>{
        await axios.post('http://127.0.0.1:3000/api/personal/ids',getData)
                    .then(res => {console.log(res.data[0]),setDataPersonal(res.data[0])
                    ,res.data[0]===undefined? cambiarEstadoModal1(true): alert("si funca jako")})
                    .catch(err => {
                        console.log(err);
                    });


    }

    const traendoidPersonal = async (e) => {
        await setDni(e.target.value);
        
    }
    
    const getdate1=(e)=>{
        const fecha= document.getElementById('date');
        setGetData((prevState)=>({ ...prevState, fechaInicioContrato: fecha.value}));
    }

    const getdate2=(e)=>{
        const fecha= document.getElementById('date2');
        setGetData((prevState)=>({ ...prevState, fechaFinContrato: fecha.value}));

    }
    const capturarId = (e) => {
        
    }
    return (
        <div className="RegistrarContrato">
            {}
             <div className="RegistrarContrato__menu">
                <Menu/> 
            </div>
            <div className="RegistrarContrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="RegistrarContrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="RegistrarContrato__cuerpo-titulo">
                    <h1>Contratos</h1>
                </div>
                <div className="RegistrarContrato__cuerpo-contenido">
                    <div className="RegistrarContrato__registrar">
                        <div className="RegistrarContrato__registrar-titulo"><h2>Registrar Contratos</h2></div>
                            <div className="RegistrarContrato__Combos">
                                <div className="RegistrarContrato__fila1">
                                    <TextField
                                        id="outlined-select-currency"
                                        label="Dni:"
                                        type='number'
                                        value={getData&&getData.dni}
                                        required
                                        style={{width:"49%"}}
                                        helperText=""
                                        onChange={getSelection}
                                        name="dni">
                                    </TextField>
                                    <div>
                                        <IconButton onClick={verId} aria-label="Agregar">
                                            <SearchIcon fontSize="large" />
                                        </IconButton> 
                                    </div>
                                </div> 
                                <div className="RegistrarContrato__fila2">
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Area:"
                                        value={area}
                                        required
                                        style={{width:"49%"}}
                                        helperText=""
                                        onChange={(e) => setArea(e.target.value)}
                                        name="area"
                                        >
                                        {tipoArea.map((option) => (
                                        <MenuItem key={option.id} value={option.area}>
                                        {option.area}
                                        </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="tipoCargo"
                                        label="cargo"
                                        select
                                        value={cargo}
                                        required
                                        style={{width:"49%"}}
                                        helperText=""
                                        onChange={(e) => setCargo(e.target.value)}
                                        name="idTipoTrabajador"
                                        >
                                        {
                                        tipoCargo.map((option) =>{                                       
                                            if(area === option.area){
                                                return(
                                                    <MenuItem key={option.id} value={option.id}>
                                                    {option.cargo}
                                                    </MenuItem>
                                                )
                                            }
                                            
                                        })
                                        }
                                    </TextField>    
                                </div>  
                                <div className="RegistrarContrato__fila3" >
                                    <TextField
                                    id="date"
                                    label="fecha de inicio"
                                    type="date"
                                    style={{width:"49%"}}
                                    defaultValue="2017-05-24"
                                    onChange={getdate1}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="date2"
                                    label="fecha de fin"
                                    type="date"
                                    style={{width:"49%"}}
                                    defaultValue="2017-05-24"
                                    onChange={getdate2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </div>                                
                            </div>                        
                    </div>
                    <div className="RegistrarContrato__tabla">
                        <div className="RegistrarContrato__fila">
                            <TextField
                                id="outlined-select-currency"
                                label="horario"
                                select
                                value={dataHorario}
                                required
                                style={{width:"60%"}}
                                helperText=""
                                name="horario"
                                onChange={(e) => {setDataHorario(e.target.value),capturarId(e.target.value)}}
                                >
                                    
                                {
                                    console.log(horario.value),
                                horario.map((option) =>(                                       

                                    <MenuItem key={option.id} value={option.id}>
                                        <p>{option.detalle} {option.horaEntrada} -{option.horaSalida} </p>
                                    </MenuItem>
                                    
                                ))
                                }
                            </TextField>    
                            <button className="button" onClick={agregarTabla} style={{width:"30%"}}>Agregar</button>   
                        </div>
                        <TablaContrato/>
                    </div>
                </div>
                <div className="RegistrarContrato__botones">
                    <button className="button" onClick={enviarPost} style={{width:"45%"}}>Guardar</button> 
                    {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                    <button className="button" style={{width:"45%"}}>Cancelar</button> 
                </div> 
                {console.log(getData.existe),console.log(cargo)}
            </div>
            
            <Modal2 estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} alto='200px' ancho='400px'>
                <h1 style={{textAlign:"center"}} className="h1">No existe el personal</h1>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button'onClick={()=>window.location.href="/registrar%20personal"} className="button"  style={{width:"30%",height:"30px"}}><h5>ir a registrar</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal1(!estadoModal1)} style={{width:"30%",height:"30px"}}><h5>Cancelar</h5></button>
                </div>   
            </Modal2>
            <Modal3 estado={estadoModal2} cambiarEstado={cambiarEstadoModal2} alto='200px' ancho='400px'>
                <h1 style={{textAlign:"center"}} className="h1">estas seguro de guardar los datos</h1>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button'onClick={enviarPost2} className="button"  style={{width:"30%",height:"30px"}}><h5>si</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal2(!estadoModal2)} style={{width:"30%",height:"30px"}}><h5>no</h5></button>
                </div>   
            </Modal3> 
        </div>
    )
}

export default RegistrarContrato
