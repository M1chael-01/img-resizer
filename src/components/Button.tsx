import React from "react";
import { type ReactNode, type MouseEvent } from "react";
import "../styles/Button.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "reset"
  | "download"
  | "lock"
  | "select";

type Props = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ariaLabel,
  icon,
  fullWidth = false,
}: Props) => {
  const variantClasses = {
    primary: "ir-btn-primary",
    secondary: "ir-btn-secondary",
    outline: "ir-btn-outline",
    reset: "ir-reset-btn",
    download: "ir-download-btn",
    lock: "ir-lock-btn",
    select: "ir-select-btn",
  };

  const classes = [
    "ir-btn",
    variantClasses[variant],
    fullWidth && "ir-btn-full-width",
    disabled && "ir-btn-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {icon && <span className="ir-btn-icon">{icon}</span>}
      <span className="ir-btn-text">{children}</span>
    </button>
  );
};

export default Button;
