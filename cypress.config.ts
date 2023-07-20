import {defineConfig} from "cypress";
// @ts-ignore
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";
// @ts-ignore
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import addContext from 'mochawesome/addContext'

export default defineConfig({
    e2e: {
        specPattern: "cypress/**/*.feature",
        video: false,
        screenshotOnRunFailure: true,
        reporter: "cypress-mochawesome-reporter",
        reporterOptions: {
            reportDir: "cypress/reports",
            charts: true,
            reportPageTitle: "My Test Suite",
            embeddedScreenshots: true,
            inlineAssets: true
        },
        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions> {
            // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                }),
            );
           require('cypress-mochawesome-reporter/plugin')(on)
            // Make sure to return the config object as it might have been modified by the plugin.
            return config;
        },
    },
});