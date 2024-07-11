import { useEffect, useState } from "react";
import Table, { ECellType } from "../../elements/Table";
import PageTemplate from "../PageTemplate";
import UserReponseResource from "common/User/UserReponseResource";
import UserApi from "../../../api/UserApi";
import classes from "./classes.module.scss";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";

export default function UsersPage() {
  const [users, setUsers] = useState<UserReponseResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      UserApi.getInstance()
        .getAll()
        .then((users) => {
          setUsers(users);
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const userResource =
      UserCreateRequestResource.hydrate<UserCreateRequestResource>({
        email: form["email"].value,
        password: "monpass",
        name: form["firstName"].value,
      });

    try {
      await userResource.validateOrReject();
      UserApi.getInstance()
        .createUser(userResource)
        .then((user) => {
          setUsers((prevUsers) => [...prevUsers, user]);
        });
    } catch (e) {
      alert("Error while creating user");
      console.error(e);
    }
  };

  return (
    <PageTemplate tabTitle="Users">
      <Table
        tableHeads={[
          {
            cellType: ECellType.TEXT,
            label: "Name",
          },
          {
            cellType: ECellType.TEXT,
            label: "Email",
          },
        ]}
        tableData={users.map((user) => ({
          Name: user.name,
          Email: user.email,
        }))}
        isLoading={isLoading}
      />

      <div className={classes["create-user"]}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name="firstName" />
          <input type="text" placeholder="Email" name="email" />
          <button type="submit">Create User</button>
        </form>
      </div>
    </PageTemplate>
  );
}
