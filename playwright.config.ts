import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  timeout: 90000, // 90 seconds global test timeout
  use: {
    baseURL: "http://localhost:3007",
    trace: "on-first-retry",
    navigationTimeout: 60000, // 60 seconds navigation timeout
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3007",
    url: "http://localhost:3007",
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // 3 minutes start timeout
  },
});
