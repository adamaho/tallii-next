import * as React from "react";

import { Team, UpdateEventTeamRequest } from "../../../../../api/tallii";
import { Button } from "../../../../../design-system";
import { talliiAPI } from "../../../../../api";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

interface NameProps {
    team: Team;
    isEventMember: boolean;
}

// init instance of api
const api = talliiAPI();

export const Name: React.FunctionComponent<NameProps> = ({
    team,
    isEventMember,
}) => {
    // init ref for input for managing focus
    const inputRef = React.useRef<HTMLInputElement>(null);

    // init instance of router
    const {
        query: { eventId, teamId },
    } = useRouter();

    // init the query client
    const queryClient = useQueryClient();

    // init state for the input value
    const [inputValue, setInputValue] = React.useState<string>(team.name);

    // init state to change the name of the team
    const [isChangingName, setIsChangingName] = React.useState<boolean>(false);

    // init mutation to change the name of the team
    const { mutate } = useMutation(
        (request: UpdateEventTeamRequest) =>
            api.updateEventTeam.call(api, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["EVENT_TEAM", Number(teamId)]);
                setIsChangingName(false);
            },
        }
    );

    // handle change name click
    const handleChangeNameClick = React.useCallback(() => {
        setIsChangingName(true);
        setInputValue("");

        // wait for the input to not be disabled
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    }, [inputRef]);

    // handle cancel click
    const handleCancelClick = React.useCallback(() => {
        setIsChangingName(false);
        setInputValue(team.name);
    }, [team]);

    // handle done click
    const handleDoneClick = React.useCallback(async () => {
        try {
            await mutate({
                eventId: Number(eventId),
                teamId: Number(teamId),
                updateTeamRequest: {
                    name: inputValue,
                    score: team.score,
                    winner: team.winner,
                },
            });
        } catch (err) {
            console.warn(err);
        }
    }, [team, inputValue]);

    // handle input change
    const handleInputChange = React.useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <>
            <input
                ref={inputRef}
                disabled={!isChangingName}
                onChange={handleInputChange}
                placeholder="Enter a Team Name"
                className={`h1 w-full bg-transparent text-center focus:outline-none text-gray-50 disabled:text-gray-50 placeholder-gray-500 placeholder-opacity-40`}
                value={inputValue}
            />
            {isEventMember && !isChangingName && (
                <Button
                    className="text-center text-blue-500 font-normal w-full"
                    onClick={handleChangeNameClick}
                >
                    Change Name
                </Button>
            )}
            {isChangingName && (
                <div className="flex items-center justify-between mt-4">
                    <Button
                        className="text-blue-500 px-0"
                        pressedClassName="btn-cancel-tap"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="text-blue-500 px-0 disabled:text-gray-700"
                        disabled={inputValue === ""}
                        onClick={handleDoneClick}
                    >
                        Done
                    </Button>
                </div>
            )}
        </>
    );
};
