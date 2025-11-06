import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgot } from "../Redux/Slices/AuthSlice";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mail, setMail] = useState({
        email: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setMail({
            ...mail,
            [name]: value
        })
    }

    async function onForgot(e) {
        e.preventDefault();

        if (!mail.email) {
            toast.error("Please fill the details");
            return;
        }

        const loadingToastId = toast.loading("Sending reset link...");

        try {
            const token = await dispatch(forgot(mail));
            console.log("token", token);

            if (token?.payload?.data?.success) {
                toast.success("Reset link sent successfully! Check your email", { id: loadingToastId, duration: 2000 });
            } else {
                toast.error("Something went wrong! Try again.", { id: loadingToastId });
            }
        } catch (error) {
            toast.error("Server error! Please try later.", { id: loadingToastId });
        }

        setMail({ email: "" });
    }

    return (
        <HomeLayout>
            <div className="min-h-screen flex items-center justify-center bg-[#0d117] text-white px-4">
                <div className="bg-[#161b22] p-8 rounded-lg w-full max-w-md shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-4">Forgot Password</h2>
                    <p className="text-gray-400 text-center mb-6">
                        Enter your registered email and we'll send you a reset link.
                    </p>

                    <form noValidate onSubmit={onForgot} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={mail.email}
                            onChange={handleUserInput}
                            className="w-full p-3 rounded-md bg-[#0d1117] border border-gray-600 focus:outline-none focus:border-cyan-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-md hover:bg-cyan-300 transition"
                        >
                            Send reset link
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-400">
                        Remembered password?{" "}
                        <span
                            className="underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Go back to login
                        </span>
                    </p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword;
