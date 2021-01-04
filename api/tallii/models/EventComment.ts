/* tslint:disable */
/* eslint-disable */
/**
 * Tallii API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import { User, UserFromJSON, UserFromJSONTyped, UserToJSON } from "./";

/**
 * A comment on a specific event.
 * @export
 * @interface EventComment
 */
export interface EventComment {
    /**
     *
     * @type {number}
     * @memberof EventComment
     */
    commentId: number;
    /**
     *
     * @type {number}
     * @memberof EventComment
     */
    eventId: number;
    /**
     *
     * @type {User}
     * @memberof EventComment
     */
    user: User;
    /**
     *
     * @type {string}
     * @memberof EventComment
     */
    comment: string;
    /**
     *
     * @type {string}
     * @memberof EventComment
     */
    createdAt: string;
}

export function EventCommentFromJSON(json: any): EventComment {
    return EventCommentFromJSONTyped(json, false);
}

export function EventCommentFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): EventComment {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        commentId: json["comment_id"],
        eventId: json["event_id"],
        user: UserFromJSON(json["user"]),
        comment: json["comment"],
        createdAt: json["created_at"],
    };
}

export function EventCommentToJSON(value?: EventComment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        comment_id: value.commentId,
        event_id: value.eventId,
        user: UserToJSON(value.user),
        comment: value.comment,
        created_at: value.createdAt,
    };
}
