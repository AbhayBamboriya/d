import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layout/HomeLayout';
import CourseCard from '../../Component/CourseCard';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
function CourseList(){
    const dispatch =useDispatch();
    const {courseData} = useSelector((state)=>state.course)
    console.log('first coresedata',courseData);
    const navigate=useNavigate()
    const {role , data} = useSelector((state) => state.auth)
    const {state} = useLocation()
    async function loadCourses(){
        await  dispatch(getAllCourses())
    }
    
    useEffect (()=>{
        loadCourses()
    },[])

    return(
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white '>
                    <h1 className='text-center text-3xl font-semibold mb-5'>
                        Explore the Courses made by
                        <span className='font-bold text-yellow-500'> Industry Expert </span>
                    </h1>
                    {courseData.length>0 &&
                    <div className='mb-10 flex flex-wrap gap-14 relative'>
                       { courseData?.map((element)=>{
                            return <CourseCard key={element._id} data={element}/>
                        })}
                    </div>}
                    {console.log('courses',courseData)}
                    {courseData.length==0 &&
                    <div className='grid gap-14 relative h-[m] justify-center items-center'>
                        {/* <Link className='absollute top-8 text-4xl link text-accent cursor-pointer'>
                        <AiOutlineArrowLeft/>
                        </Link> */}
                        <div>
                            <div className='text-center text-3xl '>No Courses are present !!!</div>
                            <div className='mt-10 justify-center text-center w-full '>
                                     <button  onClick={()=>navigate(-1)} className='btn bg-accent-600 text-xl rounded-md font-bold px-2 py-3 w-[60%] hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                                Go Back
                                    </button>
                                    <br />
                                    <br />
                                            {/* {console.log('fsfdsd',state)} */}
                                    {
                                            role==='ADMIN' && 
                                            <button className='btn bg-accent-600 text-xl rounded-md font-bold px-5 py-3 w-[60%] hover:bg-yellow-500 transition-all ease-in-out duration-300' onClick={()=>navigate('/course/create')}>   
                                                Create Course
                                            </button>
                                    }
                            </div>
                            </div>
                       
                       
                    </div>}
                    
                
            </div>
        </HomeLayout>
    )
}
export default CourseList