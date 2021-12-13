import React from 'react';
import '../assets/Styles/components/Nivel.scss'

const Nivel = (props) => {
    const nivel= props.config;
    return (
        <div className="container__Nivel">
            <div className="Nivel__title"><h3>Nivel:</h3></div>
            <div className="Nivel__colores">
                <div className={ nivel=="Bajo" || nivel=="Medio"|| nivel=="Alto" ? "Nivel__color green1 active" : "Nivel__color green1" } ></div>
                <div className={ nivel=="Medio"|| nivel=="Alto" ? "Nivel__color orange2 active" : "Nivel__color orange2" }></div>
                <div className={ nivel=="Alto" ? "Nivel__color red3 active" : "Nivel__color red3" }></div>
            </div>
            <div className="Nivel__nivel"><h2>{`${nivel}`}</h2></div>
        </div>
    )
}

export default Nivel;