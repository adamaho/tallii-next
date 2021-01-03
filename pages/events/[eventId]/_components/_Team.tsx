import * as React from "react";

import Link from "next/link";

import {useQuery} from "react-query";

import {Event, Team as TeamType} from "../../../../api/tallii";
import {Avatar, Icon, Heading3, ParagraphSmall} from "../../../../components";
import {talliiAPI} from "../../../../api";
import {useTouchState} from "../../../../hooks";

interface TeamProps {
    team: TeamType;
    event: Event;
}

// init instance of api
const api = talliiAPI();

export const Team: React.FunctionComponent<TeamProps> = ({ event, team }) => {

    const { data: teamMembers, isLoading, isError } = useQuery(["EVENT_TEAM_MEMBERS", team.teamId], () => api.getEventTeamMembers({
        teamId: team.teamId,
        eventId: event.eventId
    }));

    const { isPressed, onTouchStart, onTouchEnd, onTouchMove } = useTouchState();

    return (
        <Link href={`/events/${event.eventId}/teams/${team.teamId}`}>
            <div className={`${isPressed ? "bg-gray-700 first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg" : ""} p-3 flex items-center justify-between`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <div className="overflow-hidden">
                    <ParagraphSmall color="text-gray-50" className="font-semibold truncate">{team.name}</ ParagraphSmall>
                    <div className="flex items-center mt-2">
                        {teamMembers && teamMembers.map((tm, idx) => (
                            <Avatar key={tm.userId} className={idx !== 0 ? "-ml-2" : ""} bgColor={tm.bgColor} emoji={tm.emoji} circleSize="5" emojiSize="0.6em" />
                        ))}
                    </div>
                </div>
                <div className="flex items-center">
                    <Heading3 className="pl-6">
                        {team.score}
                    </Heading3>
                    <Icon.ChevronRight className="-mr-2 text-gray-500" />
                </div>
            </div>
        </Link>
    );
};