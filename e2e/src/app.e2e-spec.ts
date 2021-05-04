import { browser, element, by, protractor } from 'protractor';
import { AppPage } from './app.po';
const appPage = new AppPage();
const EC = protractor.ExpectedConditions;

describe('UAP App', () => {
  it('Logged into UAP', async () => {
    await browser.waitForAngularEnabled(false);
    browser.get('/');
    await appPage.loginIntoUAP();
    await appPage.getAccessToken();
    expect(await browser.wait(EC.urlContains('/admin/assessments/list'), 5000));
  });
  it('creating new assessment and deleting it', async () => {
    await appPage.createNewAssessment();
    await appPage.searchForAssessment('Draft');
    await appPage.deleteArchiveAssessment();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/section/div[1]/app-search/form/div/mat-form-field/div/div[1]/div[2]/button'
      )
    ).click();
  });
  it('create new assessment and archiving it', async () => {
    await appPage.createNewAssessment();
    await appPage.openViewAssessment();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/div/div/span[1]/button'
      )
    ).click();
    await element(by.xpath('//button[@class="add-button__color"]')).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/app-create-or-edit-assessment-package/form/div/div/div/div[1]/div[2]/div[2]/select'
      )
    ).sendKeys('English');
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/app-create-or-edit-assessment-package/form/div/div/div/div[1]/div[2]/div[2]/div/form/mat-form-field/div/div[1]/div/input'
      )
    ).sendKeys('Wired Numbers');
    await element(by.xpath('//mat-option[@ng-reflect-value="Wired Numbers"]')).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/app-create-or-edit-assessment-package/div/div/span[2]/button'
      )
    ).click();
    await appPage.openViewAssessment();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/div/div/span[2]/button'
      )
    ).click();
    await appPage.searchForAssessment('Published');
    await appPage.deleteArchiveAssessment();
    expect(await browser.wait(EC.urlContains('/admin/assessments/list'), 5000));
  });
  it('create new assessment and publishing it', async () => {
    await appPage.createNewAssessment();
    await appPage.openViewAssessment();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-view-assessment-package/div/div/span[2]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/list'), 5000));
  });
  it('Navigated to create new schedule assessment page', async () => {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav/div/div/div[2]'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/schedule/list'), 5000));
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-status/app-list-scheduled-assessment/div/main/section[1]/div[3]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/schedule/create'), 5000));
  });
  it('Created new schedule', async () => {
    await element(by.xpath('//input[@formcontrolname="batchName"]')).sendKeys(appPage.testingName);
    await element(by.xpath('//textarea[@formcontrolname="scheduleDescription"]')).sendKeys(
      appPage.testingName
    );
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-status/app-create-schedule-package/form/div/div/div/div[1]/span[2]/div/ngx-timepicker-field/div/ngx-timepicker-time-control[2]/div/div/span[1]'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="assessmentName"]')).sendKeys(
      appPage.testingName
    );
    await element(by.xpath(`//mat-option[@ng-reflect-value='${appPage.testingName}']`)).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-status/app-create-schedule-package/form/div/div/div/div[3]/p[2]/button'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="emailId"]')).sendKeys(
      appPage.candidateMail
    );
    await element(by.xpath('//input[@formcontrolname="firstName"]')).sendKeys('testing');
    await element(by.xpath('//input[@formcontrolname="lastName"]')).sendKeys(appPage.testingName);
    await element(by.css('.header-block__button')).click();
    expect(await browser.wait(EC.urlContains('/admin/schedule/list'), 5000));
  });
  it('Navigating to candidate assessment', async () => {
    await appPage.getAssessmentID();
    await browser.wait(EC.urlContains('landing'), 10000);
    expect(
      await browser.wait(
        EC.elementToBeClickable(element(by.xpath('//mat-checkbox[@formcontrolname="consent"]'))),
        5000
      )
    );
  });
  it('Checking consent form checkbox', () => {
    element(by.xpath('//mat-checkbox[@formcontrolname="consent"]')).click();
    expect(
      browser.wait(
        EC.visibilityOf(
          element(
            by.xpath(
              '/html/body/app-root/app-assessment/app-assessment-landing-page/main/div/section[2]/app-task-cards/div/div/div[2]'
            )
          )
        ),
        10000
      )
    );
  });
  it('Starting assessment', () => {
    browser.wait(
      EC.elementToBeClickable(
        element(
          by.xpath(
            '/html/body/app-root/app-assessment/app-assessment-landing-page/main/div/section[2]/app-task-cards/div/div/div[2]/div[2]/button'
          )
        )
      ),
      60000
    );
    element(
      by.xpath(
        '/html/body/app-root/app-assessment/app-assessment-landing-page/main/div/section[2]/app-task-cards/div/div/div[2]/div[2]/button'
      )
    ).click();
    browser.waitForAngularEnabled(true);
    expect(browser.wait(EC.urlContains('lntiggnite'), 10000));
  });
  it('Started assessment in the Coding platform', () => {
    element(
      by.xpath(
        '/html/body/tf-app-root/tf-app-root/tf-candidate-assessment/tf-layout/div/div/tf-interview-summary/div/tf-assessment-summary/div/div/div[2]/div/mat-card/div/div/button'
      )
    ).click();
    browser.wait(
      EC.visibilityOf(
        element(
          by.xpath(
            '/html/body/tf-app-root/tf-app-root/tf-candidate-assessment/tf-layout/div/div/tf-code-dare/tf-code-dare/tf-code-dare-ide/div[3]/div[1]/i'
          )
        )
      ),
      10000
    );
    element(
      by.xpath(
        '/html/body/tf-app-root/tf-app-root/tf-candidate-assessment/tf-layout/div/div/tf-code-dare/tf-code-dare/tf-code-dare-ide/div[3]/div[1]/i'
      )
    ).click();
  });
  it('Submitting Assessment', () => {
    browser.wait(
      EC.elementToBeClickable(
        element(
          by.xpath(
            '/html/body/tf-app-root/tf-app-root/tf-candidate-assessment/tf-layout/div/div/tf-code-dare/tf-code-dare/tf-code-dare-ide/div[2]/button[5]'
          )
        )
      ),
      2400000
    );
    element(
      by.xpath(
        '/html/body/tf-app-root/tf-app-root/tf-candidate-assessment/tf-layout/div/div/tf-code-dare/tf-code-dare/tf-code-dare-ide/div[2]/button[5]'
      )
    ).click();
    expect(
      browser.wait(
        EC.visibilityOf(element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container'))),
        5000
      )
    );
  });
  it('Confirming Submission and giving feedback', () => {
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-code-dare-submit-dialog/mat-dialog-actions/button[2]'
      )
    ).click();
    browser.wait(
      EC.visibilityOf(
        element(
          by.xpath(
            '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-content/tf-feedback/div/div[1]/tf-feedback-item/div[2]/tf-feedback-stars/span[1]'
          )
        )
      ),
      10000
    );
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-content/tf-feedback/div/div[1]/tf-feedback-item/div[2]/tf-feedback-stars/span[1]'
      )
    ).click();
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-content/tf-feedback/div/div[2]/tf-feedback-item/div[2]/tf-feedback-stars/span[4]'
      )
    ).click();
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-content/tf-feedback/div/div[3]/tf-feedback-item/div[2]/tf-feedback-stars/span[5]'
      )
    ).click();
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-content/tf-feedback/div/div[4]/div[3]/div/div/mat-form-field/div/div[1]/div/textarea'
      )
    ).sendKeys('Cool');
    expect(
      browser.wait(
        EC.elementToBeClickable(
          element(
            by.xpath(
              '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-actions/button[2]'
            )
          )
        ),
        5000
      )
    );
  });
  it('Submitting the feedback', () => {
    element(
      by.xpath(
        '/html/body/div/div[2]/div/mat-dialog-container/tf-feedback-dialog/mat-dialog-actions/button[2]'
      )
    ).click();
    browser.wait(EC.urlContains('landing'), 30000);
    expect(
      browser.wait(
        EC.textToBePresentInElement(
          element(
            by.xpath(
              '/html/body/app-root/app-assessment/app-assessment-landing-page/main/div/section[2]/app-task-cards/div/div/div[2]/div[2]/button/span[1]/span'
            )
          ),
          'Done'
        ),
        5000
      )
    );
  });
});
