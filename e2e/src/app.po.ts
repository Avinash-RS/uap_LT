import { browser, by, element, protractor } from 'protractor';
const EC = protractor.ExpectedConditions;

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('http://localhost:4200');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async searchForAssessment(filter: number): Promise<void> {
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/section/div[2]/mat-form-field/div/div[1]/div/mat-select'
      )
    ).click();
    await element(by.xpath('//input[@formcontrolname="search"]')).sendKeys('testing-e2e');
    expect(
      await browser.wait(
        EC.elementToBeClickable(
          element(by.xpath(`/html/body/div[2]/div[2]/div/div/div/mat-option[${filter}]`))
        ),
        10000
      )
    );
    await element(by.xpath(`/html/body/div[2]/div[2]/div/div/div/mat-option[${filter}]`)).click();
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
    await this.searchForAssessment(2);
    await element(
      by.xpath(
        '/html/body/app-root/app-admin/app-sidenavbar/mat-sidenav-container/mat-sidenav-content/div/app-admin-assessments/app-list-assessment-package/div/main/div/div/app-infinite-scroll-list/app-infinite-scroll-container/div/div/div[1]/div[1]/div/app-assessment-package-card/div/div[3]/div[2]/button'
      )
    ).click();
    expect(await browser.wait(EC.urlContains('/admin/assessments/view'), 5000));
  }
}
