/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MultiInput from '../multiInput/MultiInput';
import { MultiFieldInputProps } from '../multiInput/multiInput.type';

const MultiFieldTextArea: React.FC<MultiFieldInputProps> = ({ label, name, classNames, ...props }) => {
    const {
        setValue,
        formState: { isSubmitted },
        getValues,
        watch,
    } = useFormContext();

    const handleSubmit = (values: string[]) => {
        setValue(name, values);
    };

    watch(name);

    const values = getValues(name);
    return (
        <div>
            <MultiInput label={label} name={name} handleSubmit={handleSubmit} {...props} value={values} />
            {isSubmitted && !(values || []).length && <p className="error">Required Skills is required</p>}
        </div>
    );
};

export default MultiFieldTextArea;
