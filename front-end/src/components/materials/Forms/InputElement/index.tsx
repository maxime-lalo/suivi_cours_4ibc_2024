import { useContext } from "react";
import { FormContext } from "../../../../contexts/FortProvider";

type IProps = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: "text" | "password" | "email";
};
export default function InputElement(props: IProps) {
    const { type = "text" } = props;
    const { getMessageError } = useContext(FormContext);
    const error = getMessageError(props.name);
    return (
        <label>
            {props.label}
            <input
                name={props.name}
                placeholder={props.placeholder}
                type={type}
            />
            {error && <span>{error}</span>}
        </label>
    );
}
