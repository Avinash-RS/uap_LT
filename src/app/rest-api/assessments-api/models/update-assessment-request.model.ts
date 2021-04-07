import { ErrorResponse } from "../../common/models/error.model";

/**
 * User Assessment Update
 */
export interface UpdateAssessmentRequest {
    attributes: AttributesModel;
    type: string;
    failureMessage?: ErrorResponse;
}

export interface AttributesModel {
    firstName: string;
    lastName: string;
    hasAccepted: boolean;
    status: string;
}
