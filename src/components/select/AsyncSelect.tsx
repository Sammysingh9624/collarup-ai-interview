/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { AsyncSelectProps, Options } from "./select.type";
// import Async from "react-select/async";
// import { GroupBase, StylesConfig } from "react-select";
// import { useJobSettings } from "@/app/modules/jobs";
// import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
// import { fetchJobListOptions } from "@/app/lib/features/job/action";
// import { IJob } from "@/app/modules/jobs/job.types";

// const customStyles: StylesConfig<Options, boolean, GroupBase<Options>> = {
//     control: (provided: any, state: any) => ({
//         ...provided,
//         border: "none",
//         borderRadius: "8px",
//         boxShadow: "none",
//         padding: "6px 8px",
//         minWidth: "95px",
//         cursor: "pointer",
//         "&:hover": {
//             border: "none",
//         },
//     }),
//     option: (provided: any, state: any) => ({
//         ...provided,
//         backgroundColor: state.isSelected ? "#FBF7FF" : null,
//         color: "#808080",
//         padding: 10,
//         borderRadius: state.isFocused ? "4px" : "0px",
//         textTransform: "capitalize",
//         "&:hover": {
//             backgroundColor: "#FBF7FF",
//         },
//     }),

//     menu: (provided: any) => ({
//         ...provided,
//         boxShadow: " 0px 1px 4px 0px #AA66FF40",
//         borderRadius: 8,
//         marginTop: 1,
//     }),
//     menuList: (provided: any) => ({
//         ...provided,
//         paddingLeft: 8,
//         paddingRight: 8,
//         "::-webkit-scrollbar": {
//             width: "8px",
//             height: "0px",
//         },
//         "::-webkit-scrollbar-track": {
//             background: "transparent",
//         },
//         "::-webkit-scrollbar-thumb": {
//             background: "lightgray",
//             borderRadius: "8px",
//             outline: "none",
//             cursor: "pointer",
//             height: "4px",
//         },
//         "::-webkit-scrollbar-thumb:hover": {
//             background: "gray",
//         },
//     }),
//     dropdownIndicator: (base: any, props: any) => ({
//         ...base,
//         color: "#808080",
//         cursor: "pointer",
//     }),
// };

// const AsyncSelect: React.FC<AsyncSelectProps> = ({ label, register, classNames, required, ...rest }) => {
//     const dispatch = useAppDispatch();
//     const { department } = useJobSettings();
//     const {
//         jobListOptions: { data: jobList, meta: jobMeta },
//         isLoading: jobLoading,
//     } = useAppSelector((state) => state.job);
//     const loadOptions = async (search?: string) => {
//         const response = await dispatch(
//             fetchJobListOptions({
//                 data: {
//                     page: search ? 1 : (jobMeta.page || 0) + 1,
//                     jobTitle: search,
//                 },
//             })
//         );

//         return (response.payload.data || []).map((job: IJob) => ({ label: job.jobTitle, value: job.id }));
//     };
//     return (
//         <div className={`${classNames?.className ?? ""} flex flex-col gap-2`}>
//             {!!label && (
//                 <label className={`${classNames?.labelClassName ?? ""} content-2`}>
//                     {label} <span className="required">{required ? " *" : ""}</span>
//                 </label>
//             )}
//             <Async
//                 classNamePrefix="select"
//                 name="color"
//                 styles={customStyles}
//                 components={{ IndicatorSeparator: () => null }}
//                 defaultOptions={department}
//                 options={jobList.map((job) => ({ label: job.jobTitle, value: job.id as string }))}
//                 loadOptions={loadOptions}
//                 isLoading={jobLoading}
//                 {...rest}
//             />
//         </div>
//     );
// };

// export default AsyncSelect;
import React from "react";
import { AsyncSelectProps, Options } from "./select.type";
import Async from "react-select/async";
import { GroupBase, StylesConfig } from "react-select";

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  label,
  classNames,
  loadOptions,
  options,
  defaultOptions,
  isLoading,
  required,
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
      <Async
        classNamePrefix="select"
        name="async-select"
        components={{ IndicatorSeparator: () => null }}
        defaultOptions={defaultOptions}
        options={options}
        loadOptions={loadOptions}
        isLoading={isLoading}
        {...rest}
        styles={customStyles}
      />
    </div>
  );
};

export default AsyncSelect;
