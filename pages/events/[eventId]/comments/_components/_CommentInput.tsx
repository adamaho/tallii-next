import * as React from "react";

import {useMutation, useQueryClient} from "react-query";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";

import {Icon, Button, Textarea, Avatar} from "../../../../../design-system";
import {talliiAPI} from "../../../../../api";
import {CreateEventCommentOperationRequest, User} from "../../../../../api/tallii";

interface CommentInputProps {
    me: User;
}

// init api instance
const api = talliiAPI();

export const CommentInput: React.FunctionComponent<CommentInputProps> = ({ me }) => {

    // init router
    const { query: { eventId }} = useRouter();

    // init state to track the comment value
    const [textareaValue, setTextareaValue] = React.useState("");

    // init query client
    const queryClient = useQueryClient();

    // init mutation to create the comment
    const { mutate } = useMutation((request: CreateEventCommentOperationRequest) => api.createEventComment.call(api, request), {
        onSuccess: () => {
            queryClient.invalidateQueries(["EVENT_COMMENTS", Number(eventId)]);
            setTextareaValue("");
        }
    });

    // handle the textarea change
    const handleChange = React.useCallback((e) => {
        setTextareaValue(e.target.value);
    }, []);

    // handle submitting the comment
    const handleAddComment = React.useCallback(async () => {

        // if there is no comment, dont submit it
        if (textareaValue === "") {
            return;
        }

        try {
            await mutate({
                eventId: Number(eventId),
                createEventCommentRequest: {
                    comment: textareaValue
                }
            })
        } catch (err) {
            console.warn(err);
        }
    }, [textareaValue]);

    return (
        <div className="w-full flex items-start border-b border-solid border-gray-700 pb-2">
            <Avatar className="flex-shrink-0 mr-2" bgColor={me.bgColor} emoji={me.emoji} circleSize="10" emojiSize="0.8rem" />
            <Textarea value={textareaValue} placeholder="Leave a comment" onChange={handleChange} />
            <AnimatePresence>
                {textareaValue !== "" && (
                    <motion.div initial={{ x: 10 }} animate={{ x: 0 }} exit={{ x: 5 }} className="self-end">
                        <Button onClick={handleAddComment} className="btn-primary flex-shrink-0 ml-2" pressedClassName="btn-primary-tap">
                            <Icon.Comment />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

