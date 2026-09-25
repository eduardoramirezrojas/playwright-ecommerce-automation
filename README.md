# Playwright E-Commerce Automation

Automated testing project for an e-commerce application built with **Playwright** and **TypeScript**.

The project covers UI testing, data-driven testing, authentication state reuse, form validation, cart validation, and a complete end-to-end purchase flow.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- ESLint
- Git / GitHub

## Testing Techniques

- Page Object Model (POM)
- Data-Driven Testing (DDT)
- Positive and negative testing
- Boundary Value Analysis
- End-to-End testing
- Cross-browser testing
- Authentication state reuse with `storageState`

## Test Coverage

Automated tests cover:

- Login with valid and invalid credentials
- Product navigation
- Adding multiple products to the cart
- Cart price validation
- Cart total validation
- Checkout form validation
- Required field validation
- Invalid email validation
- Phone number boundary testing
- Checkout data confirmation
- Complete purchase flow

## Project Structure

```text
├── data/
│   └── checkOutData.ts
├── pages/
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── confirm.page.ts
│   ├── login.page.ts
│   ├── shop.page.ts
│   └── thanks.page.ts
├── tests/
│   ├── auth.setup.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── confirm.spec.ts
│   ├── login.spec.ts
│   ├── purchase.e2e.spec.ts
│   └── shop.spec.ts
├── types/
│   └── checkout.types.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Authentication

The project uses Playwright `storageState` to reuse an authenticated session across tests.

Authentication state is generated automatically and stored locally under:

```text
playwright/.auth/
```

The generated authentication state is excluded from Git through `.gitignore`.

## Cross-Browser Testing

The test suite is configured to run against:

- Chromium
- Firefox
- WebKit

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run tests using Playwright UI Mode:

```bash
npm run test:ui
```

Run the complete purchase E2E flow:

```bash
npm run test:e2e
```

Open the HTML report:

```bash
npm run report
```

## Test Application

The tests run against the QA Automation Labs demo e-commerce application.

Public demo credentials provided by the application are used by the authentication setup.

## Purpose

This project was created to practice and demonstrate practical QA Automation skills using Playwright and TypeScript, including test design, reusable Page Objects, test data management, authentication, cross-browser execution, and end-to-end testing.