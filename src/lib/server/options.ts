import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// config axios instance
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface IUser extends User {
  accessToken: string;
  id: string;
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "email", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          console.error("Missing credentials");
          return null;
        }

        if (!credentials.email) {
          return null;
        }

        if (!credentials.password) {
          return null;
        }

        try {
          //   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/login/`;

          const payload = {
            email: credentials.email,
            password: credentials.password,
          };

          const res = await axios.post("/auth/login/", payload);

          if (res.data) {
            const { access_token: accessToken } = res.data.data; // Destructure access and refresh tokens

            return {
              id: "id",
              accessToken,
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
    async jwt({ token, user }: { token: JWT; user?: User | undefined }) {
      if (user && "accessToken" in user && "id" in user) {
        // Store access and refresh tokens in the JWT token
        token.accessToken = (user as IUser).accessToken;
        token.id = (user as IUser).id;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      // Store access and refresh tokens in the session for Axios requests
      session.accessToken = token.accessToken;
      session.user = { id: token.id };
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
