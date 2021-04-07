import { PackageDetailResponse } from 'src/app/rest-api/package-api/model/package-details.model';
import { CreateAssesmentPackage, PublishAssessmentPackageStatusModel } from './assessments.model';

export let setInitalPackageDetailsState = (): PackageDetailResponse => {
  return {
    data: {
      id: 0,
      type: '',
      attributes: {
        name: '',
        description: '',
        status: '',
        type: '',
        level: '',
        duration: 0,
        usageCount: 0,
        updatedBy: '',
        updatedTime: '',
        tasks: []
      }
    },
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let createAssessmentPackage = (): CreateAssesmentPackage => {
  return {
    packageId: '',
    snackBarMessage: 'Saving Assessment...',
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let updateAssessmentPackage = (): CreateAssesmentPackage => {
  return {
    packageId: '',
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};

export let setInitalPublishAssessmentPackageStatus = (): PublishAssessmentPackageStatusModel => {
  return {
    success: '',
    failureMessage: {
      error: {
        errors: []
      }
    }
  };
};
