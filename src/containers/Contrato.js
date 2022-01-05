import React,{useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/Contrato.scss';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
import Tabla from '../components/Tabla';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Modal4 from '../components/Modal2';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Modal3 from '../components/Modal2';
import Modal from '../components/Modal';
import exportData from '../helpers/exportData';
import TablaContrato from '../components/TablaContrato';
import validar from '../helpers/validador';
import axios from 'axios';
import { async } from 'validate.js';
import {TextField,MenuItem} from '@material-ui/core';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const Contrato = () => {
    const [data, setData ] = useState([]);
    const [tipoCargo, setTipoCargo] = useState([]);
    const [dataHorario, setDataHorario] = useState('');
    const idHorarios = [];
    const [numeroContrato, setNumeroContrato] = useState('');
    const [nombrePersonal, setNombrePersonal] = useState('');
    const [tipoArea,setTipoArea] = useState([]);
    const [estadoModal3, cambiarEstadoModal3] = useState(false);
    const [estadoModal2, cambiarEstadoModal2] = useState(false);
    const [idseleccionado, setIdSeleccionado] = useState(-1);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const hoy = new Date();
    const [fechaMinima , setFechaMinima] = useState('');
    const [fechaMax , setFechaMax] = useState('');
    const [filtro, setFiltro] = React.useState(0);
    const [area,setArea] = useState('');
    const[horario,setHorario]=useState([]);
    const [cargo,setCargo] = useState('');
    const [getData,setGetData] = useState({
        id: '',
        fechaInicioContrato: '',
        fechaFinContrato:'',
        dni:'',
        idTipoTrabajador:0,
        idHorarios:idHorarios ,
        estado:'1',
        existe: 0
    });
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
        return anio + '-' + mes + '-' + dia;
    }

    const formatearFechaEspañol = (fecha) => {
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
        return dia + '/' + mes + '/' + anio;
    }

    useEffect(() => {
        axios.get('/contratos')
        .then(res => {
            setData(res.data)})
        .catch(err => {
            console.log(err);
        });
        
        axios.get('/tipoTrabajador/lista/area')
        .then(res => {
            setTipoArea(res.data)})
        .catch(err => {
            console.log(err);
        });

        axios.get('/tipoTrabajador/lista/cargo')
        .then(res => {
            setTipoCargo(res.data)})
        .catch(err => {
            console.log(err);
        });

        axios.get('/horario')
        .then(res => {
            setHorario(res.data[0])})
        .catch(err => {
            console.log(err);
        });
    },[]);
        
    const columns = [
        { title: "N°", field: "CON_id",align:"left",width: "50px" ,filtering: false},
        { title: "DNI", field: "PER_dni",align:"left",filtering: true},
        { title: "Personal", field: "PER_nombre" ,
        render: (rowData) => <p>{`${rowData.PER_nombre} ${rowData.PER_apaterno}`}</p>},
        { title: "Puesto", field: "TTR_cargo", align: "left"},
        {
          title: "Horario", field: "HOR_entrada",
          render: (rowData) => <p>{`${rowData.HOR_detalle}: ${rowData.HOR_entrada} - ${rowData.HOR_salida}`}</p>,width:'250px',
          lookup: { "L-V": "L-V", "Sabado": "Sabado" }},
        { title: "Incio", field: "CON_fecha_inn",render: (rowData) => <p>{ formatearFechaEspañol(rowData.CON_fecha_inn)}</p>},
        { title: "Finaliza", field: "CON_fecha_out",render: (rowData) => <p>{ formatearFechaEspañol(rowData.CON_fecha_out)}</p>},
        { title: "Estado", field: "CON_estado", lookup: { 0: "finalizado", 1: "vigente", 2: "cancelado" } ,},
      ]
    const deleteCerrar= async(id) => {
        const fecha= new Date();
        const fechaFinContratos= formatearFecha(fecha);
        const datas={
            opcion: 'T',
            fecha:fechaFinContratos

        };
        await cambiarEstadoModal2(!estadoModal2);
        await axios.post(`/contrato/delete/${id}`,datas)
        .then(res => {
            setRespuesta(res.data);})
        .catch(err => {
            console.log(err);
        });
    
        await axios.get('/contratos')
        .then(res => {
            setData(res.data)})
        .catch(err => {
            console.log(err);
        });
        
    }
    const deleteEliminar= async(id) => {
        await cambiarEstadoModal2(!estadoModal2);
        const fecha= new Date();
        const fechaFinContratos= formatearFecha(fecha);
        const datas= await {
            opcion: 'D',
            fecha: fechaFinContratos

        };
        await cambiarEstadoModal2(!estadoModal2);
        await axios.post(`/contrato/delete/${id}`,datas)
        .then(res => {
            setRespuesta(res.data);})
        .catch(err => {
            console.log(err);
        });
        await axios.get('/contratos')
        .then(res => {
            setData(res.data)})
        .catch(err => {
            console.log(err);
        });
    }

    const cambiandoArea = async (e) => {
        await axios.get(`/TipoTrabajador/${e}`)
        .then(res => {
            setArea((res.data[0].area)) 
        })
        .catch(err => {
            console.log(err)}
        );
    }    
    
    const getdate2=(e)=>{
        const fecha= document.getElementById('date2');
        setGetData((prevState)=>({ ...prevState, fechaFinContrato: fecha.value}));


    }

    const getdate1=async (e)=>{
        
        const fecha= await document.getElementById('date');
        const fecha2= document.getElementById('date2');
        const fechaNew= new Date(fecha.value);
        fechaNew.setMonth(fechaNew.getMonth()+6);
        const fechaNew3 = await formatearFecha(fechaNew);
        await setFechaMax(fechaNew3);
        setGetData((prevState)=>({ ...prevState, fechaInicioContrato: fecha.value}));
        setGetData((prevState)=>({ ...prevState, fechaFinContrato: fechaNew3}));
        fecha2.value=fechaNew3;
    }
    const agregarTabla = () => {
        axios.get(`/horario/${dataHorario}`)
        .then(res => {
            setData(res.data)
            const tabla= document.getElementById('tabla-contrato');
            const fila = tabla.insertRow(-1);
            const celda1 = fila.insertCell(0);
            celda1.textContent = dataHorario;
            const celda2 = fila.insertCell(1);
            celda2.textContent = data[0].detalle;
            const celda3 = fila.insertCell(2);
            celda3.textContent = `${res.data[0].entrada} - ${res.data[0].salida}`;
            const celda4 = fila.insertCell(3);
            celda4.textContent = `${res.data[0].inicioReceso} - ${res.data[0].finReceso}`;
            const celda5 = fila.insertCell(4);
            let vDellBtn = document.createElement("button");
            vDellBtn.textContent = "Eliminar";
            celda5.appendChild(vDellBtn);

            vDellBtn.addEventListener("click", (e) =>{

                let transactionRow = e.target.parentNode.parentNode;
                transactionRow.remove();
        })
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    const enviarPut = async () => {
        const tabla= await document.getElementById('tabla-contrato');
        const valor=await tabla.rows.length;
        
        for (let index = 1; index < valor; index++) {
            idHorarios.push(tabla.rows[index].cells[0].innerHTML);
        }
        await setGetData((prevState)=>({ ...prevState, idHorarios: idHorarios, idTipoTrabajador: cargo}));
        cambiarEstadoModal3(!estadoModal3);
        
    }
    const enviarPut2 =async () => {
        console.log("estoa datos se enviara a actualizar",getData);
        console.log(getData.id);
        cambiarEstadoModal1(!estadoModal1);
        cambiarEstadoModal3(!estadoModal3);
        await axios.put(`/contrato/update/${getData.id}`,getData)
        .then(res => {
            setRespuesta(res.data),
            console.log("esta es la respuesta",res);})
        .catch(err => {
            console.log(err);
        }); 
        await axios.get('/contratos')
        .then(res => {  setData(res.data)})
        .catch(err => {
            console.log(err);
        });
        
    }
    return (
        <div className="Contrato">
             <div className="Contrato__menu">
                <Menu/> 
            </div>
            <div className="Contrato__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="Contrato__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="Contrato__cuerpo-titulo">
                    <h1>Contratos</h1>
                </div>
                <div className="Contrato__cuerpo-contenido">
                    <div className="Contrato__lista" style={{margin:"0"}}>
                        <div className="contenedor-tabla" style={{width:"100%", height:"100%",overflow:"auto"}}>
                            <MaterialTable columns={columns} data={data} title="Lista de personal"  icons={tableIcons} style={{background:'transparent'}}
                            // StickyHeader={true}
                            options={{
                                sorting: true,iconsSearch:false,search: false, paging:true,paginghideFilterIcons: true,pageSize:4,
                                rowStyle:{fontFamily:"mulish" ,fontSize:"13px",border: "0px",color:"#4E4D4D",height:"30px" },
                                headerStyle:{position: 'sticky',textAlign:'left', top: "0",color:"#7D0F2E",fontFamily:"mulish",backdropFilter: blur("2px") ,fontSize:"14px",border: "0px",background:"#E9F8F7",fontWeight:"700",zIndex:'9999' },
                                titleStyle:{padding:"0px"},paginationType:"normal",pageSizeOptions:[4,10,20],filtering: false, showFirstLastPageButtons: false,
                                filtering: filtro%2==0 ? false : true,maxBodyHeight: '400px'
                            }}
                            localization={{
                                header: {
                                actions: "",
                                },
                                rows:"fila"
                            }}
                            actions={[
                                {
                                icon: tableIcons.Filter,
                                tooltip: 'filtrar tabla' ,
                                onClick: () => setFiltro(filtro + 1),
                                isFreeAction: true,
                                
                                },
                                {
                                icon: tableIcons.Export,
                                tooltip: 'Descargar Datos' ,
                                onClick: () => exportData('datos',data[0]),
                                isFreeAction: true,
                                },
                                {
                                    icon: tableIcons.Edit,
                                    tooltip: 'Modificar' ,
                                    onClick: async (event, rowData) => {
                                        console.log("estos son los datos",rowData);
                                        await data.map(async (item,index) => {
                                                if(item.CON_id==rowData.CON_id){
                                                    await idHorarios.push(item.HOR_id);
                                                }
                                        });

                                        await setGetData(()=>({ 
                                            id: rowData.CON_id,
                                            fechaInicioContrato:formatearFecha(rowData.CON_fecha_inn) ,
                                            fechaFinContrato:formatearFecha( rowData.CON_fecha_out),
                                            dni: rowData.PER_dni,
                                            idTipoTrabajador: rowData.TTR_id,
                                            idHorarios:idHorarios,
                                            existe: 0
                                        }));
                                        await setNumeroContrato(rowData.CON_id);
                                        await setNombrePersonal(`${rowData.PER_nombre} ${rowData.PER_apaterno} ${rowData.PER_amaterno}`); 
                                        await cambiandoArea(rowData.TTR_id);
                                        await setCargo(rowData.TTR_id);                                    
                                        await cambiarEstadoModal1(true);
                                        for(let i=0;i<idHorarios.length;i++){
                                            axios.get(`/horario/${idHorarios[i]}`)
                                            .then(res=> {
                                                const tabla= document.getElementById('tabla-contrato');
                                                const fila = tabla.insertRow(-1);
                                                const celda1 = fila.insertCell(0);
                                                celda1.textContent = idHorarios[i];
                                                const celda2 = fila.insertCell(1);
                                                celda2.textContent = res.data[0].detalle;
                                                const celda3 = fila.insertCell(2);
                                                celda3.textContent = `${res.data[0].entrada} - ${res.data[0].salida}`;
                                                const celda4 = fila.insertCell(3);
                                                celda4.textContent = `${res.data[0].inicioReceso} - ${res.data[0].finReceso}`;
                                                const celda5 = fila.insertCell(4);
                                                let vDellBtn = document.createElement("button");
                                                vDellBtn.textContent = "Eliminar";
                                                celda5.appendChild(vDellBtn);

                                                vDellBtn.addEventListener("click", (e) =>{

                                                    let transactionRow = e.target.parentNode.parentNode;
                                                    transactionRow.remove();
                                            })
                                            })
                                            .catch(err => {console.log(err)});
                                        }
                                        
                                    },
                                },
                                {
                                icon: tableIcons.Delete,
                                tooltip:'Eliminar' ,
                                onClick: async(event, rowData) =>  {
                                    await setIdSeleccionado(rowData.CON_id);
                                    await cambiarEstadoModal2(true);
                                },
                                },
                                {
                                icon: tableIcons.Add,
                                tooltip: 'Nuevo Registro' ,
                                onClick: (event, rowData) => window.location.href='/registro%20contratos',
                                isFreeAction: true,
                                },
                                {
                                icon: ()=>(<button className="boton" onClick={()=>window.location.href='/asistencias'}>Ver asistencia</button> ),
                                onClick: () => setFiltro(filtro + 1),
                                isFreeAction: true,
                                
                                },
                            ]}
                            />
                            {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} alto='600px' ancho='500px'>
                <h1 style={{textAlign:"center"}} className="h1">Modificar contrato</h1>
                <div className="conternedor_formulario">
                    <h1>{`Contrato: ${numeroContrato}`}</h1>
                    <h2>{`Personal: ${nombrePersonal}`}</h2>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Area"
                        value={area}
                        required
                        style={{width:"100%"}}
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
                        id="outlined-select-currency"
                        select
                        label="cargo"
                        value={cargo}
                        required
                        style={{width:"100%"}}
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
                    <TextField
                    id="date"
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
                    InputProps={{inputProps: { min: fechaMax} }}
                    label="fecha de fin"
                    type="date"
                    style={{width:"49%"}}
                    defaultValue={getData&&getData.fechaFinContrato}
                    onChange={getdate2}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField
                        id="horario"
                        label="horario"
                        select
                        value={dataHorario}
                        required
                        style={{width:"60%"}}
                        helperText=""
                        name="horario"
                        onChange={(e) => {setDataHorario(e.target.value)}}
                        >
                            
                        {
                        horario.map((option) =>(                                       

                            <MenuItem key={option.HOR_id} value={option.HOR_id}>
                                <p>{option.HOR_detalle} {option.HOR_entrada} -{option.HOR_salida} </p>
                            </MenuItem>
                            
                        ))
                        }
                    </TextField>    
                    <button  className="button" id="agregarHorario" onClick={agregarTabla} style={{width:"30%"}}>Agregar</button>   
                <TablaContrato/>
                </div>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around",alignItems:"flex-end"}}>
                    <button type='button' className="button" onClick={enviarPut}  style={{width:"30%",height:"30px"}}><h5>Guardar</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal1(!estadoModal1)} style={{width:"30%",height:"30px"}}><h5>Cancelar</h5></button>
                </div>
            </Modal>
            <Modal3 estado={estadoModal2} cambiarEstado={cambiarEstadoModal2} alto='200px' ancho='400px'>
                <h1 style={{textAlign:"center"}} className="h1">¿Que desea realizar?</h1>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button'onClick={()=>deleteCerrar(idseleccionado)} className="button"  style={{width:"30%",height:"30px"}}><h5>cerrar contrato</h5></button>
                    <button type='button'onClick={()=>deleteEliminar(idseleccionado)} className="button"  style={{width:"30%",height:"30px"}}><h5>eliminar contrato</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal2(!estadoModal2)} style={{width:"30%",height:"30px"}}><h5>cancelar</h5></button>
                </div>   
            </Modal3>
            <Modal4 estado={estadoModal3} cambiarEstado={cambiarEstadoModal3} alto='200px' ancho='400px'>
                <h1 style={{textAlign:"center"}} className="h1">¿estas seguro de guardar los datos?</h1>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button'onClick={enviarPut2} className="button"  style={{width:"30%",height:"30px"}}><h5>si</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal3(!estadoModal3)} style={{width:"30%",height:"30px"}}><h5>no</h5></button>
                </div>   
            </Modal4> 
        </div>
    )
}
export default Contrato;