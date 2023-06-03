This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Notes

> npx create-next-app@latest ./

## Prism to connect to mongodb

> npm i -D prisma
> npx prisma init

- Creates two noticeble changes

  - Prisma folder -> schema.prisma If not syntax highlighted, use extention prisma
    - Update the database to mongodb
    - Update DATABASE_URL to corresponding one from mongodb and added /nextauthdb as the db in the url
  - .env file created

- Create models in schema.prisma
- To access prisma gloabally, install prisma client
  > npm i @prisma/client

add a libs folder under app and prismadb.jsx to import client and write logic

## Install packages from next auth

npm i next-auth@latest @next-auth/prisma-adapter

## Main entry point for api

app/api/auth/[...nextauth]/route.jsx

step not in tut: remove / from jsconfig.json to enable aliases "@/_": ["./_"] => "@_": ["./_"]

## Three providers

- Credentials
- Google providers
- Github providers

Implement route.jsx

run the project with hardcoded user and should render prebuilt login page
next-auth.session-token eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..gbztdMWJdEI-YG7V.YXqockD1LXIx2gYhMYcXRnwD3GKwjfrkXHIOBjaTU3vHCryfnSI_2nWJ30WAbF6OKDccgEfKi8ZxcwmnHKxOsmqlRP1lDr95ZbuSi6PTO8vWdgfnujineKuSsYfsErNZPqiyRwoSefYL395D-RU_Gm9bIPPW9gciKCUzlXOZdpmAnXBILNU.kiEFppzjdnLA1ZU3t2u4ug localhost / 2023-07-03T08:39:05.835Z 283 ✓ Lax Medium
next-auth.callback-url http%3A%2F%2Flocalhost%3A3000 localhost / Session 51 ✓ Lax Medium
next-auth.csrf-token

and should save the above in the Application=> Cookies already

- session token gives session data
- Two ways to get the session data:
  - Client side
  - Server side
    - import { getServerSession } from "next-auth";

Tried to implement server side and client side session
