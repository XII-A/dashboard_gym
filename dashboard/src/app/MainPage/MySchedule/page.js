"use client";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import ScheduleComponent from "@/components/ScheduleComponent";
import ScheduleDailyCard from "@/components/ScheduleDailyCard";
import ScheduleBookCard from "@/components/ScheduleBookCard";
import UpcomingCoursesCard from "@/components/UpcomingCoursesCard";
import ScheduleDayPicker from "@/components/ScheduleDayPicker";
import IntroCard from "@/components/IntroCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { convert24to12 } from "@/lib/timeutils";
import WorkOutModal from "@/components/Modals/WorkOutModal";
import { getDate } from "@/lib/timeutils";

const page = () => {
  const { data: session } = useSession();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedDay, setSelectedDay] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [loadingUpcomingCourses, setLoadingUpcomingCourses] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    const date = new Date();

    const currentDayOfWeek = daysOfWeek[date.getDay()];
    setSelectedDay(currentDayOfWeek);
  }, []);

  useEffect(() => {
    console.log(scheduleList);
  }, [scheduleList]);

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    if (selectedDay !== null && session !== undefined) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedules?filters[$and][0][member][id][$eq]=${session.user.user.id}&filters[$and][1][day][$eq]=${selectedDay}`;
      try {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.jwt}`,
          },
        }).then((response) => {
          response
            .json()
            .then((res) => res.data)
            .then((data) => {
              setScheduleList(data);
              setLoadingSchedule(false);
            });
        });
      } catch (err) {
        console.log(err);
        setLoadingSchedule(false);
      }
    }
  }, [selectedDay , session]);

  useEffect(() => {
    if (session !== undefined) {
      const date = getDate();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses?filters[$and][0][attendees][id][$contains]=${session.user.user.id}&filters[$and][1][date][$gt]=${date}`;
      try {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.jwt}`,
          },
        }).then((response) => {
          response
            .json()
            .then((res) => res.data)
            .then((data) => {
              console.log("the courses data is: ", data);
              setUpcomingCourses(data);

              setLoadingUpcomingCourses(false);
            })
            .then(() => {
              const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses?filters[$and][0][date][$gt]=${date}`;
              try {
                fetch(url, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.jwt}`,
                  },
                }).then((response) => {
                  response
                    .json()
                    .then((res) => res.data)
                    .then((data) => {
                      console.log(
                        "the courses that the user isnt in data is: ",
                        data
                      );

                      setCourses(data);
                      setLoadingCourses(false);
                    });
                });
              } catch (err) {
                console.log(err);
                // setLoadingUpcomingCourses(false);
              }
            });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [session]);

  useEffect(() => {
    console.log("the courses are: ", courses);
    setFilteredCourses(
      courses.filter((item) => {
        return !upcomingCourses.some((item2) => item.id === item2.id);
      })
    );
  }, [courses]);

  useEffect(() => {
    console.log("the filtered courses are: ", filteredCourses);
  }, [filteredCourses]);

  const getDayFromDate = (date) => {
    const d = new Date(date);
    const dayName = daysOfWeek[d.getDay()];
    return dayName;
  };

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div
            className="flex-col w-full  overflow-hidden p-4"
            style={{
              height: "calc(100vh - 5rem)",
            }}
          >
            <div className="w-full mt-4 ">
              <IntroCard
                image="/girl.png"
                title={"Schedule Your Daily Workout"}
                subtitle={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
                }
              />
            </div>

            <div className="px-2 pt-4 ">
              <ScheduleDayPicker
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                daysOfWeek={daysOfWeek}
                setOpenModal={setOpenModal}
                turnOnButton={true}
              />
            </div>
            <div
              style={{
                height: "calc(100vh - 28rem)",
              }}
            >
              <div className="mt-3 flex flex-col gap-4 overflow-y-scroll h-1/2 px-2 py-1 ">
                {!loadingSchedule &&
                  scheduleList.map((item) => (
                    <ScheduleDailyCard
                      imageData={
                        item?.attributes?.workoutImageUrl
                          ? item?.attributes?.workoutImageUrl
                          : null
                      }
                      sets={item.attributes.sets}
                      exerciseName={item.attributes.workoutName}
                      exerciseStartTime={convert24to12(item.attributes.time)}
                      id={item.id}
                      duration={item.attributes.duration}
                      caloriesPerHour={item.attributes.caloriesPerHour}
                      setScheduleList={setScheduleList}
                    />
                  ))}
              </div>
              <div className="text-2xl text-gray-50 pt-3 px-2 ">
                Book a course
              </div>
              <div className="mt-3 flex flex-col gap-4 overflow-y-scroll h-1/2 px-2 py-1 ">
                {!loadingCourses && filteredCourses.length > 0 ? (
                  filteredCourses.map((item) => (
                    <ScheduleBookCard
                      id={item.id}
                      date={item.attributes.date}
                      duration={item.attributes.duration}
                      exerciseStartTime={convert24to12(
                        item.attributes.startsAt
                      )}
                      exerciseName={item.attributes.name}
                      trainerName={item.attributes.trainerName}
                      trainerSurname={item.attributes.trainerSurname}
                      imageData={item.attributes.workOutImageUrl}
                      filteredCourses={filteredCourses}
                      setFilteredCourses={setFilteredCourses}
                      upcomingCourses={upcomingCourses}
                      setUpcomingCourses={setUpcomingCourses}
                    />
                  ))
                ) : (
                  <div className="text-gray-50 text-xl text-center">
                    There are no courses available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-span-1 py-2 flex flex-col items-center"
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          <div className="w-full  flex flex-col h-full pt-4 overflow-hidden">
            {/* Header */}
            <div className="flex flex-row items-center justify-between px-2">
              <div className="text-xl font-medium text-white">
                My Upcoming Courses
              </div>
            </div>
            {/* Body */}
            <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2 pb-1 h-full ">
              {!loadingUpcomingCourses &&
                upcomingCourses.map((item) => (
                  <UpcomingCoursesCard
                    day={getDayFromDate(item.attributes.date)}
                    date={item.attributes.date}
                    exerciseStartTime={convert24to12(item.attributes.startsAt)}
                    duration={item.attributes.duration}
                    id={item.id}
                    imageData={item.attributes.workOutImageUrl}
                    exerciseName={item.attributes.name}
                    trainerName={item.attributes.trainerName}
                    trainerSurname={item.attributes.trainerSurname}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <WorkOutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentDay={selectedDay}
        scheduleList={scheduleList}
        setScheduleList={setScheduleList}
      />
    </>
  );
};

export default page;
