import React,{useState,forwardRef} from 'react';
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
import XLSX from 'xlsx';

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
const StateName= false;
const Tabla = (props) => {
    const {title,data,columnas}=props.tabla;
    const [filtro, setFiltro] = React.useState(0);
    const downloadExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "datosTabla");
      XLSX.writeFile(wb, "datosTabla.xlsx");
    }
    return (
        <div className="contenedor-tabla" style={{width:"100%", height:"100%",overflow:"auto"}}>
          <MaterialTable columns={columnas} data={data} title={title}  icons={tableIcons} style={{background:'transparent'}}
          StickyHeader={true}
          options={{
            sorting: true,iconsSearch:false,search: false, paging:true,paginghideFilterIcons: true,pageSize:4,
            rowStyle:{fontFamily:"mulish" ,fontSize:"13px",border: "0px",color:"#4E4D4D",height:"30px" },
            headerStyle:{position: 'sticky', top: "0",color:"#7D0F2E",fontFamily:"mulish",backdropFilter: blur("2px") ,fontSize:"14px",border: "0px",background:"#E9F8F7",fontWeight:"700" },
            titleStyle:{padding:"0px"},paginationType:"normal",pageSizeOptions:[4,10,20],filtering: false, showFirstLastPageButtons: false,
            filtering: filtro%2==0 ? false : true,maxBodyHeight: '400px'
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
              onClick: () => downloadExcel(),
              isFreeAction: true,
            },
            {
              icon: tableIcons.Edit,
              tooltip: 'Modificar' ,
              onClick: (event, rowData) => alert("¿deseas modificar? " + rowData.name),
              style: {zIndex:-1}
            },
            {
              icon: tableIcons.Delete,
              tooltip: 'Desactivar',
              onClick: (event, rowData) => confirm("¿deseas eliminar?" + rowData.name),
              style: {zIndex:-1,position: 'absolute', top: 0,right: 0}
            },
            {
              icon: tableIcons.Add,
              tooltip: 'Nuevo Registro' ,
              onClick: (event, rowData) => confirm("¿deseas eliminar?" + rowData.name),
              isFreeAction: true,
            },
          ]}
          />
        </div>
    )
}

export default Tabla;
