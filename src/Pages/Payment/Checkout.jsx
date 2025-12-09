import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layout/HomeLayout";
import { getCourseDetail } from "../../Redux/Slices/CourseSlice";

function Checkout() {

    const dispatch = useDispatch();
    const { state } = useLocation();
    console.log('ssksdjsd',state);
    
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const ispaymentVerified=useSelector((state)=>state?.razorpay?.isPaymentVerified)
    const userData=useSelector((state)=>state?.auth?.data)
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }
    const [result,setResult]=useState(null)
    const {courseId} =useParams()
    const [loading, setLoading] = useState(false);

    
    async function handleSubscription(e) {
          e.preventDefault();

          if (!razorpayKey || !subscription_id) {
            toast.error("Subscription not ready. Please try again.");
            return;
          }

          // Show loading toast
          const toastId = toast.loading("Initializing payment...");

          setLoading(true);

          // Razorpay options...
          const options = {
            key: razorpayKey,
            subscription_id,
            name: "Coursify Pvt. Ltd.",
            image: "https://logopond.com/logos/4bef64fe60152798ab039d155bcc15eb.png",
            total_count: 1,
            method: { upi: true },
            display_amount: result?.payload?.course?.fees,
            display_currency: "INR",
            theme: {
              color: "#4F46E5", // classy purple (or your brand color)
              backdrop_color: "#00000080", // modal background blur
              hide_topbar: false
            },

            handler: async function (response) {
              const paymentDetails = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_subscription_id: response.razorpay_subscription_id,
                courseId,
              };

              toast.success("Payment Successful");

              const res = await dispatch(verifyUserPayment(paymentDetails));
              navigate(res?.payload?.success ? "/checkout/success" : "/checkout/fail");
            },

            prefill: {
              email: userData.email,
              name: userData.fullName,
            },
          };

          const paymentObject = new window.Razorpay(options);

          setTimeout(() => {
            setLoading(false);
            
            // Remove loading toast
            toast.dismiss(toastId);

            // Open Razorpay popup
            paymentObject.open();
          }, 3000);
        }

    async function load() {
          const res=await dispatch(getCourseDetail(courseId))
          console.log('res in frontend',res);
          
        setResult(res)
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle(state));
      
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            {console.log('data is sdskdsjs',result)
            }
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available course
                            of our platform for {" "} 
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 Year duration
                            </span> { " " }
                            All the existing and new launched courses will be also available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /><span>{result?.payload?.course?.fees}</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>
                        <button
                              type="submit"
                              disabled={loading}
                              className={`bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2
                                ${loading && "opacity-50 cursor-not-allowed"}`}
                            >
                              {loading ? "Processing..." : "Buy now"}
                        </button>

                    </div>
                </div>

            </form>
        </HomeLayout>
    );
    
}

export default Checkout;