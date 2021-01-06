import * as React from "react";

import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import { User, ChangeTeamRequest } from "../../../../../api/tallii";
import { Avatar, PlusCircleButton } from "../../../../../design-system";
import { useTouchState } from "../../../../../hooks";
import { decodeCookie } from "../../../../../utils";

import { talliiAPI } from "../../../../../api";

interface TeamMembersProps {
    teamMembers: User[];
    isEventMember: boolean;
    isEventTeamMember: boolean;
}

// init api instance
const api = talliiAPI();

export const TeamMembers: React.FunctionComponent<TeamMembersProps> = ({
    teamMembers,
    isEventTeamMember,
    isEventMember,
}) => {
    const { query } = useRouter();

    // init touch state for join button
    const {
        isPressed,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = useTouchState();

    // init queryClient
    const queryClient = useQueryClient();

    // init mutation to change team
    const { mutate: changeTeam } = useMutation(
        (request: ChangeTeamRequest) => api.changeTeam.call(api, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "EVENT_TEAM_MEMBERS",
                    Number(query.teamId),
                ]);
            },
        }
    );

    // handle the join click
    const handleJoinClick = React.useCallback(async () => {
        try {
            // get me from cookie
            const me = decodeCookie();
            // change team
            await changeTeam({
                eventId: Number(query.eventId),
                teamId: Number(query.teamId),
                userId: me.userId,
            });
        } catch (error) {
            console.warn(error);
        }
    }, []);

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
                    onClick={handleJoinClick}
                >
                    <PlusCircleButton className="mr-2" />
                    <p className="p font-semibold">Join Team</p>
                </div>
            )}
        </div>
    );
};
