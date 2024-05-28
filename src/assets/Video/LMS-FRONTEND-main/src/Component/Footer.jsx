// bs-bootstrap icons of react
import {BsFacebook, BsInstagram,BsLinkedin,BsTwitter} from 'react-icons/bs'
function Footer(){
    const currentDate=new Date();
    const year=currentDate.getFullYear();
    return(
        <>
        {/* in relative we can defined the position using left,right,bottom,top */}
        {/* vh is relative unit */}
        <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 w-full'>
                <section className='text-lg text-red'>
                    Copyright {year} | All rights reserved
                </section>
                <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' href='https://www.facebook.com/'>
                        
                        <BsFacebook />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' href='https://www.instagram.com/'>
                        <BsInstagram />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' href='https://www.linkedin.com/'>
                        <BsLinkedin />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer' href='https://twitter.com/'>
                        <BsTwitter />
                    </a>
                </section>
            </footer>
        </>
    )
}

export default Footer