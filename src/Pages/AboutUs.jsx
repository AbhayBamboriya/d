import CarouselSlide from "../Component/CarouselSlide"
import HomeLayout from "../Layout/HomeLayout"
import aboutMainImage from '../assets/Images/aboutMainImage.png'
import { celebrities } from '../Constants/CelebrityData.js'

function AboutUs() {
    return (
        <HomeLayout>
            <div className="p-4 sm:p-10 pt-20 flex flex-col text-white w-full bg-ed-300">
                {/* Text and Image Section */}
                <div className="flex flex-col md:flex-row items-center gap-10 mx-2 sm:mx-10">
                    <section className="w-full md:w-1/2 space-y-6 md:space-y-10 text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 font-semibold">
                            Affordable and quality Education
                        </h1>
                        <p className="text-md sm:text-lg md:text-xl text-gray-400">
                            Our goal is to provide affordable quality education to the world. 
                            We are providing a platform for aspiring teachers and students to share
                            their skills, creativity, and knowledge to empower and contribute to the growth and
                            wellness of mankind.
                        </p>
                    </section>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img 
                            src={aboutMainImage} 
                            alt="About Us" 
                            className="max-w-full h-auto drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(10px 10px 10px rgb(0,0,0))'
                            }}
                        />
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="carousel w-full my-16 mx-auto">
                    {celebrities && celebrities.map(celebrity => (
                        <CarouselSlide 
                            {...celebrity} 
                            key={celebrity.slideNumber} 
                            totalSlide={celebrities.length} 
                        />
                    ))}
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs
