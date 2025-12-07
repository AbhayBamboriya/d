import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Addlecture() {

    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);

        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        });
    }

    async function onFormsubmit(e) {
        e.preventDefault();

        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(addCourseLecture(userInput));

        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center px-4">

                <div className="flex flex-col gap-5 p-4 sm:p-6 shadow-[0_0_10px_black] w-full max-w-sm sm:max-w-md rounded-lg bg-[#e1e1e]/60">

                    {/* BACK BUTTON */}
                    <button
                        className="text-2xl text-yellow-400 hover:text-yellow-500 w-fit"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineArrowLeft />
                    </button>

                    {/* TITLE */}
                    <h1 className="text-2xl sm:text-3xl text-yellow-500 font-semibold text-center">
                        Add New Lecture
                    </h1>

                    <form onSubmit={onFormsubmit} className="flex flex-col gap-3">

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter lecture title"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-2 border rounded-md"
                            value={userInput.title}
                        />

                        <textarea
                            name="description"
                            placeholder="Enter lecture description"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-2 border rounded-md resize-none h-24"
                            value={userInput.description}
                        ></textarea>

                        {/* VIDEO PREVIEW OR INPUT */}
                        {userInput.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="rounded-md w-full"
                            ></video>
                        ) : (
                            <div className="h-40 border rounded-md flex items-center justify-center cursor-pointer px-3">
                                <label
                                    htmlFor="lecture"
                                    className="font-semibold text-yellow-400 cursor-pointer"
                                >
                                    Choose Lecture Video
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handleVideo}
                                    accept="video/*"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-yellow-600 hover:bg-yellow-700 transition-all rounded-md py-2 font-semibold text-lg"
                        >
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Addlecture;
