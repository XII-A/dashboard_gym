import { NextResponse } from "next/server";
import { use } from "react";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();
    console.log(user);
    if (user?.error?.status === 400) {
      return NextResponse.json({
        data: {
          success: false,
          message: user.error.message,
        },
      });
    } else {
      return NextResponse.json({
        data: {
          success: true,
          user: user,
        },
      });
    }
  } catch (e) {
    // console.log({ e });
    return NextResponse.json({
      data: {
        success: false,
        message: "Something went wrong",
      },
    });
  }

  // return NextResponse.json({ data: { success: true } });
}
