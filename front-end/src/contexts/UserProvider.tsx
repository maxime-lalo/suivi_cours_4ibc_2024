import UserResponseResource from "common/User/UserReponseResource";
import { createContext, useEffect, useState } from "react";
import CookieService from "../services/CookieService";
import JwtResponseResource from "common/Authentication/JwtResponseResource";
import UserApi from "../api/UserApi";
import { jwtDecode } from "jwt-decode";

type IProps = {
    children: React.ReactNode;
};

export type IUserContext = {
    isLoading: boolean;
    user: UserResponseResource | null;
    udpateUserFromToken: (token: { accessToken: string }) => void;
    disconnect: () => void;
};

export const UserContext = createContext<IUserContext>(undefined!);

export function UserProvider(props: IProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserResponseResource | null>(null);

    const updateUserFromToken = async (token: { accessToken: string }) => {
        setIsLoading(true);
        const userInJwt = jwtDecode(token.accessToken) as JwtResponseResource;
        const user = await UserApi.getInstance().getById(userInJwt.id);
        if (user) {
            setUser(user);
            setIsLoading(false);
        }
    };

    const disconnect = () => {
        CookieService.getInstance().removeJwtToken();
        setUser(null);
    };

    useEffect(() => {
        const token = CookieService.getInstance().getJwtToken();
        if (token) updateUserFromToken({ accessToken: token });
        if (!token) setIsLoading(false);
    }, []);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                user,
                udpateUserFromToken: updateUserFromToken,
                disconnect,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
