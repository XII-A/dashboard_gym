"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const SignUpForm = (props: Props) => {
  const signUpSchema = z
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
  type TSignUpFormValues = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpFormValues) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center gap-5"
      >
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white py-2 rounded-md disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
