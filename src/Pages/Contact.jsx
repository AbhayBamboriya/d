import { useState } from "react"
import HomeLayout from "../Layout/HomeLayout"
import toast from "react-hot-toast"
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";
function Contact(){
    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    })

    function handleInputChange(e){
        const {name,value} = e.target;
        // console.log();
        console.log(name,value);
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        console.log("eee"+e);
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error('All Fields are neccessary')
            return
        }
        if(!isEmail(userInput.email)){
            toast.error('Invalid Email')
            return 
        }

        try{
            const response=axiosInstance.post('/contact',userInput)
            // toast promises is depending on response
            toast.promise(response,{
                loading:"Submitting your message",
                success:"Form submiited successfully",
                error:"failed to submit the form"
            })
            const constactResponse = await response
            if(constactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:""
                })
            }
        }
        catch(e){
            toast.error('failed to submit the form')
        }
    }
    return(
        
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col item-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                    <h1 className="text-3xl font-semibold text-center">Contact Form</h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                        <input className="bg-transparent border px-2 py-1 rounded-small" id="name" type="text" name="name" placeholder="Enter Your Name" onChange={handleInputChange} value={userInput.name}/>


                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">Email</label>
                        <input className="bg-transparent border px-2 py-1 rounded-small" id="email" type="text" name="email" placeholder="Enter Your Email" onChange={handleInputChange} value={userInput.email}/>
                        

                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">Message</label>
                        <textarea className="bg-transparent resize-none h-40 border px-2 py-1 rounded-small" id="message"  name="message" placeholder="Enter Your Message"  onChange={handleInputChange} value={userInput.message}/>
                        

                    </div>
                    <button type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Contact