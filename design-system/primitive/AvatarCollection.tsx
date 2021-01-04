import * as React from "react";

import { Avatar } from "./Avatar";
import { User } from "../../api/tallii";

interface AvatarCollectionProps {
  users: User[];
  className?: string;
}

export const AvatarCollection: React.FunctionComponent<AvatarCollectionProps> = ({
  users,
  className,
}) => {
  // position the avatar
  const getAvatarProps = React.useCallback((idx) => {
    switch (idx) {
      case 0: {
        return {
          className: "absolute top-0 left-0",
          circleSize: "8",
          emojiSize: "0.8rem",
        };
      }
      case 1: {
        return {
          className: "absolute bottom-0 right-0",
          circleSize: "7",
          emojiSize: "0.7rem",
        };
      }
      case 2: {
        return {
          className: "absolute bottom-0 left-0",
          circleSize: "6",
          emojiSize: "0.5rem",
        };
      }
      case 3: {
        return {
          className: "absolute top-0 right-0",
          circleSize: "5",
          emojiSize: "0.5rem",
        };
      }
    }
  }, []);

  return (
    <div
      className={`relative h-12 w-12 rounded-full border border-solid border-gray-800 ${className}`}
    >
      {users.map((m, idx) => {
        return (
          <Avatar
            key={idx}
            bgColor={m.bgColor}
            emoji={m.emoji}
            {...getAvatarProps(idx)}
          />
        );
      })}
    </div>
  );
};
