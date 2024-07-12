import { ValidationError } from "common/Resource";
import FormProvider from "../../../../contexts/FortProvider";
import React from "react";
import classes from "./classes.module.scss";

type IProps = {
    children: React.ReactNode;
    onSubmit: (
        e: React.FormEvent<HTMLFormElement>,
        formData: { [key: string]: unknown }
    ) => void;
    errors?: ValidationError[];
};
export default function Form(props: IProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const formData: Record<string, unknown> = {};

        Array.from(elements).forEach((element) => {
            if (element instanceof HTMLInputElement) {
                const { name, type, checked, value, id } = element;

                if (!name) return; // Skip elements without a name attribute to ensure consistent keying.

                switch (type) {
                    case "checkbox":
                        formData[id] = checked;
                        break;
                    case "radio":
                        if (checked) formData[name] = value;
                        break;
                    default:
                        formData[name] = value;
                }
            }
        });

        props.onSubmit(event, formData);
    };

    return (
        <FormProvider errors={props.errors ?? []}>
            <form onSubmit={handleSubmit} className={classes.root}>
                {props.children}
            </form>
        </FormProvider>
    );
}
