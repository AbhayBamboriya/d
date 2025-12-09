
function CarouselSlide({name,title,discription,slideNumber,totalSlide,image}){
    return(
        <div id={`slide${slideNumber}`} className="carousel-item relative w-[100%]">
                        <div className="flex flex-col items-center justify-center  w-full">
                            <div className="flex flex-col items-center justify-center gap-4     bg-ed-400  w-[90%] p-[10%]">
                                <img src={image} className="w-40 rounded-full border-2 border-gray-400" />
                                <p className="text-2xl text-gray-200">
                                    {discription}
                                </p>
                                <h3 className="text-3xl font-semibold">{title}</h3>
                            </div>
                            <div className="absolute  flex justify-between transform -translate-y-1/2  left-1 right-1 m-10 top-1/2">
                                <a href={`#slide${(slideNumber==1 ? totalSlide : (slideNumber-1))}`} className="btn btn-circle">❮</a> 
                                <a href={`#slide${(slideNumber)%totalSlide+1}`} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
    )
}
export default CarouselSlide