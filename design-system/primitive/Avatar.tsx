import * as React from "react";

interface AvatarProps {
  bgColor: string;
  className?: string;
  emoji: string;
  circleSize: string;
  emojiSize: string;
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({
  bgColor,
  emoji,
  circleSize,
  emojiSize,
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-center h-${circleSize} w-${circleSize} border border-solid border-gray-800 rounded-full shadow-md ${className}`}
      style={{ background: bgColor }}
    >
      <p style={{ fontSize: emojiSize }}>{emoji}</p>
    </div>
  );
};
