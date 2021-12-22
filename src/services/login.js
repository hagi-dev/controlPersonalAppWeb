import axios from 'axios';

const url= 'http://localhost:3000/api/login';

const login = async (credenciales) => {
    const {data} = await axios.post(url, credenciales);
    return data;
}

export default login;
