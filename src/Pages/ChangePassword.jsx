import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../Redux/Slices/AuthSlice";


function ChangePassword(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [credential,setCredential]=useState({
        password:"",
        setPassword:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        // console.log('value',...loginData);
        setCredential({
            ...credential,
            [name]:value
        })
    }

    
    async function onChangePassword(e){
        e.preventDefault();
        // console.log('mail',mail);
        if(!credential.password || !credential.setPassword){
            toast.error('Please fill the details');
            return
        }
        
        if(!credential.setPassword.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)){
            toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase')
            return
        }
        const res=await dispatch(changePassword(credential));
        // if()
        console.log('res is in chage',res);
        
        if(res?.payload?.success){
            navigate('/')
        }
        setCredential({
            // credential:"",
            password:"",
            setPassword:""
        })
        
    }
    
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={onChangePassword} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Reset Password
                    </h1>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Current Password</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your Current Password"
                            onChange={handleUserInput}
                            value={credential.password}
                            // value={
                            className="bg-transparent px-2 py-1 border"
                            />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Changed Password</label>
                        <input type="password"
                            required
        
                            name="setPassword"
                            id="setPassword"
                            placeholder="Enter your Changed Password"
                            onChange={handleUserInput}
                            value={credential.setPassword}
                            // value={
                            className="bg-transparent px-2 py-1 border"
                            />
                    </div>

                    {/* pe-sumbmit page will get refresh */}
                    <button type="submit" className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>

            </div>
        </HomeLayout>
    )
}
export default ChangePassword