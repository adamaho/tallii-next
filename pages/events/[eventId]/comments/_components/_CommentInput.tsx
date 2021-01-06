import * as React from "react";
import {Icon, Button, Textarea} from "../../../../../design-system";

export const CommentInput: React.FunctionComponent = () => {
    return (
        <div className="w-full flex items-end">
            <Textarea placeholder="Leave a comment" onChange={() => console.log("asdf")}/>
            <Button className="btn-primary flex-shrink-0 ml-2" pressedClassName="btn-primary-tap">
                <Icon.Comment />
            </Button>
        </div>
    )
}