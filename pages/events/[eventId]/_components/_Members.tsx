import * as React from "react";
import {
  Avatar,
  AvatarCollection,
  Icon,
} from "../../../../design-system/primitive";
import Link from "next/link";
import { Event as EventType, User } from "../../../../api/tallii";

interface MembersProps {
  event: EventType;
  members: User[];
}

export const Members: React.FunctionComponent<MembersProps> = ({
  event,
  members,
}) => {
  const children = React.useMemo(() => {
    if (members.length === 0) {
      return (
        <>
          <Avatar
            className="mr-1"
            bgColor={event.creator.bgColor}
            emoji={event.creator.emoji}
            emojiSize="0.75rem"
            circleSize="7"
          />
          <div className="flex items-center">
            <p className="ps">{event.creator.username}</p>
            <Icon.ChevronRight className="text-gray-500 -ml-1" />
          </div>
        </>
      );
    } else if (members.length === 1) {
      return (
        <>
          <Avatar
            className="mr-1"
            bgColor={members[0].bgColor}
            emoji={members[0].emoji}
            emojiSize="0.75rem"
            circleSize="7"
          />
          <div className="flex items-center">
            <p className="ps">{members[0].username}</p>
            <Icon.ChevronRight className="text-gray-500 -ml-1" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <AvatarCollection
            className="mr-1"
            users={[...members].splice(0, 4)}
          />
          <div className="flex items-center">
            <p className="ps">{members.length} Members</p>
            <Icon.ChevronRight className="text-gray-500 -ml-1" />
          </div>
        </>
      );
    }
  }, [event, members]);

  return (
    <Link href={`/events/${event.eventId}/members`}>
      <div className="flex items-center mb-2">{children}</div>
    </Link>
  );
};
