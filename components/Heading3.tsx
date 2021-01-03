import * as React from "react";

interface Heading3Props extends React.InputHTMLAttributes<HTMLHeadingElement> {
    className?: string;
}

export const Heading3: React.FunctionComponent<Heading3Props> = ({ children, className, ...props }) => {
    return (
        <h2 {...props} className={`${className || ""} text-gray-50 font-bold text-2xl`}>{children}</h2>
    );
}