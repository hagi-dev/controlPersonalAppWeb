import React,{forwardRef} from 'react';
import '../assets/Styles/components/TablaContratoHuella.scss';

const TablaHuella = () => {
    //var yea=document.getElementById("tabla1").rows.length;
    return (
        <table id="tabla-contrato" className="Tabla__contrato" style={{width:'70%'}}>
            <thead>
                <tr>
                    <th style={{width:'50%'}}>huella</th>   
                    <th style={{width:'20%'}}></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>kdjkkfjmchndk,dsx5dx55xsdcdkdxkd</td>
                    <td><button>Eliminar</button></td>
                </tr>
                <tr>
                    <td>ldoekdcfoekdcfporfkorfkrpprfkr55</td>
                    <td><button>Eliminar</button></td>
                </tr>
            </tbody>
        </table>
    )
}
export default TablaHuella;