import * as React from "react";

interface PlusProps {
    className?: string;
    size?: string;
}

export const Plus: React.FunctionComponent<PlusProps> = ({ className, size}) => {
    return (
        <svg
            width={size || "24"}
            height={size || "24"}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <path
                d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11L5 11C4.44772
    11 4 11.4477 4 12C4 12.5523 4.44771 13 5 13L11 13V19C11 19.5523 11.4477 20
    12 20C12.5523 20 13 19.5523 13 19V5Z" />
            <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H15C14.4477
    11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13H19Z" />
        </svg>
    );
};