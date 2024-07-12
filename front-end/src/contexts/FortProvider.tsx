import { ValidationError } from "common/Resource";
import { createContext, useCallback } from "react";

type IProps = {
    children: React.ReactNode;
    errors: ValidationError[] | unknown;
};

type IFormContext = {
    getMessageError: (inputName: string) => string[] | null;
};
export const FormContext = createContext<IFormContext>(undefined!);

export default function FormProvider({ errors, children }: IProps) {
    const getMessageError = useCallback(
        (inputName: string) => {
            const error = (errors as ValidationError[]).find(
                (error) => error.property === inputName
            );
            if (!error) return null;
            const errorMessages = [];
            for (const key in error.constraints) {
                errorMessages.push(error.constraints[key]);
            }
            return errorMessages;
        },
        [errors]
    );
    return (
        <FormContext.Provider
            value={{
                getMessageError,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}
