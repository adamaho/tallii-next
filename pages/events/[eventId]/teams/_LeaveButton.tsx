import * as React from "react";

import { RemoveEventTeamMemberRequest } from "../../../../api/tallii";
import {Button, Menu} from "../../../../design-system";
import { useMutation, useQueryClient } from "react-query";
import { talliiAPI } from "../../../../api";
import { useRouter } from "next/router";
import { decodeCookie } from "../../../../utils";

// init the api client
const api = talliiAPI();

export const LeaveButton: React.FunctionComponent = () => {
    // init router
    const router = useRouter();

    // init queryClient
    const queryClient = useQueryClient();

    // init the menu state
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // init mutation to leave team
    const { mutate } = useMutation(
        (request: RemoveEventTeamMemberRequest) =>
            api.removeEventTeamMember.call(api, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "EVENT_TEAM_MEMBERS",
                    Number(router.query.teamId),
                ]);
            },
        }
    );

    // handle the click of the trigger
    const handleLeaveClick = React.useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    // handle cancel menu click
    const handleCancelMenuClick = React.useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    // handle leave menu click
    const handleLeaveMenuClick = React.useCallback(async () => {
        try {
            // get my info from the cookie
            const me = decodeCookie();

            // remove me from the event team
            await mutate({
                eventId: Number(router.query.eventId),
                teamId: Number(router.query.teamId),
                userId: me.userId,
            });
        } catch (error) {
            console.warn(error);
        }
    }, []);

    return (
        <>
            <Button
                className="btn-danger w-full mt-8"
                pressedClassName="btn-danger-tap"
                onClick={handleLeaveClick}
            >
                Leave Team
            </Button>
            <Menu isOpen={isOpen} onClose={handleCancelMenuClick}>
                <div className="divide-y divide-gray-700">
                    <p className="p text-center py-2">
                        Would you like to leave this Team?
                    </p>
                    <div className="p-2">
                        <Button
                            onClick={handleLeaveMenuClick}
                            className="btn-danger w-full"
                            pressedClassName="btn-danger-tap"
                        >
                            Leave
                        </Button>
                        <Button
                            onClick={handleCancelMenuClick}
                            className="btn btn-cancel w-full mt-4"
                            pressedClassName="btn-cancel-tap"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Menu>
        </>
    );
};
