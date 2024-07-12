import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import { useContext, useEffect, useState } from "react";
import AuthenticationApi from "../../../../api/AuthenticationApi";
import { UserContext } from "../../../../contexts/UserProvider";
import IsConnected from "../../IsConnected";
import Form from "../../Forms/Form";
import InputElement from "../../Forms/InputElement";
import { ValidationError } from "common/Resource";

export default function ConnectAccount() {
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const userContext = useContext(UserContext);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        formData: { [key: string]: unknown }
    ) => {
        event.preventDefault();

        try {
            const userLogin =
                UserLoginRequestResource.hydrate<UserLoginRequestResource>({
                    email: formData.email as string,
                    password: formData.password as string,
                });
            userLogin.validateOrRejectSync();

            const token =
                await AuthenticationApi.getInstance().login(userLogin);
            userContext.udpateUserFromToken(token);
        } catch (e) {
            setErrors(e as ValidationError[]);
        }
    };

    return (
        <IsConnected not>
            <Form onSubmit={handleSubmit} errors={errors}>
                <InputElement
                    name="email"
                    label="Enter your email"
                    placeholder="Email"
                />
                <InputElement
                    name="password"
                    label="Enter your password"
                    placeholder="Password"
                    type="password"
                />
                <button type="submit">Submit</button>
            </Form>
        </IsConnected>
    );
}
