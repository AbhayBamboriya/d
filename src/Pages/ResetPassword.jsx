import { Link, useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../Redux/Slices/AuthSlice";

function ResetPassword(){
    // console.log('ResetPaasword page',url);
    
    const t=4
    const state=useLocation()
    const url= useSelector((state)=>state?.auth?.resetPasswordUrl)
    const [passwordw ,setPassword]=useState({
        password:"",
        // confirmPassword:"",
        url:url
    })
    
   
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        // console.log('hhh',useSelector((state)=>state?.auth?.resetPasswordUrl));
        if(!url){
            console.log('state',state);
            console.log('coming');
            navigate('/')
        }
    })
    // useEffect(()=>{
    //     (
    //         async()=>{
               
    //         }
    //     )()
    // },[])
    // console.log('urlx',url);
    // if(url==undefined){
    //    console.log('d');
    //        navigate('/')
    // }
    

    function handleUserInput(e){
        const {name,value}=e.target;
        // console.log('value',...loginData);
        // console.log(e.target.value);
        // console.log('name',value);
        setPassword({
            ...passwordw,
            [name]:value
        })
        // console.log('password',password);
    }


    // let resetPasswordUrl ;

    async function onReset(e){
        e.preventDefault()
        console.log('try');
        // if(!resetPasswordUrl) navigate('/')
        if(!passwordw.password ){
            toast.error('All Feilds are required');
            return
        }


        const res=await dispatch(resetPassword(passwordw))
        console.log('response from resetppassword',res);
        if(res?.payload?.success){
            navigate('/login')
        }



    }

    
    return(
        <HomeLayout>
             <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={onReset} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Reset Your Password
                    </h1>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Password</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your Password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={passwordw.password}
                            />

                    </div>
                    {/* <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Confirm Password</label>
                        <input type="password"
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter your password"
                            onChange={handleUserInput}
                            value={password.confirmPassword}
                            className="bg-transparent px-2 py-1 border"
                            />
                    </div> */}
                    {/* ype-sumbmit page will get refresh */}
                    <button type="submit" className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>

                </form>

            </div>
        </HomeLayout>
    )
}
export default ResetPassword