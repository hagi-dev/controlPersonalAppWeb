import React from 'react';
import '../assets/Styles/components/Buton.scss'

const Buton = (props) => {
    const ancho=props.configButon.ancho;
    const title=props.configButon.title;
    return (
        <div className="Conteiner1__Boton">
            <button style={{width:ancho,height:"30px", marginTop:"10px"}}><h5>{title}</h5></button>
        </div>
    )
}

export default Buton;
