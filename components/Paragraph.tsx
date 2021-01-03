import * as React from "react";

interface ParagraphProps extends React.InputHTMLAttributes<HTMLParagraphElement> {
    className?: string;
    color?: string;
}

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({ children, color, className, ...props }) => {
    return (
        <p {...props} className={`text-md ${color ? color : "text-gray-50"} ${className}`}>{children}</p>
    );
}