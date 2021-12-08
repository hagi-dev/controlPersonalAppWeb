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

const Personal = () => {

    const [data, setData ] = useState([]);
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
        return anio + '/' + mes + '/' + dia;
    }


    React.useEffect(() => {
        fetch('http://127.0.0.1:3000/api/personal')
        .then(response => response.json())
        .then(data=> setData(data));
    },[]);
        
    const columns = [
        { title: "Nombre", field: "nombre", filterPlaceholder:"ingrese nombre" ,
        render: (rowData) => <div style={{display:"flex", justifyContent:"left",alignItems:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.nombre}</p></div>},
        { title: "Apellidos", field: "apellidoPaterno" },
        { title: "DNI", field: "dni", align: "left"},
        {
          title: "fecha Nacimiento", field: "fechaNacimiento",width: "250px", align: "left",
        render: (rowData) => <p>{ formatearFecha(rowData.fechaNacimiento)}</p>, },
        { title: "genero", field: "sexo", lookup: { M: "Masculino", F: "Femenino" }, align: "left"},
        { title: "Edad",field:'fechaNacimiento' , align: "center",
        render: (rowData) => <p style={{display:"inline-block"}}>{hoy.getFullYear() - rowData.fechaNacimiento.split("-")[0]}</p>},
      ]
    const tabla={
        title:'Lista de Personal',
        data: data[0],
        columnas: columns,
        ruta:"/registrar%20personal"
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
                                onClick: (event, rowData) => actualizarTipo(rowData.id),
                                },
                                {
                                icon: tableIcons.Delete,
                                tooltip: 'Desactivar',
                                onClick: (event, rowData) => confirm("¿deseas eliminar?" + rowData.id),
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Personal;