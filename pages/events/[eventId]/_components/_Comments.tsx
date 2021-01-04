import * as React from "react";

import Link from "next/link";

import {useQuery} from "react-query";

import { Event } from "../../../../api/tallii";
import {talliiAPI} from "../../../../api";
import { Icon } from "../../../../design-system/primitive";

interface CommentProps {
    event: Event;
}

// init api instance
const api = talliiAPI();

export const Comments: React.FunctionComponent<CommentProps> = ({ event }) => {

    // init query to get comments
    const { data: comments, isLoading, isError } = useQuery(["EVENT_COMMENTS", event.eventId], () => api.getEventComments({ eventId: event.eventId }));

    // produce the content for the comments based on the state of the request
    const content = React.useMemo(() => {
        if (isLoading) {
            return (
                <div>
                    <div className="list-item-loading" />
                    <div className="list-item-loading mt-2" />
                </div>
            );
        } else if (isError) {
            return (
                <div className="flex items-center justify-center p-4">
                    <div className="flex items-center justify-center">
                        <Icon.ExclamationCircle className="text-gray-500 mr-1" />
                        <p className="p text-gray-500">Failed to get comments.</p>
                    </div>
                </div>
            );
        } else if (comments.length === 0) {
            return (
                <div className="flex items-center justify-center p-4">
                    <div className="flex items-center justify-center">
                        <Icon.Comment className="text-gray-500 mr-1" />
                        <p className="p text-gray-500">Leave a comment.</p>
                    </div>
                </div>
            )
        } else {
            return comments.map((c) => (
                <div key={c.commentId} className="first:mt-0 mt-2">
                    <p className="p font-semibold">{c.user.username}</p>
                    <p className="p">{c.comment}</p>
                </div>
            ));
        }
    }, [comments, isError, isLoading]);

    return (
        <div className="card mt-4">
            {content}
            {(!isLoading && comments.length > 0) && (
                <Link href={`/events/${event.eventId}/comments`}>
                    <p className="ps mt-2">View all comments</p>
                </Link>
            )}
        </div>
    );
};