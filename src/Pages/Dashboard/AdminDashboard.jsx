import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layout/HomeLayout"
import {Chart as ChartJs,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title}  from 'chart.js'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { deleteCourseById, getAllCourses } from "../../Redux/Slices/CourseSlice"
import { getStatesData } from "../../Redux/Slices/StateSlice"
import { Pie ,Bar} from "react-chartjs-2"
import { FcSalesPerformance } from 'react-icons/fc'
import {FaUsers } from 'react-icons/fa'
import { GiMoneyStack } from 'react-icons/gi'
import { BsCollection, BsCollectionPlayFill, BsTrash } from "react-icons/bs"
// first of list all the component used here in register
ChartJs.register(ArcElement,BarElement,Tooltip,Legend,CategoryScale,LinearScale,Title)

function AdminDashboard(){
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {allUserCount,subscribedCount} = useSelector((state)=>state.stat)
    const {allPayment,finalMonths,monthlySalesRecord}=useSelector((state)=>state.razorpay)


    const userData={
        // types of data coming is written in label
        labels:['Register','EnrolledUser'],
        fontColor:'white',
        datasets:[
            {
                label:'User Detail',
                data:[allUserCount,
                   subscribedCount
                ],
                backgroundColor:['yellow','green','red'],
                borderWidth:1,
                borderColor:['yellow','green']
            },
            // {
            //     label:'User Detail',
            //     data:[allUserCount,
            //         79    ,10
            //     ],
            //     backgroundColor:['yellow','green','red'],
            //     borderWidth:1,
            //     borderColor:['yellow','green']
            // }
        ]
    }

    const salesData = {
        labels:['Jan','Feb','Mar','April','May','June','July','Ayg','Sep','Oct','Nov','Dec'],
        fontColor:'white',
        datasets:[
            {
                label:'Sales/Months',
                // data:montlySalesRecord,
                backgroundColor:['rgb(255,99,132)'],
                borderColor:['white'],
                borderWidth:2
            }
        ]
    }

    const myCourses=useSelector((state)=>state?.course?.courseData)

    async function onCourseDelete(id){
        if(window.confirm('Are you sure you want to delete the course ?')){
            const res=await dispatch(deleteCourseById(id))
            if(res?.payload?.success){
                await dispatch( getAllCourses())
            }
        }
    }
    useEffect(()=>{
        (
            async()=>{
                await dispatch(getAllCourses())
                await dispatch(getStatesData())
                await dispatch(getPaymentRecord())
            }
        )()
    },[])
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col w-full flex-wrap gap-10 text-white ">
                <h1 className="text-center text-5xl font=semibold text-yellow-500">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80 ">
                            {console.log('userData',userData)}
                            <Pie data={userData}/>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">
                                        Registered User
                                    </p>
                                    <h3 className="text-4xl font-bold">
                                        {allUserCount}
                                    </h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>
                            </div>

                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">
                                        Subscribed User
                                    </p>
                                    <h3 className="text-4xl font-bold">
                                        {subscribedCount}
                                    </h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10 p-5 sahdow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar data={salesData} className="absolute bottom-0 h-80 w-full"/>
                        </div>
                        <div className="grid grid-cols-2 gap-5 ">
                        
                      
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">
                                        Subscription Count
                                    </p>
                                    <h3 className="text-4xl font-bold">
                                        {allUserCount}
                                    </h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl"/>
                            </div>

                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">
                                        Revenue Count
                                    </p>
                                    <h3 className="text-4xl font-bold">
                                        {allUserCount}
                                    </h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl"/>
                            </div>

                            
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="mx-[10%] self-center flex flex-col items-center justify-center gap-10 mb-10 w-100%">
                    <div className="flex  items-center w-full justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Courses Overview
                        </h1>
                        <button 
                            onClick={()=>{
                                navigate('/course/create')
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 text-black font-semibold text-lg cursor-pointer"
                        >   
                            Create New course

                        </button>
                    </div>

                    <table className="table overflow-x-scroll">
                            <thead>
                                <tr>
                                    <th>
                                        SNo.
                                    </th>
                                    <th>
                                        Course Title
                                    </th>
                                    <th>
                                        Course Category
                                    </th>
                                    <th>
                                        Instructor
                                    </th>
                                    <th>
                                        Total Lecture
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCourses?.map((course,idx) => {
                                    console.log('courese',course);
                                    return(
                                        <tr key={course._id}>
                                            <td>{idx+1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td>
                                                {course?.category}
                                            </td>
                                            <td>
                                                {course?.createdBy}
                                            </td>
                                            <td>
                                                {course?.numberOfLecture}
                                            </td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap ">
                                                <textarea value={course?.description} readOnly className="w-60 h-auto bg-transparent resize-x-none"></textarea>
                                            </td>
                                            <td className="flex items-center gap-4 ">
                                                <button onClick={()=>navigate('/course/displaylecture',{state:{...course}})} className="bg-green-700 text-xl py-2 px-4 rounded-md font-bold hover:bg-green-900 transition-all ease-in-out duration-300">
                                                    <BsCollectionPlayFill/>
                                                </button>
                                                <button onClick={()=>onCourseDelete(course?._id)} className="bg-red-700 text-xl py-2 px-4 rounded-md font-bold hover:bg-red-900 transition-all ease-in-out duration-300">
                                                    <BsTrash/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                </div>
        </HomeLayout>
    )
}
export default AdminDashboard