"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./newUi/input";

const intialSignUpForm = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Props = {
  setInitialData: React.Dispatch<
    React.SetStateAction<z.infer<typeof intialSignUpForm>>
  >;
};

const InitialSignUp = ({ setInitialData }: Props) => {
  type TINSignUpFormValues = z.infer<typeof intialSignUpForm>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TINSignUpFormValues>({
    resolver: zodResolver(intialSignUpForm),
  });

  const onInitialSubmit = async (data: TINSignUpFormValues) => {
    //Checking if the email exists in the database
    //If it does, then we will show an error message
    //If it doesn't, then we will show the next form

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?filters[$and][0][email][$eq]=${data.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const response = await res.json();
      if (response.length > 0) {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        setInitialData(data);
        reset();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onInitialSubmit)}
      className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center gap-5"
    >
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        {...register("email")}
        className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10 min-w-72"
      />
      {/* <input type="email" placeholder="Email" {...register("email")} /> */}

      {errors.email && (
        <div className="text-red-500 text-sm">{`${errors.email.message}`}</div>
      )}

      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        {...register("password")}
        className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10 min-w-72"
      />
      {errors.password && (
        <div className="text-red-500 text-sm ">{`${errors.password.message}`}</div>
      )}
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10 min-w-72"
      />
      {errors.confirmPassword && (
        <div className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
      >
        Sign Up
      </button>
    </form>
  );
};

export default InitialSignUp;
