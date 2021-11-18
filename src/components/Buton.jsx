import React from 'react';
import '../assets/Styles/components/Buton.scss'

const Buton = (props) => {
    const {ancho,title,marginTop,alto,id}=props.configButon;
    return (
            <button style={{width:ancho,height:alto}} id={id} ><h5>{title}</h5></button>
    )
}

export default Buton;
