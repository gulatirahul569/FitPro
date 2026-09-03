export { auth as proxy } from "./auth";

export const config = {
  matcher: ["/trainer/:path*", "/admin/:path*", "/user/:path*"],
};