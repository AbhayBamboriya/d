import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomeLayout from "../../Layout/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
    fees: ""
  });

  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;

    if (!["image/jpeg", "image/png","image/webp"].includes(uploadedImage.type)) {
      toast.error("Only JPG/PNG files allowed");
      return;
    }

    if (uploadedImage.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setUserInput({
        ...userInput,
        previewImage: this.result,
        thumbnail: uploadedImage
      });
    });
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  async function onFormSubmit(e) {
  e.preventDefault();

  if (
    !userInput.title ||
    !userInput.description ||
    !userInput.category ||
    !userInput.thumbnail ||
    !userInput.fees ||
    !userInput.createdBy
  ) {
    toast.error("All fields are mandatory");
    return;
  }

  if(!userInput.title.match(/^[A-Za-z]+(?: [A-Za-z]+)*$/)){
    toast.error('Title should be legit');
    return;
  }

  if (Number(userInput.fees) <= 0) {
    toast.error("Fees must be greater than 0");
    return;
  }

  if(!userInput.category.match(/^[A-Za-z]+(?: [A-Za-z]+)*$/)){
    toast.error('Category should be legit');
    return;
  }

  // -------------------------
  // ✅ Show loading toast
  // -------------------------
  const toastId = toast.loading("Creating course...");

  setLoading(true);

  const response = await dispatch(createNewCourse(userInput));

  setLoading(false);

  // -------------------------
  // ❌ Remove loading toast
  // -------------------------
  toast.dismiss(toastId);

  if (response?.payload?.success) {
    toast.success("Course created successfully!");
    setUserInput({
      title: "",
      category: "",
      fees: "",
      createdBy: "",
      description: "",
      thumbnail: null,
      previewImage: ""
    });
    navigate("/courses");
  } else {
    toast.error("Failed to create course. Try again!");
  }
}


  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[100vh] px-4 sm:px-8 py-10">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-full max-w-[700px] shadow-[0_0_10px_black] relative"
        >
          <Link
            className="absolute top-5 left-5 text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl mt-10 sm:mt-20 font-bold mb-2">
            Create New Course
          </h1>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      className="w-full h-40 sm:h-48 md:h-52 border object-cover"
                      src={userInput.previewImage}
                      alt="Course Thumbnail Preview"
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-48 md:h-52 flex items-center justify-center border">
                      <h1 className="font-bold text-lg px-5">
                        Upload your Course Thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png"
                  name="image_uploads"
                  onChange={handleImage}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  id="title"
                  placeholder="Enter Course Title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course Instructor
                </label>
                <input
                  type="text"
                  required
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter Course Instructor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  type="text"
                  required
                  name="category"
                  id="category"
                  placeholder="Enter Course Category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="fees">
                  Amount
                </label>
                <input
                  type="number"
                  required
                  name="fees"
                  id="fees"
                  placeholder="Enter Course Amount"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.fees}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  type="text"
                  required
                  name="description"
                  id="description"
                  placeholder="Enter Course Description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
