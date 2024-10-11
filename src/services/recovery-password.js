import axios from "axios";

const url = "http://localhost:3000/api/";

const verifyEmail = async (body) => {
  const { data } = await axios.post(url + "recovery-password", body);
  return data;
};

const changePassword = async (body) => {
  const dni = body.dni;
  const { data } = await axios.post(
    `${url}personal/update-password/${dni}`,
    body
  );
  return data;
};

export { verifyEmail, changePassword };
