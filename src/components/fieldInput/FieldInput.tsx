"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../input";
import { FieldInputProps } from "./fieldInput.type";

const FieldInput: React.FC<FieldInputProps> = ({
    label,
    name,
    type = "text",
    StartAdornment,
    EndAdornment,
    classNames,
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={`${classNames?.wrapperClassName??""}`}>
            <Input
                {...props}
                label={label}
                name={name}
                register={register}
                type={type}
                StartAdornment={StartAdornment}
                EndAdornment={EndAdornment}
                classNames={classNames}
            />
            {errors[name] && <p className="error">{errors[name]?.message?.toString()}</p>}
        </div>
    );
};

export default FieldInput;
