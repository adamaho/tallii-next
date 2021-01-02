import * as React from "react";

import { useRouter } from "next/router";
import {GetServerSidePropsContext} from "next";
import {talliiAPI} from "../../api";
import {Event as EventType} from "../../api/tallii";
import {Heading, ParagraphSmall} from "../../components";
import {Paragraph} from "../../components/Paragraph";

/**
 * Things we want to get from the server
 * - event and that is it
 */

interface EventProps {
    event: EventType
}

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId }
    } = context;

    // fetch the specific event
    try {
        let event = await api.getEvent({
            eventId: Number(eventId)
        });

        console.log("event", event);

        return {
            props: {
                event
            }
        }
    } catch (err) {
        console.warn(err);

        return {
            props: {}
        }
    }
}

const Event: React.FunctionComponent<EventProps> = ({ event }) => {

    // init the router
    const router = useRouter()

    console.log(event);

    console.log(process.browser);
    return (
        <div className="h-full w-full p-4">
            <ParagraphSmall>{event.creator.username}</ParagraphSmall>
            <Heading>{event.name}</Heading>
            <Paragraph>{event.description}</Paragraph>
        </div>
    );
}

export default Event;

