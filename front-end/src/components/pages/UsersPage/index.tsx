import { useEffect, useState } from "react";
import Table, { ECellType } from "../../elements/Table";
import PageTemplate from "../PageTemplate";
import UserReponseResource from "common/User/UserReponseResource";
import UserApi from "../../../api/UserApi";

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
    </PageTemplate>
  );
}
