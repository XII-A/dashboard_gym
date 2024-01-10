export { default } from "next-auth/middleware";

// Path: dashboard/src/pages/MainPage/[path].tsx
export const config = { matcher: ["/MainPage/:path*"] };
