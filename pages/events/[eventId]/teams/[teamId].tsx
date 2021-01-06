import * as React from "react";
import { GetServerSidePropsContext } from "next";

import { talliiAPI } from "../../../../api";
import { BackButton, Menu } from "../../../../design-system";
import { TeamMembers } from "./_components/_TeamMembers";
import { decodeCookie } from "../../../../utils";
import { LeaveButton } from "./_components/_LeaveButton";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { Score } from "./_components/_Score";

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId, teamId },
    } = context;

    // init the query client
    const queryClient = new QueryClient();

    // prefetch event teams in the query client
    await queryClient.prefetchQuery(["EVENT_TEAM", Number(teamId)], () =>
        api.getEventTeam({ eventId: Number(eventId), teamId: Number(teamId) })
    );

    // prefetch event team members in the query client
    await queryClient.prefetchQuery(
        ["EVENT_TEAM_MEMBERS", Number(teamId)],
        () =>
            api.getEventTeamMembers({
                eventId: Number(eventId),
                teamId: Number(teamId),
            })
    );

    const me = decodeCookie(context);

    try {
        // get the team and the team members
        const [team, teamMembers, members] = await Promise.all([
            api.getEventTeam({
                eventId: Number(eventId),
                teamId: Number(teamId),
            }),
            api.getEventTeamMembers({
                eventId: Number(eventId),
                teamId: Number(teamId),
            }),
            api.getEventMembers({
                eventId: Number(eventId),
            }),
        ]);

        return {
            props: {
                me,
                team,
                teamMembers,
                members,
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                me,
                dehydratedState: dehydrate(queryClient),
            },
        };
    }
}

export default function TeamId({ me, members }) {
    // init router for query
    const { query } = useRouter();

    // init query state from the server to enable refetching
    const { data: team } = useQuery(["EVENT_TEAM", Number(query.teamId)], () =>
        api.getEventTeam({
            eventId: team.eventId,
            teamId: team.teamId,
        })
    );

    // init query state from the server to enable refetching
    const { data: teamMembers } = useQuery(
        ["EVENT_TEAM_MEMBERS", Number(query.teamId)],
        () =>
            api.getEventTeamMembers({
                eventId: team.eventId,
                teamId: team.teamId,
            })
    );

    // calculate if user is a member of the event
    const isEventMember = React.useMemo(() => {
        return members.some((m) => m.userId === me.userId);
    }, [members, me]);

    // calculate if user is a member of the event of the team
    const isEventTeamMember = React.useMemo(() => {
        return teamMembers.some((m) => m.userId === me.userId);
    }, [teamMembers, me]);

    return (
        <div className="view">
            <BackButton />
            <h1 className="h1 text-center">{team.name}</h1>
            {isEventMember && (
                <p className="text-center text-blue-500">Change Name</p>
            )}
            <Score isEventMember={isEventMember} team={team} />
            <TeamMembers
                teamMembers={teamMembers}
                isEventMember={isEventMember}
                isEventTeamMember={isEventTeamMember}
            />
            {isEventTeamMember && <LeaveButton />}
        </div>
    );
}
