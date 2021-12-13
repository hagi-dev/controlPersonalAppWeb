import React,{useState,forwardRef} from 'react';
import '../assets/Styles/components/Personal.scss';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import "../assets/Styles/components/Tabla.scss";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
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
import Modal from '../components/Modal';
import exportData from '../helpers/exportData';
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

const Personal = () => {
    const [getValor, setGetValor] = useState(1);
    const [getValor2, setGetValor2] = useState('2018-01-01');
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const [data, setData ] = useState([]);
    const [getData,setGetData] = useState({
        id: '',
        dni:'',
        nombre:'',
        paterno:'',
        materno:'',
        genero:'',
        fecha_nacimiento:'2000-01-01',
        telefono:'',
        url:'sdfcreghtukiyjthgrfedsfgrygt',
        estado:'',
        direccion:'',
        idHuellas:0
        
    });
    const hoy = new Date();
    const [filtro, setFiltro] = React.useState(0);
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

    const formatoEspanol = (fecha) => {
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


    React.useEffect(() => {
        setGetValor(0);
        fetch('http://127.0.0.1:3000/api/personal')
        .then(response => response.json())
        .then(data=> setData(data));
    },[getValor]);
        
    const columns = [
        { title: "Nombre", field: "nombre", filterPlaceholder:"ingrese nombre" ,
        render: (rowData) => <div style={{display:"flex", justifyContent:"left",alignItems:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.nombre}</p></div>},
        { title: "Apellidos", field: "apellidoPaterno" },
        { title: "DNI", field: "dni", align: "left"},
        {
          title: "fecha Nacimiento", field: "fechaNacimiento",width: "250px", align: "left",
        render: (rowData) => <p>{ formatoEspanol(rowData.fechaNacimiento)}</p>, },
        { title: "genero", field: "sexo", lookup: { M: "Masculino", F: "Femenino" }, align: "left"},
        { title: "Edad",field:'edad' , align: "left"},
      ]

    const handleDateChange = (date) => {
        const fecha= document.getElementById('date').value;
        setGetData((prevState)=>({ ...prevState,fecha_nacimiento: fecha}));
    }
    const tabla={
        title:'Lista de Personal',
        data: data[0],
        columnas: columns,
        ruta:"/registrar%20personal"
    }
    const enviarPut = async () => {
        console.log(getData);
            if(true){
            await axios.put(`http://127.0.0.1:3000/api/personal/update/${getData.id}`,getData)
            .then(res => {
                setRespuesta(res.data);})
            .catch(err => {
                console.log(err);
            });
            }
            await fetch('http://127.0.0.1:3000/api/personal')
            .then(response => response.json())
            .then(data=> setData(data)); 
        cambiarEstadoModal1(!estadoModal1);
    }

    const getSelection = (e) => 
    {
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }
    return (
        <div className="personal">
            {console.log(data[0])}
             <div className="personal__menu">
                <Menu/> 
            </div>
            <div className="personal__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="personal__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="personal__cuerpo-titulo">
                    <h1>personal</h1>
                </div>
                <div className="personal__cuerpo-contenido">
                    <div className="personal__tabla" style={{margin:"0"}}>
                        <div className="contenedor-tabla" style={{width:"100%", height:"100%",overflow:"auto"}}>
                            <MaterialTable columns={columns} data={data[0]} title="Lista de personal"  icons={tableIcons} style={{background:'transparent'}}
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
                                        await cambiarEstadoModal1(true)
                                        await setGetData(()=>({ 
                                        id: rowData.id,
                                        dni: rowData.dni,
                                        nombre: rowData.nombre,
                                        paterno: rowData.apellidoPaterno,
                                        materno: rowData.apellidoMaterno,
                                        genero: rowData.sexo,
                                        fecha_nacimiento: formatearFecha(rowData.fechaNacimiento),
                                        telefono: rowData.telefono,
                                        url:'sdfcreghtukiyjthgrfedsfgrygt',
                                        estado:'1',
                                        direccion: rowData.direccion===null ? '' : rowData.direccion,
                                        idHuellas:0
                                        })); 
                                    
                                    },
                                },
                                {
                                icon: tableIcons.Delete,
                                tooltip: 'Desactivar',
                                onClick: async(event, rowData) => {
                                    await axios.delete(`http://127.0.0.1:3000/api/personal/delete/${rowData.id}`)
                                    .then(res => {
                                        setRespuesta(res.data);})
                                    .catch(err => {
                                        console.log(err);
                                    });
                                    await fetch('http://127.0.0.1:3000/api/personal')
                                    .then(response => response.json())
                                    .then(data=> setData(data));
                                    await console.log(data);
                                },
                                style: {zIndex:'0',position: 'absolute'}
                                },
                                {
                                icon: tableIcons.Add,
                                tooltip: 'Nuevo Registro' ,
                                onClick: (event, rowData) => window.location.href='/registrar%20personal',
                                isFreeAction: true,
                                },
                                {
                                icon: ()=>(<button className="boton" onClick={()=>window.location.href='/asistencias'}>Ver asistencia</button> ),
                                onClick: () => setFiltro(filtro + 1),
                                isFreeAction: true,
                                
                                },
                            ]}
                            />
                            {console.log(respuesta)}
                            {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} alto='650px' ancho='500px'>
                <h1 style={{textAlign:"center"}} className="h1">Modificar Datos Personal</h1>
                <div className="conternedor_formulario">
                    <TextField
                        id="outlined-select-currency"
                        label="dni"
                        type="text"
                        value={getData&&getData.dni}
                        required
                        style={{width:"100%"}}
                        helperText=""
                        name="dni"
                        onChange={getSelection}
                        >
                    </TextField>   
                    <TextField
                        id="outlined-select-currency"
                        label="Nombre"
                        value={getData&&getData.nombre}
                        required
                        style={{width:"100%"}}
                        helperText=""
                        name="nombre"
                        onChange={getSelection}
                        >
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        label="apellido paterno"
                        value={getData&&getData.paterno}
                        required
                        style={{width:"100%"}}
                        helperText=""
                        name="paterno"
                        onChange={getSelection}
                        >
                    </TextField>   
                    <TextField
                        id="outlined-select-currency"
                        label="apellido materno"
                        value={getData&&getData.materno}
                        required
                        style={{width:"100%"}}
                        helperText=""
                        name="materno"
                        onChange={getSelection}
                        >
                    </TextField> 
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="genero"
                        value={getData&&getData.genero}
                        required
                        style={{width:"100%"}}
                        helperText=""
                        name="genero"
                        onChange={getSelection}
                        >
                        <MenuItem key='M'value='M'>
                        Masculino
                        </MenuItem>
                        <MenuItem key='F'value='F'>
                        Femenino
                        </MenuItem>     
                    </TextField>   
                    <TextField
                    id="outlined-select-currency"
                    type="text"
                    label="direccion"
                    value={getData&&getData.direccion}
                    required
                    style={{width:"100%"}}
                    helperText=""
                    name="direccion"
                    onChange={getSelection}
                    >
                    </TextField>
                    <TextField
                    id="outlined-select-currency"
                    type="number"
                    label="telefono"
                    value={getData&&getData.telefono}
                    required
                    style={{width:"100%"}}
                    helperText=""
                    name="telefono"
                    onChange={getSelection}
                    >
                    </TextField>
                    {/* <input type="date" name="begin" 
                    placeholder="dd-mm-yyyy" value="2018-07-22"
                    min="1997-01-01" max="2030-12-31"/> */}
                    <TextField
                    id="date"
                    label="fecha de nacimiento"
                    type="date"
                    value={getData&&getData.fecha_nacimiento}
                    style={{width:"100%"}}
                    onChange={handleDateChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </div>
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around"}}>
                    <button type='button' className="button" onClick={enviarPut} style={{width:"30%",height:"30px"}}><h5>Guardar</h5></button>
                    <button type='button' className="button" onClick={() => cambiarEstadoModal1(!estadoModal1)} style={{width:"30%",height:"30px"}}><h5>Cancelar</h5></button>
                </div>
            </Modal>
        </div>
    )
}
export default Personal;