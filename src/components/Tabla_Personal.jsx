import React,{useState} from 'react';
import "../assets/Styles/components/Tabla.scss";
import MaterialTable from 'material-table';
import perfil from '../assets/static/perfil.jpg';
import { Delete } from '@material-ui/icons';

const StateName= false;
const Tabla_Personal = (props) => {

  
    const columns = [
      { title: "Name", field: "name", filterPlaceholder:"ingrese nombre" ,align:"left",filtering: StateName, 
      
            render: (rowData) => <div style={{display:"flex", justifyContent:"center"}}><img src={perfil} style={{width:"40px",border:"3px solid #FCDC3C",borderRadius:"50%",marginRight:"4px"}}/><p style={{display:"inline-block", width:"60px"}}>{rowData.name}</p></div>},
      
      { title: "DNI", field: "dni", align: "center", grouping: false },
            
      { title: "Phone", field: "phone",filtering:false },
            
      { title: "Gender", field: "gender", lookup: { M: "Masculino", F: "Femenino" } },

      { title: "Age", field: "age",},
      
      { title: "City", field: "city",filterPlaceholder:"filter" },
      
      { title: "Contrato", field: "contract"},
    ]

    const [tableData, setTableData] = useState([
        { name: "Raj ",      dni: 70601016,   age: null,  phone: "900200700",    gender: "M",  city: "Chennai",  contract:" .♦. "},
        { name: "Mohainos",  dni: 70601011,   age: 35,    phone: "900200701",    gender: "M",  city: "Delhi",    contract:" .♦. " },
        { name: "Sweety",    dni: 70601012,   age: 17,    phone: "900200702",    gender: "F",  city: "Noida",    contract:" .♦. " },
        { name: "Vikas",     dni: 70601013,   age: 20,    phone: "900200703",    gender: "M",  city: "Mumbai",   contract:" .♦. " },
        { name: "Neha",      dni: 70601014,   age: 25,    phone: "900200704",    gender: "F",  city: "Patna",    contract:" .♦. " },
        { name: "Mohan",     dni: 70601019,   age: 35,    phone: "900200706",    gender: "M",  city: "Delhi",    contract:" .♦. " },
        
        ])

    return (
        <div style={{width:"93%", height:"101%",overflow: "hidden"}}>
          <MaterialTable columns={columns} data={tableData} title= 'Lista de Personal'

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

export default Tabla_Personal;
