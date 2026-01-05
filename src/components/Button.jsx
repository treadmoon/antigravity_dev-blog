"use client"
import React from "react";
import styles from "./button.module.css";

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    type = "button",
    ...props
}) {
    const variantClass = variant === "secondary" ? styles.secondary : styles.primary;
    const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;
    const disabledClass = disabled ? styles.disabled : "";

    return (
        <button
            type={type}
            className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim()}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
