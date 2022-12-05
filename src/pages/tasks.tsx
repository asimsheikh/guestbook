import { type NextPage } from "next";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="m-2 flex flex-col items-center">
      <div>Tasks Page</div>
    </main>
  );
};

export default Home;
