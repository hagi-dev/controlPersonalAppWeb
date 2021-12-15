import React,{useState,useEffect,forwardRef} from 'react';
import '../assets/Styles/components/Contrato.scss';
import Menu from '../components/Menu';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
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


const Asistencia = () => {
    const fecha1= new Date();
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
  const fecha2= formatearFecha(fecha1);
    const [data, setData ] = useState([]);
    const [data2, setData2 ] = useState([]);
    const [respuesta, setRespuesta] = useState({status:'hola',message:'iniciando'});
    const [filtro, setFiltro] = React.useState(0);
    const [getData,setGetData] = useState({
      fecha: fecha2,
  });


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
      axios.post('http://127.0.0.1:3000/api/asistencia',getData)
      .then(res => {
          setData(res.data[0]);})
      .catch(err => {
          console.log(err);
      });
    },[]);
        
    const columns = [
        { title: "#Contrato", field: "CON_id",align:"center",width: "50px" ,filtering: false},
        { title: "Personal", field: "PER_nombre" ,
        render: (rowData) => <p>{`${rowData.PER_nombre} ${rowData.PER_apaterno}`}</p>},
        { title: "Puesto", field: "TTR_cargo", align: "left"},
        {
          title: "Hora entrada", field: "REGE_hora_inn",
        },
        { title: "Horas Trabajadas", field: "htrabajadas"},
        { title: "Horas Deuda", field: "hdeuda"},
        { title: "asistencia", field: "JLAB_asistencia", lookup: { 0: "no asistio", 1: "asistio", 2: "feriado o domingo", 3: "permiso" } ,},
      ];

      const columns2 = [
        { title: "hora", field: "REGE_hora_inn",align:"left",width: "50px" ,filtering: false},
        { title: "observacion", field: "JLAB_observacion" },
        { title: "Justificacion", field: "REGE_justificacion", align: "left"},
        ]
    
  
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
                                tooltip: 'ver mas detalle de registro de entrada',
                                icon: ()=>(<button className="boton" onClick={()=>window.location.href='/asistencias'}>Ver Detalle</button> ),
                                onClick: () => setFiltro(filtro + 1),
                                },
                            ]}
                            />
                            {console.log(respuesta)}
                            {respuesta.message==="iniciando"? '':alert(`repuesta: ${respuesta.message}`, setRespuesta(()=>({message:"iniciando"})))}
                        </div>
                    </div>
                </div>
            </div>
            {console.log(data)}
        </div>
    )
}
export default Asistencia;