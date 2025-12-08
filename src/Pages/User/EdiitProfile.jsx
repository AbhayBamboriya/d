import { useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice'
import HomeLayout from '../../Layout/HomeLayout'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import toast from "react-hot-toast";

function EditProfile(){
    const dispatch =  useDispatch()
    const navigate=useNavigate()
    const [data,setData]=useState({
        previewImage:'',
        fullName:"",
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleImageUpload(e){
        e.preventDefault()
        const uploadedImage=e.target.files[0]
        if(uploadedImage){
            const fileReader =new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load",function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadedImage
                })
            })
        }

    }
    function handleInputChange(e){
        const {name,value}=e.target
        setData({
            ...data,
            [name]:value
        })
    }

    async function onFormsubmit(e){
        e.preventDefault()
        console.log(data);
        if(!data.avatar && !data.fullName){
            toast.error('Name or Profile is mandatory')
            return
        }
        if(data.fullName){
            toast.error('Name should be greater then 5 character')
            return
        }
        if(!data.fullName.match(/^[A-Za-z]+(?: [A-Za-z]+)*$/)){
            toast.error('Name should be legit')
            return
        }
        const formData=new FormData()
        formData.append('fullName', data.fullName)
        formData.append('avatar',data.avatar)
        // console.log(formData.entries().next())
        // console.log(formData.entries().next())
        // api request
        await dispatch(updateProfile([data.userId,formData]))
        console.log("dispatch",data);
        await dispatch(getUserData())
        console.log("user",data);
        navigate('/user/profile')

    }
    // console.log("ddd"+data.fullName);
    return(
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form 
                    noValidate
                    onSubmit={onFormsubmit}
                    className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]'>
                        <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
                        <label htmlFor="image_uploads" className='cursor-pointer'>
                            {data.previewImage ? (
                                <img className='w-28 h-28 rounded-full m-auto'
                                    
                                    src={data.previewImage}/>
                            ):(
                                <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                            )}
                        </label>
                        <input
                            onChange={handleImageUpload}
                            className='hidden'
                            type='file'
                            id='image_uploads'
                            name='image_uploads'
                            accept='.jpg, .png, .svg , .jpeg'

                        />
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="fullName" className='text-lg font-semibold'>Full Name</label>
                            <input
                                required
                                type='text'
                                name='fullName'
                                id='fullName'
                                placeholder='Enter Your Name'
                                className='transparent px-2 py-1 border'
                                value={data.fullName}
                                onChange={handleInputChange}
                                />
                        </div>

                        <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer'>
                            Update Profile
                        </button>
                        <Link to='/user/profile'>
                            <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-3'>
                                  <AiOutlineArrowLeft/>  Go Back to Profile
                            </p>
                        </Link>
                </form>
            </div>
        </HomeLayout>
    )

}
export default EditProfile