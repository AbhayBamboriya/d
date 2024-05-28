 import { useState } from 'react';
import { useDispatch } from 'react-redux'
 import { Link, useNavigate } from 'react-router-dom'
 import { toast } from "react-hot-toast";
 import HomeLayout from '../../Layout/HomeLayout';
import { createNewCourse } from '../../Redux/Slices/CourseSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
 function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userInput,setUserInput] = useState({
        title:'',
        category:'',
        createdBy:'',
        description:'',
        thumbnail:null,
        previewImage:''
    })
    function handleImage(e){
        e.preventDefault()
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader=new FileReader()
            // readAsDataURL  data will be converted into url and then read
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load",function (){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage
                })
            })
        }
    }

    function handleUserInput(e){
        const {name,value} = e.target
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        // it is used becaused as an when the form submitted it will load the page which we wont require

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy){
            toast.error('All fields are mandatory')
            return
        }

        const response = await dispatch(createNewCourse(userInput))
        if(response?.payload?.success){
            setUserInput({
                title:'',
                category:'',
                createdBy:'',
                description:'',
                thumbnail:null,
                previewImage:''
            })
            navigate('/courses')
        }
        

    }
    return( 
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form onSubmit={onFormSubmit}
                    className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative'>
                    <Link className='absollute top-8 text-2xl link text-accent cursor-pointer' onClick={()=>navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </Link>
                    <h1 className='text-center text-2xl font-bold'> 
                            Create New Course
                    </h1>

                    <main className='grid grid-cols-2 gap-x-10'>
                        <div className='gap-y-6'>
                            <div>
                                <label htmlFor="image_uploads" className='cursor-pointer'>
                                    {userInput?.previewImage ? (
                                        <img
                                            className='w-full h-44 m-auto border'
                                            src={userInput.previewImage}
                                        />
                                    ):(
                                        <div className='w-full h-44 m-auto flex items-center justify-center border'>
                                           <h1 className='font-bold text-lg'> Upload your Course Thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input type="file" 
                                    className='hidden'
                                    id='image_uploads'
                                    accept='.jpg,.jpeg,.png' 
                                    name='image_uploads'
                                    onChange={handleImage}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                    <label className='text-lg font-semibold' htmlFor='title'> Course Title</label>
                                    <input 
                                        type="text" 
                                        required 
                                        name='title' 
                                        id='title' 
                                        placeholder='Enter Course Title' 
                                        className='bg-transparent px-2 py-1 border '
                                        value={userInput.title}
                                        onChange={handleUserInput} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-col gap-1'>
                                        <label className='text-lg font-semibold' htmlFor='createdBy'> Course Instructor</label>
                                        <input 
                                            type="text" 
                                            required 
                                            name='createdBy' 
                                            id='createdBy' 
                                            placeholder='Enter Course instructor' 
                                            className='bg-transparent px-2 py-1 border '
                                            value={userInput.createdBy}
                                            onChange={handleUserInput} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-lg font-semibold' htmlFor='category'> Course Category</label>
                                <input 
                                    type="text" 
                                    required 
                                    name='category' 
                                    id='category' 
                                    placeholder='Enter Course category' 
                                    className='bg-transparent px-2 py-1 border '
                                    value={userInput.category}
                                    onChange={handleUserInput} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-lg font-semibold' htmlFor='description'> Course Description</label>
                                <textarea 
                                    type="text" 
                                    required 
                                    name='description' 
                                    id='description' 
                                    placeholder='Enter Course description' 
                                    className='bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none'
                                    value={userInput.description}
                                    onChange={handleUserInput} />
                            </div>
                        </div>
                    </main>
                    <button type='submit' className='w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300'> 
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
 }
 export default CreateCourse