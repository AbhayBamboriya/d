import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../Redux/Slices/AuthSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credential, setCredential] = useState({
        password: "",
        setPassword: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setCredential({
            ...credential,
            [name]: value
        });
    }

    async function onChangePassword(e) {
        e.preventDefault();

        if (!credential.password || !credential.setPassword) {
            toast.error("Please fill the details");
            return;
        }

        if (
            !credential.setPassword.match(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
            )
        ) {
            toast.error("Password must include 8 chars, digit, uppercase, lowercase & special symbol.");
            return;
        }

        const res = await dispatch(changePassword(credential));

        if (res?.payload?.success) {
            navigate("/");
        }

        setCredential({
            password: "",
            setPassword: ""
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] px-4">
                <form
                    noValidate
                    onSubmit={onChangePassword}
                    className="
                        relative flex flex-col justify-center gap-3 
                        rounded-lg p-4 text-white 
                        w-full max-w-sm 
                        shadow-[0_0_10px_black]
                    "
                >
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="absolute left-4 top-4 text-2xl text-yellow-400 hover:text-yellow-500"
                    >
                        <AiOutlineArrowLeft />
                    </button>

                    <h1 className="text-center text-2xl font-bold mt-6">
                        Reset Password
                    </h1>

                    {/* Current Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="font-semibold"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your current password"
                            onChange={handleUserInput}
                            value={credential.password}
                            className="bg-transparent px-2 py-1 border rounded"
                        />
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="setPassword"
                            className="font-semibold"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            name="setPassword"
                            id="setPassword"
                            placeholder="Enter your new password"
                            onChange={handleUserInput}
                            value={credential.setPassword}
                            className="bg-transparent px-2 py-1 border rounded"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="
                            bg-yellow-500 mt-2 hover:bg-yellow-600 
                            transition-all ease-in-out duration-300 
                            rounded-xl py-2 font-semibold text-lg cursor-pointer
                        "
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
