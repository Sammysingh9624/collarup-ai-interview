import { InputProps } from "../input/input.type";

export interface FieldInputProps extends Omit<InputProps, "register"> {
    name: string;
    type?: string;
    StartAdornment?: React.ReactNode;
    EndAdornment?: React.ReactNode;
    classNames?: {
        wrapperClassName?: string;
        className?: string;
        labelClassName?: string;
        inputClassName?: string;
        inputWrapperClassName?: string;
    };
}
