import React from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { IoMdClose } from "react-icons/io";
import AutoComplete from "./AutoComplete";
import AutoCompleteWorkOut from "./AutoCompleteWorkOut";
import { useState, useEffect } from "react";
import SelectInput from "./SelectInput";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";

const WorkOutModal = ({
  openModal,
  setOpenModal,
  currentDay,
  scheduleList,
  setScheduleList,
}) => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [workoutImageURL, setWorkoutImageURL] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({
    workoutName: "-",
    calories: "-",
    duration: "60",
    time: "09:00",
  });
  const [data, setData] = useState([]);
  const handleFocus = () => {
    if (search === "") {
      setNothingFound(false);
      setLoading(true);

      try {
        fetch(`https://api.api-ninjas.com/v1/caloriesburnedactivities`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
          },
        }).then((res) => {
          res.json().then((data) => {
            console.log(data);
            const randomStartIndex = Math.floor(
              Math.random() * (data.activities.length - 10)
            );
            const randomEndIndex = randomStartIndex + 10;
            setData(data.activities.slice(randomStartIndex, randomEndIndex));
            setLoading(false);
            if (data.length === 0) {
              setNothingFound(true);
              setTimeout(() => {
                setNothingFound(false);
              }, 3000);
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = async () => {
    setData([]);
    setNothingFound(false);
    setLoading(true);
    if (search === "") {
      setLoading(false);
      setData([]);
      return;
    }
    try {
      fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          setData(data);
          setLoading(false);
          if (data.length === 0) {
            setNothingFound(true);
            setTimeout(() => {
              setNothingFound(false);
            }, 3000);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (workoutInfo.workoutName !== "-") {
      fetch(
        `https://api.unsplash.com/search/photos/?client_id=8PnW3Gqw_PNo6gQb_HoSuN3XY3kBSBpXIKHYzeHZKWI&query=${workoutInfo.workoutName}&per_page=1`
      ).then((res) => {
        res.json().then((data) => {
          console.log("the image data is", data.results[0].urls.regular);
          setWorkoutImageURL(data.results[0].urls.regular);

          // setWorkoutImageURL(data.results[0].urls.regular);
        });
      });
    }
  }, [workoutInfo]);

  const handleGetInfo = async (search) => {
    setData([]);
    setNothingFound(false);
    setLoading(true);
    if (search === "") {
      setLoading(false);
      setData([]);
      return;
    }
    try {
      fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);

          if (data.length === 0) {
            setNothingFound(true);
            setTimeout(() => {
              setNothingFound(false);
            }, 3000);
            return;
          }

          setWorkoutInfo({
            ...workoutInfo,
            workoutName: data[0].name,
            calories: data[0].calories_per_hour,
          });
          setLoading(false);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (workoutInfo.workoutName === "-") {
      setErrorMsg("Please select a workout");
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }
    console.log("the workout info is", workoutInfo);
    if (!session) {
      return;
    }
    try {
      setAddLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedules`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.jwt}`,
          },
          body: JSON.stringify({
            data: {
              workoutName: workoutInfo.workoutName,
              duration: workoutInfo.duration,
              caloriesPerHour: workoutInfo.calories,
              time: workoutInfo.time + ":00.000",
              day: currentDay,
              member: session.user.user.id,
              workoutImageUrl: workoutImageURL,
            },
          }),
        }
      );
      const data = await res.json();
      console.log("the res from update is: ", data);
      if (data.error) {
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
        setAddLoading(false);
        return;
      }
      setScheduleList([...scheduleList, data.data]);
      setAddLoading(false);
      setOpenModal(false);
      setSearch("");
      setWorkoutInfo({
        workoutName: "-",
        calories: "-",
        duration: "60",
        time: "09:00",
        caloriesPerHour: "-",
      });
    } catch (err) {
      console.log(err);
      setAddLoading(false);
      setErrorMsg("Something went wrong");
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  };

  if (!openModal) return null;
  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-[500] justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div
            className="relative  rounded-lg shadow bg-bgColor-trinary"
            onClick={() => {
              setData([]);
            }}
          >
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5">
              <h3 className="text-xl font-semibold text-white">
                Add to Your Schedule
              </h3>
              <button
                type="button"
                className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setOpenModal(false)}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex flex-col justify-center gap-8">
                <>
                  <label
                    for="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-white">
                      <CiSearch />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-transparent "
                      placeholder="Search for exercises"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onClick={() => {
                        handleFocus();
                      }}
                      autoComplete="off"
                    />
                    <button
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-default font-medium rounded-lg text-sm px-4 py-2 "
                      type="button"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      Search
                    </button>
                    <AutoCompleteWorkOut
                      data={data}
                      workoutInfo={workoutInfo}
                      setData={setData}
                      setWorkoutInfo={setWorkoutInfo}
                      setLoading={setLoading}
                      loading={loading}
                      nothingFound={nothingFound}
                      handleGetInfo={handleGetInfo}
                    />
                  </div>
                </>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col justify-start items-start col-span-1 gap-2">
                    {workoutImageURL ? (
                      <Image
                        src={workoutImageURL}
                        alt="food"
                        width={1000}
                        height={1000}
                        className="w-64 h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-64 h-64 bg-transparent rounded-lg flex justify-center items-center">
                        <CiImageOn className="text-white text-6xl" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between items-start col-span-1 gap-4  py-12">
                    <div className="grid grid-cols-2  w-full ">
                      <div className="flex flex-col justify-center items-center col-span-1 gap-1">
                        <div className="text-blue-light text-sm ">
                          Workout Name
                        </div>
                        <div className="text-white text-sm text-ellipsis text-center h-5 ">
                          {workoutInfo.workoutName}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center col-span-1 gap-1">
                        <div className="text-blue-light text-sm ">
                          Calories Burned Per/h
                        </div>
                        <div className="text-white text-sm ">
                          {workoutInfo.calories}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2  w-full ">
                      <div className="flex flex-col justify-center items-center col-span-1 gap-1">
                        <div className="text-blue-light text-sm ">Start at</div>
                        <div>
                          <input
                            type="time"
                            id="appt"
                            name="appt"
                            value={workoutInfo.time}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setWorkoutInfo({
                                ...workoutInfo,
                                time: e.target.value,
                              });
                            }}
                            className="bg-white/5 text-white/60 text-sm rounded-lg block w-full px-2 py-1 shadow-lg "
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center col-span-1 gap-1">
                        <div className="text-blue-light text-sm ">Duration</div>
                        <div className="w-full flex flex-row items-center justify-center">
                          <input
                            type="text"
                            id="appt"
                            name="appt"
                            value={workoutInfo.duration}
                            placeholder="30"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setWorkoutInfo({
                                ...workoutInfo,
                                duration: e.target.value,
                              });
                            }}
                            className="bg-white/5 text-white/60 text-sm rounded-s-lg block w-1/2 px-2 py-1 shadow-lg "
                          />
                          <div className="bg-white/5 text-white/60 text-sm rounded-e-lg block w-fit px-2 py-1 shadow-lg border-l border-white/65">
                            Min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 ">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-default  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() => {
                  handleAdd();
                }}
              >
                {addLoading ? "Adding..." : "Add"}
              </button>
              {errorMsg && (
                <div className="text-red-500 text-lg ml-2 font-bold">
                  {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOutModal;
