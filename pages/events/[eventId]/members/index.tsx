import * as React from "react";

import {QueryClient, useQuery} from "react-query";
import { dehydrate } from "react-query/hydration";

import {Avatar} from "../../../../design-system";
import { talliiAPI } from "../../../../api";
import {useRouter} from "next/router";
import {decodeCookie} from "../../../../utils";
import {Header} from "./_components/_Header";

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context) {
    const {
        params: { eventId },
    } = context;

    // init the query client
    const queryClient = new QueryClient();

    // prefetch event teams in the query client
    await queryClient.prefetchQuery(["EVENT", Number(eventId)], () =>
        api.getEvent({ eventId: Number(eventId) })
    );


    // prefetch event teams in the query client
    await queryClient.prefetchQuery(["EVENT_MEMBERS", Number(eventId)], () =>
        api.getEventMembers({ eventId: Number(eventId) })
    );

    const me = decodeCookie(context);

    try {
        const [events, members] = await Promise.all([
            api.getEvent({ eventId: Number(eventId) }),
            api.getEventMembers({ eventId: Number(eventId) })
        ]);

        return {
            props: {
                events,
                members,
                me,
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

export default function Members({ me }) {

    // init instance of the router
    const { query: { eventId }} = useRouter();

    // init state for editing
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    // init query to get event
    const { data: event } = useQuery(
        ["EVENT", Number(eventId)],
        () => api.getEvent({ eventId: Number(eventId) })
    );

    // init query to get members
    const { data: members} = useQuery(
        ["EVENT_MEMBERS", Number(eventId)],
        () => api.getEventMembers({ eventId: Number(eventId) })
    );

    return (
        <div>
            <Header isEditing={isEditing} setIsEditing={setIsEditing} members={members} event={event} />
            <div>
                <div className="bg-gray-800 rounded-lg divide-y divide-gray-700 mt-8">
                    {members.map((m) => {
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
                    {/*{isEventMember && !isEventTeamMember && (*/}
                    {/*    <div*/}
                    {/*        className={`${*/}
                    {/*            isPressed*/}
                    {/*                ? "bg-gray-700 bg-opacity-30 rounded-br-lg rounded-bl-lg"*/}
                    {/*                : ""*/}
                    {/*        } flex items-center p-4`}*/}
                    {/*        onTouchStart={onTouchStart}*/}
                    {/*        onTouchEnd={onTouchEnd}*/}
                    {/*        onTouchMove={onTouchMove}*/}
                    {/*        onClick={handleJoinClick}*/}
                    {/*    >*/}
                    {/*        <PlusCircleButton className="mr-2" />*/}
                    {/*        <p className="p font-semibold">Join Team</p>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
}
