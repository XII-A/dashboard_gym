"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./newUi/input";
import InitialSignUp from "./InitialSignUp";
import FinalSignUp from "./FinalSignUp";
import { useEffect } from "react";

type Props = {};

const SignUpForm = (props: Props) => {
  const intialSignUpForm = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  type TINSignUpFormValues = z.infer<typeof intialSignUpForm>;

  const [initialData, setInitialData] = useState<TINSignUpFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (initialData.email === "") return;
    console.log(initialData);
    setInitialSignUp(false);
  }, [initialData]);

  const [initialSignUp, setInitialSignUp] = useState(true);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-manrope bg-bgColor-secondary items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center gap-5 my-4">
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
          Step {initialSignUp ? "1" : "2"} of 2
        </div>
      </div>
      {initialSignUp && <InitialSignUp setInitialData={setInitialData} />}
      {!initialSignUp && (
        <FinalSignUp
          email={initialData.email}
          password={initialData.password}
        />
      )}
    </div>
  );
};

export default SignUpForm;
