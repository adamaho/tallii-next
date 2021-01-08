import * as React from "react";

import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { BackButton } from "../../../../design-system";

import { CommentsList } from "./_components/_CommentsList";
import { CommentInput } from "./_components/_CommentInput";

import { talliiAPI } from "../../../../api";

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context) {
    const {
        params: { eventId },
    } = context;

    // init the query client
    const queryClient = new QueryClient();

    // prefetch event teams in the query client
    await queryClient.prefetchQuery(["EVENT_COMMENTS", Number(eventId)], () =>
        api.getEventComments({ eventId: Number(eventId) })
    );

    try {
        const [comments, me] = await Promise.all([
            api.getEventComments({ eventId: Number(eventId) }),
            api.getMe(),
        ]);

        return {
            props: {
                comments,
                me,
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

export default function Comments({ me }) {
    // init the router to get the eventId
    const {
        query: { eventId },
    } = useRouter();

    // init query to get comments
    const { data: comments, isLoading, isError } = useQuery(
        ["EVENT_COMMENTS", Number(eventId)],
        () => api.getEventComments({ eventId: Number(eventId) })
    );

    return (
        <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <BackButton />
                <h5 className="h5 -ml-8">Comments</h5>
                <div />
            </div>
            <CommentInput me={me} />
            <CommentsList comments={comments} />
        </div>
    );
}
