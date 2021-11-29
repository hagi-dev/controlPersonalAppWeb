import React from 'react';
import '../assets/Styles/components/Inputs.scss'

const Inputs = (props) => {
    const {ancho,title,type,placeholder,name,paddingLeft,paddingRight,anchoContenedor,padding,border} = props.configInputs;
    return (
        <div className="Conteiner" style={{ width:anchoContenedor,paddingLeft:paddingLeft, paddingRight:paddingRight}}>
            <h3>{title}</h3>
            <input style={{width:ancho , padding: padding,border:border }} className="input" type={type} name={name} placeholder={placeholder}/>
        </div>
    )
}


export default Inputs;

/* "text" */