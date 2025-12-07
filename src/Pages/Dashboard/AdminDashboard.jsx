import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layout/HomeLayout"
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { deleteCourseById, getAllCourses } from "../../Redux/Slices/CourseSlice"
import { getStatesData } from "../../Redux/Slices/StateSlice"
import { Pie, Bar } from "react-chartjs-2"
import { FcSalesPerformance } from "react-icons/fc"
import { FaUsers } from "react-icons/fa"
import { GiMoneyStack } from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs"
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice"

ChartJs.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
)

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { allUserCount, subscribedCount } = useSelector((state) => state.stat)
  const { monthlySalesRecord } = useSelector((state) => state.razorpay)

  const userData = {
    labels: ["Register", "EnrolledUser"],
    datasets: [
      {
        label: "User Detail",
        data: [allUserCount, subscribedCount],
        backgroundColor: ["yellow", "green", "red"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      }
    ]
  }

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Ayg",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Sales/Months",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255,99,132)"],
        borderColor: ["white"],
        borderWidth: 2
      }
    ]
  }

  const myCourses = useSelector((state) => state?.course?.courseData)

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourseById(id))
      if (res?.payload?.success) {
        await dispatch(getAllCourses())
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      await dispatch(getAllCourses())
      await dispatch(getStatesData())
      await dispatch(getPaymentRecord())
    })()
  }, [])

  return (
    <HomeLayout>
      <div className="min-h-[90vh]  pt-5 flex flex-col w-full gap-10 text-white px-4 md:px-10">
        <h1 className="text-center mt-20 text-4xl md:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto w-full">
          
          {/* PIE CHART BOX */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md w-full">
            <div className="w-full flex justify-center">
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80">
                <Pie data={userData} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered User</p>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {allUserCount}
                  </h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed User</p>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {subscribedCount}
                  </h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          {/* BAR CHART BOX */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md w-full">
            <div className="h-60 sm:h-72 md:h-80 w-full relative">
              <Bar data={salesData} className="absolute bottom-0 w-full h-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {allUserCount}
                  </h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Revenue Count</p>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {allUserCount}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="mx-auto w-full lg:w-[80%] flex flex-col items-center justify-center gap-10 mb-10 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center w-full justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Courses Overview
            </h1>
            <button
              onClick={() => {
                navigate("/course/create")
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 text-black font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="table w-full min-w-[800px]">
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lecture</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myCourses?.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 bg-transparent resize-none"
                      ></textarea>
                    </td>

                    <td>{course?.category}</td>

                    <td>{course?.createdBy}</td>

                    <td>{course?.numberOfLecture}</td>

                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-60 bg-transparent resize-none"
                      ></textarea>
                    </td>

                    <td className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          navigate("/course/displaylecture", {
                            state: { ...course }
                          })
                        }
                        className="bg-green-700 text-xl py-2 px-4 rounded-md font-bold hover:bg-green-900 transition-all ease-in-out duration-300"
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        onClick={() => onCourseDelete(course?._id)}
                        className="bg-red-700 text-xl py-2 px-4 rounded-md font-bold hover:bg-red-900 transition-all ease-in-out duration-300"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AdminDashboard
