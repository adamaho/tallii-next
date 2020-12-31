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
 * A create event request.
 * @export
 * @interface CreateEventRequest
 */
export interface CreateEventRequest {
  /**
   *
   * @type {string}
   * @memberof CreateEventRequest
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof CreateEventRequest
   */
  description?: string | null;
  /**
   *
   * @type {Array<number>}
   * @memberof CreateEventRequest
   */
  members: Array<number>;
}

export function CreateEventRequestFromJSON(json: any): CreateEventRequest {
  return CreateEventRequestFromJSONTyped(json, false);
}

export function CreateEventRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CreateEventRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json["name"],
    description: !exists(json, "description") ? undefined : json["description"],
    members: json["members"],
  };
}

export function CreateEventRequestToJSON(
  value?: CreateEventRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    description: value.description,
    members: value.members,
  };
}
