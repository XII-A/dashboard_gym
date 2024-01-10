"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Input } from "./newUi/input";
import { storage } from "@/app/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./newUi/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./newUi/form";
import { da } from "date-fns/locale";
import { signIn } from "next-auth/react";
type Props = {
  email: string;
  password: string;
};

const FinalSignUp = ({ email, password }: Props) => {
  const reftoImage = useRef(null);
  const [image, setImage] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gyms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((data) => {
          setGyms(data.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(gyms);
  }, [gyms]);

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
    let imageUrl = URL.createObjectURL(file);
    reftoImage.current.src = imageUrl;
    reftoImage.current.onload = () => {
      URL.revokeObjectURL(reftoImage.current.src);
    };

    console.log(e.target.files[0]);
  };

  const finalSignUpForm = z.object({
    profilePicture: z.string().url(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    weight: z.coerce
      .number({
        errorMap: (error) => {
          return {
            message: "Please enter a valid weight",
          };
        },
      })
      .min(1)
      .max(10000),
    height: z.coerce
      .number({
        errorMap: (error) => {
          return {
            message: "Please enter a valid height",
          };
        },
      })
      .min(1)
      .max(10000),
    gymId: z.string().max(2),
    birthDate: z.coerce.date().max(new Date()),
    stepsGoal: z.coerce.number().min(0).max(100000),
    caloriesGoal: z.coerce.number().min(0).max(100000),
    workoutsGoal: z.coerce.number().min(0).max(100000),
    waterGoal: z.coerce.number().min(0).max(100000),
  });
  type TFinalSignUpFormValues = z.infer<typeof finalSignUpForm>;
  const form = useForm<TFinalSignUpFormValues>({
    resolver: zodResolver(finalSignUpForm),
  });

  const onFinalSubmit = async (data: TFinalSignUpFormValues) => {
    // console.log(data);
    try {
      if (image !== null) {
        const imageRef = ref(
          storage,
          `ProfilePics/${"testemailforimageupload@gmail.com"}`
        );
        await uploadBytes(imageRef, image, {
          contentType: "image/jpeg",
        }).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          data.profilePicture = downloadURL;
        });
      }
    } catch (err) {
      form.setError("profilePicture", {
        type: "manual",
        message: "Please upload a different image",
      });
    }
    // extract the date only from the birthDate
    const date = new Date(data.birthDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const newBirthdate = `${year}-${month}-${day}`;

    const user = {
      email: email,
      password: password,
      name: data.firstName,
      surname: data.lastName,
      birthday: newBirthdate,
      weight: data.weight,
      height: data.height,
      gym: data.gymId,
      profilepicUrl: data.profilePicture,
      username: email,
      stepsGoal: data.stepsGoal,
      caloriesGoal: data.caloriesGoal,
      workoutsGoal: data.workoutsGoal,
      waterGoal: data.waterGoal,
    };
    // console.log(user);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const resData = await res.json();

    if (resData.data.success) {
      signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/MainPage",
      });
    } else {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinalSubmit, (err) => console.log(err))}
        className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center gap-5"
      >
        <div className="w-full relative">
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
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={(e) => {
                          handleImageInput(e);
                          field.onChange(e);
                        }}
                        className="block w-full text-sm border-0 h-13  text-white/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-default file:text-white hover:file:bg-white/90 hover:file:text-blue-default file:shadow-sm "
                      />
                    </FormControl>

                    <FormMessage className="absolute top-[5px] right-0" />
                  </FormItem>
                )}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">First Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="first name"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Last Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="last name"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Weight:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="kg"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Height:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cm"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="stepsGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Steps Goal:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="steps"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="caloriesGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Calories Goal:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="calories"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="workoutsGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Workouts Goal:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="workouts"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="waterGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Water Goal:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="water"
                      {...field}
                      className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="gymId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Select your Gym:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-white/10 bg-white/5 text-white/90  hover:bg-white/10">
                      <SelectValue placeholder="Select a gym" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full border-white/10 bg-[rgb(25,28,31)] text-white/50">
                    {gyms?.map((gym) => {
                      return (
                        <SelectItem
                          key={gym.id}
                          value={`${gym.id}`}
                          className="w-full  focus:bg-white/5 focus:text-white/90"
                        >
                          {gym.attributes.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Birth Date:</FormLabel>
                <FormControl>
                  {/* @ts-ignore  */}
                  <Input
                    type="date"
                    placeholder="birth date"
                    {...field}
                    className="bg-white/5 hover:bg-white/10 focus:ring-opacity-0 focus:outline-none placeholder:text-white/50 text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
        >
          Finish Sign Up
        </button>
      </form>
    </Form>
  );
};

export default FinalSignUp;
