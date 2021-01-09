import * as React from "react";
import {AvatarCollection, BackButton, Button} from "../../../../../design-system";
import {Event, User} from "../../../../../api/tallii";

interface HeaderProps {
    setIsEditing: React.Dispatch<boolean>;
    isEditing: boolean;
    members: User[];
    event: Event;
}

export const Header: React.FunctionComponent<HeaderProps> = ({ isEditing, setIsEditing, members, event }) => {

    // init state for name
    const [name, setName] = React.useState<string>(event.name);

    // init state for description
    const [description, setDescription] = React.useState<string>(event.description);

    // handle set editing
    const handleEditClick = React.useCallback(() => {
        setIsEditing(true);

        setName("");
        setDescription("");
    }, []);

    // handle set not editing
    const handleCancelClick = React.useCallback(() => {
        setIsEditing(false);

        setName(event.name);
        setDescription(event.description);
    }, [event]);

    // handle done click
    const handleDoneClick = React.useCallback(() => {
        setIsEditing(false);

        setName(event.name);
        setDescription(event.description);
    }, [event]);

    // handle name change
    const handleNameChange = React.useCallback((e) => {
        setName(e.target.value);
    }, []);

    // handle description change
    const handleDescriptionChange = React.useCallback((e) => {
        setDescription(e.target.value);
    }, []);

    // handle returning the content based on the isEditing state
    const content = React.useMemo(() => {
        if (isEditing) {
            return (
                <>
                    <Button onClick={handleCancelClick} className="text-blue-500" pressedClassName="bg-gray-50 bg-opacity-10">Cancel</Button>
                    <Button onClick={handleDoneClick} className="text-blue-500" pressedClassName="bg-gray-50 bg-opacity-10">Done</Button>
                </>
            );
        }

        return (
            <>
                <BackButton />
                <Button onClick={handleEditClick} className="text-blue-500" pressedClassName="bg-gray-50 bg-opacity-10">Edit</Button>
            </>
        )
    }, [isEditing]);

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                {content}
            </div>
            <div className="flex flex-col items-center justify-center">
                <AvatarCollection users={members} />
                <input
                    disabled={!isEditing}
                    onChange={handleNameChange}
                    placeholder="Enter an Event Name"
                    className={`h2 w-full bg-transparent text-center focus:outline-none text-gray-50 disabled:text-gray-50 placeholder-gray-500 placeholder-opacity-40`}
                    value={name}
                />
                <input
                    disabled={!isEditing}
                    onChange={handleDescriptionChange}
                    placeholder="Enter an Event Description"
                    className={`p w-full bg-transparent text-center focus:outline-none text-gray-50 disabled:text-gray-50 placeholder-gray-500 placeholder-opacity-40`}
                    value={description}
                />
            </div>
        </>
    );
}