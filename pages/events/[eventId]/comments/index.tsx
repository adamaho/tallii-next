import * as React from "react";
import {BackButton} from "../../../../design-system";

import { CommentsList } from "./_components/_CommentsList";
import {CommentInput} from "./_components/_CommentInput";
import {QueryClient} from "react-query";
import {decodeCookie} from "../../../../utils";
import {dehydrate} from "react-query/hydration";
import {talliiAPI} from "../../../../api";

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
        // get event comments
        const comments = await api.getEventComments({ eventId: Number(eventId) });

        return {
            props: {
                comments,
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

export default function Comments({ comments }) {
    return (
        <div className="view flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <BackButton />
                <h5 className="h5 -ml-8">Comments</h5>
                <div />
            </div>
            <CommentInput />
            <CommentsList comments={comments} />
        </div>
    )
}
