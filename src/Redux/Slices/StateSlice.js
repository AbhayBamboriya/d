import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    allUserCount:0,
    subscribedCount:0
}


export const getStatesData=createAsyncThunk('/stats/get',async()=>{
    try{
        const response=axiosInstance.get('/admin/stats/users',{
            withCredentials: true, // Include cookies in the request
        });
        toast.promise(response,{
            loading:"Getting the states",
            success:(data)=>{
                console.log('data is',data?.data?.message);
                
                return data?.data?.message

            },
            error:'Failed to load the data'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})
const stateSlice=createSlice({
    name:'state',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStatesData.fulfilled,(state,action)=>{
            console.log('check',action);
            state.allUserCount=action?.payload?.allUsersCount
            state.subscribedCount=action?.payload?.subscribedUsersCount
        })
    }
})

export default stateSlice.reducer