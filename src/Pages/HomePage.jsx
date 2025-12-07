import { Line } from "react-chartjs-2"
import HomeLayout from "../Layout/HomeLayout"
import { Link } from "react-router-dom"
import HomePageImage from '../assets/Images/homePageMainImage.png'

function HomePage(){
    return (
        <HomeLayout>
            {/* everything inside this homelayout component will be passed as child component */}
            <div className="pt-10 text-white flex flex-col-reverse md:flex-row items-center justify-center  mx-4 md:mx-16 h-auto md:h-[90vh] mb-10">
                {/* Text Section */}
                <div className="w-full md:w-1/2 space-y-6 ">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                        Find out Best 
                        <span className="ml-2 text-yellow-500 font-bold">
                              Online Courses
                        </span>
                    </h1>
                    <p className="text-md sm:text-lg md:text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full items-center mb-10 sm:mb-0">
    <Link to='/courses' className="w-3/4 sm:w-auto">
        <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300 w-full">
            Explore Courses
        </button>
    </Link>

    <Link to='/contact' className="w-3/4 sm:w-auto">
        <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300 w-full">
            Contact Us
        </button>
    </Link>
</div>



                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img 
                        alt="homepage image" 
                        src={HomePageImage} 
                        className="w-full max-w-md md:max-w-full object-contain"
                    />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage
