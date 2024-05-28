import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
// import { act } from "react-dom/test-utils";
// // import { response } from "express"

const initialState = {
    lectures: []
};


export const getAllCoursesLectures = createAsyncThunk("/courses/lecture/get", async (cid) => {
    try{
        const res=axiosInstance.get(`/course/${cid}`)
        toast.promise(res,{
            loading:'Fetching Course lectures',
            success:'Lecture Fetched Successfully',
            error:'Failed to load lectures'
        })
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const addCourseLecture = createAsyncThunk("/courses/lecture/added", async (data) => {
    try{
        const formData=new FormData()
        // console.log("dataaaaaaaaaaaaaa",data.lecture);
        // console.log("dataaaaaaaaaaaaaa",data.title);
        // console.log("dataaaaaaaaaaaaaa",data.description);
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)
        
        const res=axiosInstance.post(`/course/${data.id}`,formData)
        console.log('resssssssss',res);
        toast.promise(res,{
            loading:'Adding Course lectures',
            success:'Lecture Added Successfully',
            error:'Failed to Add the lectures'
        })
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const deleteCourseLecutre = createAsyncThunk("/courses/lecture/delete", async (data) => {
    try{
        const response=axiosInstance.delete(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`)
        toast.promise(response,{
            loading:'Deleting Course lectures',
            success:'Lecture deleted Successfully',
            error:'Failed to delete lectures'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

const lectureSlice= createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCoursesLectures.fulfilled,(state,action)=>{
            console.log("fxfgg",action);
            state.lectures=action?.payload?.lectures    
            console.log();
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            console.log("sfjsdjf",action);
            state.lectures=action?.payload?.course?.lectures
        })
        .addCase(deleteCourseLecutre.fulfilled,(state,action)=>{
            console.log("delete",action);
            state.lectures=state.lectures-1;
        })
    }

})


export default lectureSlice.reducer
