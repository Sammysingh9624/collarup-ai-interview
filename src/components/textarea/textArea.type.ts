/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  classNames?: {
    className?: string;
    labelClassName?: string;
    textareaClassName?: string;
  };
}
