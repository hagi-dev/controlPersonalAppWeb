import React, {useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/RegistrarTipo.scss';
import '../assets/Styles/components/Tabla.scss';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import {TextField,MenuItem} from '@material-ui/core';
import axios from 'axios';
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
import exportData from '../helpers/exportData';
import validar from '../helpers/validador';

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

const RegistrarTipo = () => {
    /**
     * iniciando el estado de los datos 
     */
    const [data, setData] = useState([]);
    const [subTitle, setSubTitle] = useState('Registrar Tipo Trabajador');
    const[ids, setIds] = useState(-1);
    const[editar, setEditar] = useState(0);
    const [filtro, setFiltro] = useState(0);
    const [consulta, setConsulta] = useState(1);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const [getData , setGetData ] = useState({
        area: '',
        cargo:'',
        estado:'1'
    });    

    /**
     * configuracion para rellenar los datos de la tabla
     */

    const columns = [
        { title: "Area", field: "area",lookup:{Almacen:"Almacen",Ventas:"Ventas",'Marketing y diseño':'Marketing y diseño'} ,align:"left",
        },
        { title: "Cargo", field: "nombre",filterPlaceholder:" buscar cargo",align:"left", },
        { title: "Estado", field: "estado",lookup:{1:'vigente',0:'no vigente'}, align: "left"},
    ]

    /**
     * cargar datos en los select de area y cargo
     */
    const areas = 
    [
        { nombre: 'Almacen', id:0},
        { nombre: 'Ventas',id:1},
        { nombre: 'Marketing y diseño', id:2}
    ]
    const cargosAlmacen = 
    [
        { nombre: 'supervisor', id:'0'},
        { nombre: 'personal',id:'1'}
    ]
    const cargosVentas = 
    [
        { nombre: 'asesor de ventas', id:'0'},
        { nombre: 'supervisor',id:'1'},
        { nombre: 'cajero',id:'2'}
    ]
    const cargosDyM = 
    [
        { nombre: 'marketero', id:'0'},
        { nombre: 'diseñador grafico',id:'1'},
        { nombre: 'community Manager',id:'2'}
    ]

    /**
     * validadores para los campos
     */
       
    /**
     * metodos y hooks para hacer peticiones al servidor
     */

    useEffect(async ()=>{
        localStorage.getItem('token')?"":window.location.href='/login';
        if(consulta===1){
            setConsulta(0);
            await axios.get('http://127.0.0.1:3000/api/TipoTrabajador')
            .then(res => {
                setData(res.data);})
            .catch(err => {
                console.log(err);
            })
        }
        console.log("solo una vez??");
    },[consulta]);

    const getSelection = (e) => 
    {
        console.log(`este es el evento: ${e[0]}`);
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));  

    }

    // traer datos GET api fetch
    const enviarPost = async() => 
    {
        try {

            const areas = await validar(getData.area,'area');
            const cargos = await validar(getData.cargo,'cargo');

            if(editar===0){

                if(areas===1 && cargos===1){
                    await axios.post('http://127.0.0.1:3000/api/TipoTrabajador/registrar',getData)
                    .then(res => {
                        setRespuesta(res.data);})
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
            else if (editar===1){
                 if(areas===1 && cargos===1){
                    await axios.put(`http://127.0.0.1:3000/api/TipoTrabajador/update/${ids}`,getData)
                    .then(res => {
                        setRespuesta(res.data);})
                    .catch(err => {
                        console.log(err);
                    });
                    setEditar(0);
                    setSubTitle('Registrar Tipo Trabajador');
                    document.getElementById('sudTitle').style.color="#2EA39D";
                } 
            }
        await setConsulta(1);
        } catch (error) {
            console.log('hubo un error: ',error);
        }    
    }

    //metodo para modificar los datos con put axios
    const actualizarTipo = async(id) =>
    {       
            await axios.get(`http://127.0.0.1:3000/api/TipoTrabajador/${id}`)
            .then(res => {
                setGetData(()=>({
                    area: res.data[0]['area'],
                    cargo:res.data[0]['cargo'],
                    estado:'1'
                }));
                document.getElementById("sudTitle").style.color="#2EA39D";
                setSubTitle('Modificar Tipo Trabajador'); 
            })
            .catch(err => {
                console.log(err)}
            );
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
                        <div className="RegistrarTipo__registrar-titulo" id="sudTitle"><h2>{subTitle}</h2></div>
                        <div className="RegistrarTipo__Combos">
                            <div className="RegistrarTipo__fila">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Area"
                                    value={getData&&getData.area}
                                    required
                                    style={{width:"200%"}}
                                    helperText=""
                                    name="area"
                                    onChange={getSelection}
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
                                    required
                                    label="Cargo"
                                    value={getData&&getData.cargo}
                                    style={{width:"200%"}}
                                    helperText=""
                                    name="cargo"
                                    onChange={getSelection}
                                    >
                                    {getData.area==="Almacen"?cargosAlmacen.map((option1) => (
                                        <MenuItem key={option1.id} value={option1.nombre}>
                                        {option1.nombre}
                                        </MenuItem>
                                    )) : getData.area==="Ventas"?cargosVentas.map((option2) =>  (
                                        <MenuItem key={option2.id} value={option2.nombre}>
                                        {option2.nombre}
                                        </MenuItem>
                                    )):getData.area==="Marketing y diseño" ?cargosDyM.map((option3) =>   (
                                        <MenuItem key={option3.id} value={option3.nombre}>
                                        {option3.nombre}
                                        </MenuItem>
                                    )) : <MenuItem value="">''</MenuItem>}
                                </TextField>
                            </div>
                            <div className="RegistrarTipo__fila1">
                                <button className="button" onClick={enviarPost} style={{width:"100%"}}><h5>Guardar</h5></button>
                                {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}        
                            </div>
                        </div>                        
                    </div>
                    <div className="RegistrarTipo__lista" style={{margin:"0"}}>
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
                                    await axios.delete(`http://127.0.0.1:3000/api/TipoTrabajador/delete/${rowData.id}`)
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
            {console.log(data)}
        </div>
    )
}

export default RegistrarTipo;