import axios from "axios";
const   BASE_URL='localhost:4052/api/v1/user/password'
const changePasswordInstance=axios.create();
changePasswordInstance.defaults.baseURL=BASE_URL
changePasswordInstance.defaults.withCredentials=true
export default changePasswordInstance