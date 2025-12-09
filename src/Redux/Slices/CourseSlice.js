import {createAsyncThunk, createSlice} from '@reduxjs/toolkit' 
import axiosInstance from '../../Helpers/axiosInstance'
import { toast } from "react-hot-toast";
const initialState = {
    courseData:[]
}
export const getCourseDetail = createAsyncThunk('/checkout/:id',async(id)=>{
    try{
        const res=await axiosInstance.get(`/course/course/${id}`,{
            withCredentials: true, // Include cookies in the request
        })
        console.log('in fronted',res);
        
        return res.data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})
export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/course")
        toast.promise(response,{
            loading:"Loading Course Data....",
            success:"Courses Loaded Successfully",
            error:"Failed to get the Courses"
        })
        return (await response).data.course
    }
    catch(e){
        toast.error(error?.response?.data?.message)
        throw e;
    }
})


export const getplainId=createAsyncThunk('/plan/id',async(data)=>{
    try{
        const response=await axiosInstance.get(`/subscriptionId/plan/${data}`,{
            withCredentials: true, // Include cookies in the request
        })
        return (await response).data

    }
    catch(e){
        toast.error(error?.response?.data?.message)
        throw e;
    }
})
export const deleteCourseById=createAsyncThunk('/course/delete',async(data)=>{
    try{
        const response=axiosInstance.delete(`/course/${data}`,{
            withCredentials: true, // Include cookies in the request
        })
        toast.promise(response,{
            loading:"Deleting Course ....",
            success:"Courses Deleted Successfully",
            error:"Failed to Delete the Courses"
        })
        return (await response).data

    }
    catch(e){
        toast.error(error?.response?.data?.message)
        throw e;
    }
})
const courseSlices=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    }
})

export const createNewCourse = createAsyncThunk('/course/create',async (data) => {
    try{
        
        let formData = new FormData()
        formData.append('title',data?.title)
        formData.append('description',data?.description)
        formData.append('category',data?.category)
        formData.append('fees',data?.fees)
        formData.append('createdBy',data?.createdBy)
        formData.append('thumbnail',data?.thumbnail)
        console.log("vggfhkthk");
        const response =await axiosInstance.post('/course/',formData,{
            withCredentials: true, // Include cookies in the request
        })
        console.log("res"+(await response).data);
        toast.promise(response,{
            loading:'Creating new course',
            success:'Course Created successfully',
            error:'Failed to create Course'
        })
        console.log("responseeee"+response);
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message )
    }
})

export default courseSlices.reducer