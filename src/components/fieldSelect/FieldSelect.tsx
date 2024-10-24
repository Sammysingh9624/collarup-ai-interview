/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { AsyncSelect, Select } from "../select";
import {
  SelectProps,
  AsyncSelectProps,
  AsyncCreatableSelectProps,
} from "../select/select.type";
import { SELECT_TYPE } from "./fieldSelect.type";
import AsyncCreatableSelect from "../select/AsyncCreatableSelect";
interface Option {
  value: string;
  label: string;
}
export interface FieldSelectProps
  extends Omit<SelectProps, "onChange">,
    AsyncSelectProps,
    AsyncCreatableSelectProps {
  name: string;
  type?: SELECT_TYPE;
  handleChange?: (value: string) => void;
  wrapperClassName?: string;
}
const FieldSelect: React.FC<FieldSelectProps> = ({
  type = SELECT_TYPE.SELECT,
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  handleChange,
  wrapperClassName,
  ...props
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
    watch,
    clearErrors,
  } = useFormContext();
  watch(name);
  const handleSelect = (value: Option) => {
    if (handleChange) {
      handleChange(value?.value);
    }
    setValue(name, value?.value);
    clearErrors(name);
  };
  const values = getValues(name);

  const filterValue = ((props.options || []) as Option[]).find(
    (option) => option.value === values,
  );
  const renderSelect = useCallback(
    (type: SELECT_TYPE) => {
      switch (type) {
        case SELECT_TYPE.ASYNC_SELECT:
          return (
            <AsyncSelect
              {...props}
              register={register}
              onChange={(value: any) => handleSelect(value as Option)}
              value={filterValue}
            />
          );
        case SELECT_TYPE.ASYNC_CREATABLE:
          return (
            <AsyncCreatableSelect
              register={register}
              onChange={(value: any) => handleSelect(value as Option)}
              {...props}
              value={filterValue}
            />
          );
        default:
          return (
            <Select
              {...props}
              register={register}
              onChange={(value) => handleSelect(value as Option)}
              value={filterValue}
            />
          );
      }
    },
    [type, props, filterValue, name],
  );

  return (
    <div className={`${wrapperClassName ?? ""}`}>
      {renderSelect(type)}
      {(!filterValue || errors[name]) && (
        <p className="error">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
};
export default FieldSelect;
