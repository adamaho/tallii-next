import * as React from "react";
import {GetServerSidePropsContext} from "next";

import {talliiAPI} from "../../../../api";
import {BackButton} from "../../../../design-system";

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId, teamId }
    } = context;

    try {
        // get the team and the team members
        const [team, members] = await Promise.all([
            api.getEventTeam({
                eventId: Number(eventId),
                teamId: Number(teamId)
            }),
            api.getEventTeamMembers({
                eventId: Number(eventId),
                teamId: Number(teamId)
            })
        ]);

        return {
            props: {
                team,
                members
            }
        }
    } catch (err) {
        return {
            props: {}
        }
    }
}

export default function TeamId({ team, members }) {
    return (
        <div>
            <BackButton />
            Teamasdfasdfasdfafasdf
        </div>
    );
}
