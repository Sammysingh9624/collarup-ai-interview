import { UseFormRegister } from "react-hook-form";

export interface InputProps extends React.ComponentProps<"input"> {
    label?: string | React.ReactNode;
    classNames?: {
        className?: string;
        labelClassName?: string;
        inputClassName?: string;
        inputWrapperClassName?: string;
    };
    name: string;
    StartAdornment?: React.ReactNode;
    EndAdornment?: React.ReactNode;
    type?: string;
    register: UseFormRegister<any>;
    inputVariant?: InputVariant;
}
export enum InputVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}
