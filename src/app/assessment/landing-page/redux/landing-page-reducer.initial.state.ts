import { AssessmentTaskModel } from 'src/app/rest-api/assessments-api/models/assessment-response.model';
import { AssessmentTaskUrlModel } from 'src/app/rest-api/assessments-api/models/assessment-task-url-response-model';
import { UpdateAssessmentRequest } from 'src/app/rest-api/assessments-api/models/update-assessment-request.model';

export let setInitialLandingPageState = (): AssessmentTaskModel => {
  return {
    data: {
      id: 0,
      type: '',
      attributes: {
        firstName: '',
        lastName: '',
        emailId: '',
        batchId: '',
        batchName: '',
        sequenceOn: false,
        startDateTime: '',
        endDateTime: '',
        duration: 0,
        level: '',
        hasAccepted: false,
        packageName: '',
        packageDes: '',
        packageId: '',      
        assessmentTasks: [
          {
            id: 0,
            taskName: '',
            status: '',
            startTime: '',
            endTime: '',
            completedTime: '',
            duration: 0,
            taskType: ''
          }
        ]
      }
    }
  };
};

export let setInitialAssessmentTaskUrlState = (): AssessmentTaskUrlModel => {
  return {
    id: 0,
    type: '',
    attributes: {
      taskSource: '',
      srcTaskId: '',
      taskUrl: ''
    }
  };
};

export let setInitialUpdateAssessmentState = (): UpdateAssessmentRequest => {
  return {
    type: '',
    attributes: {
      firstName: '',
      lastName: '',
      hasAccepted: false,
      status: ''
    }
  };
};
