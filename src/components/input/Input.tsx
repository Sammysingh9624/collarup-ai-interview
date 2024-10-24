"use client";
import React from "react";
import { InputProps, InputVariant } from "./input.type";
import classes from "./input.module.css";
const Input: React.FC<InputProps> = ({
    label,
    classNames,
    name,
    type = "text",
    StartAdornment,
    EndAdornment,
    register,
    required,
    inputVariant = InputVariant.PRIMARY,
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-2 ${classNames?.className ?? ""}`}>
            {!!label && (
                <label htmlFor={name} className={`content-2 cursor-pointer ${classNames?.labelClassName ?? ""}`}>
                    {label}
                    <span className="required">{required ? " *" : ""}</span>
                </label>
            )}
            <div className={`relative ${classNames?.inputWrapperClassName ?? ""}`}>
                {!!StartAdornment && StartAdornment}
                <input
                    className={`${classNames?.inputClassName ?? ""} w-full  ${classes[inputVariant]}`}
                    type={type}
                    id={name}
                    {...register(name)}
                    {...props}
                />
                {!!EndAdornment && EndAdornment}
            </div>
        </div>
    );
};

export default Input;
