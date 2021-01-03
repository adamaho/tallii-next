import * as React from "react";

export const useTouchState = () => {
    const [isPressed, setIsPressed] = React.useState<boolean>(false);

    const onTouchStart = React.useCallback(() => {
        setIsPressed(true);
    }, []);

    const onTouchEnd = React.useCallback(() => {
        setIsPressed(false);
    }, []);

    const onTouchMove = React.useCallback(() => {
        setIsPressed(false);
    }, []);

    return {
        isPressed,
        onTouchStart,
        onTouchEnd,
        onTouchMove
    };
}