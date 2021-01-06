import * as React from "react";
import { useTouchState } from "../../hooks";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    pressedClassName?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    className,
    pressedClassName,
    ...props
}) => {
    // init touch pressed state
    const {
        isPressed,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = useTouchState();

    return (
        <button
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            className={`btn ${className || ""} ${
                isPressed ? pressedClassName : ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
};
