import * as React from "react";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";

import {talliiAPI} from "../../../api";
import {Event as EventType, User} from "../../../api/tallii";

import {decodeCookie} from "../../../utils";
import {ChevronLeft} from "../../../components/icons/ChevronLeft";

import {Teams} from "./_components/_Teams";
import {Members} from "./_components/_Members";
import {Comments} from "./_components/_Comments";

interface EventProps {
    event: EventType;
    members: User[];
}

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId }
    } = context;

    // fetch the specific event
    try {
        const event = await api.getEvent({
            eventId: Number(eventId)
        });

        const members = await api.getEventMembers({
            eventId: Number(eventId)
        });

        // get me from the cookie
        const me = decodeCookie(context);

        // filter me out of the members
        const membersExcludingMe = members.filter((m) => m.userId !== me.userId);

        return {
            props: {
                event,
                members: membersExcludingMe
            }
        }
    } catch (err) {
        console.warn(err);

        return {
            props: {}
        }
    }
}

/// Event
const Event: React.FunctionComponent<EventProps> = ({ event, members }) => {
    const router = useRouter();

    const handleBack = React.useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className="h-full w-full p-4">
            <div className="inline-block mb-4" onClick={handleBack}>
                <ChevronLeft className="text-gray-50 -ml-2" size="40" />
            </div>
            <Members event={event} members={members} />
            <h2 className="h2">{event.name}</h2>
            <p className="p mt-2">{event.description}</p>
            <div>
                <Teams event={event} members={members} />
                <Comments event={event} />
            </div>
        </div>
    );
}

export default Event;

