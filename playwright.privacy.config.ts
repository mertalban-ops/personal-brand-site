import { defineConfig, devices } from "@playwright/test";

// Privacy / KVKK behaviour tests. Run after `npm run build`:
//   npx playwright test -c playwright.privacy.config.ts
export default defineConfig({
  testDir: "./tests/privacy",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  timeout: 90000,
  use: {
    baseURL: "http://localhost:3011",
    locale: "tr-TR",
    trace: "retain-on-failure",
    navigationTimeout: 60000,
  },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "mkdir -p .privacy-test && npx next start -p 3011 > .privacy-test/server.log 2>&1",
    url: "http://localhost:3011",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
