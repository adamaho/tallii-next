import * as React from "react";

interface HeadingProps extends React.InputHTMLAttributes<HTMLHeadingElement> {
    className?: string;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({ children, className, ...props }) => {
    return (
        <h1 {...props} className={`${className} text-gray-50 font-bold text-4xl`}>{children}</h1>
    );
}