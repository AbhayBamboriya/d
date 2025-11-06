import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";
import axios from "axios";
import { useSelector } from "react-redux";
import changePasswordInstance from "../../Helpers/changePasswordInstance";
import { act } from "react";
// import { build } from "vite";    
// authSlice is for authenticatino purpose


// initial state of auth slice
const initialState={
    isLoggedIn:'',
    role:localStorage.getItem('role') || ""
}  
// thunk is used to provide the delay
// string is passed in createAsyncThunk to uniquely identify
export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        const res=axiosInstance.post("/user/register",data)
        console.log('res'+res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to create account"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const found=createAsyncThunk('/found',async(data)=>{
    try{
        console.log('dataaa',data);
        console.log('reached here');
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
        // console.log('cheeckkkk');
    }
    catch(e){
        toast.error(e?.response?.data?.message)
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
    }
})
export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('login data',data);
        const res=axiosInstance.post("/user/login",data)
        // console.log('res'+(await res).data);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Authentication in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Login"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})


export const changePassword=createAsyncThunk('/auth/changePassword',async(data) =>{
    try{
        console.log('login data',data);
        const res=axiosInstance.post("/user/changePassword",data)
       
        toast.promise(res
            // ,console.log('ressss'+res).toString()
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
    }
})

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/user/logout")
        console.log('res'+(await res).data);
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
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
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const getUserData = createAsyncThunk("/user/details",async ()=>{
    try{
        const res=axiosInstance.get("/user/me")
        
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e.message)
    }
})

export const resetPassword=createAsyncThunk('/resetPassword',async(data)=>{
    try{
        console.log('reached1');
        console.log(data);

        console.log('abhay');
        // const res=axiosInstance.changeUrl.post(`/${url}`,data)
        // const res=changePasswordInstance.post(`/${url}`,data)
        console.log('resetPasswordData',data);
        console.log('passwordSend',data.passwordW);
        // l=data.passwordW
        console.log('sending data',`/user/password/${data.url}`,data);
        const res=axiosInstance.post(`/user/password/${data.url}`,data)

        console.log('reached');
        toast.promise(res,{
            loading:"Wait! Reset Password in Progress ",
            
            success:(data)=>{
                console.log('data from slics',data);
                return data?.data?.message
            },
            error:"Failed to Reset Password"
        });
        return (await res).data
    }
    catch(e){
        // console.log('error');
        toast.error(e)
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

// export const {}=authSlice.actions
export default authSlice.reducer