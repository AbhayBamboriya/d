import axios from "axios";
const   BASE_URL='http://localhost:4052/api/v1'
// const changePasswordUrl='localhost:4051/api/v1/user/password'
const axiosInstance=axios.create();
// axiosInstance.defaults.changeUrl=changePasswordUrl
axiosInstance.defaults.baseURL=BASE_URL
axiosInstance.defaults.withCredentials=true
export default axiosInstance