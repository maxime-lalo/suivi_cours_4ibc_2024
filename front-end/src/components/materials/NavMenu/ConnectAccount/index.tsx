import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import { useContext, useEffect, useState } from "react";
import AuthenticationApi from "../../../../api/AuthenticationApi";
import { UserContext } from "../../../../contexts/UserProvider";
import IsConnected from "../../IsConnected";

export default function ConnectAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userContext = useContext(UserContext);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userLogin =
                UserLoginRequestResource.hydrate<UserLoginRequestResource>({
                    email: email,
                    password: password,
                });
            userLogin.validateOrReject();

            const token =
                await AuthenticationApi.getInstance().login(userLogin);
            userContext.udpateUserFromToken(token);
        } catch (e) {
            console.log(e);
            alert("Error email or password");
        }
    };

    return (
        <IsConnected not>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Enter your email:</p>
                    <input
                        type="text"
                        name="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input
                        type="password"
                        name="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </IsConnected>
    );
}
