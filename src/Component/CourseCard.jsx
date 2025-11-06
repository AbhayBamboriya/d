import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CourseCard({ data }) {
    const navigate = useNavigate();
    const persistedData = JSON.parse(localStorage.getItem("persist:root"));
    const authData = JSON.parse(persistedData?.auth || "{}");
    const isLoggedIn = localStorage.getItem("isLoggedIn") || false; 
    let isEnrolled ;
   if (isLoggedIn) {
      const datai = useSelector((state) => state?.auth?.data?.activeSubscriptions);
    console.log("active:", datai);
     isEnrolled = datai.includes(String(data?._id));
    console.log("isEnrolled:", isEnrolled);
}

    return (
        <div
            onClick={() => navigate('/course/description/', { state: { ...data } })}
            className='text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700'
        >
            <div className='overflow-hidden relative'>
                <img
                    className='h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1.2] transition-all ease-in-out duration-300'
                    src={data?.thumbnail?.secure_url}
                    alt='Course Thumbnail'
                />

                {/* ✅ Show badge if not enrolled */}
                
            </div>

            <div className='p-3 space-y-1 text-white'>
                <h2 className='text-xl font-bold text-yellow-500 line-clamp-2'>
                    {data?.title}
                </h2>
                <p className='line-clamp-2'>
                    {data?.description}
                </p>
                <p className='font-semibold'>
                    <span className='text-yellow-500 font-bold'>Category </span>
                    {data?.category}
                </p>
                <p className='font-semibold'>
                    <span className='text-yellow-500 font-bold'>Total Lectures </span>
                    {data?.numberOfLecture}
                </p>
                <p className='font-semibold'>
                    <span className='text-yellow-500 font-bold'>Instructor </span>
                    {data?.createdBy}
                </p>
                {isLoggedIn && !isEnrolled ? (
                    <span className='absolute  my-10 bg-red-500 text-xs px-2 py-2 rounded'>
                        Not Enrolled
                    </span>
                ):(
                    <span className='absolute  my-10 bg-green-500 text-xs px-2 py-2 rounded'>
                        Enrolled
                    </span>
                )}
            </div>
        </div>
    );
}

export default CourseCard;
