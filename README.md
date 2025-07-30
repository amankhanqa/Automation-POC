# Playwright E2E Automation POC for Sample App

## 🚀 Project Overview

This repository hosts a Proof of Concept (POC) for End-to-End (E2E) UI automation testing using **Playwright** with **TypeScript**. The primary goal of this POC is to demonstrate the setup of a robust, reliable, and maintainable automation framework for web applications.

As a Senior QA Engineer and Automation Specialist with extensive experience, this project showcases best practices in:
* **Modern Web Automation:** Utilizing Playwright's speed and reliability.
* **Secure Credential Management:** Employing environment variables to protect sensitive data.
* **Scalable Test Design:** Laying the groundwork for future expansion and framework development.

## ✨ Features

* **Login Automation:** Automates the user login flow.
* **Secure Credentials:** Utilizes environment variables (via `dotenv`) to handle sensitive login information, preventing hardcoding in the codebase.
* **Cross-Browser Compatibility (Configurable):** Configured to run primarily on Chromium but easily extendable to Firefox and WebKit.
* **TypeScript Support:** Written in TypeScript for enhanced code quality, type safety, and maintainability.
* **Robust Selectors:** Employs Playwright's recommended, resilient selectors (e.g., `getByRole`, `has-text`, `type` attributes).

## 🛠️ Technologies Used

* [**Playwright**](https://playwright.dev/): Fast and reliable end-to-end testing tool.
* [**TypeScript**](https://www.typescriptlang.org/): A superset of JavaScript for type-safe development.
* [**Node.js**](https://nodejs.org/): JavaScript runtime environment.
* [**dotenv**](https://www.npmjs.com/package/dotenv): For loading environment variables from a `.env` file.

## 🚀 Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

* **Node.js (LTS version recommended):**
    Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/amankhanqa/Automation-POC.git
    cd Automation-POC
    ```

2.  **Install dependencies:**
    This command will install Playwright, TypeScript, dotenv, and download the necessary browser binaries (Chromium, Firefox, WebKit).
    ```bash
    npm install
    npx playwright install
    ```

### Secure Credential Setup

To protect sensitive information, credentials are managed via environment variables.

1.  **Create a `.env` file:**
    In the **root directory** of your project (the same directory as `package.json` and `playwright.config.ts`), create a new file named `.env`.

2.  **Add your credentials:**
    Add your valid and (optionally) invalid credentials for the Trinity Minutecrew App to this `.env` file.
    ```dotenv
    _USERNAME=your_actual_username
    _PASSWORD=your_actual_password
    _INVALID_USERNAME=invalid_user@example.com # Optional: for testing invalid logins
    _INVALID_PASSWORD=wrong_password           # Optional: for testing invalid logins
    ```
    **IMPORTANT:** Ensure your `.env` file is listed in your `.gitignore` to prevent it from being committed to your repository.

## ▶️ Running Tests

### Default Test Run (Chromium)

By default, the `playwright.config.ts` is set up to run tests only on **Chromium**.

To run all tests:
```bash
npx playwright test
