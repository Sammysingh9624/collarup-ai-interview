import { InputVariant } from "../input/input.type";

export interface MultiFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    classNames?: {
        className?: string;
        labelClassName?: string;
        textareaClassName?: string;
    };
    inputVariant?: InputVariant;
    isEditing?: boolean;
    handleSubmit?: (values: string[]) => void;
}
