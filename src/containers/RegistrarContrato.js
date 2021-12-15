import React,{useState,useEffect} from 'react' 
import '../assets/Styles/components/RegistrarContrato.scss';
import '../assets/Styles/components/Buton.scss';
import axios from 'axios';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import '../assets/Styles/components/Tabla.scss';
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
    const [valorFecha, setValorFecha] = useState(false);
    const [ultimoContrato,setUltimoContrato]=useState('no hay contratos');
    const [penultimoContrato,setPenultimoContrato]=useState('');
    const[horario,setHorario]=useState([]);
    const [dataHorario, setDataHorario] = useState('');
    const [tipoArea,setTipoArea] = useState([]);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const idHorarios=[];
    const [fechaMinima , setFechaMinima] = useState('');
    const [fechaMax , setFechaMax] = useState('');
    const [dataContrato, setDataContrato] = useState([]); 
    const [estadoModal2, cambiarEstadoModal2] = useState(false);
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [area,setArea] = useState('');
    const [cargo,setCargo] = useState('');
    const [estadoInput,setEstadoInput] = useState(true);
    const [getData,setGetData] = useState({
        id: '',
        fechaInicioContrato: '',
        fechaFinContrato:'',
        dni:'',
        idTipoTrabajador:0,
        idHorarios: [],
        existe: 0
    });

    const estilos={
        
    }
    const getSelection=(e)=>{
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }
    
    const formatearFecha = (fecha1) => {
        const fecha = new Date(fecha1);
        let dia = fecha.getDate();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;}
            
        return anio + '-' + mes + '-' + dia;


    }

    const formatearFechaEspañol = (fecha1) => {
        const fecha = new Date(fecha1);
        let dia = fecha.getDate();
        let anio = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;}
            
        return dia + '-' + mes +'-'+anio;


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
        console.log(getData&&getData.fechaFinContrato);
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
        window.location.href='/contratos';    
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
        })
        });
        
    }

    useEffect(()=>{
        if(valorFecha){
            setFechaMinima(formatearFecha(dataContrato.CON_fecha_out))
            setValorFecha(false);
        }
    },[valorFecha]);

    
    const verId=async(e)=>{
        await axios.post('http://127.0.0.1:3000/api/personal/ids',getData)
            .then(res => {console.log(res.data[0]),
            res.data[0]===undefined? cambiarEstadoModal1(true): 
            setEstadoInput(false)
            alert("exiate jako")})
            .catch(err => {
                console.log(err);
            });

        await fetch(`http://127.0.0.1:3000/api/contrato/validate/fecha/${getData.dni}`)
            .then(response => response.json())
            .then(data=> setDataContrato(data));
        await setValorFecha(true); 
        
        await axios.get(`http://127.0.0.1:3000/api/contrato/${getData.dni}`)
        .then(res => {console.log(res.data[0]),
        setUltimoContrato(`${formatearFechaEspañol(res.data[0].CON_fecha_inn)} al ${formatearFechaEspañol(res.data[0].CON_fecha_out)}`),
        setPenultimoContrato(`${formatearFechaEspañol(res.data[1].CON_fecha_inn)} al ${formatearFechaEspañol(res.data[1].CON_fecha_out)}`)})
        .catch(err => {
            console.log(err);
        });
    }
    
    const getdate1=async (e)=>{
        
        const fecha= await document.getElementById('date');
        console.log(fecha.value);
        const fecha2= document.getElementById('date2');
        const fechaNew= new Date(fecha.value);
        fechaNew.setMonth(fechaNew.getMonth()+6);
        const fechaNew3 = await formatearFecha(fechaNew);
        await setFechaMax(fechaNew3);
        setGetData((prevState)=>({ ...prevState, fechaInicioContrato: fecha.value}));
        setGetData((prevState)=>({ ...prevState, fechaFinContrato: fechaNew3}));
        console.log(fechaNew3);
        fecha2.value=fechaNew3;
    }

    const getdate2=(e)=>{
        const fecha= document.getElementById('date2');
        setGetData((prevState)=>({ ...prevState, fechaFinContrato: fecha.value}));


    }
    const capturarId = (e) => {
        
    }
    return (
        <div className="RegistrarContrato">
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
                                        helperText="primero valida tu dni"
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
                                        id="area"
                                        disabled
                                        select
                                        disabled={estadoInput} 
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
                                        disabled={estadoInput}
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
                                    disabled={estadoInput}
                                    label="fecha de inicio"
                                    type="date"
                                    style={{width:"49%"}}
                                    defaultValue= {getData&&getData.fechaInicioContrato}
                                    InputProps={{inputProps: { min: fechaMinima} }}
                                    onChange={getdate1}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="date2"
                                    disabled={estadoInput}
                                    InputProps={{inputProps: { min: fechaMax} }}
                                    label="fecha de fin"
                                    type="date"
                                    style={{width:"49%"}}
                                    defaultValue=""
                                    onChange={getdate2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </div>                                
                            </div>
                            <div className="RegistrarContrato__fila4" id="fila4" >
                                    <h1>Ultimos contratos</h1>                 
                            </div>
                            <div className="RegistrarContrato__fila4" id="fila4">
                                <div className="RegistrarContrato__fila4" id="fila4">
                                    <h2>1) inicio - termino: </h2>
                                    <h3>{ultimoContrato}</h3>
                                </div>
                                <div className="RegistrarContrato__fila4" id="fila4">
                                    <h2>{penultimoContrato==='' ? '' : '2) inicio - termino'} </h2>
                                    <h3>{penultimoContrato}</h3>
                                </div>                     
                            </div>                            
                    </div>
                    <div className="RegistrarContrato__tabla">
                        <div className="RegistrarContrato__fila">
                            <TextField
                                id="horario"
                                label="horario"
                                select
                                disabled={estadoInput}
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
                            <button disabled={estadoInput} className="button" id="agregarHorario" onClick={agregarTabla} style={{width:"30%"}}>Agregar</button>   
                        </div>
                        <TablaContrato/>
                    </div>
                </div>
                <div className="RegistrarContrato__botones">
                    <button disabled={estadoInput} className="button" onClick={enviarPost} style={{width:"45%"}}>Guardar</button> 
                    {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                    <button className="button" onClick={()=>window.location.href="/contratos"} style={{width:"45%"}}>Cancelar</button> 
                </div> 
                {console.log(getData.fechaFinContrato),console.log(cargo)}
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
