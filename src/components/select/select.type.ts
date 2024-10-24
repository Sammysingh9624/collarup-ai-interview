import { UseFormRegister } from "react-hook-form";
import { GroupBase, OnChangeValue, Props } from "react-select";
import { AsyncProps } from "react-select/async";
import { AsyncCreatableProps } from "react-select/async-creatable";

export interface Options {
    value: string;
    label: string | React.JSX.Element;
}
export type AsyncSelectProps = {
    label?: string;
    register?: UseFormRegister<any>;
    classNames?: {
        className?: string;
        labelClassName?: string;
    };
} & Partial<AsyncProps<Options, boolean, GroupBase<Options>>>;
export type AsyncCreatableSelectProps = {
    label?: string;
    register?: UseFormRegister<any>;
    classNames?: {
        className?: string;
        labelClassName?: string;
    };
} & Partial<AsyncCreatableProps<Options, boolean, GroupBase<Options>>>;
export type SelectProps = {
    label?: string;
    register?: UseFormRegister<any>;
    classNames?: {
        className?: string;
        labelClassName?: string;
    };
    onChange: (newValue: OnChangeValue<Options, boolean>) => void;
} & Partial<Omit<Props<Options>, "onChange">>;
