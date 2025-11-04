import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgot, found } from "../Redux/Slices/AuthSlice";
// import ResetPassword from "./ResetPassword";
// import { toast } from "react-toastify";
function ForgotPassword(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [mail,setMail]=useState({
        email:"",
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        // console.log('value',...loginData);
        setMail({
            ...mail,
            [name]:value
        })
    }

    async function makeRequest() {
        console.log('before');
  
        setTimeout(() => {
            console.log("This message appears after 3 seconds");
        }, 3000); // 3000ms = 3 seconds
        
  
        console.log('after');
      }
  
// import toast from "react-hot-toast";

async function onForgot(e) {
    e.preventDefault();

    if (!mail.email) {
        toast.error("Please fill the details");
        return;
    }

    // Create a loading toast and store its ID
    const loadingToastId = toast.loading("Sending reset link...");

    try {
        const token = await dispatch(forgot(mail));
        console.log("token", token);

        if (token?.payload?.data?.success) {
            toast.success("Reset link sent successfully! Check your mail", { id: loadingToastId ,duration:2000 });
            // navigate("/resetPassword");
        } else {
            toast.error("Something went wrong! Try again.", { id: loadingToastId });
        }
    } catch (error) {
        toast.error("Server error! Please try later.", { id: loadingToastId });
    }

    setMail({ email: "" });
}

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={onForgot} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Forgot Password
                    </h1>



                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            onChange={handleUserInput}
                            value={mail.email}
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
export default ForgotPassword