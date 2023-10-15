import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const user = localStorage.getItem('currentUser');
    if (user) {
        config.headers["token"] = "Bearer " + JSON.parse(user).accessToken;
    }
    /*  let date = new Date();
     const accessToken = user.accessToken;
 
     const decodedToken = jwt_decode(accessToken);
 
     if (decodedToken.exp < date.getTime() / 1000) {
 
         const { data } = await axios.post('http://localhost:8080/api/auth/refreshToken', "Hi", { withCredentials: true });
         const accessToken = data.accessToken;
 
         localStorage.setItem('currentUser', JSON.stringify({ ...user, accessToken }));
     } */
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;