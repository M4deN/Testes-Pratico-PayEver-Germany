const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const chromedriverPath = 'D:\\Usuário\\Documents\\GitHub\\Testes-Pratico-PayEver-Germanys\\chromedriver.exe';


class RegistrationPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.css('[formcontrolname="firstName"]');
        this.lastNameField = By.css('[formcontrolname="lastName"]');
        this.emailField = By.css('[formcontrolname="email"]');
        this.passwordField = By.css('[formcontrolname="password"]');
        this.signUpButton = By.xpath('//button[contains(text(), "Sign up for free")]');
        this.businessTypeDropdown = By.css('.ng-tns-c212-7.ng-untouched > .label-select-wrapper > .input');
        this.registeredBusinessOption = By.xpath('//peb-select-option[contains(text(), "Registered Business")]');
        this.lookAroundOption = By.xpath('//span[contains(text(), "Just looking around")]');
        this.startingOption = By.xpath('//span[contains(text(), "0 EUR (I just started)")]');
        this.businessCategoryInput = By.css('input.mat-autocomplete-trigger.ng-tns-c170-13');
        this.phoneField = By.css('input[formcontrolname="phoneNumber"]');
        this.getStartedButton = By.css('button.signup-button');
    }

    async fillRegistrationForm(firstName, lastName, email, password, businessType, startingOption) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.emailField).sendKeys(email);
        await this.driver.findElement(this.passwordField).sendKeys(password);

        await this.driver.findElement(this.businessTypeDropdown).click();
        await this.driver.findElement(this.registeredBusinessOption).click();

        await this.driver.findElement(this.lookAroundOption).click();
        await this.driver.findElement(this.startingOption).click();

        await this.driver.findElement(this.businessCategoryInput).sendKeys('Beauty & Personal Care', Key.RETURN);

        await this.driver.findElement(this.phoneField).sendKeys('12341234');
    }

    async clickSignUpButton() {
        await this.driver.findElement(this.signUpButton).click();
    }
}

describe('Testes de Registro', function () {
    let driver;
    let registrationPage;

    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().addArguments(`--chromedriver=${chromedriverPath}`))
            .build();
        registrationPage = new RegistrationPage(driver);
    });

    it('Realiza o registro com sucesso', async function () {
        const value = '{value}';
        await driver.get(`https://commerceos.staging.devpayever.com/registration/${value}`);
        await registrationPage.fillRegistrationForm('Test', 'Test', 'teste1234@outlook.com', 'Test@5640', 'Registered Business');
        await registrationPage.clickSignUpButton();

    });

    after(async function () {
        await driver.quit();
    });
});
