import React from 'react';
import styled from 'styled-components';

const Modal2 = ({children,ancho,alto,estado, cambiarEstado}) => {

	return (
		<>
			{estado && 
				<Overlay >
					<ContenedorModal ancho1={ancho} alto1={alto}>
						<button onClick={() => cambiarEstado(false)} style={{position: 'absolute', top: '-15px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '45px', color: 'black'}}>&times;</button>
						{children}
					</ContenedorModal>
				</Overlay>
			}
		</>
	);
}
 
export default Modal2;


const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background:  rgba(0,0,0,.5) ;
	padding: 40px;
	display: flex;
	align-items:  flex-start;
	justify-content: center;
`;

const ContenedorModal = styled.div`
	width: ${props => props.ancho1};
	min-height: ${props => props.alto1};
	background: #fff;
	position: relative;
	border-radius: 5px;
	box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
	display:grid;
	grid-template-rows: 10% 80% 10%;
    padding: 10px;
	align-items: center;
`;

