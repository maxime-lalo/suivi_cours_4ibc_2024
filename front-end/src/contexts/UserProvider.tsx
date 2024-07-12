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
};

export const UserContext = createContext<IUserContext>(undefined!);

export function UserProvider(props: IProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserResponseResource | null>(null);

    const updateUserFromToken = async (token: { accessToken: string }) => {
        const userInJwt = jwtDecode(token.accessToken) as JwtResponseResource;
        console.log(userInJwt);
        const user = await UserApi.getInstance().getById(userInJwt.id);
        if (user) {
            setUser(user);
        }
    };

    useEffect(() => {
        const token = CookieService.getInstance().getJwtToken();
        setTimeout(() => {
            // Fetch user
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                user,
                udpateUserFromToken: updateUserFromToken,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
