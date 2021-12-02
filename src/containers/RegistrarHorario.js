import React,{useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/RegistrarHorario.scss';
import {TextField,MenuItem} from '@material-ui/core';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import IconButton from '@material-ui/core/IconButton';
import AddCircle  from '@material-ui/icons/AddCircle';
import '../assets/Styles/components/Tabla.scss';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {KeyboardTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
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
import zIndex from '@material-ui/core/styles/zIndex';
import exportData from '../helpers/exportData';
import validar from '../helpers/validador';
import axios from 'axios';

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

const RegistrarHorario = () => {
    const dias=[
        {detalle:'L-V',id:'1'},
        {detalle:'Lunes',id:'2'},
        {detalle:'Martes',id:'3'},       
        {detalle:'Miercoles',id:'4'},        
        {detalle:'Jueves',id:'5'},    
        {detalle:'Viernes',id:'6'},
        {detalle:'Sabado',id:'7'}
    ]
    
    const [data, setData ] = useState([]);
    const [valorTipoTrabajador, setValorTipoTrabajador] =useState('');
    const [dias1, setDias1] =useState('');
    const [horaEntrada, setHoraEntrada] = useState(new Date('2014-08-18T08:00:00'));
    const [horaSalida, setHoraSalida] = useState(new Date('2014-08-18T18:00:00'));
    const [inicioReceso, setInicioReceso] = useState(new Date('2014-08-18T12:00:00'));
    const [finReceso, setfinReceso] = useState(new Date('2014-08-18T13:00:00'));
    const [subTitle, setSubTitle] = useState('Registrar Tipo Trabajador');
    const[ids, setIds] = useState(-1);
    const[editar, setEditar] = useState(0);
    const [filtro, setFiltro] = useState(0);
    const [consulta, setConsulta] = useState(1);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const [getData , setGetData ] = useState({
        dirigido: '',
        entrada: '8:00:00',
        salida: '18:00:00',
        inicioReceso: '12:00:00',
        finReceso: '13:00:00',
        detalle: '',
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

    useEffect(  async() => {
        await console.log(consulta);
        console.log('useEffect');
        if(consulta===1){
            fetch('http://127.0.0.1:3000/api/horario')
        .then(response => response.json())
        .then(data=> setData(data));

        fetch('http://127.0.0.1:3000/api/tipoTrabajador')
        .then(response => response.json())
        .then(data=> setData2(data[0]));
        }
    },[consulta]);
        
        
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
    const getSelection = async (e) => {
        console.log(`este es el evento: ${e}`);
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));  
    }
    const getHora = async (e,name) => {
        await console.log(`este es el evento: ${e}`);
        await setGetData((prevState)=>({ ...prevState, [name]: e.toLocaleTimeString()}));  
    }

    /**
     * metodos para peticiones al servidor
     */
     const enviarPost = async() => 
     {
         try {
 
             const tipoTrabajador2 = await validar(getData.dirigido,'dirigido');
             const diass = await validar(getData.detalle,'dias');
 
             if(editar===0){
 
                 if(tipoTrabajador2===1 && diass===1){
                     await axios.post('http://127.0.0.1:3000/api/horario/registrar',getData)
                     .then(res => {
                         setRespuesta(res.data);})
                     .catch(err => {
                         console.log(err);
                     });
                 }
             }
             else if (editar===1){
                  if(tipoTrabajador2===1 && diass===1){
                     await axios.put(`http://127.0.0.1:3000/api/horario/update/${ids}`,getData)
                     .then(res => {
                         setRespuesta(res.data);})
                     .catch(err => {
                         console.log(err);
                     });
                     setEditar(0);
                     setSubTitle('Registrar Horario');
                 } 
             }
         await setConsulta(1);
         console.log(consulta);
         console.log('useEffect2');
         } catch (error) {
             console.log('hubo un error: ',error);
         }    
     }
 
     //metodo para modificar los datos con put axios
    const actualizarTipo = async(id) =>
    {       
            await axios.get(`http://127.0.0.1:3000/api/horario/${id}`)
            .then(res => {
                console.log(res.data[0]['dirigido']);
                setGetData(()=>({
                    estado:'1',
                    dirigido: res.data[0]['dirigido'],
                    entrada: res.data[0]['entrada'] ,
                    salida:res.data[0]['salida'],
                    inicioReceso: res.data[0]['inicioReceso'],
                    finReceso: res.data[0]['finReceso'],
                    detalle: res.data[0]['detalle'],
                }));
                setHoraEntrada(`2014-08-18T${res.data[0]['entrada']}`);
                setHoraSalida(`2014-08-18T${res.data[0]['salida']}`);
                setInicioReceso(`2014-08-18T${res.data[0]['inicioReceso']}`);
                setfinReceso(`2014-08-18T${res.data[0]['finReceso']}`);
                setDias1(res.data[0]['detalle']);
                setValorTipoTrabajador(res.data[0]['dirigido']);
                setSubTitle('Modificar horario'); 
            })
            .catch(err => {
                console.log(err)}
            );
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
                        <div className="RegistrarHorario__registrar-titulo"><h2>{subTitle}</h2></div>
                        <div className="RegistrarHorario__Combos">
                            <div className="RegistrarHorario__fila">
                                <TextField
                                id="outlined-select-currency"
                                select
                                label="Dirigido"
                                value={valorTipoTrabajador}
                                width="78%"
                                helperText="Please select your currency"
                                name="dirigido"
                                onChange={e=>{getSelection(e),setValorTipoTrabajador(e.target.value)}}
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
                                    onChange={e => {getHora(e,"entrada"),setHoraEntrada(e)}}
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
                                    onChange={e=> { getHora(e,"salida"),setHoraSalida(e)}}
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
                                        onChange={e=> {getHora(e,"inicioReceso"),setInicioReceso(e)}}
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
                                        onChange={e=> {getHora(e,"finReceso"),setfinReceso(e)}}
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
                                    name="detalle"
                                    onChange={e=>{getSelection(e),setDias1(e.target.value)}}
                                    >
                                    {dias.map((option) => (
                                        <MenuItem key={option.id} value={option.detalle}>
                                        {option.detalle}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="RegistrarHorario__fila1" width='100%'>
                                <button onClick={enviarPost} className="button" style={{width:'100%'}} ><h5>Guardar</h5></button>
                                {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}                
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarHorario__lista" style={{margin:"0"}}>
                        {/* <Tabla tabla={tabla}/> */}
                        <div className="contenedor-tabla" style={{width:"100%", height:"100%",overflow:"auto"}}>
                            <MaterialTable columns={columns} data={data[0]} title='lista de Tipo Trabajador'  icons={tableIcons} style={{background:'transparent'}}
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
                                onClick: (rowData) => exportData('datos',data[0]),
                                isFreeAction: true,
                                },
                                {
                                icon: tableIcons.Edit,
                                tooltip: 'Modificar' ,
                                onClick: (event, rowData) => {actualizarTipo(rowData.id),setEditar(1),setIds(rowData.id)},
                                },
                                {
                                icon: tableIcons.Delete,
                                tooltip: 'Desactivar',
                                onClick: async (event, rowData) => {
                                    await axios.delete(`http://127.0.0.1:3000/api/horario/delete/${rowData.id}`)
                                    .then(res => {
                                        setRespuesta(res.data);})
                                    .catch(err => {
                                        console.log(err);
                                    });
                                    await setConsulta(1);
                                    await console.log(data);
                                },
                                style: {zIndex:'0',position: 'absolute'}
                                },
                                {
                                icon: tableIcons.Add,
                                tooltip: 'Nuevo Registro' ,
                                onClick: (event, rowData) => window.location.href=ruta,
                                isFreeAction: true,
                                },
                            ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {console.log(getData)}
        </div>
    )
}
export default RegistrarHorario;