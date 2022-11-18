import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <main>Loading...</main>;
  }

  return (
    <main className="m-2">
      <h1 className="text-2xl font-bold">Guestbook</h1>
      <div className="m-2"></div>
      {session ? (
        <>
          <p>hi {session.user?.name}</p>
          <button onClick={() => signOut()} className="bg-white p-2 text-black">
            Logout
          </button>
        </>
      ) : (
        <button
          className="bg-white p-2 text-black"
          onClick={() => signIn("discord")}
        >
          Login with Discord
        </button>
      )}
    </main>
  );
};

export default Home;
