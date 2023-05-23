import type { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: "primary" | "secondary" | "partial";
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  size?: "small" | "medium" | "large";
  isPressed?: boolean;
}

export const Button = ({
  extClassName,
  buttonType,
  disabled,
  label,
  size = "small",
  isPressed,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles.button,
      styles[`button--${buttonType}`],
      styles[`button--${size}`],
      styles[`button--${buttonType}--${size}`],
      { [styles[`button--${buttonType}--pressed`]]: isPressed },
      extClassName,
      "text",
      "text_size_small"
    )}
    disabled={disabled}
    {...props}
  >
    <div
      className={classnames(
        styles.buttonContent,
        styles[`buttonContent--${buttonType}`]
      )}
    >
      {label}
    </div>
  </button>
);
