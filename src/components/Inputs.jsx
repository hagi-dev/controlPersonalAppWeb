import React from 'react';
import '../assets/Styles/components/Inputs.scss'

const Inputs = (props) => {
    
    const ancho=props.configInput.ancho;
    const title=props.configInput.title;
    const type=props.configInput.type;
    const placeholder=props.configInput.placeholder;
    const name=props.configInput.name;
    const paddingLetf=props.configInput.paddingLetf;
    const paddingRight=props.configInput.paddingRight;
    const anchoContenedor=props.configInput.anchoContenedor;
    const padding=props.configInput.padding;
    const border=props.configInput.border;
    return (
        <div className="Conteiner" style={{ width:anchoContenedor,paddingLeft:paddingLetf, paddingRight:paddingRight}}>
            <h3>{title}</h3>
            <input style={{width:ancho , padding: padding,border:border }} className="input" type={type} name={name} placeholder={placeholder}/>
        </div>
    )
}


export default Inputs;

/* "text" */