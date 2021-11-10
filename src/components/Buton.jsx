import React from 'react';
import '../assets/Styles/components/Buton.scss'

const Buton = (props) => {
    const ancho=props.configButon.ancho;
    const title=props.configButon.title;
    return (
        <div className="Conteiner1__Boton">
            <button style={{width:ancho,height:"45px"}}><h4>{title}</h4></button>
        </div>
    )
}

export default Buton;
