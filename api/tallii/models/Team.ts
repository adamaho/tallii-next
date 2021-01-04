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
/**
 * A team that is part of an event.
 * @export
 * @interface Team
 */
export interface Team {
    /**
     *
     * @type {number}
     * @memberof Team
     */
    teamId: number;
    /**
     *
     * @type {number}
     * @memberof Team
     */
    eventId: number;
    /**
     *
     * @type {string}
     * @memberof Team
     */
    name: string;
    /**
     *
     * @type {number}
     * @memberof Team
     */
    score: number;
    /**
     *
     * @type {boolean}
     * @memberof Team
     */
    winner: boolean;
    /**
     *
     * @type {string}
     * @memberof Team
     */
    createdAt: string;
}

export function TeamFromJSON(json: any): Team {
    return TeamFromJSONTyped(json, false);
}

export function TeamFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): Team {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        teamId: json["team_id"],
        eventId: json["event_id"],
        name: json["name"],
        score: json["score"],
        winner: json["winner"],
        createdAt: json["created_at"],
    };
}

export function TeamToJSON(value?: Team | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        team_id: value.teamId,
        event_id: value.eventId,
        name: value.name,
        score: value.score,
        winner: value.winner,
        created_at: value.createdAt,
    };
}
