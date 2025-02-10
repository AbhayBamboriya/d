import CarouselSlide from "../Component/CarouselSlide"
import HomeLayout from "../Layout/HomeLayout"
import aboutMainImage from '../assets/Images/aboutMainImage.png'
import {celebrities} from '../Constants/CelebrityData.js'
function AboutUs(){
  
    return(
        <HomeLayout>
            <div className="p-10 pt-20 flex flex-col text-white bgred-300 w-full">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">Affordable and quality Education</h1>
                        <p className="text-xl text-gray-400">Our goals is to provide affordable quality education to the world. 
                            We are providing platform for aspiring teachers and students to share
                            their skills , creativity and knowledge to empower and contribute in the growth and
                            wellness of mankind.</p>
                    </section>
                    <div className="w-1/2">
                        <img 
                            src={aboutMainImage} 
                            alt=""
                            className="drop-shadow-2xl" 
                            id="test1"
                            style={{
                                filter:'drop-shadow(10px 10px 10px rgb(0,0,0))'
                            }}/>
                    </div>
                </div>
                {/* directly from website daisyui */}
                <div className="carousel w- my-16 m-auto">
                    {celebrities && celebrities.map(celebrity=>(<CarouselSlide {...celebrity} key={celebrity.slideNumber} totalSlide={celebrities.length}/>))}
                </div>
            </div>
        </HomeLayout>
    )
}
export default AboutUs   