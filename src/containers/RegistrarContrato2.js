import Menu from "../components/Menu";
import Perfil from "../components/Usuario";
import { TextField, MenuItem, FormControl, FormGroup } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/Styles/components/Buton.scss";
import "../assets/Styles/components/RegistrarContrato.scss";
import "../assets/Styles/components/Buton.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Download from "@material-ui/icons/GetApp";

const defaultForm = {
  idContrato: "",
  fechaInicioContrato: new Date().toISOString().split("T")[0],
  // mas 6 meses por defecto desde hoy
  fechaFinContrato: new Date(new Date().setMonth(new Date().getMonth() + 6))
    .toISOString()
    .split("T")[0],
  dni: "",
  idHorario: undefined,
  file: "",
  personalId: "",
};

const RegistrarContrato2 = () => {
  const { idContrato } = useParams();
  const [horario, setHorario] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [enableAddContract, setEnableAddContract] = useState(false);
  const [addContract, setAddContract] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState(defaultForm);
  const [historyContact, setHistoryContact] = useState([]);
  const getSelection = (e) => {
    const { name, value } = e.target;
    setGetData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handlerChangeDni = (e) => {
    setEnableAddContract(false);
    setGetData((prevState) => ({ ...defaultForm, dni: e.target.value }));
  };
  const getSelectionFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      formik.setValues("file", file);
    } else {
      alert("Por favor, seleccione un archivo PDF.");
    }
  };

  const handlerAddContract = async () => {
    setAddContract(!addContract);
  };

  const formik = useFormik({
    initialValues: defaultForm,
    validationSchema: Yup.object({
      dni: Yup.string().required("Requerido"),
      idHorario: Yup.number().required("Requerido"),
      fechaInicioContrato: Yup.date().required("Requerido"),
      fechaFinContrato: Yup.date().required("Requerido"),
      file: Yup.mixed().required("Requerido"),
    }),
    onSubmit: async (values) => {
      console.log(values, "wudishoqsqsqsqsqsqs");
      enviarPost(values);
    },
  });

  const verId = async (e) => {
    console.log(formik.values);
    await axios
      .get(`/contrato/verificationPersonalAndContract/${formik.values.dni}`)
      .then((res) => {
        console.log("vervver",res);
        if (!res.data.status && res.data.message) {
          alert(res.data.message);
        }
        setEnableAddContract(res.data.status);
        console.log(res);
        setGetData((prevState) => ({
          ...prevState,
          personalId: res.data.personalId,
        }));
      });
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

  const enviarPost = async () => {
    const data = formik.values;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("dni", data.dni ?? "");
    formData.append("idHorario", data.idHorario ?? "");
    formData.append("fechaInicioContrato", data.fechaInicioContrato ?? "");
    formData.append("fechaFinContrato", data.fechaFinContrato ?? "");
    formData.append("file", data.file);
    formData.append("personalId", data.personalId ?? "");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("dni", formik.values.dni);
    console.log("idHorario", formik.values.idHorario);
    console.log("fechaInicioContrato", formik.values.fechaInicioContrato);
    console.log("fechaFinContrato", formik.values.fechaFinContrato);
    console.log("file", formik.values.file);
    console.log("personalId", formik.values.personalId);
    if (isEdit) {
      console.log("editando", data);
      axios
        .put(`/contrato/update/${idContrato}`, formData, config)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          alert(
            res.data.message
              ? res.data.message
              : "Contrato actualizado correctamente."
          );
          window.location.href = "/contratos";
        })
        .catch((err) => {
          console.log(err);
          alert("Error al actualizar el contrato.");
        });
    } else {
      axios
        .post("/contrato/registrar", formData, config)
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          alert(
            res.data.message
              ? res.data.message
              : "Contrato registrado correctamente."
          );
          if(res.data.status){
            window.location.href = "/contratos";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error al registrar el contrato.");
        });
    }
  };

  const getHistoryContract = async () => {
    axios.get(`/contrato/listContractFiles/${idContrato}`).then((res) => {
      console.log(res);
      setHistoryContact(res.data);
    });
  };

  const handleDeleteContract = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este contrato?")) {
      axios
        .delete(`/contrato/file/${id}`)
        .then((res) => {
          console.log(res);
          alert(
            res.data.message
              ? res.data.message
              : "Contrato eliminado correctamente."
          );
          getHistoryContract();
        })
        .catch((err) => {
          console.log(err);
          alert("Error al eliminar el contrato.");
        });
    }
  };

  useEffect(() => {
    if (idContrato !== "nuevo") {
      setIsEdit(true);
      setEnableAddContract(true);
      axios
        .get(`/contrato/fullContract/${idContrato}`)
        .then((res) => {
          console.log(res);
          formik.setValues({
            dni: res.data[0].dni,
            idHorario: res.data[0].idHorario,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsEdit(false);
    }
  }, [idContrato]);

  useEffect(() => {
    axios
      .get("/horario")
      .then((res) => {
        setHorario(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(getData && getData.fechaFinContrato);
  }, []);

  useEffect(() => {
    getHistoryContract();
  }, [idContrato]);

  return (
    <div className="RegistrarContrato">
      <div className="RegistrarContrato__menu">
        <Menu />
      </div>
      <div
        className="RegistrarContrato__cuerpo"
        style={{ backgroundColor: "white", width: "100%", height: "100%" }}
      >
        <div className="RegistrarContrato__cuerpo-perfil">
          <Perfil />
        </div>
        <div className="RegistrarContrato__cuerpo-titulo">
          <h1>Contratos</h1>
        </div>

        <div className="RegistrarContrato__cuerpo-contenido">
          <div className="RegistrarContrato__registrar">
            <div className="RegistrarContrato__registrar-titulo">
              <h2>Registrar Contratos</h2>
            </div>
            <div className="RegistrarContrato__Combos">
              {!isEdit && <p>primero valida tu dni**</p>}
              <div className="RegistrarContrato__fila3">
                <TextField
                  id="outlined-select-currency"
                  label="Dni:"
                  type="number"
                  disabled={isEdit && historyContact.length > 0}
                  className="fieldCustom"
                  value={formik.values.dni}
                  required={true}
                  error={formik.errors.dni}
                  style={{ width: "100%", maxWidth: "250px" }}
                  onChange={(e) => {
                    formik.resetForm();
                    formik.setFieldValue("dni", e.target.value);
                  }}
                  name="dni"
                ></TextField>
                {!isEdit && (
                  <div>
                    <IconButton onClick={verId} aria-label="Agregar">
                      <SearchIcon fontSize="large" />
                    </IconButton>
                  </div>
                )}
              </div>
              {enableAddContract && (
                <>
                  <div className="RegistrarContrato__fila_33 fieldCustom">
                    <label htmlFor="horario" className="fieldCustom">
                      Horario
                    </label>
                    <select
                      id="horario"
                      name="idHorario"
                      className="fieldCustom"
                      value={formik.values.idHorario}
                      required={true}
                      onChange={(e) => {
                        formik.setFieldValue("idHorario", e.target.value);
                      }}
                      style={{ width: "100%", maxWidth: "250px" }}
                    >
                      <option value="" label="Seleccione un horario" />
                      {horario.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.detalle} {option.entrada} - {option.salida}
                        </option>
                      ))}
                    </select>
                    {formik.touched.idHorario && formik.errors.idHorario ? (
                      <div className="error">{formik.errors.idHorario}</div>
                    ) : null}
                  </div>
                  {isEdit && (
                    <>
                      <div
                        className="RegistrarContrato__fila44"
                        width="100%"
                        id="fila4"
                      >
                        <h1>Ultimos contratos</h1>
                        {historyContact.map((item) => (
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                            id="fila4"
                            key={`contract-${item.id}`}
                          >
                            <h2>
                              {formatearFechaEspañol(item.fecha_inn)} -{" "}
                              {formatearFechaEspañol(item.fehcha_out)}
                            </h2>
                            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                              <a
                                href={`data:application/pdf;base64,${item.file}`}
                                download="contrato.pdf"
                                style={{
                                  color: "#7D0F2E",
                                  textDecoration: "underline",
                                }}
                              >
                                <IconButton><Download titleAccess="Descargar contrato" /></IconButton>
                              </a>
                              <IconButton onClick={() => handleDeleteContract(item.id)}>
                                <DeleteOutline titleAccess="Eliminar contrato" />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {isEdit && !addContract && (
                    <button onClick={handlerAddContract}>
                      Agregar nuevo contrato
                    </button>
                  )}

                  {(addContract || (enableAddContract && !isEdit)) && (
                    <div>
                      <div className="RegistrarContrato__fila3">
                        <TextField
                          id="date"
                          className="fieldCustom"
                          label="fecha de inicio"
                          type="date"
                          name="fechaInicioContrato"
                          style={{ width: "100%", maxWidth: "250px" }}
                          value={formik.values.fechaInicioContrato}
                          required={true}
                          // InputProps={{ inputProps: { min: fechaMinima } }}
                          onChange={(e) => {
                            console.log(e.target);
                            formik.setFieldValue(
                              "fechaInicioContrato",
                              e.target.value
                            );
                          }}
                          error={formik.errors.fechaInicioContrato}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div className="RegistrarContrato__fila3">
                        <TextField
                          id="date2"
                          className="fieldCustom"
                          // InputProps={{ inputProps: { min: fechaMax } }}
                          label="fecha de fin"
                          name="fechaFinContrato"
                          type="date"
                          style={{
                            width: "100%",
                            maxWidth: "250px",
                            fontSize: "1.5rem",
                          }}
                          value={formik.values.fechaFinContrato}
                          required={true}
                          onChange={(e) => {
                            console.log(e.target.value);
                            formik.setFieldValue(
                              "fechaFinContrato",
                              e.target.value
                            );
                            console.log(formik.values);
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div className="RegistrarContrato__fila_33 fieldCustom">
                        <label
                          htmlFor="fieldContract"
                          style={{ fontFamily: "Roboto" }}
                        >
                          Contrato (PDF):
                        </label>
                        <input
                          id="fieldContract"
                          type="file"
                          accept="application/pdf"
                          style={{ width: "100%", maxWidth: "250px" }}
                          onChange={getSelectionFile}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="RegistrarContrato__botones">
              <button
                // disabled={estadoInput}
                className="button"
                type="button"
                onClick={formik.handleSubmit}
                style={{ width: "45%" }}
                // disabled={isLoading || !formik.isValid}
              >
                Guardar
              </button>
              <button
                className="button"
                onClick={() => (window.location.href = "/contratos")}
                style={{ width: "45%" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarContrato2;
