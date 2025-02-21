import axios from "axios";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";

const WorkerCard = ({ workerData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Mes actual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual
  const [monthlyData, setMonthlyData] = useState({});
  const [dailyData, setDailyData] = useState(null); // Para detalles del día
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [columnsMoth, setColumnsMoth] = useState([]);
  const [dataMoth, setDataMoth] = useState([]);
  const [titleTable, setTitleTable] = useState("Detalles de Asistencia");

  // Cambiar entre las pestañas
  const toggleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 1) {
      setTitleTable("Detalles de Asistencia");
    } else if (tab === 2) {
      setTitleTable("Resumen Mensual");
    }
  };

  // Manejo de cambio del selector de mes
  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value)); // Convertir el valor del mes a número
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value)); // Convertir el valor del mes a
  };
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

  // Función para obtener el nombre del mes
  const getMonthName = (monthIndex) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[monthIndex];
  };

  const getHoras = (horas) => {
    return `${horas} horas`;
  }

  const setConfigTableDaily = (dailyData) => {
    const columns = [
      { title: "Descripción", field: "descripcion" },
      { title: "Detalle", field: "detalle" },
    ];
    setColumns(columns);
    const data = [
      { descripcion: "Fecha", detalle: formatearFechaEspañol(dailyData.fecha) },
      {
        descripcion: "Hora de Entrada",
        detalle: formattTimeByLabelSpanishPmOrAm(dailyData.horaEntrada),
      },
      {
        descripcion: "Hora de Salida",
        detalle: formattTimeByLabelSpanishPmOrAm(dailyData.horaSalida),
      },
      {
        descripcion: "Horas Trabajadas",
        detalle: getHoras(dailyData.horasTrabajadas),
      },
      {
        descripcion: "Horas Extra",
        detalle: getHoras(dailyData.horasExtras),
      },
      {
        descripcion: "Horas Debidas",
        detalle: getHoras(dailyData.horasDebidas),
      },
      { descripcion: "Comentarios", detalle: dailyData.observacion },
    ];
    setData(data);
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

  const setConfigTableMoth = (mothData) => {
    const columns = [
      { title: "Descripción", field: "description" },
      { title: "Detalle", field: "detalle" },
    ];
    setColumnsMoth(columns);
    const data = [
      { description: "Mes:", detalle: getMonthName(selectedMonth) },
      {
        description: "Horas Trabajadas del Mes:",
        detalle: mothData.horasTrabajadasMes,
      },
      {
        description: "Horas Extra del Mes:",
        detalle: mothData.horasDebidasMes,
      },
      {
        description: "Horas Debidas del Mes:",
        detalle: mothData.horasExtrasMes,
      },
    ];
    setDataMoth(data);
  };

  // Fetch de los datos del mes al seleccionar un mes
  useEffect(() => {
    const fetchMonthlyData = async () => {
      const response = await axios.get(
        `/asistencia/${selectedYear}/${selectedMonth + 1}/${
          workerData.personalId
        }`
      );
      setMonthlyData(response.data.horas);
      setConfigTableMoth(response.data.horas);
    };

    fetchMonthlyData();
  }, [selectedYear, selectedMonth, workerData.personalId]); // Dependencias: cuando cambia el mes o el id del trabajador

  // Fetch de los datos del día (asistencia diaria)
  useEffect(() => {
    setConfigTableDaily(workerData);
    setDailyData(workerData);
  }, [workerData]); // Dependencias: cuando cambia el ID de asistencia o el trabajador

  return (
    <div
      style={{
        borderRadius: "8px",
        width: "90%",
        padding: "20px",
        margin: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-52%, -50%)",
      }}
    >
      {/* Imagen */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img
          src={workerData.verificacion}
          alt={`${workerData.nombre}`}
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
        <p style={{fontSize:'14px', textAlign:'center', marginBottom: '4px', fontStyle: 'italic'}}>foto tomada al registra su ingreso</p>
      </div>

      {/* Nombre y DNI */}
      <div style={{ textAlign: "center" }}>
        <h3>{workerData.nombre}</h3>
        <p>DNI: {workerData.dni}</p>
      </div>

      {/* Pestañas */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => toggleTab(1)}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: activeTab === 1 ? "#2EA39D" : "#ddd",
            color: activeTab === 1 ? "#fff" : "#000",
            borderRadius: "4px",
            border: "none",
          }}
        >
          Detalles
        </button>
        <button
          onClick={() => toggleTab(2)}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
            backgroundColor: activeTab === 2 ? "#2EA39D" : "#ddd",
            color: activeTab === 2 ? "#fff" : "#000",
            borderRadius: "4px",
            border: "none",
          }}
        >
          Resumen Mensual
        </button>
      </div>

      {/* Pestaña 1: Detalles del día */}
      {activeTab === 1 && dailyData && (
        <div style={{ marginTop: "10px" }}>
          {/* MaterialTable */}
          <MaterialTable
            columns={columns}
            data={data}
            title={titleTable}
            options={{
              search: false, // Desactivar la búsqueda
              paging: false, // Desactivar paginación
              sorting: false, // Desactivar el ordenamiento
              actionsColumnIndex: -1, // Eliminar columna de acciones si no la necesitas
              headerStyle: {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
              cellStyle: {
                fontSize: "14px",
              },
              titleStyle: {
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              },
            }}
          />
        </div>
      )}

      {/* Pestaña 2: Resumen Mensual (oculto por defecto) */}
      {activeTab === 2 && monthlyData && (
        <div style={{ marginTop: "10px" }}>
          <h4>Resumen Mensual</h4>

          {/* Selector de Mes */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", marginBottom: "15px"}}>
            <label htmlFor="month-selector">Filtra por: </label>
            <div style={{ display: "flex", gap: "4px" }}>
            <select
                  className="input-general"
                  id="month-selector"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  style={{ padding: "5px", marginLeft: "10px" }}
                >
                  <option value={0}>Enero</option>
                  <option value={1}>Febrero</option>
                  <option value={2}>Marzo</option>
                  <option value={3}>Abril</option>
                  <option value={4}>Mayo</option>
                  <option value={5}>Junio</option>
                  <option value={6}>Julio</option>
                  <option value={7}>Agosto</option>
                  <option value={8}>Septiembre</option>
                  <option value={9}>Octubre</option>
                  <option value={10}>Noviembre</option>
                  <option value={11}>Diciembre</option>
                </select>
                <select
                  className="input-general"
                  id="month-selector"
                  value={selectedYear}
                  onChange={handleYearChange}
                  style={{ padding: "5px", marginLeft: "10px" }}
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
            </div>
          </div>

          {/* Mostrar Datos del Mes Seleccionado */}
          <div style={{ marginTop: "10px" }}>
            {/* MaterialTable */}
            <MaterialTable
              columns={columnsMoth}
              data={dataMoth}
              title={titleTable}
              options={{
                search: false, // Desactivar la búsqueda
                paging: false, // Desactivar paginación
                sorting: false, // Desactivar el ordenamiento
                actionsColumnIndex: -1, // Eliminar columna de acciones si no la necesitas
                headerStyle: {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                cellStyle: {
                  fontSize: "14px",
                },
                titleStyle: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerCard;
