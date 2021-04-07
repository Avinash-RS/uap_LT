import { PaginationModel } from "../../common/models/pagination.model";

/**
 * @export
 * @interface AssessmentReportRequest
 */
export interface AssessmentReportRequest {
    /**
     * Unique batchId Id
     * @type {string}
     * @memberof AssessmentReportRequest
     */
    batchId?: string;
    /**
     * Unique user email Id
     * @type {string}
     * @memberof AssessmentReportRequest
     */
    userEmailId?: string;

    pagination?: PaginationModel;
    
}
