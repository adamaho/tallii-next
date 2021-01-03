import * as React from "react";
import Link from "next/link";

import {GetServerSidePropsContext} from "next";

import {talliiAPI} from "../../../api";
import {Event as EventType, User} from "../../../api/tallii";

import {Avatar, AvatarCollection, Heading2, Icon, ParagraphSmall} from "../../../components";
import {Paragraph} from "../../../components";
import {decodeCookie} from "../../../utils";
import {ChevronLeft} from "../../../components/icons/ChevronLeft";
import {useRouter} from "next/router";
import {Teams} from "./_components/_Teams";

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

/// Event Members display at the top of the screen
const EventMembers: React.FunctionComponent<EventProps> = ({event, members}) => {
    const children = React.useMemo(() => {
        if (members.length === 0) {
            return (
                <>
                    <Avatar className="mr-1" bgColor={event.creator.bgColor} emoji={event.creator.emoji} emojiSize="0.75rem" circleSize="7" />
                    <p className="ps">{event.creator.username}</p>
                </>
            );
        } else if (members.length === 1) {
            return (
                <>
                    <Avatar className="mr-1" bgColor={members[0].bgColor} emoji={members[0].emoji} emojiSize="0.75rem" circleSize="7" />
                    <p className="ps">{members[0].username}</p>
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
            <div className="flex items-center mb-2">
                {children}
            </div>
        </Link>
    );
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
                <ChevronLeft className="text-gray-50" size="40" />
            </div>
            <EventMembers event={event} members={members} />
            <h2 className="h2">{event.name}</h2>
            <p className="p mt-2">{event.description}</p>
            <div>
                <Teams event={event} members={members} />
            </div>
        </div>
    );
}

export default Event;

