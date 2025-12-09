import { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecutre, getAllCoursesLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLecture() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        if (!state) navigate("/courses");
        dispatch(getAllCoursesLectures(state._id));
    }, []);

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLecutre({ courseId, lectureId }));
        await dispatch(getAllCoursesLectures(courseId));
    }

    return (
        <HomeLayout>
            <div className="flex flex-col gap-8 items-center justify-center min-h-[90vh] py-10 text-white mx-4 sm:mx-[5%]">

                {/* 🔙 BACK BUTTON */}
                <div className="flex flex-ol sm:flex-row ">
                <button
                    onClick={() => navigate(-1)}
                    className="self-stat px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold mt-8 sm:mt-0"
                >
                    ← Back
                </button>
            </div>

                {/* Course Title */}
            <div className="text-center text-2xl font-semibold text-yellow-500">
                Course Name : {state?.title}
            </div>

                {/* If Lectures Exist */}
                {lectures && lectures.length > 0 ? (
                    <div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-6xl">

                        {/* LEFT — VIDEO PLAYER */}
                        <div className="space-y-4 w-full lg:w-1/2 p-3 rounded-lg shadow-[0_0_10px_black] bg-[#1d1d1d]/50">

                            <video
                                src={state && lectures[currentVideo]?.lecture?.secure_url}
                                className="rounded-md w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            ></video>

                            <div>
                                <h1 className="text-lg">
                                    <span className="text-yellow-500">Title: </span>
                                    {lectures[currentVideo]?.title}
                                </h1>

                                <p className="mt-1">
                                    <span className="text-yellow-500">Description: </span>
                                    {lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — LECTURE LIST */}
                        <ul className="w-full lg:w-1/2 p-4 rounded-lg shadow-[0_0_10px_black] space-y-4 bg-[#1d1d1d]/50">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>

                                {role === "ADMIN" && (
                                    <button
                                        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                        className="px-3 py-1 rounded-md font-semibold text-sm bg-purple-700 hover:bg-purple-800"
                                    >
                                        Add Lecture
                                    </button>
                                )}
                            </li>

                            {lectures.map((lecture, idx) => (
                                <li key={lecture._id} className="space-y-2 border-b border-gray-700 pb-2">
                                    <p
                                        className="cursor-pointer hover:text-yellow-400 transition"
                                        onClick={() => setCurrentVideo(idx)}
                                    >
                                        <span className="text-yellow-400">
                                            Lecture {idx + 1}:
                                        </span>{" "}
                                        {lecture.title}
                                    </p>

                                    {role === "ADMIN" && (
                                        <button
                                            onClick={() => onLectureDelete(state?._id, lecture?._id)}
                                            className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 font-semibold text-sm"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button
                            onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                            className="px-3 py-2 rounded-md font-semibold bg-purple-700 hover:bg-purple-800"
                        >
                            Add new Lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default DisplayLecture;
