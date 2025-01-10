import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    key:'',
    subscription_id:'',
    // check:'',
    isPaymentVerified:false,
    allPayment:{},
    finalMonths:{},
    monthlySalesRecord:[]
}


export const getRazorPayId = createAsyncThunk('/razorpay/getId',async()=>{
    try{
        const res=await axiosInstance.get('/payments/razorpay-key',{
            withCredentials: true, // Include cookies in the request
        })
        return res.data
    }
    catch(e){
        toast.error('Failed to load data')
    }
}) 

export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse',async()=>{
    try{
        const res=await axiosInstance.post('/payments/subscribe',{
            withCredentials: true, // Include cookies in the request
        })
        return res.data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
}) 


export const verifyUserPayment = createAsyncThunk('/payment/verify',async(data)=>{
    try{
        console.log('data from frontend',data);
        
        const res=await axiosInstance.post('/payments/verify',{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        },{
            withCredentials: true, // Include cookies in the request
        })
        return res.data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
}) 

export const getPaymentRecord = createAsyncThunk('/payment/record',async()=>{
    try{
        const res= axiosInstance.get('/payments?count=4',{
            withCredentials: true, // Include cookies in the request
        })
        toast.promise(res,{
            loading:'Getting the payment Record',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to get payment records'
        })
        return (await res).data
    }
    catch(e){
        toast.error('Operation Failed')
    }
}) 


export const cancelCourseBundle = createAsyncThunk('/payment/cancel',async()=>{
    try{
        const res= axiosInstance.post('/payments/unsubscribe',{
            withCredentials: true, // Include cookies in the request
        })
        toast.promise(res,{
            loading:'Unsubscribing the Course',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to Unsubscribe'
        })
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
}) 

const razorpaySlice=createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
           state.allPayment=action?.payload?.allPayment
        //    state?.finalMonths=action?.payload?.finalMonths
        //    state?.monthlySalesRecord=action?.payload?.monthlySalesRecord
        })

    }
})


export default razorpaySlice.reducer