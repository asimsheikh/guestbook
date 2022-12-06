import { type NextPage } from "next";

const UserProfile = (props) => {
  return (
    <div>
      <h1>Hello, {props.username}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log(Object.keys(context));
  console.log(Object.keys(context.req));
  return {
    props: { username: "Asim Sheikh" },
  };
}
export default UserProfile;
