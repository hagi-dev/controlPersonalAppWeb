import axios from 'axios';

const url= `${process.env.REACT_APP_API_HOST}/api/login`;
console.log(url);
const login = async (credenciales) => {
    const {data} = await axios.post(url, credenciales);
    return data;
}

export default login;
