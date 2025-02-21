import React, { useState, useEffect, forwardRef } from "react";
import "../assets/Styles/components/Asistencia.scss";
import Menu from "../components/Menu";
import Perfil from "../components/Usuario";
import "../assets/Styles/components/Tabla.scss";
import MaterialTable from "material-table";
import Modal3 from "../components/Modal2";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import exportData from "../helpers/exportData";
import validar from "../helpers/validador";
import axios from "axios";
import { TextField } from "@material-ui/core";
import WorkerCard from "../components/Card";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Asistencia = () => {
  const fecha1 = new Date();
  const formatearFecha = (fecha) => {
    let fecha1 = new Date(fecha);
    let dia = fecha1.getDate();
    let mes = fecha1.getMonth() + 1;
    let anio = fecha1.getFullYear();
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    return anio + "-" + mes + "-" + dia;
  };
  const fecha2 = formatearFecha(fecha1);
  const [data3, setData3] = useState([]);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [data, setData] = useState([]);
  const [respuesta, setRespuesta] = useState({
    status: "hola",
    message: "iniciando",
  });
  const [filtro, setFiltro] = React.useState(0);
  const [actualizar, setActualizar] = useState(false);
  const [actualizar2, setActualizar2] = useState(false);
  const [actualizar3, setActualizar3] = useState(false);
  const [dataPersonal, setDataPersonal] = useState(null);
  const [nombres, setNombres] = useState("");
  const [getData2, setGetData2] = useState({
    idContrato: "",
    idJornada: "",
  });
  const [getData3, setGetData3] = useState({
    id: "",
  });
  const [getData, setGetData] = useState({
    fecha: fecha2,
  });

  const getdate2 = async (e) => {
    try {
      setActualizar(true);
      const fecha2 = await document.getElementById("fechaAsistencia");
      await setGetData((prevState) => ({ ...prevState, fecha: fecha2.value }));
    } catch (error) {
      console.log(error);
    }
  };

  const formatearFechaEspañol = (fecha) => {
    let fecha1 = new Date(fecha);
    let dia = fecha1.getDate();
    let mes = fecha1.getMonth() + 1;
    let anio = fecha1.getFullYear();
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    return dia + "/" + mes + "/" + anio;
  };

  // time is range 1-24
  const formattTimeByLabelSpanishPmOrAm = (time) => {
    let time1 = time;
    console.log("time", time1);
    let hour = time1.split(":")[0];
    let min = time1.split(":")[1];
    let sec = time1.split(":")[2];
    console.log("hora", hour);
    if (Number(hour) > 12) {
      time1 = `${Number(hour) - 12}:${min}:${sec}`;
      return `${time1} PM`;
    }
    return `${time1} AM`;
  };

  useEffect(() => {
    localStorage.getItem("token") === "undefined" ||
    !localStorage.getItem("token")
      ? (window.location.href = "/login")
      : "";
    axios
      .post("/asistencia", getData)
      .then((res) => {
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("/movimiento", getData2)
      .then((res) => {
        setData3(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setActualizar(false);
  }, [actualizar, actualizar3]);

  const columns = [
    { title: "Personal", field: "nombre" },
    {
      title: "Entrada",
      field: "horaEntrada",
      filtering: false,
      render: (rowData) => (
        <p>{formattTimeByLabelSpanishPmOrAm(rowData.horaEntrada)}</p>
      ),
    },
    {
      title: "Salida",
      field: "horaSalida",
      filtering: false,
      render: (rowData) => (
        <p>{formattTimeByLabelSpanishPmOrAm(rowData.horaSalida)}</p>
      ),
    },
    { title: "observacion", field: "observacion", align: "left" },
    {
      title: "horas trabajadas",
      field: "horasTrabajadas",
      filtering: false,
      render: (rowData) => <p>{rowData.horasTrabajadas} - en horas</p>,
    },
    {
      title: "horas deuda",
      field: "horasDebidas",
      filtering: false,
      render: (rowData) => <p>{rowData.horasDebidas} - en horas</p>,
    },
    {
      title: "horas extras",
      field: "horasExtras",
      filtering: false,
      render: (rowData) => <p>{rowData.horasExtras} - en horas</p>,
    },
    // {
    //   title: "foto de entrada",
    //   field: "verificacion",
    //   render: (rowData) => (
    //     <img
    //       src={rowData.verificacion}
    //       style={{ width: 40}}
    //     />
    //   ),
    // },
  ];

  const columns3 = [
    {
      title: "Hora",
      field: "REGE_hora_inn",
      align: "center",
      width: "50px",
      filtering: false,
    },
    { title: "observacion", field: "REGE_observacion", align: "left" },
    {
      title: "justificacion",
      field: "REGE_justificacion",
      align: "left",
      lookup: { 0: " falta justificar", 1: "justificado", 3: "no requiere" },
    },
  ];

  const handleChange = async (idc, idj, nombre) => {
    setActualizar2(true);
    setNombres(nombre);
    console.log("este es", idc, idj);
    await setGetData2({ idContrato: idc, idJornada: idj });
    cambiarEstadoModal2(!estadoModal2);
  };

  const justificar = async (id2) => {
    setActualizar3(true);
    await setGetData3({ id: id2 });
  };

  return (
    <div className="Asistencia">
      {actualizar
        ? axios
            .post("/asistencia", getData)
            .then((res) => {
              setData(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
        : ""}
      {actualizar2
        ? axios
            .post("/movimiento", getData2)
            .then((res) => {
              setData3(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
        : ""}
      {actualizar3
        ? axios
            .put(`/updateJustificacion/${getData3.id}`)
            .then((res) => {
              setRespuesta(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
        : ""}
      {actualizar ? setActualizar(false) : ""}
      {actualizar3 ? setActualizar3(false) : ""}
      {actualizar2 ? setActualizar2(false) : ""}
      <div className="Asistencia__menu">
        <Menu />
      </div>
      <div
        className="Asistencia__cuerpo"
        style={{ backgroundColor: "white", width: "100%", height: "100%" }}
      >
        <div className="Asistencia__cuerpo-perfil">
          <Perfil />
        </div>
        <div className="Asistencia__cuerpo-titulo">
          <h1>Asistencias</h1>
        </div>
        <div className="Asistencia__cuerpo-contenido">
          <div className="Asistencia__lista" style={{ margin: "0" }}>
            <div
              className="contenedor-tabla"
              style={{ width: "100%", height: "100%", overflow: "auto" }}
            >
              <MaterialTable
                columns={columns}
                data={data}
                title="Lista "
                icons={tableIcons}
                style={{ background: "transparent" }}
                // StickyHeader={true}
                options={{
                  sorting: true,
                  iconsSearch: false,
                  search: false,
                  paging: true,
                  paginghideFilterIcons: true,
                  pageSize: 4,
                  rowStyle: {
                    fontFamily: "mulish",
                    fontSize: "13px",
                    border: "0px",
                    color: "#4E4D4D",
                    height: "30px",
                  },
                  headerStyle: {
                    position: "sticky",
                    textAlign: "left",
                    top: "0",
                    color: "#7D0F2E",
                    fontFamily: "mulish",
                    backdropFilter: blur("2px"),
                    fontSize: "14px",
                    border: "0px",
                    background: "#E9F8F7",
                    fontWeight: "700",
                    zIndex: "9999",
                  },
                  titleStyle: { padding: "0px" },
                  paginationType: "normal",
                  pageSizeOptions: [4, 10, 20],
                  filtering: false,
                  showFirstLastPageButtons: false,
                  filtering: filtro % 2 == 0 ? false : true,
                  maxBodyHeight: "400px",
                }}
                localization={{
                  header: {
                    actions: "",
                  },
                  rows: "fila",
                }}
                actions={[
                  {
                    icon: () => (
                      <input
                        defaultValue={getData && getData.fecha}
                        id="fechaAsistencia"
                        onChange={getdate2}
                        style={{
                          borderRadius: "5px",
                          border: "1px solid #2EA39D",
                          color: "#7D0F2E",
                          fontFamily: "mulish",
                        }}
                        type="date"
                      ></input>
                    ),
                    tooltip: "Descargar Datos",
                    onClick: () => exportData("datos", data[0]),
                    isFreeAction: true,
                  },
                  {
                    icon: tableIcons.Filter,
                    tooltip: "filtrar tabla",
                    onClick: () => setFiltro(filtro + 1),
                    isFreeAction: true,
                  },
                  {
                    icon: tableIcons.Export,
                    tooltip: "Descargar Datos",
                    onClick: () => exportData("datos", data),
                    isFreeAction: true,
                  },
                  {
                    tooltip: "ver mas detalle de registro de entrada",
                    icon: () => (
                      <button
                        style={{
                          backgroundColor: "#2EA39D", // Verde
                          border: "none",
                          padding: "10px 15px",
                          color: "white",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          margin: "4px 2px",
                          cursor: "pointer",
                          borderRadius: "12px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#2EA39D")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#2EA39D")
                        }
                      >
                        ve Detalle
                      </button>
                    ),
                    onClick: async (event, rowData) => {
                      setDataPersonal(rowData);
                      handleChange(
                        rowData.CON_id,
                        rowData.JLAB_id,
                        rowData.PER_nombre
                      );
                    },
                  },
                ]}
              />
              {respuesta.message === "iniciando"
                ? ""
                : alert(
                    `repuesta: ${respuesta.message}`,
                    setRespuesta(() => ({ message: "iniciando" }))
                  )}
            </div>
          </div>
        </div>
      </div>
      <Modal3
        estado={estadoModal2}
        cambiarEstado={cambiarEstadoModal2}
        alto="830px"
        ancho="600px"
      >
        <WorkerCard workerData={dataPersonal}/>
      </Modal3>
    </div>
  );
};
export default Asistencia;
