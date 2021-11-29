import React,{useState,useEffect} from 'react';
import '../assets/Styles/components/Contrato.scss';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';
import { DateRange } from '@material-ui/icons';


const Contrato = () => {
    const [data, setData ] = useState([]);
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
        fetch('http://127.0.0.1:3000/api/contrato')
        .then(response => response.json())
        .then(data=> setData(data));
    },[]);
        
    const columns = [
        { title: "N°", field: "contratoid",align:"left",width: "50px" ,filtering: false},
        { title: "Personal", field: "nombre" ,
        render: (rowData) => <p>{`${rowData.nombre} ${rowData.apellido}`}</p>},
        { title: "Puesto", field: "tipoTrabajador", align: "left"},
        {
          title: "Horario", field: "horaEntrada",
          render: (rowData) => <p>{`${rowData.dias}: ${rowData.horaEntrada}-${rowData.horaSalida}`}</p>,width:'200px'},
        { title: "Incio", field: "inicioContrato",render: (rowData) => <p>{ formatearFecha(rowData.inicioContrato)}</p>},
        { title: "Finaliza", field: "finalContrato",render: (rowData) => <p>{ formatearFecha(rowData.finalContrato)}</p>},
        { title: "Estado", field: "estado", lookup: { 0: "finalizado", 1: "vigente", 2: "cancelado" } ,},
      ]
    const tabla={
        title:'Lista de Contrato',
        data: data[0],
        columnas: columns,
        ruta:"/registro%20contratos",
        btnVerAsistencia:true,
    }
    return (
        <div className="Contrato">
            {console.log(data[0])}
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
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contrato;