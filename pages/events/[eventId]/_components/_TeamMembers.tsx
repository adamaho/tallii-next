import * as React from "react";

import { User } from "../../../../api/tallii";
import { Avatar, PlusCircleButton } from "../../../../design-system";
import { useTouchState } from "../../../../hooks";

interface TeamMembersProps {
    teamMembers: User[];
    isEventMember: boolean;
    isEventTeamMember: boolean;
}

export const TeamMembers: React.FunctionComponent<TeamMembersProps> = ({
    teamMembers,
    isEventTeamMember,
    isEventMember,
}) => {
    // init touch state for join button
    const {
        isPressed,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = useTouchState();

    return (
        <div className="bg-gray-800 rounded-lg divide-y divide-gray-700 mt-8">
            {teamMembers.map((m) => {
                return (
                    <div key={m.userId} className="flex items-center p-4">
                        <Avatar
                            className="mr-2"
                            bgColor={m.bgColor}
                            emoji={m.emoji}
                            circleSize={"10"}
                            emojiSize={"1rem"}
                        />
                        <p className="p font-semibold">{m.username}</p>
                    </div>
                );
            })}
            {isEventMember && !isEventTeamMember && (
                <div
                    className={`${
                        isPressed
                            ? "bg-gray-700 bg-opacity-30 rounded-br-lg rounded-bl-lg"
                            : ""
                    } flex items-center p-4`}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    <PlusCircleButton className="mr-2" />
                    <p className="p font-semibold">Join Team</p>
                </div>
            )}
        </div>
    );
};
