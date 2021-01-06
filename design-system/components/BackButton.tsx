import * as React from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "../primitive/icons/ChevronLeft";
import { useTouchState } from "../../hooks";

export const BackButton: React.FunctionComponent = () => {
    const router = useRouter();

    const {
        isPressed,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = useTouchState();

    const handleBack = React.useCallback(() => {
        router.back();
    }, []);

    return (
        <button
            className={`${
                isPressed ? "bg-gray-50 bg-opacity-10" : ""
            } inline-block -ml-2 rounded-full p-1 border-box`}
            onClick={handleBack}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <ChevronLeft className="text-gray-50" size="32" />
        </button>
    );
};
