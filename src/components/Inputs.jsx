import React from 'react';
import '../assets/Styles/components/Inputs.scss'

const Inputs = (props) => {
    
    const ancho=props.configInput.ancho;
    const title=props.configInput.title;
    const type=props.configInput.type;
    const placeholder=props.configInput.placeholder;
    const name=props.configInput.name;
    return (
        <div className="Conteiner">
            <h3>{title}</h3>
            <input style={{width:ancho , marginRight:"19px"}} className="input" type={type} name="nombre" placeholder={placeholder}/>
        </div>
    )
}


export default Inputs;

/* "text" */