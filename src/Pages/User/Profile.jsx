import { useSelector, useDispatch } from 'react-redux'
import HomeLayout from '../../Layout/HomeLayout'
import { Link, useNavigate } from "react-router-dom"
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice'
import { getUserData } from '../../Redux/Slices/AuthSlice'
import toast from 'react-hot-toast'

function Profile() {
    const dispatch = useDispatch()
    const useerData = useSelector((state) => state?.auth?.data)
    const navigate = useNavigate()

 
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4">
                <div className="
                    my-10 flex flex-col gap-4 rounded-lg p-4 text-white 
                    w-full sm:w-[450px] md:w-[500px] 
                    shadow-[0_0_10px_black]
                ">
                    <img
                        src={useerData?.avatar?.secure_url}
                        className="w-32 sm:w-40 m-auto rounded-full border border-black"
                    />

                    <h3 className="text-xl font-semibold text-center capitalize">
                        {useerData?.fullName}
                        
                    </h3>

                    {/* Grid responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center sm:text-left">
                        <p>Email:</p><p>{useerData?.email}</p>
                        <p>Role:</p><p>{useerData?.role}</p>
                        <p>{useerData.role!=="ADMIN" && 'Subscription:' }</p>
                        <p>{useerData.role!=="ADMIN" && (useerData?.subscription?.status === 'active' ? 'Active' : 'Inactive')}</p>
                    </div>

                    {/* Button row responsive */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                        <Link
                            to="/changePassword"
                            className="
                                w-full sm:w-1/2 
                                bg-yellow-600 hover:bg-yellow-500 
                                transition-all ease-in-out duration-300 
                                rounded-sm font-semibold py-2 cursor-pointer text-center
                            "
                        >
                            <button>Change Password</button>
                        </Link>

                        <Link
                            to="/user/editprofile"
                            className="
                                w-full sm:w-1/2 
                                bg-yellow-600 hover:bg-yellow-500 
                                transition-all ease-in-out duration-300 
                                rounded-sm font-semibold py-2 cursor-pointer text-center
                            "
                        >
                            <button>Edit Profile</button>
                        </Link>
                    </div>

                   
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile
