import { TaskModel } from 'src/app/rest-api/package-api/model/task-template-response.model';
import * as fromRoot from 'src/app/reducers/index';
import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import { PackageModel, MetaModel } from 'src/app/rest-api/package-api/model/package-response.model';
import { ErrorResponse } from 'src/app/rest-api/common/models/error.model';
import { PackageRequest } from 'src/app/rest-api/package-api/model/package-request.model';
export interface AssessmentState {
  tasksList: TaskModel;
  packageList: PackageModel;
  packageDetails: PackageDetailResponse;
  createAssessmentPackage: CreateAssesmentPackage;
  loadMorePackageTemplates: boolean;
  publishAssessmentPackageStatus: PublishAssessmentPackageStatusModel;
}
export interface LoadMorePackageTemplatesModel {
  pageMetaData: MetaModel;
  searchString: string;
  status: string;
}
export interface AssessmentsReducerState extends fromRoot.AppState {
  assessmentsModule: { assessmentsModuleState: AssessmentState };
}
export interface CreateAssesmentPackage {
  packageId?: string;
  snackBarMessage?: string;
  failureMessage?: ErrorResponse;
}
export interface InitCreateASsessmentModel {
  data: PackageRequest;
  saveButtonClickCount: number;
}

export interface UpdateOrPatchAssessmentModel {
  data: PackageRequest;
  navigateToAssessmentListPage: boolean;
}

export interface DeleteAssessmentPackageModel {
  packageTemaplteId: number;
}

export interface PublishAssessmentPackageStatusModel {
  success: string;
  failureMessage?: ErrorResponse;
}
