import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    state?: "warning";
}

export const Textarea: React.FunctionComponent<TextareaProps> = ({ onChange, ...props }) => {

    // init the textarea ref
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // init state of the rows
    const [height, setHeight] = React.useState({ rows: 1, scroll: 0 });

    // handle the change
    const handleChange = React.useCallback((e) => {
        if (onChange) {
            // call on change function
            onChange(e);

            // handle the height of the text area
            setHeight((current) => {
                const scroll = e.target.scrollHeight;

                if (current.scroll === 0) {
                    return {
                        rows: 1,
                        scroll
                    }
                } else if (scroll < current.scroll) {
                    return {
                        rows: current.rows - 1,
                        scroll
                    }
                } else if (scroll > current.scroll) {
                    return {
                        rows: current.rows + 1,
                        scroll
                    }
                } else {
                    return current;
                }
            });
        }
    }, [onChange]);

    return (
        <textarea
            ref={textareaRef}
            onChange={handleChange}
            style={{ resize: "none" }}
            rows={height.rows}
            className={`${props.className} ${
                props.state === "warning"
                    ? "border border-solid border-yellow-400"
                    : ""
            } transition-colors duration-200 ease-in-out w-full bg-gray-700 border border-solid border-gray-600 focus:outline-none text-gray-50 p-2 placeholder-gray-500 shadow-none rounded-md`}
            {...props}
        />
    );
};