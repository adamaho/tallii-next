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
 * An successful request.
 * @export
 * @interface Success
 */
export interface Success {
  /**
   *
   * @type {string}
   * @memberof Success
   */
  code: string;
  /**
   *
   * @type {string}
   * @memberof Success
   */
  message: string;
}

export function SuccessFromJSON(json: any): Success {
  return SuccessFromJSONTyped(json, false);
}

export function SuccessFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Success {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    code: json["code"],
    message: json["message"],
  };
}

export function SuccessToJSON(value?: Success | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    code: value.code,
    message: value.message,
  };
}
