import React, { useState, useEffect } from "react";
import "../assets/Styles/components/RegistrarPersonal.scss";
import "../assets/Styles/components/Buton.scss";
import Menu from "../components/Menu";
import axios from "axios";
import Perfil from "../components/Usuario";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";

const RegistrarPersonal = () => {
  const [tipoCargo, setTipoCargo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      dni: "",
      nombre: "",
      paterno: "",
      materno: "",
      genero: "",
      fecha_nacimiento: "2000-01-01",
      telefono: "",
      url: "",
      direccion: "",
      correo: "",
      idTipoPersonal: 2,
    },
    validationSchema: Yup.object({
      dni: Yup.string().length(8, "El DNI debe tener 8 caracteres").required("El DNI es requerido"),
      nombre: Yup.string().required("El nombre es requerido"),
      paterno: Yup.string().required("El apellido paterno es requerido"),
      materno: Yup.string().required("El apellido materno es requerido"),
      genero: Yup.string().required("El género es requerido"),
      fecha_nacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
      telefono: Yup.string().length(9, "El teléfono debe tener 9 caracteres").required("El teléfono es requerido"),
      direccion: Yup.string().required("La dirección es requerida"),
      correo: Yup.string().email("Correo inválido").required("El correo es requerido"),
      idTipoPersonal: Yup.number().required("El cargo es requerido"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post("/personal/registrar", values)
        .then((res) => {
          if(res.data.status){
            window.location.href = "/personal";
          }
        })
        alert(response.data.message);
      } catch (error) {
        console.error("Error al registrar el personal:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
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
        onSubmit={formik.handleSubmit}
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
                <label htmlFor="dni">DNI</label>
                <input
                  className="input-general"
                  type="text"
                  name="dni"
                  placeholder="DNI"
                  value={formik.values.dni}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dni && formik.errors.dni ? (
                  <div className="error">{formik.errors.dni}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="nombre">Nombre</label>
                <input
                  className="input-general"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="error">{formik.errors.nombre}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="paterno">Apellido Paterno</label>
                <input
                  className="input-general"
                  type="text"
                  name="paterno"
                  placeholder="Apellido Paterno"
                  value={formik.values.paterno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.paterno && formik.errors.paterno ? (
                  <div className="error">{formik.errors.paterno}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="materno">Apellido Materno</label>
                <input
                  className="input-general"
                  type="text"
                  name="materno"
                  placeholder="Apellido Materno"
                  value={formik.values.materno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.materno && formik.errors.materno ? (
                  <div className="error">{formik.errors.materno}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="genero">Género</label>
                <select
                  className="input-general"
                  name="genero"
                  value={formik.values.genero}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Seleccione género" />
                  <option value="M" label="Masculino" />
                  <option value="F" label="Femenino" />
                </select>
                {formik.touched.genero && formik.errors.genero ? (
                  <div className="error">{formik.errors.genero}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                <input
                  className="input-general"
                  type="date"
                  name="fecha_nacimiento"
                  value={formik.values.fecha_nacimiento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento ? (
                  <div className="error">{formik.errors.fecha_nacimiento}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  className="input-general"
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <div className="error">{formik.errors.telefono}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="idTipoPersonal">Cargo</label>
                <select
                  className="input-general"
                  name="idTipoPersonal"
                  value={formik.values.idTipoPersonal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Seleccione cargo" />
                  {tipoCargo.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.cargo}
                    </option>
                  ))}
                </select>
                {formik.touched.idTipoPersonal && formik.errors.idTipoPersonal ? (
                  <div className="error">{formik.errors.idTipoPersonal}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="correo">Correo</label>
                <input
                  className="input-general"
                  type="text"
                  name="correo"
                  placeholder="Correo"
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.correo && formik.errors.correo ? (
                  <div className="error">{formik.errors.correo}</div>
                ) : null}
              </div>
              <div className="RegistrarPersonal__fila1">
                <label htmlFor="direccion">Dirección</label>
                <input
                  className="input-general"
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.direccion && formik.errors.direccion ? (
                  <div className="error">{formik.errors.direccion}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="RegistrarPersonal__botones">
          <button
            type="submit"
            className="button"
            disabled={isLoading || !formik.isValid}
            style={{ width: "40%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isLoading ? <CircularProgress size={14} /> : <h5>Guardar</h5>}
          </button>
          <button type="button" className="button" style={{ width: "40%" }} onClick={() => window.location.href = "/personal"}>
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