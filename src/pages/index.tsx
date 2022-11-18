import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();
  if (isLoading) return <div>Fetching messages...</div>;
  console.log(messages);

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="m-2 flex flex-col items-center">
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
      <div className="pt-10">
        <Messages />
      </div>
    </main>
  );
};

export default Home;
