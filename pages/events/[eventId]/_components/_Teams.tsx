import * as React from "react";

import {useQuery} from "react-query";

import { Event, User } from "../../../../api/tallii";
import {talliiAPI} from "../../../../api";

import {Team} from "./_Team";

interface TeamsProps {
    event: Event;
    members: User[];
}

// init instance of api
const api = talliiAPI();

export const Teams: React.FunctionComponent<TeamsProps> = ({ event, members }) => {

    // init query to get the teams for the event
    const { data: teams, isLoading, isError } = useQuery(["EVENT_TEAMS", event.eventId], () => api.getEventTeams({
        eventId: event.eventId
    }));

    if (isLoading) {
        return (
            <div>Loading</div>
        );
    } else if (isError) {
        return <div>Error</div>
    } else if (teams && teams.length == 0) {
        return (
            <div>No Teams Yet.</div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg divide-y divide-gray-700 mt-8">
            {teams.map((t) => (
                <Team key={t.teamId} team={t} event={event} />
            ))}
        </div>
    );
}