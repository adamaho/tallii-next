import * as React from "react";

interface ParagraphSmallProps extends React.InputHTMLAttributes<HTMLParagraphElement> {
    className?: string;
    color?: string;
}

export const ParagraphSmall: React.FunctionComponent<ParagraphSmallProps> = ({ children, color, className, ...props }) => {
    return (
        <p {...props} className={`text-sm ${color ? color : "text-gray-500"} ${className || ""}`}>{children}</p>
    );
}