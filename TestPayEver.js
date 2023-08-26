const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('chai').assert;
const options = new chrome.Options();
options.setChromeBinaryPath('D:\\Usuário\\Documents\\GitHub\\Testes-Pratico-PayEver-Germany\\chromedriver\\chromedriver.exe');


async function realizarRegistro() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();  // Crie a instância do driver com as opções configuradas

    const url = 'https://commerceos.staging.devpayever.com/registration/';


    try {
        // Passo 1: Visitar a página de registro
        await driver.get(url);

        // Passo 2: Preencher informações do usuário
        await driver.findElement(By.name('first_name')).sendKeys('Nome');
        await driver.findElement(By.name('last_name')).sendKeys('Sobrenome');
        await driver.findElement(By.name('email')).sendKeys('teste@email.com');
        await driver.findElement(By.xpath("//button[contains(text(),'Próximo')]")).click();

        // Passo 3: Preencher informações comerciais
        await driver.findElement(By.name('business_name')).sendKeys('Nome da Empresa');

        // Passo 4: Registrar a conta
        await driver.findElement(By.xpath("//button[contains(text(),'Registrar conta')]")).click();

        // Passo 5: Clique em começar
        await driver.findElement(By.xpath("//button[contains(text(),'Começar')]")).click();

        // Passo 6: Verificar se o painel está sendo exibido
        const dashboardTitle = await driver.findElement(By.xpath("//h1[contains(text(),'Painel')]")).getText();
        assert.equal(dashboardTitle, 'Painel', 'O painel não está sendo exibido após o registro');
    } finally {
        // Encerrar o driver após a conclusão do teste
        await driver.quit();
    }
}

// Chamar a função para realizar o registro
realizarRegistro();
