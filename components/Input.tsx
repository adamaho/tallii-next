import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    state?: "warning"
}

export const Input: React.FunctionComponent<InputProps> = (props) => {
    return (
        <input
            {...props}
            className={`${props.className} ${props.state === "warning" ? "border border-solid border-yellow-400": ""} transition-colors duration-200 ease-in-out w-full bg-gray-700 border border-solid border-gray-600 focus:outline-none text-gray-50 p-2 placeholder-gray-500 shadow-none rounded-md`}
        />
    );
};