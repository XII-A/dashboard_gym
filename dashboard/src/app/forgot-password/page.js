"use client";
import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
    router.push("/signin");
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
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
              >
                Send Forgot Password Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
