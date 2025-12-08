import { useState } from "react"
import HomeLayout from "../Layout/HomeLayout"
import { BsPersonCircle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { createAccount } from "../Redux/Slices/AuthSlice"
import { isEmail } from "../Helpers/regexMatcher"
function SignUp(){
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState('')
    const [signupData,setSignupData]=useState({
        fullName:"",
        email:"",
        password:"",
        avatar:"",
        role:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    function getImage(e){
        event.preventDefault();
        // getting the image on login
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar:uploadedImage
            })
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                // console.log(this.result);
                setPreviewImage(this.result)
            })

        }
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.avatar || !signupData.email || !signupData.fullName || !signupData.password || !signupData.role){
            toast.error('Please fill all the details');
            return
        }

        

        if(!signupData.fullName.match(/^[A-Za-z]+(?: [A-Za-z]+)*$/)){
            toast.error('Name should be legit')
            return
        }
        // o get email validator regex google-email regex javascript 
        // checking for the valid email
        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }

        // cheking password validation
       
        // (/^
        // (?=.*\d)                //should contain at least one digit
        // (?=.*[a-z])             //should contain at least one lower case
        // (?=.*[A-Z])             //should contain at least one upper case
        // [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

        // $/)
        if(!signupData.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)){
            toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase')
            return
        }
        
        const formData=new FormData();
        formData.append("fullName",signupData.fullName)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("avatar",signupData.avatar)
        formData.append("role",signupData.role)
        // dispatch creae account action
        console.log('form data',formData);
        const response=await dispatch(createAccount(formData))
        // going o home page
        console.log('respone- '+response);
        if(response?.payload?.success) navigate('/')
        // clearing all the entry
        // setPreviewImage('')
        // setSignupData({
        //     fullName:"",
        //     email:"",
        //     password:"",
        //     avatar:"",
        //     role:""
        // })



    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]"> 
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>
                        )}
                    </label>
                    <input 
                            className="hidden" 
                            type="file" 
                            onChange={getImage}
                            // name through which it will go to server
                            name="image_uploads"
                            id="image_uploads"
                            accept=".jpg,.jpeg,.png,.svg "
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                            />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.email}
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
                            value={signupData.password}
                            />
                    </div>
                    <select id="options" style={{ backgroundColor: 'transparent' }} className="bg-transparent mt-1 block w-full border text-3 md:h-[10%] lg:h-[10%]  max-sm:h-[20%] border-gray-300 bg-white p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signupData.role} onChange={handleUserInput}>
                        <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
                        <option value="ADMIN" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Admin</option>
                        <option value="USER" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>User</option>
                    </select>
                    {/* ype-sumbmit page will get refresh */}
                    <button type="submit" className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer">
                        Create Account
                    </button>
                    <p className="text-center">Already have an Account ? <Link to='/login' className="link text-accent cursor-pointer">Login</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}
export default SignUp