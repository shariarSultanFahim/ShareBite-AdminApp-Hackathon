import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// import { loadEnv } from 'vite';
// const env = loadEnv(process.env.NODE_ENV || 'local', process.cwd(), '');

// config axios instance
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface IUser extends User {
  accessToken?: string;
  refreshToken?: string;
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          console.error("Missing credentials");
          return null;
        }

        if (!credentials.username) {
          console.error("Email/Phone Number is required");
          return null;
        }

        if (!credentials.password) {
          console.error("Password is required");
          return null;
        }

        try {
          //   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/login/`;

          const payload = {
            username: credentials.username,
            password: credentials.password,
          };

          const res = await axios.post("/user/login/", payload);

          if (res.data) {
            const { access: accessToken, refresh: refreshToken } = res.data; // Destructure access and refresh tokens

            return {
              id: credentials.username, // no user ID in this case, using username
              accessToken,
              refreshToken,
            };
          } else {
            console.warn("Login failed with [Code: 200]:", res.data.error);
            return null;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.response?.data);
            return null;
          } else {
            console.error("Non-Axios Error:", error);
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: IUser }) {
      if (user?.accessToken && user.refreshToken) {
        // Store access and refresh tokens in the JWT token
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      // Store access and refresh tokens in the session for Axios requests
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  //   debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  theme: {},
};

const handler = NextAuth(options);

export { handler as authHandler, options as authOptions };
