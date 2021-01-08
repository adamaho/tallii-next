import * as React from "react";
import { GetServerSidePropsContext } from "next";

import { talliiAPI } from "../../../api";
import { Event as EventType, User } from "../../../api/tallii";

import { decodeCookie } from "../../../utils";

import { Teams } from "./_components/_Teams";
import { Members } from "./_components/_Members";
import { Comments } from "./_components/_Comments";
import { BackButton } from "../../../design-system";

interface EventProps {
    event: EventType;
    members: User[];
}

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId },
    } = context;

    // fetch the specific event
    try {
        const event = await api.getEvent({
            eventId: Number(eventId),
        });

        const members = await api.getEventMembers({
            eventId: Number(eventId),
        });

        return {
            props: {
                event,
                members,
            },
        };
    } catch (err) {
        console.warn(err);

        return {
            props: {},
        };
    }
}

const Event: React.FunctionComponent<EventProps> = ({ event, members }) => {
    return (
        <div>
            <BackButton />
            <Members event={event} members={members} />
            <h2 className="h2">{event.name}</h2>
            <p className="p mt-2">{event.description}</p>
            <div>
                <Teams event={event} members={members} />
                <Comments event={event} />
            </div>
        </div>
    );
};

export default Event;
