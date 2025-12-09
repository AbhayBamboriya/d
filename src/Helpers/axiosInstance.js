
import axios from "axios";
const BASE_URL="https://lms-server-10l8.onrender.com/api/v1"
// const BASE_URL="http://localhost:4050/api/v1"
// const BASE_URL="https://lms-server-kc50bkrc3-abhays-projects-efa9d066.vercel.app/"

const  axiosInstance=axios.create(); 
const url1 = import.meta.env.URL1;
console.log('fss',url1);

axiosInstance.defaults.baseURL=BASE_URL
axiosInstance.defaults.withCredentials=true
export default axiosInstance