import * as React from "react";
import { GetServerSidePropsContext } from "next";

import { talliiAPI } from "../../../../api";
import { BackButton, Menu } from "../../../../design-system";
import { TeamMembers } from "../_components/_TeamMembers";
import { decodeCookie } from "../../../../utils";

// init tallii api
const api = talliiAPI();

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        params: { eventId, teamId },
    } = context;

    try {
        // get the team and the team members
        const [team, teamMembers, members] = await Promise.all([
            api.getEventTeam({
                eventId: Number(eventId),
                teamId: Number(teamId),
            }),
            api.getEventTeamMembers({
                eventId: Number(eventId),
                teamId: Number(teamId),
            }),
            api.getEventMembers({
                eventId: Number(eventId),
            }),
        ]);

        // get me from the cookie
        const me = decodeCookie(context);

        const isEventMember = members.some((m) => m.userId === me.userId);
        const isEventTeamMember = teamMembers.some(
            (m) => m.userId === me.userId
        );

        return {
            props: {
                team,
                teamMembers,
                isEventMember,
                isEventTeamMember,
            },
        };
    } catch (err) {
        return {
            props: {},
        };
    }
}

export default function TeamId({
    team,
    teamMembers,
    isEventMember,
    isEventTeamMember,
}) {
    // init the menu state
    const [isOpen, setIsOpen] = React.useState<boolean>();

    // handle the click of the trigger
    const handleLeaveClick = React.useCallback(() => {
        setIsOpen((current) => !current);
    }, []);

    return (
        <div className="view">
            <BackButton />
            <h1 className="h1 text-center">{team.name}</h1>
            {isEventMember && (
                <p className="text-center text-blue-500">Change Name</p>
            )}
            <div className="flex justify-center mt-12">
                <div className="card">
                    <input
                        disabled={!isEventMember}
                        className="text-6xl text-center max-w-xs font-bold bg-transparent text-gray-50 w-min focus:outline-none py-4"
                        defaultValue={team.score}
                        type="number"
                        pattern="\d*"
                    />
                </div>
            </div>
            <TeamMembers
                teamMembers={teamMembers}
                isEventMember={isEventMember}
                isEventTeamMember={isEventTeamMember}
            />
            {isEventTeamMember && (
                <>
                    <button
                        className="btn-danger w-full mt-8"
                        onClick={handleLeaveClick}
                    >
                        Leave Team
                    </button>
                    <Menu isOpen={isOpen} onClose={handleLeaveClick}>
                        <div className="divide-y divide-gray-700">
                            <p className="p text-center py-2">Would you like to leave this Team?</p>
                            <div className="p-2">
                                <button className="btn-danger w-full">Leave</button>
                                <button className="btn-cancel w-full mt-4">Cancel</button>
                            </div>
                        </div>
                    </Menu>
                </>
            )}
        </div>
    );
}
