import styled from 'styled-components';
import React,{useState} from 'react';
import foto from "../assets/static/login.svg";
import logo from "../assets/static/logo2.png";
import "../assets/styles/components/Login.scss";
import {TextField} from '@material-ui/core';
import { makeStyles , createTheme, withStyles } from '@material-ui/core/styles';
import loginServices from "../services/login";

const useStyles = makeStyles((p) => ({

    TextField:{
        color:"yellow",
        
    },
    h1:{
        color:"#fff",
        textAlign:"center",
        marginBottom:"10%",
        fontFamily:"mulish",
        marginTop:"5%",
    }}));

const Login = () => {
    const styles = useStyles();
    const [getData,setGetData] = useState({
        usuario:'',
        contraseña:''
    });
    const [error, setError] = useState(false);
    const [user, setUser] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(getData);
            const user1= await  loginServices(getData);
            setUser(user1);
            console.log(user1);
            setGetData({usuario:'',contraseña:''});

                
        } catch (error) {
            setError("ocurrio u error : " + error);
            console.log(error);
        }

    }

    const getSelection =(e) => {
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));
    }
    
    return (
        <Contenedor>

            <Header>
                <img src={logo} className='logo' alt="logo" />
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Youtube</li>
                </ul>
            </Header>
            <Form1>
                <div style={{width:"32vw",height:"70%"}}>
                    <form onSubmit={handleSubmit} style={{width:"100%",height:"100%",padding:"0 20%"}}>
                        <h1 className={styles.h1}>
                            Login
                        </h1>
                        <p>{error}</p>
                        <TextField label="Usuario" value={getData&&getData.usuario}  type="text" name= "usuario" onChange={getSelection} />
                        <TextField label="Contraseña" value={getData&&getData.contraseña}   onChange={getSelection}  type="password" name= "contraseña" />
                        <button>Ingresar</button>
                    </form>
                </div>
            </Form1>
            <Img className='Img'>
                <div>
                    <img className='img' src={foto} alt="modelo isabella"/>
                    <p>Control de Personal</p>     
                </div>
            </Img>
        </Contenedor>
    )
}

export default Login;
 const Contenedor= styled.div`
    width:100vw;
    height:100vh;
    background: rgb(125,15,46);
    background: linear-gradient(180deg, rgba(125,15,46,1) 40%, rgba(43,247,200,1) 100%);
    display:flex;
    flex-wrap:wrap;
    overflow:hidden;
    position:relative;

 `;

 const Header= styled.div`
    margin-top:1%;
    width:100vw;
    display:flex;
    height:10vh;
    ul{
        text-decoration:none;
        list-style:none;
        width:100%;
        height:100%;
        display:flex;
        justify-content:flex-end;
        li{
            font-family: "mulish";
            margin:0 1vw;
            color:white;
        }
    }
    .logo{
        width:auto;
        height:90%;
        margin-left:2%;
    }
 `;

const Form1= styled.div`
    width:50vw;
    height:90vh;
    display:flex;
    justify-content:flex-end;
    align-items:flex-start;
    padding-right:5%;

    div{
        display:flex;
        fle-wrap:wrap;
        justify-content:center;
        margin-top:5%;
        form{
            padding-top:5%;
            padding-right:5%;
            background-color: rgba(237, 241, 241,0.3);
            backdrop-filter: blur(2px);
            border-radius:4%;
            box-shadow:0 5px 45px rgba(255, 255, 255, 0.3);
            button{
                margin-top:45%; 
                border-radius:5px;
                font-family: "mulish";
                font-size:1rem;
                width:100%;
                height:10%;
                background-color:rgb(125,15,46);
            }
        }     
    }
    
    
    @media (max-width:800px){
        width:100vw;
    }
`;

const Img= styled.div`
    width:50vw;
    height:90vh;
    display:flex;
    justify-content: flex-start;
    padding-left:5%;
    margin-top: 1.5%;
    div{
        width:32vw;
        height:73%;
        position:relative;
        animation-duration: 4s;
        animation-name: example;
        transform: translateX(0);
        flex-wrap:wrap;
        display:flex;
        justify-content:center;
        align-items:center;
        animation-iteration-count: infinite;
        -webkit-animation-name: example; /* Chrome, Safari, Opera */
        -webkit-animation-duration: 4s;
        animation-timing-function: ease-out;
        background-color: rgba(237, 241, 241,0.2);
        backdrop-filter: blur(2px);
        border-radius: 50%;
        box-shadow:0 5px 45px rgba(255, 255, 255, 0.2);
        .img{
            width:auto;
            height:70%;
         }
         p{
             font-family: roboto;
            margin-bottom:5%;
             font-size:1.5rem;
             color: white;
             font-weight:bold;
         }

        @media (max-width:1300px){
            width:468px;
            height:478px;
        } 
    }
    @keyframes example {
        0%   {left:0px; top:-5px;}
        50%  {left:0px; top:20px;}
        100% {left:0px; top:-5px;}
    }
`;