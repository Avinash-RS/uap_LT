import { Component, Input, OnInit } from '@angular/core';
import { AssesmentsUtil } from '../../assessments.common.utils';
import {
  AssesmentPackagesModel,
  TaskModel
} from 'src/app/rest-api/package-api/model/package-response.model';
import { AssessmentsReducerState } from '../../redux/assessments.model';
import { Store } from '@ngrx/store';
import * as assessmentActions from '../../redux/assessments.actions';
import { AssessmentsModuleEnum } from '../../assessments.enums';
@Component({
  selector: 'app-assessment-package-card',
  templateUrl: 'assessment-package-card.component.html',
  styleUrls: ['assessment-package-card.component.scss']
})
export class AssessmentPackageCardComponent implements OnInit {
  @Input() packageContent: AssesmentPackagesModel;
  @Input() tasks: TaskModel[];
  @Input() canViewPackage: boolean;
  constructor(
    public assesmentsUtil: AssesmentsUtil,
    private store: Store<AssessmentsReducerState>
  ) {}
  ngOnInit(): void {}
  createSubHeaderText(): string {
    const taskTypeAndCount = new Map<string, number>();
    this.tasks.forEach((task) => {
      const count = taskTypeAndCount.get(task.type);
      if (count) {
        taskTypeAndCount.set(task.type, count + 1);
      } else {
        taskTypeAndCount.set(task.type, 1);
      }
    });
    const taskString = new Array<string>();
    taskTypeAndCount.forEach((value, key) => {
      taskString.push(value + ' ' + key + ' ' + 'Test ');
    });

    return taskString.join('|');
  }
  archiveAssessmentPackage(): void {
    this.store.dispatch(
      assessmentActions.initPatchAssessmentPackageStatus({
        payload: {
          data: {
            id: this.packageContent.id.toString(),
            fields: ['STATUS'],
            attributes: {
              status: AssessmentsModuleEnum.ArchivedAssessmentStatus
            }
          },
          navigateToAssessmentListPage: false
        }
      })
    );
  }
  deleteAssessmentPackage(): void {
    this.store.dispatch(
      assessmentActions.initDeleteAssessmentPackage({
        payload: {
          packageTemplateId: this.packageContent.id
        }
      })
    );
  }
}
