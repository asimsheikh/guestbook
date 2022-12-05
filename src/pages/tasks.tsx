import fs from "fs/promises";
import path from "path";

import { type NextPage } from "next";

const Home: NextPage = (props) => {
  return (
    <main className="m-2 flex flex-col items-center">
      <div>{JSON.stringify(props.data.tasks)}</div>
      <div>
        <h1 className="text-2xl font-extrabold">Tasks Page</h1>
      </div>
      <div className="my-2"></div>
      <ul>
        {props.data.tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </main>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);

  return {
    props: { data: jsonData },
  };
}

export default Home;
