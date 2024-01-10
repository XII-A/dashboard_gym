"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

function Provider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
