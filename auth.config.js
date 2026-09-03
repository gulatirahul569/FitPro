export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const role = auth?.user?.role;

      const isTrainerRoute = pathname.startsWith("/trainer");
      const isAdminRoute = pathname.startsWith("/admin");
      const isUserRoute = pathname.startsWith("/user");

      if (isTrainerRoute) {
        if (!isLoggedIn) return false;
        return role === "trainer" || role === "admin";
      }

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        return role === "admin";
      }

      if (isUserRoute) {
        return isLoggedIn;
      }

      // All other routes (public pages) are always allowed
      return true;
    },
  },
  providers: [], // actual providers are added in auth.js, not here
};