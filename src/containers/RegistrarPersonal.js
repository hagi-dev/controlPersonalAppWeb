import React, { useState, useEffect, forwardRef } from "react";
import "../assets/Styles/components/RegistrarPersonal.scss";
import "../assets/Styles/components/Buton.scss";
import SearchIcon from "@material-ui/icons/Search";
import TablaHuella from "../components/TablaHuellas";
import Menu from "../components/Menu";
import validador from "../helpers/validador";
import { TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import Perfil from "../components/Usuario";
import "date-fns";

const RegistrarPersonal = () => {
  const [respuesta, setRespuesta] = useState({
    status: "hola",
    message: "iniciando",
  });
  const [filtro, setFiltro] = React.useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState("2014-08-18");
  const [tipoCargo, setTipoCargo] = useState([]);
  const [cargo,setCargo] = useState(2);
  const [getData, setGetData] = useState({
    id: "",
    dni: "",
    nombre: "",
    paterno: "",
    materno: "",
    genero: "",
    fecha_nacimiento: "01/01/2000",
    telefono: "",
    url: "sdfcreghtukiyjthgrfedsfgrygt",
    estado: "",
    direccion: "",
    correo: "",
    contrasena: "",
    idTipoPersonal: 2,
  });
  const getSelection = (e) => {
    const { name, value } = e.target;
    console.log(`este es el nombre: ${name}`);
    console.log(`este es el nombre: ${value}`);
    setGetData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    const fecha = document.getElementById("date").value;
    setGetData((prevState) => ({ ...prevState, fecha_nacimiento: fecha }));
  };

  const metodoPost = async () => {
    const data = {
        ...getData,
        idTipoPersonal: cargo,
    }
    await axios
      .post("/personal/registrar", getData)
      .then((res) => {
        setRespuesta(res.data);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    // try {

    //     const areas = await validar(getData.area,'area');
    //     const cargos = await validar(getData.cargo,'cargo');

    //     if(editar===0){

    //         if(areas===1 && cargos===1){
    //             await axios.post('http://127.0.0.1:3000/api/TipoTrabajador/registrar',getData)
    //             .then(res => {
    //                 setRespuesta(res.data);})
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //         }
    //     }
    //     else if (editar===1){
    //          if(areas===1 && cargos===1){
    //             await axios.put(`http://127.0.0.1:3000/api/TipoTrabajador/update/${ids}`,getData)
    //             .then(res => {
    //                 setRespuesta(res.data);})
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //             setEditar(0);
    //             setSubTitle('Registrar Tipo Trabajador');
    //             document.getElementById('sudTitle').style.color="#2EA39D";
    //         }
    // }
    // await setConsulta(1);
    // } catch (error) {
    //     console.log('hubo un error: ',error);
    // }
  };

  const [getDataHuella, setData2] = useState([]);
  const todoList = [
    { text: "10:00 AM", id: "500" },
    { text: "10:00 AM", id: "1" },
    { text: "10:00 AM", id: "2" },
    { text: "10:00 AM", id: "3" },
  ];
  const sumaHuellas = () => {
    setGetData((prevState) => ({
      ...prevState,
      idHuellas: getData.idHuellas + 1,
    }));
  };

  const restaHuellas = () => {
    setGetData((prevState) => ({
      ...prevState,
      idHuellas: getData.idHuellas - 1,
    }));
  };

  React.useEffect(() => {
    axios
    .get("/tipoTrabajador/lista/cargo")
    .then((res) => {
      setTipoCargo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="RegistrarPersonal">
      <div className="RegistrarPersonal__menu">
        <Menu />
      </div>
      <form
        className="RegistrarPersonal__cuerpo"
        style={{ backgroundColor: "white", width: "100%", height: "100%" }}
      >
        <div className="RegistrarPersonal__cuerpo-perfil">
          <Perfil />
        </div>
        <div className="RegistrarPersonal__cuerpo-titulo">
          <h1>Personal</h1>
        </div>
        <div className="RegistrarPersonal__cuerpo-contenido">
          <div className="RegistrarPersonal__registrar">
            <div className="RegistrarPersonal__registrar-titulo">
              <h2>Registrar Personal</h2>
            </div>
            <div className="RegistrarPersonal__Combos">
              <div className="RegistrarPersonal__fila1">
                <TextField
                  id="outlined-select-currency"
                  minlength="8"
                  maxlength="8"
                  label="dni"
                  type="text"
                  value={getData && getData.dni}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="dni"
                  onChange={getSelection}
                ></TextField>
                <TextField
                  id="outlined-select-currency"
                  label="Nombre"
                  value={getData && getData.nombre}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="nombre"
                  onChange={getSelection}
                ></TextField>
              </div>
              <div className="RegistrarPersonal__fila2">
                <TextField
                  id="outlined-select-currency"
                  label="apellido paterno"
                  value={getData && getData.paterno}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="paterno"
                  onChange={getSelection}
                ></TextField>
                <TextField
                  id="outlined-select-currency"
                  label="apellido materno"
                  value={getData && getData.materno}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="materno"
                  onChange={getSelection}
                ></TextField>
              </div>
              <div className="RegistrarPersonal__fila2">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="genero"
                  value={getData && getData.genero}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="genero"
                  onChange={getSelection}
                >
                  <MenuItem key="M" value="M">
                    Masculino
                  </MenuItem>
                  <MenuItem key="F" value="F">
                    Femenino
                  </MenuItem>
                </TextField>
                <TextField name="foto" type="file" style={{ width: "49%" }} />
              </div>
              <div className="RegistrarPersonal__fila2">
                <TextField
                  id="date"
                  label="fecha de nacimiento"
                  type="date"
                  style={{ width: "49%" }}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-select-currency"
                  type="number"
                  label="telefono"
                  value={getData && getData.telefono}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="telefono"
                  onChange={getSelection}
                ></TextField>
              </div>
              <div className="RegistrarPersonal__fila2">
                <TextField
                  id="tipoCargo"
                  label="cargo"
                  select
                  value={cargo}
                  required
                  style={{ width: "49%" }}
                  helperText=""
                  onChange={(e) => setCargo(e.target.value)}
                  name="idTipoPersonal"
                >
                  {tipoCargo.map((option) => {
                    return (
                      <MenuItem key={option.id} value={option.id}>
                        {option.cargo}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  type="text"
                  label="correo"
                  value={getData && getData.correo}
                  required
                  style={{ width: "48%" }}
                  helperText=""
                  name="correo"
                  onChange={getSelection}
                ></TextField>
              </div>
              <div className="RegistrarPersonal__fila2">
                <TextField
                  id="outlined-select-currency"
                  type="text"
                  label="direccion"
                  value={getData && getData.direccion}
                  required
                  style={{ width: "100%" }}
                  helperText=""
                  name="direccion"
                  onChange={getSelection}
                ></TextField>
              </div>
            </div>
          </div>
        </div>
        <div className="RegistrarPersonal__botones">
          <button
            type="button"
            className="button"
            onClick={metodoPost}
            style={{ width: "40%" }}
          >
            <h5>Guardar</h5>
          </button>
          <button type="button" className="button" style={{ width: "40%" }}>
            <h5>Cancelar</h5>
          </button>
        </div>
        <div className="RegistrarPersonal__Cerrar">
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
      </form>
    </div>
  );
};

export default RegistrarPersonal;
