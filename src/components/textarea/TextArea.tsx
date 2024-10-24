import React from "react";
import { TextAreaProps } from "./textArea.type";

const TextArea: React.FC<TextAreaProps> = ({ label, name, register, classNames, required, ...props }) => {
    return (
        <div className={`${classNames?.className ?? ""} flex flex-col gap-2`}>
            {!!label && (
                <label className={`${classNames?.labelClassName ?? ""} content-2`}>
                    {label}
                    <span className="required">{required ? " *" : ""}</span>
                </label>
            )}
            <textarea className={`custom-scrollbar ${classNames?.textareaClassName ?? ""} `} {...register(name)} {...props}></textarea>
        </div>
    );
};

export default TextArea;
