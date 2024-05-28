import { useSelector, useDispatch } from 'react-redux'
import HomeLayout from '../../Layout/HomeLayout'
import { Link } from "react-router-dom"
function Profile(){

    const dispatch = useDispatch()
    // data is present in auth of redux dev tool
    const useerData = useSelector((state)=> state?.auth?.data )

 
    return(
        <HomeLayout>
            <div className='min-h-[90vh] flex items-center justify-center '>
                <div className='my-10 flex flex-col gap-4 rounded-lg p-4 text-white  w-150 shadow-[0_0_10px_black]'>
                    <img src={useerData?.avatar?.secure_url}
                        className='w-40 m-auto rounded-full border border-black'/>
                    <h3 className='text-xl font-semibold text-center capitalize'>
                        {useerData?.fullName}
                    </h3>
                    <div className='grid grid-cols-2 '>
                        <p>Email: </p><p>{useerData?.email}</p>
                        <p>Role: </p><p>{useerData?.role}</p>
                        <p>Subscription: </p><p>{useerData?.subscription?.status === 'active' ? 'Active' : 'Inactive'}</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <Link 
                            to='/changePassword' 
                            className='w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  font-semibold py-2  cursor-pointer text-center'>
                                <button>
                                    Change Password
                                </button>
                        </Link>
                        <Link 
                            to='/user/editprofile' 
                            className='w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  font-semibold py-2  cursor-pointer text-center'>
                                <button>
                                    Edit Profile
                                </button>
                        </Link>
                    </div>
                    {useerData?.subscription?.status === 'active' && (
                        <button className='w-full bg-red-600 hover:bg-red-900 transition-all ease-in-out duration-300 rounded-sm  font-semibold py-2  cursor-pointer text-center'>
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}
export default Profile