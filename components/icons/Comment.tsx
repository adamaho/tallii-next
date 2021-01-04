import * as React from "react";

interface CommentProps {
    className?: string;
    size?: string;
}

export const Comment: React.FunctionComponent<CommentProps> = ({ className, size}) => {
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
                d="M5 8C5 7.44772 5.44772 7 6 7H18C18.5523 7 19 7.44772 19 8V16C19 16.5523
                    19.4477 17 20 17C20.5523 17 21 16.5523 21 16V8C21 6.34315 19.6569 5 18
                    5H6C4.34315 5 3 6.34315 3 8V15C3 16.6569 4.34315 18 6 18H13.5147C14.8408 18
                    16.1126 18.5268 17.0503 19.4645L18.2929 20.7071C18.6834 21.0976 19.3166
                    21.0976 19.7071 20.7071C20.0976 20.3166 20.0976 19.6834 19.7071
                    19.2929L18.4645 18.0503C17.1517 16.7375 15.3712 16 13.5147 16H6C5.44772 16 5
                    15.5523 5 15V8Z"
                />
            <path
                d="M8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11H16C16.5523 11 17
        10.5523 17 10C17 9.44772 16.5523 9 16 9H8Z" />
            <path
                d="M8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H13C13.5523 14
        14 13.5523 14 13C14 12.4477 13.5523 12 13 12H8Z" />
        </svg>
    );
};