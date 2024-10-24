"use client";
import React from "react";
import { TextArea } from "../textarea";
import { useFormContext } from "react-hook-form";
import { FieldTextAreaProps } from "./fieldTextArea.type";

const FieldTextArea: React.FC<FieldTextAreaProps> = ({
  label,
  name,
  classNames,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <TextArea
        label={label}
        name={name}
        register={register}
        classNames={classNames}
        {...props}
      />
      {errors[name] && (
        <p className="error">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default FieldTextArea;
