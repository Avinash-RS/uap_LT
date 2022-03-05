import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreatePackageFormModel,
  TestItemFormModel
} from './create-or-edit-assessment-package.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarContentComponent } from 'src/app/shared/custom-snack-bar-content/custom-snack-bar-content.component';
import * as assessmentActions from '../redux/assessments.actions';
import { Store } from '@ngrx/store';
import {
  selectCreateAssessmentSnackBarMessage,
  selectPackageId,
  selectTasksListState
} from '../redux/assessments.reducers';
import {
  TaskDataModel,
  TaskTemplateResponse
} from 'src/app/rest-api/package-api/model/task-template-response.model';
import { AssessmentsReducerState } from '../redux/assessments.model';
import { AssessmentsModuleEnum } from '../assessments.enums';
import { PackageRequest } from 'src/app/rest-api/package-api/model/package-request.model';
import {
  PackageDetailsData,
  PackageTaskAttributesModel
} from 'src/app/rest-api/package-api/model/package-details.model';
import {
  CategoryWithMenuOptions,
  SelectMenuOption
} from 'src/app/redux/reference-data/reference-data.model';
import { selectCategoryWithMenuOptions } from 'src/app/redux/reference-data/reference-data.reducer';

@Component({
  selector: 'app-create-or-edit-assessment-package',
  templateUrl: 'create-or-edit-assessment-package.html',
  styleUrls: ['create-or-edit-assessment-package.scss']
})
export class CreateOrEditAssessmentPackageComponent implements OnInit, OnDestroy {
  @Input() packageDetailsData: PackageDetailsData;
  tasks: TaskTemplateResponse;

  assessmentPackageForm: FormGroup;
  selectedTestTypes: string[] | undefined;
  currentFocusedTestBlock = 0;
  autoCompleteOptions: TaskDataModel[] = [];
  listOfAutoCompleteFilteredOptions: Array<TaskDataModel[]> = [];
  // Select Option default values
  defaultTestLevel = AssessmentsModuleEnum.DefaultTestLevel;
  defaultAssessmentLevel = AssessmentsModuleEnum.DefaultAssessmentLevel;
  testTypes: string[] = [];
  assessmentLevels: string[] = [];
  displayMessage: string | undefined;
  requestPackageId: string | undefined;
  saveButtonClickCountTracker = 0;
  collectTestIdsAndTestNames = new Map<number, string>();
  alphaNumericwithCommonSpecialCharacters: RegExp = /^([a-zA-Z0-9_ \-,.@&*(:)\r\n])*$/;
  alphaWithDots: any = Validators.pattern(this.alphaNumericwithCommonSpecialCharacters);
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AssessmentsReducerState>
  ) {
    this.assessmentPackageForm = this.fb.group({
      assessmentName: ['', [Validators.required,this.alphaWithDots]],
      assessmentDescription: ['', Validators.required],
      assessmentLevelSelectOption: [this.defaultAssessmentLevel],
      testItems: this.fb.array([]),
      enforceTestSequence: [false]
    });
  }

  get getTestItems(): FormArray {
    return this.assessmentPackageForm.get('testItems') as FormArray;
  }

  ngOnInit(): void {
 
    this.store
      .select(selectCategoryWithMenuOptions)
      .subscribe((categoryWithMenuOptions: CategoryWithMenuOptions) => {
        categoryWithMenuOptions.data.forEach((categoryWithMenuOption: SelectMenuOption) => {
          if (categoryWithMenuOption.name === AssessmentsModuleEnum.AssessmentLevel) {
            categoryWithMenuOption.menuOptions.forEach((menuOption) => {
              this.assessmentLevels.push(menuOption.decode);
            });
          }
          if (categoryWithMenuOption.name === AssessmentsModuleEnum.TaskType) {
            categoryWithMenuOption.menuOptions.forEach((menuOption) => {
              this.testTypes.push(menuOption.decode);
            });
          }
        });
      });
    this.getTasksList();
    this.store.select(selectTasksListState).subscribe((tasksList: TaskTemplateResponse) => {
      this.tasks = tasksList;
    });
    this.store
      .select(selectCreateAssessmentSnackBarMessage)
      .subscribe((message: string | undefined) => {
        this.displayMessage = message;
        if (this.getSavedOrFailedStatus(this.displayMessage)) {
          this.openSnackBar(this.displayMessage);
        }
      });
    this.assessmentPackageForm.valueChanges.subscribe(
      (getAssessmentPackageForm: CreatePackageFormModel) => {
        const autoCompleteSearchState =
          getAssessmentPackageForm.testItems[this.currentFocusedTestBlock]?.testName;
        this.listOfAutoCompleteFilteredOptions = [];
        /*
         * Get unique Task Types to populate options in select dropdown
         * Grouping Specifc task with all task names dynamically
         */
        getAssessmentPackageForm.testItems
          .map((testItem: TestItemFormModel) => testItem.testTypeSelectOption.toLowerCase())
          .forEach((selectedTestType: string, index: number) => {
            this.autoCompleteOptions = this.tasks.data.filter(
              (task: TaskDataModel) => task.attributes.type.toLowerCase() === selectedTestType
            );
            this.listOfAutoCompleteFilteredOptions.push(
              index === this.currentFocusedTestBlock
                ? this.autoCompleteOptions.filter((item: TaskDataModel) =>
                    item.attributes.name
                      .toLowerCase()
                      .includes(autoCompleteSearchState.toLowerCase())
                  )
                : this.autoCompleteOptions
            );
          });
      }
    );
    if (this.packageDetailsData !== undefined) {
      this.assessmentPackageForm.patchValue({
        assessmentName: this.packageDetailsData.attributes.name,
        assessmentDescription: this.packageDetailsData.attributes.description,
        assessmentLevelSelectOption: this.packageDetailsData.attributes.level
      });
      this.packageDetailsData.attributes.tasks.forEach((item: PackageTaskAttributesModel) => {
        // Creating form array items
        this.getTestItems.push(
          this.fb.group({
            testTypeSelectOption: [this.defaultTestLevel, Validators.required],
            testName: [item.name, Validators.required]
          })
        );
        // Save task id and task name to map operator passed from view assessment package
        if (!this.collectTestIdsAndTestNames.get(item.id)) {
          this.collectTestIdsAndTestNames.set(+item.id, item.name);
        }
      });
    }
    this.getTestItems.valueChanges.subscribe(() => {
      this.saveTaskIds();
    });
  }

  deleteTest(index: number): void {
    this.getTestItems.removeAt(index);
  }

  addTest(): void {
    this.getTasksList();
    this.getTestItems.push(this.createTestFields());
  }

  createTestFields(): FormGroup {
    return this.fb.group({
      testTypeSelectOption: [this.defaultTestLevel, Validators.required],
      testName: ['', Validators.required]
    });
  }

  onEnter(e: { preventDefault: () => void }): void {
    e.preventDefault();
  }

  getSpecificTaskIndex(i: number): void {
    this.currentFocusedTestBlock = i;
  }

  onSelectChange(index: number, event: Event): void {
    const selectedTestType = (event.target as HTMLInputElement).value;
    this.getTasksList(selectedTestType);
    const autoCompleteInputRef = document.getElementById(
      'auto-complete-input-field-' + index.toString()
    ) as HTMLInputElement;
    autoCompleteInputRef.value = '';
    this._resetTestNameOnSelectTestType(index);
  }

  getTasksList(selectedTestType: string = ''): void {
    this.store.dispatch(
      assessmentActions.getTasksList({
        payload: {
          taskType:
            selectedTestType.length === 0
              ? AssessmentsModuleEnum.DefaultTestLevel
              : selectedTestType.substring(2, selectedTestType.length).trim()
        }
      })
    );
  }

  private _resetTestNameOnSelectTestType(currentTestFoucedIndex: number): void {
    this.getTestItems.value.forEach((item: TestItemFormModel, testItemIndex: number) => {
      if (currentTestFoucedIndex === testItemIndex) {
        item.testName = '';
      }
    });
  }

  saveAssessmentPackage(): void {
    this.store.select(selectPackageId).subscribe((packageId: string | undefined) => {
      this.requestPackageId = packageId;
    });
    if (this.packageDetailsData !== undefined) {
      this.updateAssessmentPackage(this.packageDetailsData.id.toString(), false);
    } else {
      if (this.saveButtonClickCountTracker > 0) {
        this.updateAssessmentPackage(this.requestPackageId, false);
      } else {
        this.saveButtonClickCountTracker += 1;
        this.createAssessmentPackage(this.requestPackageId);
      }
    }
  }

  openSnackBar(message: string | undefined): void {
    const snackBarRef = this.snackBar.openFromComponent(CustomSnackBarContentComponent, {
      duration: 2000,
      data: {
        displayMessage: message
      },
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
    // Once the snackbar is closed reset snackbarMessage to initial reducer state
    snackBarRef.afterDismissed().subscribe(() => {
      this.store.dispatch(
        assessmentActions.resetCreateAsessmentPackageSnackBarMessage({
          payload: {
            snackbarMessage: AssessmentsModuleEnum.SavingAssessmentStatus
          }
        })
      );
    });
  }

  saveAssessmentPackageAndExit(): void {
    if (this.packageDetailsData !== undefined) {
      this.updateAssessmentPackage(this.packageDetailsData.id.toString(), true);
    } else {
      if (this.saveButtonClickCountTracker > 0) {
        this.updateAssessmentPackage(this.requestPackageId, true);
      } else {
        this.createAssessmentPackage(this.requestPackageId);
      }
    }
  }

  createAssessmentPackage(packageId: string | undefined): void {
    this.openSnackBar(this.displayMessage);
    this.store.dispatch(
      assessmentActions.initCreateAssessmentPackage({
        payload: {
          data: this.getAssessmentPackageRequestPayload(packageId),
          saveButtonClickCount: this.saveButtonClickCountTracker
        }
      })
    );
  }

  updateAssessmentPackage(packageId: string | undefined, gotoAssessmentPage: boolean): void {
    this.openSnackBar(this.displayMessage);
    this.store.dispatch(
      assessmentActions.initUpdateAssessmentPackage({
        payload: {
          data: this.getAssessmentPackageRequestPayload(packageId),
          navigateToAssessmentListPage: gotoAssessmentPage
        }
      })
    );
  }

  saveTaskIds(): void {
    this.getTestItems.value.forEach((testItem: TestItemFormModel) => {
      const getSelectedTask: TaskDataModel | undefined = this.tasks.data.find(
        (taskData: TaskDataModel) =>
          testItem.testName.toLowerCase() === taskData.attributes.name.toLowerCase()
      );
      if (getSelectedTask !== undefined) {
        if (!this.collectTestIdsAndTestNames.get(getSelectedTask.id)) {
          this.collectTestIdsAndTestNames.set(+getSelectedTask.id, getSelectedTask.attributes.name);
        }
      }
    });
  }

  getTaskIds(): number[] {
    const taskIds: number[] = [];
    this.getTestItems.value.forEach((item: TestItemFormModel) => {
      this.collectTestIdsAndTestNames.forEach((taskName: string, taskId: number) => {
        if (item.testName.toLowerCase() === taskName.toLowerCase()) {
          taskIds.push(taskId);
        }
      });
    });
    return taskIds;
  }

  getSavedOrFailedStatus(meesage: string | undefined): boolean | undefined {
    if (
      this.displayMessage?.includes(AssessmentsModuleEnum.FailedAssessmentStatus) ||
      this.displayMessage?.includes(AssessmentsModuleEnum.SavedAssessmentStatus)
    ) {
      return true;
    }
    return;
  }

  getAssessmentPackageRequestPayload(packageId: string | undefined): PackageRequest {
    return {
      id: packageId,
      type: 'package',
      attributes: {
        description: this.assessmentPackageForm.get('assessmentDescription')?.value,
        level: this.assessmentPackageForm.get('assessmentLevelSelectOption')?.value,
        name: this.assessmentPackageForm.get('assessmentName')?.value,
        sequenceOn: true,
        status: 'Draft',
        taskIds: this.getTaskIds(),
        updatedBy: 0
      }
    };
  }

  validateFormField(formField: string): boolean {
    if (
      this.assessmentPackageForm.get(formField)?.hasError('required') &&
      this.assessmentPackageForm.get(formField)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.collectTestIdsAndTestNames.clear();
    this.saveButtonClickCountTracker = 0;
    this.store.dispatch(assessmentActions.clearCreateAssessmentPackageState());
  }

  isAssessmentPackageInvalid(): boolean {
    return !(this.assessmentPackageForm.valid && this.getTestItems.value.length > 0);
  }

  get f() {
    return this.assessmentPackageForm.controls;
  }

}
