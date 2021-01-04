import * as React from "react";

export const Loading: React.FunctionComponent = () => {
    const [currentLine, setCurrentLine] = React.useState<number>(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((current) => {
                if (current >= 7) {
                    return 0;
                }
                return current + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <svg
            height="1rem"
            width="1rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line
                x1="12"
                y1="2"
                x2="12"
                y2="6"
                className={
                    currentLine === 0 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="16.24"
                y1="7.76"
                x2="19.07"
                y2="4.93"
                className={
                    currentLine === 1 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="18"
                y1="12"
                x2="22"
                y2="12"
                className={
                    currentLine === 2 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="16.24"
                y1="16.24"
                x2="19.07"
                y2="19.07"
                className={
                    currentLine === 3 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="12"
                y1="18"
                x2="12"
                y2="22"
                className={
                    currentLine === 4 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="4.93"
                y1="19.07"
                x2="7.76"
                y2="16.24"
                className={
                    currentLine === 5 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="2"
                y1="12"
                x2="6"
                y2="12"
                className={
                    currentLine === 6 ? "stroke-current text-gray-400" : ""
                }
            />
            <line
                x1="4.93"
                y1="4.93"
                x2="7.76"
                y2="7.76"
                className={
                    currentLine === 7 ? "stroke-current text-gray-400" : ""
                }
            />
        </svg>
    );
};
