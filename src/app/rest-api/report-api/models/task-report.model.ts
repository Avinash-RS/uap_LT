// tslint:disable
/**
 * UAP-Core Services
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Assessment Task Report Object
 * @export
 * @interface TaskReport
 */
export interface TaskReport {
    /**
     * Unique Assessment Task Id
     * @type {string}
     * @memberof TaskReport
     */
    id?: string;
    /**
     * Assessment Name
     * @type {string}
     * @memberof TaskReport
     */
    taskName?: string;
    /**
     * Assessment Task Type
     * @type {string}
     * @memberof TaskReport
     */
    taskType?: string;
    /**
     * Assessment Task Sub Type
     * @type {string}
     * @memberof TaskReport
     */
    taskSubType?: string;
    /**
     * Assessment Task Score
     * @type {string}
     * @memberof TaskReport
     */
    score?: string;
    /**
     * Number Of Test Cases Passed
     * @type {string}
     * @memberof TaskReport
     */
    passCnt?: string;
    /**
     * Number Of Test Cases Failed
     * @type {string}
     * @memberof TaskReport
     */
    failCnt?: string;
    /**
     * Assessment Task Report Generation Time
     * @type {string}
     * @memberof TaskReport
     */
    generatedTime?: string;
}
