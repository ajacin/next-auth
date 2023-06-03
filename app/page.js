import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "@components/user";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="p-1">Server side rendered</div>
      <pre className="border border-red-500">{JSON.stringify(session)}</pre>
      <div className="p-2">
        <User></User>
      </div>
    </>
  );
}
