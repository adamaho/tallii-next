import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Input: React.FunctionComponent<InputProps> = (props) => {
    return (
        <input
            {...props}
            className={`${props.className} w-full bg-gray-700 border border-solid border-gray-600 focus:outline-none text-gray-50 p-2 placeholder-gray-500 shadow-none rounded-md`}
        />
    );
};