export interface CreatePackageFormModel {
  assessmentDescription: string;
  assessmentLevelSelectOption: string;
  assessmentName: string;
  testItems: TestItemFormModel[];
}

export interface TestItemFormModel {
  testName: string;
  testTypeSelectOption: string;
}
