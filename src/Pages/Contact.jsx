import { useState } from "react"
import HomeLayout from "../Layout/HomeLayout"
import toast from "react-hot-toast"
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error('All Fields are necessary');
            return;
        }
        if (!isEmail(userInput.email)) {
            toast.error('Invalid Email');
            return;
        }

        try {
            const response = axiosInstance.post('/contact', userInput);
            toast.promise(response, {
                loading: "Submitting your message",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({ name: "", email: "", message: "" });
            }
        } catch (e) {
            toast.error('Failed to submit the form');
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[100vh] px-4 sm:px-8">
                <form 
                    noValidate 
                    onSubmit={onFormSubmit} 
                    className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 rounded-md text-white shadow-[0_0_10px_black] w-full sm:w-[22rem] bg-gry-900/70"
                >
                    <h1 className="text-3xl font-semibold text-center mb-4">Contact Form</h1>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-md w-full" 
                            id="name" 
                            type="text" 
                            name="name" 
                            placeholder="Enter Your Name" 
                            onChange={handleInputChange} 
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="email" className="text-xl font-semibold">Email</label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-md w-full" 
                            id="email" 
                            type="text" 
                            name="email" 
                            placeholder="Enter Your Email" 
                            onChange={handleInputChange} 
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="message" className="text-xl font-semibold">Message</label>
                        <textarea 
                            className="bg-transparent resize-none h-40 border px-2 py-1 rounded-md w-full" 
                            id="message"  
                            name="message" 
                            placeholder="Enter Your Message"  
                            onChange={handleInputChange} 
                            value={userInput.message}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer mt-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;
