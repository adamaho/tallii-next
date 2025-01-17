import * as React from "react";

interface ChevronLeftProps {
    className?: string;
    size?: string;
}

export const ChevronLeft: React.FunctionComponent<ChevronLeftProps> = ({
    className,
    size,
}) => {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.7029 7.29289C14.0934 7.68342 14.0934 8.31658 13.7029 8.70711L10.41
                    12L13.7029 15.2929C14.0934 15.6834 14.0934 16.3166 13.7029 16.7071C13.3124
                    17.0976 12.6792 17.0976 12.2887 16.7071L8.99579 13.4142C8.21474 12.6332
                    8.21474 11.3668 8.99579 10.5858L12.2887 7.29289C12.6792 6.90237 13.3124
                    6.90237 13.7029 7.29289Z
                "
            />
        </svg>
    );
};
