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
      const isGymOwnerRoute = pathname.startsWith("/gym-owner");

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

      if (isGymOwnerRoute) {
        if (!isLoggedIn) return false;
        return role === "gym-owner" || role === "admin";
      }

      return true;
    },
  },

  providers: [],
};