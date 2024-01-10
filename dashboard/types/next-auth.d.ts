import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      jwt: string;
      user: {
        id: number;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        created_at: string;
        updated_at: string;
        name: string;
        surname: string;
        birthday: string;
        weight: number;
        user_id: string;
        profilepicUrl: string;
        height: number;
      };
    };
  }
}
