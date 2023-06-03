import NextAuth from "next-auth/next";
import prisma from "@libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // https://github.com/settings/applications/new
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // https://console.cloud.google.com/
    /**
     * scopes
     * ./auth/userinfo.email	See your primary Google Account email address
     * .../auth/userinfo.profile	See your personal info, including any personal info you've made publicly available
     * openid	Associate you with your personal info on Google
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "test@yopmail.com",
        },
        username: { label: "Username", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        // dummy. Next auth gives a pre built ui page to test
        if (!credentials.email || !credentials.password) {
          throw new error("Please enter an email and password");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user?.hashedPassword) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("No user found");
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
// export in an http request, when in a route
export { handler as GET, handler as POST };
