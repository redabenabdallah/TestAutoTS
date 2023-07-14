
import {NavigationPo} from "../pages/navigationPo.cy";
import {When} from "@badeball/cypress-cucumber-preprocessor";

const navigationPo = new NavigationPo()

When(/^a standard account/, () => {
    navigationPo.goToPage()
});

When(/^Je mets username (.*) et password (.*) dans le formulaire/, (userName, pwd) => {
    navigationPo.loginTo(userName, pwd)
});

When(/^Je clique sur le bouton login/, () => {
    navigationPo.clickLogin()
});

When(/^Je suis connecté/, () => {
    navigationPo.verifConnected()
});

