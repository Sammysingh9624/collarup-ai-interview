import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconClassName?: string;
    isDisable?: boolean;
}
export enum ButtonVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    TEXT = "text",
}
