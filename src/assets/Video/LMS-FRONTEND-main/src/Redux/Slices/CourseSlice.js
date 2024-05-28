import {createAsyncThunk, createSlice} from '@reduxjs/toolkit' 
import axiosInstance from '../../Helpers/axiosInstance'
import { toast } from "react-hot-toast";
const initialState = {
    courseData:[]
}
export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/course")
        console.log("vbfck"+response);
        toast.promise(response,{
            loading:"Loading Course Data....",
            success:"Courses Loaded Successfully",
            error:"Failed to get the Courses"
        })
        console.log("xjds"+ (await response).data.course);
        return (await response).data.course
    }
    catch(e){
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourseById=createAsyncThunk('/course/delete',async(data)=>{
    try{
        const response=axiosInstance.delete(`/course/${data}`)
        console.log("vbfck"+response);
        toast.promise(response,{
            // alert:'vddio',
            loading:"Deleting Course ....",
            success:"Courses Deleted Successfully",
            error:"Failed to Delete the Courses"
        })
        // console.log("xjds"+ (await response).data.course);
        return (await response).data

    }
    catch(e){
        toast.error(error?.response?.data?.message)
    }
})
const courseSlices=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                console.log(action.payload);
                // here in the state the courses are loaded
                state.courseData = [...action.payload]
            }
            else{
                console.log("fggfhkd");
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
        formData.append('createdBy',data?.createdBy)
        formData.append('thumbnail',data?.thumbnail)
        console.log("vggfhkthk");
        const response = axiosInstance.post('/course/',formData)
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