import * as React from "react";
import {useRouter} from "next/router";
import {ChevronLeft} from "../primitive/icons/ChevronLeft";

export const BackButton: React.FunctionComponent = () => {
    const router = useRouter();

    const handleBack = React.useCallback(() => {
        router.back();
    }, []);

    return (
        <div className="inline-block mb-4" onClick={handleBack}>
            <ChevronLeft className="text-gray-50 -ml-2" size="40" />
        </div>
    );
}