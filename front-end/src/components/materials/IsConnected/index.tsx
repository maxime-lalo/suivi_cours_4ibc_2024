import { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";

type IProps = {
    children: React.ReactNode;
    not?: boolean;
};

export default function IsConnected(props: IProps) {
    const { not = false } = props;
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) return null;
    if (not) {
        return user ? null : <>{props.children}</>;
    }

    return user ? <>{props.children}</> : null;
}
