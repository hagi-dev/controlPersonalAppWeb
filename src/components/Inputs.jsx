import React from 'react';
import '../assets/Styles/components/Inputs.scss'

const Inputs = (props) => {
    const ancho=props.config1.ancho;
    const title=props.config1.title;
    const placeholder=props.config1.placeholder;
    const type=props.config1.type;
    const name=props.config1.name;
    return (
        <div className="Conteiner">
            <h3>{title}</h3>
            <input style={{width:ancho}} className="input" type="text" name="nombre" placeholder={placeholder}/>
        </div>
    )
}


export default Inputs;