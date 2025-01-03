import { useEffect, useState } from "react"
import HomeLayout from "../Layout/HomeLayout"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { login } from "../Redux/Slices/AuthSlice"

function Login(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const state=useLocation()
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        // console.log('value',...loginData);
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

    
    async function onLogin(e){
        e.preventDefault();
        if(!loginData.email || !loginData.password){
            toast.error('Please fill all the details');
            return
        }

       

        // dispatch creae account action
        const response=await dispatch(login(loginData))
        // going o home page
        console.log('respone- '+response);
        if(response?.payload?.success) navigate('/')
        // clearing all the entry
        setLoginData({
            email:"",
            password:"",
        })

    }
    // useEffect(()=>{
    //     (
    //         async()=>{
    //             if(state?.auth?.resetPasswordUrl){
    //                 console.log('coming');
    //                 navigate('/resetPassword')
    //             }
    //         }
    //     )()
    // },[])
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>
                   
                    
                   
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                            />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                            />
                    </div>
                    {/* ype-sumbmit page will get refresh */}
                    <button type="submit" className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Login
                    </button>
                    <p className="text-center"> Forgot Password ?  <Link to='/forgot' className="link text-accent cursor-pointer">Click Here</Link></p>
                    <p className="text-center">Do not have an Account ? <Link to='/signup' className="link text-accent cursor-pointer">Signup</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}
export default Login