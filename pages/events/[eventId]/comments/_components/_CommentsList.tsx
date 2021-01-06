import * as React from "react";

import {EventComment} from "../../../../../api/tallii";
import {Avatar} from "../../../../../design-system";

interface CommentsListProps {
    comments: EventComment[];
}

interface CommentProps {
    comment: EventComment;
}

const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
    return (
        <div className="flex items-start mb-2">
            <div className="flex-shrink-0 mr-2">
                <Avatar bgColor={comment.user.bgColor} emoji={comment.user.emoji} circleSize={"6"} emojiSize={"0.6rem"} />
            </div>
            <div className="flex-shrink">
                <p className="p font-semibold">{comment.user.username}</p>
                <p className="p">{comment.comment}</p>
            </div>
        </div>
    );
};

export const CommentsList: React.FunctionComponent<CommentsListProps> = ({ comments }) => {
    return (
        <div className="flex-grow mt-4">
            {comments.map((c) => {
                return (
                    <Comment key={c.commentId} comment={c} />
                );
            })}
        </div>
    );
}