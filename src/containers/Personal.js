import React,{useState,useEffect} from 'react';
import '../assets/Styles/components/Personal.scss';
import Menu from '../components/Menu';
import Tabla from '../components/Tabla';
import Perfil from '../components/Usuario';
import '../assets/Styles/components/Tabla.scss';
import perfil from '../assets/static/perfil.jpg';


const Personal = () => {
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
        <div className="Personal">
            {console.log(data[0])}
             <div className="Personal__menu">
                <Menu/> 
            </div>
            <div className="Personal__cuerpo" style={{backgroundColor:"white",width:"100%",height:"100%"}}>
                <div className="Personal__cuerpo-perfil">
                 <Perfil/>
                </div>
                <div className="Personal__cuerpo-titulo">
                    <h1>Personal</h1>
                </div>
                <div className="Personal__cuerpo-contenido">
                    <div className="Personal__lista" style={{margin:"0"}}>
                        <Tabla tabla={tabla}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Personal;