"use client";

//FIREBASE IMPORTS
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { db } from "@/app/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage } from "@/app/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
// COMPONENT IMPORTS
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//TODO: Fix Calender Inputs
//TODO: Add input validation

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [initialSignUp, setInitialSignUp] = useState(false);
  const [filetoupload, setFiletoupload] = useState(null);
  const [date, setDate] = useState(new Date());
  const [errorSignUp, setErrorSignUp] = useState(null);
  const router = useRouter();
  const reftoImage = useRef(null);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    birthday: null,
    email: null,
    height: null,
    weight: null,
    gymId: null,
  });

  useEffect(() => {
    console.log(date);
  }, [date]);
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      setCurrentUser(user.user);
      console.log(user);

      setInitialSignUp(true);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setErrorSignUp(null);
      }, 5000);
    }
  };
  const handleCreatingDoc = async () => {
    try {
      const docRef = await setDoc(doc(db, "Users", currentUser.uid), {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        birthday: date,
        email: email,
        height: userInfo.height,
        weight: userInfo.weight,
        gymId: userInfo.gymId,
      });
      if (filetoupload !== null) {
        const imageRef = ref(storage, `ProfilePics/${currentUser.uid}`);
        await uploadBytes(imageRef, filetoupload, {
          contentType: "image/jpeg",
        }).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          await updateDoc(doc(db, "Users", currentUser.uid), {
            imageUrl: downloadURL,
          });
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const handleFinlizingSignIn = async (e) => {
    e.preventDefault();
    const doc = await handleCreatingDoc();
    //if there was no error in creating the doc push to main page
    if (doc) {
      router.push("/MainPage");
    }
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFiletoupload(e.target.files[0]);
    let imageUrl = URL.createObjectURL(file);
    reftoImage.current.src = imageUrl;
    reftoImage.current.onload = () => {
      URL.revokeObjectURL(reftoImage.current.src);
    };

    console.log(e.target.files[0]);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-manrope bg-bgColor-secondary items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center gap-5">
          <div className="flex flex-row mx-auto items-center gap-5">
            <Image
              className="object-contain"
              src="/AppIcon.svg"
              alt="logo"
              width={50}
              height={50}
            />
            <div className="text-blue-default text-3xl font-bold leading-9 tracking-tight">
              Fitness App
            </div>
          </div>
          <div className="flex flex-row mx-auto items-center text-white text-xl">
            Step {!initialSignUp ? "1" : "2"} of 2
          </div>
        </div>
        {!initialSignUp && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  {errorSignUp && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                </div>

                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autocomplete={null}
                    required
                    className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password Again
                  </label>
                </div>
                <div className="mt-2">
                  <Input
                    id="passwordAgain"
                    name="passwordAgain"
                    type="password"
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    required
                    className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={
                    !email ||
                    !password ||
                    !passwordAgain ||
                    password !== passwordAgain
                  }
                  onClick={() => signup()}
                  className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
        {initialSignUp && (
          <div className="flex flex-col mt-4 gap-3 items-center justify-center">
            {/* Image input */}
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="relative w-10 h-10 overflow-hidden bg-bgColor-primary rounded-full ">
                  <Image
                    src="/emptyAvatar.svg"
                    alt="avatar"
                    width={50}
                    height={50}
                    className="object-contain"
                    ref={reftoImage}
                  />
                </div>
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept=".png, .jpg,.jpeg"
                  onChange={handleImageInput}
                  className="block w-full text-sm text-white/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-default file:text-white hover:file:bg-white/90 hover:file:text-blue-default file:shadow-sm "
                />
              </label>
            </div>
            {/* Form Input */}
            <div className="flex flex-row gap-2">
              <Input
                id="firstName"
                name="firstName"
                type="firstName"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, firstName: e.target.value })
                }
                pattern="[a-zA-Z]+"
                required
                placeholder="First Name"
                className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/80 shadow-sm ring-1 ring-inset ring-white/10"
              />
              <Input
                id="lastName"
                name="lastName"
                type="lastName"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, lastName: e.target.value })
                }
                pattern="[a-zA-Z]+"
                required
                placeholder="Last Name"
                className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
              />
            </div>
            <div className="flex flex-row gap-2">
              <Input
                id="weight"
                name="weight"
                type="weight"
                pattern="[0-9]{1,3}"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, weight: e.target.value })
                }
                required
                placeholder="Weight"
                className="bg-white/5  hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/80 shadow-sm ring-1 ring-inset ring-white/10"
              />
              <Input
                id="height"
                name="height"
                type="height"
                pattern="[0-9]{1,3}"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, height: e.target.value })
                }
                required
                placeholder="Height"
                className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
              />
            </div>
            <div className="flex flex-row w-full">
              <Select
                onValueChange={(value) => {
                  console.log(value);
                  setUserInfo({ ...userInfo, gymId: value });
                }}
              >
                <SelectTrigger className="w-full border-white/10 bg-white/5 text-white/90  hover:bg-white/10 ">
                  <SelectValue placeholder="Select Your Gym" />
                </SelectTrigger>
                <SelectContent className="w-full border-white/10 bg-[rgb(25,28,31)] text-white/50 ">
                  <SelectItem
                    value="Super Gym"
                    className="w-full  focus:bg-white/5 focus:text-white/90"
                  >
                    Super Gym
                  </SelectItem>
                  <SelectItem
                    value="Fitness Gym"
                    className="w-full  focus:bg-white/5 focus:text-white/90"
                  >
                    Fitness Gym
                  </SelectItem>
                  <SelectItem
                    value="Star Gym"
                    className="w-full  focus:bg-white/5 focus:text-white/90"
                  >
                    Star Gym
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-full justify-start text-left font-normal  bg-white/5 text-white/50 ",
                      !date && "text-muted-foreground",
                      "ring-1 ring-inset ring-white/10",
                      "hover:bg-white/10"
                    )}
                  >
                    <FaRegCalendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className={"rdp"}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-row w-full items-center justify-center">
              <button
                onClick={(e) => handleFinlizingSignIn(e)}
                type="submit"
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
                disabled={
                  !userInfo.firstName ||
                  !userInfo.lastName ||
                  !userInfo.weight ||
                  !userInfo.height ||
                  !userInfo.gymId
                }
              >
                Finish Signing Up
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}