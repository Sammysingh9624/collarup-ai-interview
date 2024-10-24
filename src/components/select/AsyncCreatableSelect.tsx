/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AsyncCreatableSelectProps, Options } from "./select.type";
import AsyncCreatable from "react-select/async-creatable";
import { GroupBase, StylesConfig } from "react-select";

const AsyncCreatableSelect: React.FC<AsyncCreatableSelectProps> = ({
  label,
  classNames,
  loadOptions,
  options,
  defaultOptions,
  isLoading,
  required,
  onMenuScrollToBottom,
  ...rest
}) => {
  const customStyles:
    | StylesConfig<Options, boolean, GroupBase<Options>>
    | undefined = {
    control: (base: any, props: any) => ({
      ...base,
      border: "none",
      borderRadius: "8px",
      boxShadow: "none",
      padding: "6px 8px",
      minWidth: "95px",
      textTransform: "capitalize",
      cursor: "pointer",
      "&:hover": {
        border: "none",
      },
      ...(rest.styles?.container ? rest.styles?.container(base, props) : {}),
    }),
    option: (base: any, props: any) => ({
      ...base,
      backgroundColor: props.isSelected ? "#FBF7FF" : null,
      color: "#808080",
      padding: 10,
      borderRadius: props.isFocused ? "4px" : "0px",
      cursor: "pointer",
      marginTop: "8px",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "#FBF7FF",
      },
      ...(rest.styles?.option ? rest.styles?.option(base, props) : {}),
    }),
    placeholder: (base: any, props: any) => ({
      ...base,
      textTransform: "none",
      ...(rest.styles?.placeholder
        ? rest.styles?.placeholder(base, props)
        : {}),
    }),
    menu: (base: any, props: any) => ({
      ...base,
      boxShadow: " 0px 1px 4px 0px #AA66FF40",
      borderRadius: 8,
      zIndex: 11,
      ...(rest.styles?.menu ? rest.styles?.menu(base, props) : {}),
    }),
    menuList: (base: any, props: any) => ({
      ...base,
      padding: "0px 8px 8px",
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "lightgray",
        borderRadius: "8px",
        outline: "none",
        cursor: "pointer",
        height: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "gray",
      },
      ...(rest.styles?.menuList ? rest.styles?.menuList(base, props) : {}),
    }),
    dropdownIndicator: (base: any, props: any) => ({
      ...base,
      color: "#808080",
      cursor: "pointer",
      ...(rest.styles?.dropdownIndicator
        ? rest.styles?.dropdownIndicator(base, props)
        : {}),
    }),
  };
  return (
    <div className={`${classNames?.className ?? ""} flex flex-col gap-2`}>
      {!!label && (
        <label className={`${classNames?.labelClassName ?? ""} content-2`}>
          {label} <span className="required">{required ? " *" : ""}</span>
        </label>
      )}
      <AsyncCreatable
        classNamePrefix="select"
        name="color"
        options={options}
        defaultOptions={defaultOptions}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        loadOptions={loadOptions}
        isLoading={isLoading}
        onMenuScrollToBottom={onMenuScrollToBottom}
        createOptionPosition="first"
        {...rest}
        styles={customStyles}
      />
    </div>
  );
};
export default AsyncCreatableSelect;
