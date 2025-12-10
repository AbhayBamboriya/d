import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomeLayout from '../../Layout/HomeLayout';
import { deleteCourseById, getplainId } from '../../Redux/Slices/CourseSlice';
import { useEffect, useState } from 'react';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import { getActiveUser } from '../../Redux/Slices/AuthSlice';

function CourserDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth);
    const [activeArray,setActiveArray]=useState([]);
    const isActive =  activeArray.find(
            (sub) => sub.courseId === String(state._id) && sub.status === "active"
    );    
    const [planId, setPlanId] = useState();
    const dispatch = useDispatch();
    
    async function handlecancellation() {
        await dispatch(cancelCourseBundle(isActive?.subscriptionId))
        toast.success("Cancellation Completed")
        navigate('/')
    }


    async function deleteCourse(state) {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        const res = await dispatch(deleteCourseById(state?._id));
        if (res?.payload?.success) navigate('/courses');
    }



    useEffect(() => {
        const fetchActiveUser = async () => {
            const res = await dispatch(getActiveUser());
            if (res?.payload?.success) {
                console.log('res',res.payload);
                
                setActiveArray(res.payload.active);
            }
        };

    fetchActiveUser();
}, [dispatch]);

    useEffect(() => {
        if (!state?._id) return;
        const fetchPlan = async () => {            
            const res = await dispatch(getplainId(state._id));
            if (res?.payload?.success) {
                setPlanId(res.payload.id);
            }
        };
        fetchPlan();
    }, [state?._id]);

    return (
        <HomeLayout>

            <div className="min-h-[90vh] w-full pt-10 px-4 md:px-10 lg:px-20 flex justify-center text-white">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 w-full max-w-6xl">

                    <div className="space-y-6">

                        <img
                            src={state?.thumbnail?.secure_url}
                            alt="thumbnail"
                            className="w-full h-60 sm:h-72 md:h-80 lg:h-64 object-cover rounded-lg shadow-md"
                        />

                        <div className="space-y-5">

                            <div className="flex flex-col items-start gap-3 text-lg md:text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">Total Lectures: </span>
                                    {state?.numberOfLecture}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">Instructor: </span>
                                    {state?.createdBy}
                                </p>
                            </div>

                            {role === 'ADMIN' || isActive ? (
                               <div className="bg-blck flex flex-col gap-4">
                                        <button
                                            onClick={() =>
                                                navigate('/course/displaylecture', { state: { ...state } })
                                            }
                                            className="bg-yellow-600 text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all"
                                        >
                                            Watch Lectures
                                        </button>

                                        {role !== 'ADMIN' && (
                                            <button
                                                onClick={handlecancellation}
                                                className="
                                                    bg-red-600 hover:bg-red-900
                                                    text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full transition-all
                                                "
                                            >
                                                Cancel Subscription
                                            </button>
                                        )}
                                    </div>

                  
                            ) : (
                                <button
                                    onClick={() =>
                                        navigate(`/checkout/${state?._id}`, { state: { planId: planId ,courseId:state._id} })
                                    }
                                    className="bg-yellow-600 text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all"
                                >
                                    Subscribe
                                </button>
                            )}

                            {role === 'ADMIN' && (
                                <button
                                    className="bg-red-600 text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-800 transition-all"
                                    onClick={() => deleteCourse(state)}
                                >
                                    Delete Course
                                </button>
                            )}

                        </div>
                    </div>

                    <div className="space-y-4 text-lg md:text-xl">

                        <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 text-center">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500 font-semibold">Course Description:</p>
                        <p className="leading-relaxed text-base md:text-lg">
                            {state?.description}
                        </p>

                        <div className="mt-6 lg:mt-0">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md w-full lg:w-auto"
                            >
                                ← Back
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </HomeLayout>
    );
}

export default CourserDescription;
