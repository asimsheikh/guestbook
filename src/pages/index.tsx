import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Form = (props) => {
  const [message, setMessage] = useState("");
  const utils = trpc.useContext();
  const postMessage = trpc.guestbook.postMessage.useMutation({
    onMutate: () => {
      utils.guestbook.getAll.cancel();
      const optimisticUpdate = utils.guestbook.getAll.getData();

      if (optimisticUpdate) {
        utils.guestbook.getAll.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.guestbook.getAll.invalidate();
    },
  });

  return (
    <form
      className="my-4 flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: props.session.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        placeholder="your message..."
        onChange={(event) => setMessage(event.target.value)}
        className="rounded-md border-2 border-zinc-800 p-2 text-black focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();
  if (isLoading) return <div>Fetching messages...</div>;
  console.log(messages);

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p className="font-bold">{msg.id.slice(4, 4 + 5)}</p>
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
          <div className="pt-6">
            <Form session={session} />
          </div>
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
