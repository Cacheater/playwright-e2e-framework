import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// In playwright-bdd v9, defineBddConfig returns the outputDir path directly (a string).
const bddOutputDir = defineBddConfig({
  features: './features/**/*.feature',
  steps: './features/steps/**/*.ts',
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // POM projects
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },

    // BDD projects — testDir points at playwright-bdd generated output
    { name: 'bdd-chromium', testDir: bddOutputDir, use: { ...devices['Desktop Chrome'] } },
    { name: 'bdd-firefox',  testDir: bddOutputDir, use: { ...devices['Desktop Firefox'] } },
  ],
});
