import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const data = await request.json();
    // validate email and password
    let user = "";
    console.log(data);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json(user);
}
