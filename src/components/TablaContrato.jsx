import React,{forwardRef} from 'react';
import '../assets/Styles/components/TablaContrato.scss';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/Remove';

const TablaContrato = () => {
    //var yea=document.getElementById("tabla1").rows.length;
    return (
        <table id="tabla-contrato" className="Tabla__contrato">
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