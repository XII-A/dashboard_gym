import React from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { IoMdClose } from "react-icons/io";
import AutoComplete from "./AutoComplete";
import { useState, useEffect } from "react";
import SelectInput from "./SelectInput";
import { useSession } from "next-auth/react";

const DietPlanModal = ({
  openModal,
  setOpenModal,
  currentDay,
  setfoodList,
  foodList,
}) => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const mealOptions = ["Breakfast", "Lunch", "Dinner"];
  const [foodInfo, setFoodInfo] = useState({
    food: "-",
    meal: "Breakfast",
    calories: "-",
    time: "09:00",
    carbs: "-",
  });
  const handleSearch = async () => {
    setLoading(true);
    if (search === "") {
      setLoading(false);
      setData([]);
      return;
    }
    try {
      fetch(`https://api.api-ninjas.com/v1/recipe?query=${search}`, {
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
            setFoodInfo({
              food: "-",
              meal: "Lunch",
              calories: "-",
              time: "-",
              carbs: "-",
            });
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

  const handleAdd = async () => {
    if (foodInfo.food === "-") {
      setErrorMsg("Please select a food");
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }
    console.log(foodInfo);
    if (!session) {
      return;
    }
    try {
      setAddLoading(true);
      const res = await fetch("http://localhost:1337/api/diet-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            foodName: foodInfo.food,
            meal: foodInfo.meal,
            hour: foodInfo.time + ":00.000",
            carbs: foodInfo.carbs,
            kcl: foodInfo.calories,
            day: currentDay,
            member: session.user.user.id,
          },
        }),
      });
      const data = await res.json();

      console.log(data);
      if (data.error) {
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
      }
      setfoodList([...foodList, data.data]);
      setAddLoading(false);
      setOpenModal(false);
      setSearch("");
      setFoodInfo({
        food: "-",
        meal: "Breakfast",
        calories: "-",
        time: "09:00",
        carbs: "-",
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

  useEffect(() => {
    console.log(foodInfo);
  }, [foodInfo]);
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
          <div className="relative  rounded-lg shadow bg-bgColor-trinary">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5">
              <h3 className="text-xl font-semibold text-white">
                Add to Your Diet Plan
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
                      placeholder="Search for food"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-default font-medium rounded-lg text-sm px-4 py-2 "
                      type="button"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      {loading ? "Loading..." : "Search"}
                    </button>
                    <AutoComplete
                      data={data}
                      foodInfo={foodInfo}
                      setFoodInfo={setFoodInfo}
                      setData={setData}
                      setInfoLoading={setInfoLoading}
                    />
                    {nothingFound && (
                      <div className="absolute top-[100%] z-10 flex max-h-32 w-full flex-col overflow-y-auto rounded-b-3xl rounded-t-sm border border-t-0 border-gray-500 bg-bgColor-primary  shadow-2xl  ">
                        <>
                          <div className="flex flex-col p-2 hover:bg-bgColor-trinary">
                            <div className="text-white">Nothing Found</div>
                          </div>
                        </>
                      </div>
                    )}
                  </div>
                </>
                <div className="flex flex-row justify-between items-center px-1 ">
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-blue-light">Food</div>
                    <div className="text-white text-sm py-1">
                      {foodInfo.food}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-blue-light">Meal</div>
                    <div className="text-white text-sm">
                      <SelectInput
                        options={mealOptions}
                        foodInfo={foodInfo}
                        setSelected={setFoodInfo}
                        property={"meal"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-blue-light">Calories</div>
                    <div className="text-white text-sm py-1 ">
                      {foodInfo.calories}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-blue-light">Time</div>

                    <input
                      type="time"
                      id="appt"
                      name="appt"
                      value={foodInfo.time}
                      onChange={(e) => {
                        setFoodInfo({ ...foodInfo, time: e.target.value });
                      }}
                      className="bg-white/5 text-white/60 text-sm rounded-lg block w-full px-2 py-1 shadow-lg "
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-blue-light">Carbs</div>
                    <div className="text-white text-sm py-1">
                      {foodInfo.carbs}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center">
                  {/* loading animation */}
                  {infoLoading && (
                    <div className="flex flex-col justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-default"></div>
                    </div>
                  )}
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

export default DietPlanModal;
