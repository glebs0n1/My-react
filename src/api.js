// import axios from "axios";

// const API_URL = "http://localhost:8081/auth";

// export const RegistrationForm = async(username, password) => {
//     try {
//         const response = await axios.post(`${API_URL}auth/register`, {
//             username,
//             password,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // Login an existing user
// export const LoginForm = async(username, password) => {
//     try {
//         const response = await axios.post(`${API_URL}auth/login`, {
//             username,
//             password,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };