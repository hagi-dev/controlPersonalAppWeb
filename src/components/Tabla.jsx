import React,{useState} from 'react';
import "../assets/Styles/components/Tabla.scss";
import MaterialTable from 'material-table';
import perfil from '../assets/static/perfil.jpg';
import { Delete } from '@material-ui/icons';

const StateName= false;
const Tabla = (props) => {

    const {Data,columns1,titulo,width}=props;
    const [tableData, setTableData] = useState([
        { name: "Raj ", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohainos", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", school:"madrid" },
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        { name: "Raj" , email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", school:"madrid"},
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", school:"madrid" },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", school:"madrid" },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", school:"madrid" },
        ])
    const columns = [
        { title: "Name", field: "name", filterPlaceholder:"ingrese nombre" ,align:"left",filtering: StateName,
        render: (rowData) => <div style={{display:"flex", justifyContent:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.name}</p></div>},
        { title: "Email", field: "email",filtering:false },
        { title: "Phone", field: "phone", align: "center", grouping: false },
        {
          title: "Age", field: "age",
        },
        { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
        { title: "City", field: "city",filterPlaceholder:"filter" },
        { title: "School", field: "school", lookup: { madrid: "madrid", barcelona: "barcelona", london: "london" } ,selectedField:"london"},
      ]
    return (
        <div style={{width:"93%", height:"101%",overflow: "hidden"}}>
          <MaterialTable columns={columns} data={tableData} title= 'Lista de Tipos de Trabajador'

          options={{
            sorting: true,iconsSearch:false,search: false, paging: true,hideFilterIcons: true,pageSize:4,exportButton:true,exportAllData: true,exportFileName: "TableData",
            rowStyle:{fontFamily:"mulish" ,fontSize:"13px",border: "0px",color:"#2EA39D" },
            headerStyle:{color:"#7D0F2E",fontFamily:"mulish" ,fontSize:"16px",border: "0px",background:"#E9F8F7",fontWeight:"700" },
            titleStyle:{},
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Modificar' ,
              onClick: (event, rowData) => alert("¿deseas modificar? " + rowData.name)

            },
            {
              icon: 'delete',
              tooltip: 'Desactivar',
              onClick: (event, rowData) => confirm("¿deseas eliminar?" + rowData.name)
            }
          ]}
          />
        </div>
    )
}

export default Tabla;
