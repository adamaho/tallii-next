import * as React from "react";

import { Plus } from "../primitive/icons/Plus";

interface PlusCircleButtonProps {
  className?: string;
}

export const PlusCircleButton: React.FunctionComponent<PlusCircleButtonProps> = ({
  className,
}) => {
  return (
    <div
      className={`${
        className || ""
      } h-10 w-10 rounded-full flex items-center justify-center bg-gray-700`}
    >
      <Plus className="text-blue-500" size="24" />
    </div>
  );
};
