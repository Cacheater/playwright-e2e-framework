# Playwright E2E Framework

[![Playwright E2E Tests](https://github.com/Cacheater/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Cacheater/playwright-e2e-framework/actions/workflows/playwright.yml)

End-to-end UI test framework built with **Playwright + TypeScript**, using the **Page Object Model** and a **Gherkin/BDD** layer. Tests run against two public web applications, cross-browser, with Allure reporting for trend tracking.

> Demo project showcasing modern web automation — POM + BDD in the same suite, Allure history across CI runs, and parallel cross-browser execution.

## What it demonstrates

- **Page Object Model** in TypeScript — typed locators and intent-level actions per page.
- **BDD / Gherkin** layer via `playwright-bdd` — `.feature` files drive the same page objects; POM and BDD suites run side-by-side.
- **Cross-browser** — Chromium and Firefox, locally and in CI.
- **Allure reports** — HTML report with trend history preserved run-to-run in GitHub Actions.
- **Resilient by default** — Playwright auto-waits; no flaky sleeps.
- **Debuggable failures** — screenshot, video, and trace captured only on failure.

## Project structure

```
playwright-e2e-framework/
├── playwright.config.ts        # browsers, reporters, BDD project config
├── .github/workflows/          # CI pipeline
│
├── pages/                      # Page Object classes (shared by POM + BDD)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── StoreLoginPage.ts
│   ├── AccountPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
│
├── tests/                      # POM test specs
│   ├── login.spec.ts
│   ├── store-login.spec.ts
│   └── store-cart.spec.ts
│
└── features/                   # BDD layer
    ├── saucedemo-login.feature
    ├── store-login.feature
    ├── store-cart.feature
    └── steps/                  # Step definitions (reuse pages/)
        ├── saucedemo-login.steps.ts
        ├── store-login.steps.ts
        └── store-cart.steps.ts
```

## Requirements

- Node.js 18+

## Setup

```bash
npm install
npx playwright install      # one-time: download browsers
```

## Running tests

```bash
# All tests — POM + BDD, Chromium + Firefox
npm test

# POM tests only
npm run test:pom

# BDD tests only
npm run test:bdd

# With a visible browser
npm run test:headed

# Interactive Playwright UI mode
npm run test:ui

# Open the last Playwright HTML report
npm run report
```

## Allure reports

```bash
npm run allure:generate     # build HTML from allure-results/
npm run allure:open         # open in browser
```

## Test credentials (Automation Test Store)

The store login test requires a real account. Set env vars before running:

```bash
# PowerShell
$env:STORE_USER="your_username"; $env:STORE_PASSWORD="your_password"; npm test

# bash
STORE_USER=your_username STORE_PASSWORD=your_password npm test
```

Without credentials the valid-login scenario is automatically skipped.

## Scenarios covered

### SauceDemo (POM + BDD)

| Scenario | What it verifies |
|----------|-----------------|
| Valid user logs in | Inventory page loads with products |
| Locked-out user is rejected | Correct error message shown |

### Automation Test Store — Login (POM + BDD)

| Scenario | What it verifies |
|----------|-----------------|
| Valid user logs in | Account dashboard loads |
| Invalid credentials | Error message shown |
| Login page structure | Form fields and headings visible |

### Automation Test Store — Cart (POM + BDD)

| Scenario | What it verifies |
|----------|-----------------|
| Add product | Product appears in cart with correct count |
| Remove product | Cart empties |
| Update quantity | New quantity persists |
| Empty cart | Empty-cart message shown |

## CI

GitHub Actions runs on every push and PR to `main`. Only Chromium in CI to keep runs fast. The Allure report and Playwright HTML report are uploaded as artifacts. Allure trend history is preserved across runs via the `allure-history` artifact.

---
Maintained by [Fabián Solano (@Cacheater)](https://github.com/Cacheater) — QA Automation Engineer.
