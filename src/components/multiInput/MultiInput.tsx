/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import cn from "classnames";
// import omit from "lodash/omit";

import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { getRandomLightColor } from '../../utils/helper';
import { Badge } from '../badge';
import { InputVariant } from '../input/input.type';
import classes from './multiInput.module.css';

export type MultiInputProps = {
    label?: string;
    name: string;
    error?: string[] | string;
    touched?: boolean;
    multiInputWrapperClassName?: string;
    handleChange?: (value: string[]) => void;
    valuesToShow?: number;
    isEditing?: boolean;
    // register: UseFormRegister<any>;
    handleSubmit?: (value: any) => void;
    inputVariant?: InputVariant;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
const MultiInput: React.FC<MultiInputProps> = (props) => {
    const {
        label = '',
        name,
        error = [],
        touched = false,
        multiInputWrapperClassName = '',
        valuesToShow = 0,
        isEditing = true,
        // register,
        handleSubmit,
        value,
        inputVariant = InputVariant.PRIMARY,
        disabled,
        ...rest
    } = props;

    const [values, setValues] = useState<{ value: string; backgroundColor: string }[]>(
        ((value || []) as string[]).map((v) => ({
            value: v,
            backgroundColor: getRandomLightColor(),
        }))
    );
    useEffect(() => {
        if (!values.length && !!value) {
            setValues(
                ((value || []) as string[]).map((v) => ({
                    value: v,
                    backgroundColor: getRandomLightColor(),
                }))
            );
        }
    }, [value]);

    const [currentValue, setCurrentValue] = useState('');
    const filteredValues = (values || []).slice(0, valuesToShow || values.length);
    const remainingCount = (values || []).length - (valuesToShow || values.length);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, shouldEnter?: boolean) => {
        if (shouldEnter && e.key !== 'Enter') {
            return;
        }

        const target = e.target as HTMLInputElement;
        if (target.value.trim() !== '') {
            e.preventDefault();
            e.stopPropagation();
            const updatedValues = [{ value: target.value.trim(), backgroundColor: getRandomLightColor() }, ...values];
            setValues(updatedValues);
            setCurrentValue('');
            if (handleSubmit) handleSubmit(updatedValues.map((c) => c.value));
        }
    };

    const removeTag = (indexToRemove: number) => {
        setValues((prevValues: any) => {
            const updatedValue = prevValues.toSpliced(indexToRemove, 1);
            if (handleSubmit) handleSubmit(updatedValue.map((c: any) => c.value));
            return updatedValue;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentValue(e.target.value);
    };

    return (
        <div className={`flex flex-col gap-2 ${classes.multiInputWrapper}  ${multiInputWrapperClassName ?? ''}`}>
            {!!label && (
                <label className={`content-2 text-black-200`}>
                    {label}
                    <span className="required">{rest.required ? ' *' : ''}</span>
                </label>
            )}
            <div
                className={`${classes.multiInputContainer} ${!isEditing ? classes.noBorder : ''} ${
                    classes[inputVariant]
                } custom-scrollbar`}
            >
                <div className={`${classes.valuesContainer} `}>
                    {!!isEditing && (
                        <input
                            //   {...omit(rest, [
                            //     "handleChange",
                            //     "initialTouched",
                            //     "initialError",
                            //     "initialValue",
                            //   ])}
                            onKeyDown={(e) => handleKeyDown(e, true)}
                            // {...register(name)}
                            onChange={handleChange}
                            className={`${classes.input} ${classes[inputVariant]}`}
                            value={currentValue}
                            onBlur={(e) => {
                                if (rest.onBlur) {
                                    rest.onBlur(e);
                                }
                                handleKeyDown(e as any);
                            }}
                            disabled={disabled}
                        />
                    )}
                    {filteredValues.map((item, index) => {
                        return (
                            <React.Fragment key={`participant-${index}`}>
                                <Badge
                                    value={item.value}
                                    onremove={!disabled ? () => removeTag(index) : undefined}
                                    showIcon
                                    className={classes.valueBadge}
                                    backgroundColor={item.backgroundColor}
                                />
                            </React.Fragment>
                        );
                    })}
                    {remainingCount > 0 && (
                        <Badge
                            value={`${remainingCount}`}
                            onremove={() => {}}
                            showIcon
                            className={classes.valueBadge}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiInput;
