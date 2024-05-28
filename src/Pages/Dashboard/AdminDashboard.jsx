import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layout/HomeLayout"
import {Chart as ChartJs,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title}  from 'chart.js'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { deleteCourseById, getAllCourses } from "../../Redux/Slices/CourseSlice"
import { getStatesData } from "../../Redux/Slices/StateSlice"
    // first of list all the component used here in register
    ChartJs.register(ArcElement,BarElement,Tooltip,Legend,CategoryScale,LinearScale,Title)
function AdminDashboard(){
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {allUserCount,subscribedCount} = useSelector((state)=>state.stat)
    // const {allPayment,finalMonths,monthlySalesRecord}=useSelector((state)=>state.razorpay)


    const userData={
        // types of data coming is written in label
        labels:['Register','EnrolledUser'],
        datasets:[
            {
                label:'User Detail',
                data:[allUserCount,
                    subscribedCount    
                ],
                backgroundColor:['yellow','green'],
                borderWidth:1,
                borderColor:['yellow','green']
            }
        ]
    }

    const salesData = {
        labels:['Jan','Feb','Mar','April','May','June','July','Ayg','Sep','Oct','Nov','Dec'],
        fontColor:'white',
        datasets:[
            {
                label:'Sales/Months',
                // data:montlySalesRecord,
                backgroundColor:['rgb(255,99,132'],
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
                // await dispatch(getPaymentRecord())
            }
        )()
    },[])
    return(
        <HomeLayout>
            <div className="min-h-[90vh]">

            </div>
        </HomeLayout>
    )
}
export default AdminDashboard