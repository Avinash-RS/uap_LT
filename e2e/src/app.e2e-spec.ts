import { browser, element, by, protractor } from 'protractor';
import { AppPage } from './app.po';
const appPage = new AppPage();
const EC = protractor.ExpectedConditions;

describe('UAP App', () => {
  it('Logged into UAP', async () => {
    await browser.waitForAngularEnabled(false);
    browser.get('/');
    await browser.wait(EC.visibilityOf(element(by.id('username'))), 5000);
    await element(by.id('username')).sendKeys('dev@hebbalelabs.com');
    await element(by.id('password')).sendKeys('SwYEGTdBqI');
    await element(by.id('kc-login')).click();
    await browser.waitForAngularEnabled(true);
    expect(await browser.wait(EC.urlContains('/admin/assessments/list'), 5000));
  });
  it('creating new assessment', async () => {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/section/div[3]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/create'), 5000));
    await element(by.xpath('//input[@formcontrolname="assessmentName"]')).sendKeys('testing-e2e');
    await element(by.xpath('//textarea[@formcontrolname="assessmentDescription"]')).sendKeys(
      'testing-e2e'
    );
    await element(by.xpath('//select[@formcontrolname="assessmentLevelSelectOption"]')).sendKeys(
      'Beginner'
    );
    await element(by.xpath('//button[@class="add-button__color"]')).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-create-or-edit-assessment-package/form/div/div/div/div/div/div[2]/select'
      )
    ).sendKeys('Coding');
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-create-or-edit-assessment-package/form/div/div/div/div/div/div[2]/div/form/mat-form-field/div/div[1]/div/input'
      )
    ).sendKeys('String Encryption');
    await element(by.xpath('//mat-option[@ng-reflect-value="String Encryption"]')).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-create-or-edit-assessment-package/div/div/span[2]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/list'), 5000));
  });
  it('filtered and opened assessment page to publish', async () => {
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
    await appPage.searchForAssessment(3);
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
    await element(by.xpath('//input[@formcontrolname="batchName"]')).sendKeys('testing-e2e');
    await element(by.xpath('//textarea[@formcontrolname="scheduleDescription"]')).sendKeys(
      'testing-e2e'
    );
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-status/app-create-schedule-package/form/div/div/div/div[1]/span[2]/div/ngx-timepicker-field/div/ngx-timepicker-time-control[1]/div/div/span[1]'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="assessmentName"]')).sendKeys('testing-e2e');
    await element(by.xpath('//mat-option[@ng-reflect-value="testing-e2e"]')).click();
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-status/app-create-schedule-package/form/div/div/div/div[3]/p[2]/button'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="emailId"]')).sendKeys(
      'syedtabarak.ulla@hebbalelabs.comm'
    );
    await element(by.xpath('//input[@formcontrolname="firstName"]')).sendKeys('Syed');
    await element(by.xpath('//input[@formcontrolname="lastName"]')).sendKeys('Tabarak');
    await element(by.css('.header-block__button')).click();
    expect(await browser.wait(EC.urlContains('/admin/schedule/list'), 5000));
  });
});
