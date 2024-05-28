import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layout/HomeLayout"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { addCourseLecture } from "../../Redux/Slices/LectureSlice"
import { AiOutlineArrowLeft } from "react-icons/ai"

function Addlecture(){
    // state information is passed  
    const courseDetails=useLocation().state
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[userInput,setUserInput]=useState({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    })

    function handleInputChange(e){
        const {name,value}=e.target
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        const video=e.target.files[0]
        // converting video into url
        const source=window.URL.createObjectURL(video)
        console.log(source);
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source  
        })

    }

    async function onFormsubmit(e){
        e.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error('All fields are mandatory')
            return
        }
        console.log("userinput",userInput);
        const response=await dispatch(addCourseLecture(userInput))
        console.log("res",response);
        if(response?.payload?.success){
            navigate(-1)
            setUserInput(
                {
                    id:courseDetails?._id, 
                    lecture:undefined,
                    title:"",
                    description:"",
                    videoSrc:""
                }
            )
        }
    }
    // if dirctly add lectrure is accessed then
    useEffect(()=>{
        if(!courseDetails)  navigate('/courses')
    },[])
    return(
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16 ">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button className="absolute left-2 text-xl text-green-700"
                            onClick={()=>navigate(-1)}
                        >
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-2xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
                    <form
                        onSubmit={onFormsubmit}
                        className="flex flex-col gap-3">
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Enter title of lecture"
                                onChange={handleInputChange}
                                className="bg-transparent px-3 py-1 border"
                                value={userInput.title}/>
                            <textarea 
                                type="text" 
                                name="description"
                                placeholder="Enter description of lecture"
                                onChange={handleInputChange}
                                className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24"
                                value={userInput.description}/>

                            {userInput.videoSrc ?  (
                                <video
                                    muted
                                    src={userInput?.videoSrc}
                                    controls
                                    controlsList="nodownload nofullscreen"
                                    disablePictureInPicture
                                    className="object-full rounded-tl-lg rounded-tr-lg w-full">

                                </video>

                            ):(
                                <div className="h-48 border flex items-center justify-center cursor-pointer">
                                    <label htmlFor="lecture" className="font-semibold text-accent cursor-pointer">Choose Your Video</label>
                                    <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*" />
                                </div>    
                            )}

                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Add new Lecture
                        </button>
                    </form>

                </div>
            </div>
        </HomeLayout>
    )

}
export default Addlecture