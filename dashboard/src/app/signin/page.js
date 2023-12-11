"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handlesingin = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log(res);
      setEmail("");
      setPassword("");
      router.push("/MainPage");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-manrope bg-bgColor-secondary">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center">
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
        </div>

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
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                <div className="text-sm">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className="cursor-pointer font-semibold text-blue-500 hover:text-blue-400"
                  >
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 focus:ring-opacity-0 focus:outline-none text-white/90 shadow-sm ring-1 ring-inset ring-white/10"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => handlesingin()}
                disabled={!email || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <button
              onClick={() => router.push("signup")}
              className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
