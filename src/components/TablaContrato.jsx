import React,{forwardRef} from 'react';
import '../assets/Styles/components/TablaContratoHuella.scss';

const TablaContrato = (props) => {
    //var yea=document.getElementById("tabla1").rows.length;
    // const {ancho} = props.config;
    return (
        <table id="tabla-contrato" className="Tabla__contrato" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>Dias</th>
                    <th>Horario</th>
                    <th>Receso</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lunes-Viernes</td>
                    <td>8:00 - 18:00</td>
                    <td>8:00 - 18:00</td>
                    <td><button>Eliminar</button></td>
                </tr>
                <tr>
                    <td>Sabados</td>
                    <td>8:00 - 18:00</td>
                    <td>8:00 - 18:00</td>
                    <td><button>Eliminar</button></td>
                </tr>
            </tbody>
        </table>
    )
}
export default TablaContrato;