import * as React from "react";

interface Heading2Props extends React.InputHTMLAttributes<HTMLHeadingElement> {
    className?: string;
}

export const Heading2: React.FunctionComponent<Heading2Props> = ({ children, className, ...props }) => {
    return (
        <h2 {...props} className={`${className || ""} text-gray-50 font-bold text-3xl`}>{children}</h2>
    );
}