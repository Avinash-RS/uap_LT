import { browser, by, element, protractor } from 'protractor';
import { environment } from '../../src/environments/environment';
const uniqueToken = require('uniqid');
const EC = protractor.ExpectedConditions;
let assessmentID = '';
let accessToken = '';
export class AppPage {
  testingName = uniqueToken('e2e-');
  candidateMail = 'dev@hebbalelabs.com';

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async loginIntoUAP(): Promise<void> {
    const password = 'SwYEGTdBqI'
    await browser.wait(EC.visibilityOf(element(by.id('username'))), 5000);
    await element(by.id('username')).sendKeys(this.candidateMail);
    await element(by.id('password')).sendKeys(password);
    await element(by.id('kc-login')).click();
    await browser.waitForAngularEnabled(true);
  }

  async logoutFromUAP(): Promise<void> {
    await element(
      by.xpath('/html/body/app-root/app-admin/app-sidenavbar/app-navbar/div/div/span')
    ).click();
    await element(by.xpath('/html/body/div[2]/div[2]/div/div/div/button[2]')).click();
    await browser.waitForAngularEnabled(false);
    browser.get('/');
    await browser.wait(EC.visibilityOf(element(by.id('username'))), 5000);
  }

  async searchForAssessment(filter: string): Promise<void> {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/section/div[2]/mat-form-field/div/div[1]/div/mat-select'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="search"]')).sendKeys(this.testingName);
    expect(
      await browser.wait(
        EC.elementToBeClickable(element(by.xpath(`//mat-option[@ng-reflect-value="${filter}"]`))),
        10000
      )
    );
    await element(by.xpath(`//mat-option[@ng-reflect-value="${filter}"]`)).click();
    expect(
      await browser.wait(
        EC.visibilityOf(
          element(
            by.xpath(
              '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/div/div/app-infinite-scroll-list/app-infinite-scroll-container/div/div/div[1]/div[1]/div/app-assessment-package-card/div'
            )
          )
        ),
        5000
      )
    );
  }

  async openViewAssessment(): Promise<void> {
    await this.searchForAssessment('Draft');
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/div/div/app-infinite-scroll-list/app-infinite-scroll-container/div/div/div[1]/div[1]/div/app-assessment-package-card/div/div[3]/div[2]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/view'), 5000));
  }

  async createNewAssessment(): Promise<void> {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/section/div[3]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/create'), 5000));
    await element(by.xpath('//input[@formcontrolname="assessmentName"]')).sendKeys(this.testingName);
    await element(by.xpath('//textarea[@formcontrolname="assessmentDescription"]')).sendKeys(
      this.testingName
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
  }

  async deleteArchiveAssessment(): Promise<void> {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/div/div/app-infinite-scroll-list/app-infinite-scroll-container/div/div/div[1]/div[1]/div/app-assessment-package-card/div/div[3]/div[2]/mat-icon'
      )
    ).click();
    browser.wait(EC.elementToBeClickable(element(by.xpath('/html/body/div[2]/div[2]/div/div/div/button'))), 5000)
    await element(by.xpath('/html/body/div[2]/div[2]/div/div/div/button')).click();
  }

  // async getAccessToken(): Promise<void> {
  //   const url = environment.TOKEN_URL;
  //   const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', url);
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.onreadystatechange = async () => {
  //     if (xhr.readyState === 4) {
  //       const data = await JSON.parse(xhr.responseText);
  //       accessToken = await data.access_token;
  //     }
  //   };
  //   const requestBody = `client_id=uap-core-service&grant_type=password&username=dev%40hebbalelabs.com&password=SwYEGTdBqI&client_secret=19db9aef-1e70-4509-b827-9a76a981223d`;
  //   xhr.send(requestBody);
  // }

  async getAssessmentID(): Promise<void> {
    const url = `${environment.API_URL}/assessments?assessmentStatus=YetToStart&limit=1&offset=0&search=${this.testingName}`;
    const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4) {
        const response = await JSON.parse(xhr.responseText);
        assessmentID = await response.data[0].id;
        await browser.get(`landing/assessment/${assessmentID}`);
      }
    };
    xhr.send();
  }
}
