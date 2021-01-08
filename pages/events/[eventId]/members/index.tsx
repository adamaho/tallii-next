import * as React from "react";

import {QueryClient, useQuery} from "react-query";
import { dehydrate } from "react-query/hydration";

import {Avatar, AvatarCollection, BackButton, Button, PlusCircleButton} from "../../../../design-system";
import { talliiAPI } from "../../../../api";
import {useRouter} from "next/router";

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

    try {
        const [events, members] = await Promise.all([
            api.getEvent({ eventId: Number(eventId) }),
            api.getEventMembers({ eventId: Number(eventId) })
        ]);

        return {
            props: {
                events,
                members,
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    }
}

export default function Members() {

    // init instance of the router
    const { query: { eventId }} = useRouter();

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
            <div className="flex items-center justify-between mb-8">
                <BackButton />
                <Button className="text-blue-500" pressedClassName="bg-gray-50 bg-opacity-10">Edit</Button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <AvatarCollection users={members} />
                <h1 className="h1 mt-2">{event.name}</h1>
                <p className="p mt-2">{event.description}</p>
            </div>
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
