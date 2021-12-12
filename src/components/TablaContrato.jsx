import React,{forwardRef} from 'react';
import '../assets/Styles/components/TablaContratoHuella.scss';

const TablaContrato = (props) => {
    //var yea=document.getElementById("tabla1").rows.length;
    // const {ancho} = props.config;
    return (
        <table id="tabla-contrato" className="Tabla__contrato" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Dias</th>
                    <th>Horario</th>
                    <th>Receso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}
export default TablaContrato;