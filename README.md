# Playwright E2E Framework

[![Playwright E2E Tests](https://github.com/Cacheater/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Cacheater/playwright-e2e-framework/actions/workflows/playwright.yml)

End-to-end UI test framework built with **Playwright + TypeScript**, following the
**Page Object Model**. Tests run against the public
[SauceDemo](https://www.saucedemo.com/) application, cross-browser.

> Demo project showcasing modern web automation — auto-waiting, traces on
> failure, parallel cross-browser runs, and CI that publishes an HTML report.

## What it demonstrates

- **Page Object Model** in TypeScript — typed locators and actions per page.
- **Cross-browser** — runs on Chromium and Firefox out of the box.
- **Resilient by default** — Playwright auto-waits for elements; no flaky sleeps.
- **Debuggable failures** — screenshots, video and trace captured only on failure.
- **CI on every push** — GitHub Actions runs the suite and uploads the HTML report.

## Project structure

```
playwright-e2e-framework/
├── package.json
├── playwright.config.ts     # baseURL, browsers, reporters, artifacts
├── .github/workflows/       # CI pipeline
├── pages/                   # Page Objects
│   ├── LoginPage.ts
│   └── InventoryPage.ts
└── tests/
    └── login.spec.ts        # E2E scenarios
```

## Requirements

- Node.js 18+

## Setup & run

```bash
npm install
npx playwright install      # one-time: download browsers

npm test                    # headless, all browsers
npm run test:headed         # watch it run
npm run test:ui             # interactive UI mode
npm run report              # open the last HTML report
```

## Scenarios covered

| Test | What it verifies |
|------|------------------|
| valid user lands on the products page | Login succeeds and inventory is shown |
| locked-out user is rejected | Correct error message is displayed |

## Next steps / ideas

- API fixtures to seed state before UI tests
- Visual regression with `toHaveScreenshot()`
- Cart and checkout flows as additional page objects

---
Maintained by [Fabián Solano (@Cacheater)](https://github.com/Cacheater) — QA Automation Engineer.
