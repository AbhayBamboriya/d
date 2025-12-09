import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";


const initialState={
    isLoggedIn:'',
    role:localStorage.getItem('role') || ""
}  

export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        const res=axiosInstance.post("/user/register",data)
        toast.promise(res
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to create account"
            
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})

export const found=createAsyncThunk('/found',async(data)=>{
    try{
        const res=axiosInstance.post('/user/check',data)
        toast.promise(res,
            {
                loading:'Wait! Authentication in Progress ',
                success:(res)=>{
                    return res?.data?.message
                },
                error:'Enter a registered User Id'
            }
        )
        return (await (res)).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})
export const forgot=createAsyncThunk('/forgot',async(data)=>{
    try{
        const res=axiosInstance.post('/user/reset',data)
        console.log('response forgot',await (res));

        toast.promise(res,
            {
                loading:'Wait! Authentication in Progress ',
                success:(res)=>{
                    return "Enter Password"
                },
                error:'Enter a registered User Id'
            }
        )
        
        return await res
    }
    catch(e){
        toast.error(e?.response?.data?.message)  
        throw e; 
    }
})
export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('login data',data);
        const res=axiosInstance.post("/user/login",data)
        toast.promise(res,{
            loading:"Wait! Authentication in Progress ",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Login"
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})


export const changePassword=createAsyncThunk('/auth/changePassword',async(data) =>{
    try{
        console.log('login data',data);
        const res=axiosInstance.post("/user/changePassword",data)
       
        toast.promise(res
            ,{
            loading:"Password Change is in Progress",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Change Password"
           
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})
export const getActiveUser=createAsyncThunk('/plan/id',async(data)=>{
    try{
        const response=await axiosInstance.get('/user/activeSubscription',{
            withCredentials: true, 
        })   
        return (await response).data

    }
    catch(e){
        toast.error(error?.response?.data?.message)
        throw e;
    }
})

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/user/logout")
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile",async (data)=>{
    try{
        const res=axiosInstance.put(`user/update/${data[0]}`,data[1])
        toast.promise(res,{
            loading:"Wait! Profile Update in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Update Profile"
        });
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
        throw e;
    }
})

export const getUserData = createAsyncThunk("/user/details",async ()=>{
    try{
        const res=axiosInstance.get("/user/me")
        return (await res).data
    }
    catch(e){
        toast.error(e.message)
        throw e;
    }
})

export const resetPassword=createAsyncThunk('/resetPassword',async(data)=>{
    try{
        const res=await axiosInstance.post(`/user/password/${data.url}`,data)
        
        toast.promise(res,{
            loading:"Wait! Reset Password in Progress ",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Reset Password"
        });
        return (await res).data
    }
    catch(e){
            toast.error(e?.response?.data?.message)
            throw e;
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('action',action);
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            localStorage.setItem("active",JSON.stringify(action?.payload?.user?.active))
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={}
            state.active={}
            state.isLoggedIn=false
            state.role=""
        })

        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })

        .addCase(forgot.fulfilled,(state,action)=>{
            console.log('store res',action);
            if(!action?.payload?.data?.resetToken)    return
            localStorage.setItem("resetToken",action?.payload?.data?.resetToken)
            state.resetPasswordUrl=action?.payload?.data?.resetToken
        })
    }
})

export default authSlice.reducer