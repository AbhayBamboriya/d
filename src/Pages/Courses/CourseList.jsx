import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layout/HomeLayout';
import CourseCard from '../../Component/CourseCard';
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 flex flex-col gap-10 text-white px-4 sm:px-8 md:px-16 py-6'>
                <h1 className='text-center text-3xl font-semibold mt-[40px] mb-5'>
                    Explore the Courses made by
                    <span className='font-bold text-yellow-500'> Industry Expert </span>
                </h1>

                {courseData && courseData.length > 0 && (
                    <div className='mb-10 flex flex-wrap gap-14 items-center justify-center'>
                        {courseData.map((element) => (
                            <CourseCard key={element._id} data={element} />
                        ))}
                    </div>
                )}

                {courseData.length === 0 && (
                    <div className='grid gap-14 h-[60vh] justify-center items-center text-center'>
                        <div className='text-3xl'>No Courses are present !!!</div>
                        <div className='mt-10 flex flex-col gap-4 items-center w-full'>
                            <button
                                onClick={() => navigate(-1)}
                                className='bg-accent-600 text-xl rounded-md font-bold px-5 py-3 w-3/4 sm:w-2/5 hover:bg-yellow-500 transition-all ease-in-out duration-300'
                            >
                                Go Back
                            </button>
                            {role === 'ADMIN' && (
                                <button
                                    onClick={() => navigate('/course/create')}
                                    className='bg-accent-600 text-xl rounded-md font-bold px-5 py-3 w-3/4 sm:w-2/5 hover:bg-yellow-500 transition-all ease-in-out duration-300'
                                >
                                    Create Course
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default CourseList;
