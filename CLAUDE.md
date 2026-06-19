# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                    # install dependencies
npx playwright install         # one-time: download browsers

npm test                       # run all tests headless, all browsers
npm run test:headed            # run with visible browser
npm run test:ui                # interactive Playwright UI mode
npm run report                 # open last HTML report

# Run a single test file
npx playwright test tests/login.spec.ts

# Run a specific test by title (substring match)
npx playwright test -g "valid user"

# Run on a single browser
npx playwright test --project=chromium
```

## Architecture

This is a **Page Object Model** framework with two target sites.

**Pattern:** Tests in `tests/` instantiate page objects from `pages/` and call their methods. Page objects own all locators and expose intent-level actions (`loginAs`, `addToCart`). Assertions that require the page object's locators live on the page object itself (`expectError`, `expectLoaded`, `expectProduct`); assertions about data go inline in the spec.

**Config (`playwright.config.ts`):** `baseURL` is `https://www.saucedemo.com`. Runs on Chromium and Firefox in parallel. On CI: 2 retries, HTML report uploaded as artifact. Artifacts (trace, screenshot, video) are captured only on failure.

**Site 1 — SauceDemo (`tests/login.spec.ts`):** Uses `pages/LoginPage.ts` and `pages/InventoryPage.ts`. Relative paths resolved via `baseURL`.

**Site 2 — Automation Test Store (`tests/store-login.spec.ts`, `tests/store-cart.spec.ts`):** Uses `pages/StoreLoginPage.ts`, `pages/AccountPage.ts`, `pages/ProductPage.ts`, `pages/CartPage.ts`. All `goto()` calls use absolute URLs (`https://automationteststore.com/...`).

**Test credentials (Automation Test Store):** Set `STORE_USER` and `STORE_PASSWORD` env vars. Defaults fall back to `test_user` / `Test@123`. You must register an account at the site before the login success test will pass.

**Cart tests** are login-agnostic — adding to cart works without an account. The `beforeEach` empties the cart via the `CartPage.emptyCart()` helper.

**Adding a new page:** Create `pages/FooPage.ts` following the existing pattern — typed `Locator` fields set in the constructor, async methods for actions, `expect*` methods for assertions. Import and instantiate in the spec file.

**CI:** GitHub Actions runs on push/PR to `main` and on `workflow_dispatch`. Chromium only in CI. Playwright HTML report and Allure report both uploaded as artifacts (14 days). Allure history preserved run-to-run via the `allure-history` artifact (30 days).

## BDD Layer (playwright-bdd)

Feature files live in `features/` and step definitions in `features/steps/`. The library generates runnable `.spec.ts` files into `.features-gen/` (gitignored) before each run.

```bash
npm run test:bdd    # generate + run BDD tests only (Chromium + Firefox)
npm run test:pom    # run POM tests only (no bddgen needed)
npm test            # generate + run ALL tests (POM + BDD, all browsers)
npx bddgen          # regenerate after editing .feature files (standalone)
```

Step definitions import page objects from `pages/` directly — no separate abstraction layer. When adding a new feature, create `features/MyFeature.feature` and `features/steps/my-feature.steps.ts`. Use `@requiresAccount` tag on scenarios that need a real store account, combined with the `Before` hook in `store-login.steps.ts`.

BDD projects in Playwright config: `bdd-chromium` and `bdd-firefox` (point at `.features-gen/`).

## Allure Reports

Raw results are written to `allure-results/` during every test run. To view:

```bash
npm run allure:generate    # build HTML from allure-results/ → allure-report/
npm run allure:open        # open allure-report/ in browser
```

Gherkin tags in feature files (`@smoke`, `@login`, `@cart`, `@store`) automatically appear as Allure labels. Use `@allure.label.epic:YourEpic` syntax in feature files for structured Allure hierarchy labels.
