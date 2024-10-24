import React from "react";
import { Loader } from "../loader";
import classes from "./button.module.css";
import { type ButtonProps, ButtonVariant } from "./button.type";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = ButtonVariant.PRIMARY,
  isLoading,
  leftIcon,
  isDisable,
  rightIcon,
  iconClassName = "",
  ...props
}) => {
  const renderClass = () => {
    switch (variant) {
      case ButtonVariant.SECONDARY:
        return classes.secondary;
      case ButtonVariant.TEXT:
        return classes.text;
      default:
        return classes.primary;
    }
  };
  return (
    <button
      className={`rounded-lg w-fit flex items-center justify-center gap-2 ${className} ${renderClass()}`}
      {...props}
      disabled={isDisable || props.disabled}
    >
      {!!leftIcon && <span className={`${iconClassName}`}>{leftIcon}</span>}
      {!isLoading && children}
      {isLoading && (
        <Loader className="!relative !right-0 !top-0 !translate-y-0" />
      )}
      {!!rightIcon && <span className={`${iconClassName}`}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
