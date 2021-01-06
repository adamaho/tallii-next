import * as React from "react";

import debounce from "lodash.debounce";

import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import { talliiAPI } from "../../../../../api";
import { Team, UpdateEventTeamRequest } from "../../../../../api/tallii";

interface ScoreProps {
    isEventMember: boolean;
    team: Team;
}

// init api instance
const api = talliiAPI();

export const Score: React.FunctionComponent<ScoreProps> = ({
    isEventMember,
    team,
}) => {
    // init instance of the router
    const {
        query: { eventId, teamId },
    } = useRouter();

    // init the query client
    const queryClient = useQueryClient();

    // init state of value of input
    const [inputValue, setInputValue] = React.useState<number>(team.score);

    // init the mutation to update the team
    const { mutate } = useMutation(
        (request: UpdateEventTeamRequest) =>
            api.updateEventTeam.call(api, request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["EVENT_TEAM", Number(teamId)]);
            },
        }
    );

    // handle updating the team with a debounce of 300ms
    const updateTeam = React.useCallback(
        debounce(async (score: string) => {
            // if the score is empty don't update it
            if (score === "") {
                return;
            }

            try {
                await mutate({
                    eventId: Number(eventId),
                    teamId: Number(teamId),
                    updateTeamRequest: {
                        name: team.name,
                        winner: team.winner,
                        score: Number(score),
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }, 300),
        []
    );

    // call the debounced on update function when the input changes
    const handleChange = React.useCallback(
        (e) => {
            updateTeam(e.target.value);
            setInputValue(e.target.value);
        },
        [team]
    );

    // handle the blur of the input
    const handleBlur = React.useCallback(
        (e) => {
            const value = e.target.value;

            // update the team score
            updateTeam(value);

            // if the value of the input is blank, set it back to the original score
            if (value === undefined || value === "") {
                setInputValue(team.score);
            } else {
                setInputValue(value);
            }
        },
        [team]
    );

    return (
        <div className="flex justify-center mt-12">
            <div className="card">
                <input
                    disabled={!isEventMember}
                    className="text-6xl text-center max-w-xs font-bold bg-transparent text-gray-50 w-min focus:outline-none py-4 disabled:text-gray-50"
                    value={inputValue}
                    type="number"
                    pattern="\d*"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};
