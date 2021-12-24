import styled from 'styled-components';
import clsx from 'clsx';
import React,{useState,useEffect} from 'react';
import foto from "../assets/static/login.svg";
import logo from "../assets/static/logo2.png";
import "../assets/styles/components/Login.scss";
import {TextField,Input,IconButton,InputAdornment,InputLabel,FormControl} from '@material-ui/core';
import { makeStyles , createTheme, withStyles } from '@material-ui/core/styles';
import loginServices from "../services/login";
import Loader from '../components/Loader';
import Cookies from 'universal-cookie';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((p) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: p.spacing(1),
      },
      withoutLabel: {
        marginTop: p.spacing(3),
      },
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
    const cookies = new Cookies();
    const styles = useStyles();
    const [getData,setGetData] = useState({
        usuario:'',
        contraseña:'',
        weight: '',
        showPassword: false,
    });

    const [visibility,setVisibility] = useState("none"); 
    const [error, setError] = useState(false);
    const [user, setUser] = useState([]);
    const [visibleInputs, setVisibleInputs] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setVisibleInputs('none');
            console.log(getData);
            setError("");
            const user1= await  loginServices(getData);
            localStorage.setItem('token',user1.token);
            localStorage.setItem('mensage',user1.message);
            cookies.set('usuario', user1.usuario);
            setUser(user1);
            console.log(user1);
            setGetData({usuario:'',contraseña:''});
            localStorage.getItem("token")==='undefined' ? '' : window.location.href='/home';; 
        } catch (error) {
            setError("ocurrio u error : " + error);
            console.log(error);
        }

    }

    const getSelection =(e) => {
        const {name,value} = e.target;
        setGetData((prevState)=>({ ...prevState, [name]: value}));
        setError("");

    }

    useEffect(()=>{
        if(error || user){  
            localStorage.getItem("token")==='undefined' || !localStorage.getItem("token") ? '' : window.location.href='/home';
            setVisibility("none");
            setVisibleInputs("flex");
        }
    },[error,user]);

    const handleClickShowPassword = () => {
        setGetData({ ...getData, showPassword: !getData.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
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
                <div style={{width:"32vw",height:"70%" }}>
                    <form onSubmit={handleSubmit} style={{width:"100%",height:"100%",padding:"0 20%"}}>
                        <h1 className={styles.h1}>
                            Inicio Sesion
                        </h1>
                        <p style={{fontFamily:"mulish",color:"yellow"}}>{error||user.message}</p>
                        <TextField style={{display:visibleInputs}}  label="Usuario" value={getData&&getData.usuario} id='usuario'  type="text" name= "usuario" onChange={getSelection} />
                        <FormControl className={clsx(styles.margin, styles.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                            <Input  style={{display:visibleInputs}} 
                            value={getData&&getData.contraseña} 
                            id="standard-adornment-password"   
                            onChange={getSelection}  
                            type={getData.showPassword ? 'text' : 'password'} 
                            name= "contraseña" 
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton style={{bottom:"1%"}}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {getData.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                        </FormControl>
                        <button className='enviar' onClick={()=>setVisibility('block')}>Ingresar</button>
                    </form>
                </div>
                <Loader className="loader" visibility={visibility} />
            </Form1>
            <Img className='Img'>
                <div>
                    <img className='img' src={foto} alt="modelo isabella"/>
                    <p className='Titulo'>Control de Personal</p> 
                    <p className='cuerpo'>solo personal autorizado*</p>     
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
            .enviar{
                border-radius:5px;
                font-family: "mulish";
                font-size:1rem;
                width:80%;
                height:10%;
                background-color:rgb(125,15,46);
                position: absolute;
                bottom: 7%;
                left: 10%;
                right: 0%;
            }
            .MuiIconButton-root{
                margin-bottom:25%;
            }
        }
        @media (max-width:800px){
            width:100vw;
        }     
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
         .Titulo{
            margin-bottom:5%;
             font-size:1.5rem;
             color: white;
             font-weight:bold;
         }
         .cuerpo{
             position:absolute;
             bottom:2%;
            font-family: mulish;
           margin-bottom:3%;
            font-size:0.8rem;
            color: white;

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