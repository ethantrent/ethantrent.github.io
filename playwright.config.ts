import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:3100",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    env: {
      PORTFOLIO_TEST: "1",
      NEXT_PUBLIC_FORMSPREE_FORM_ID: "portfolio-test",
      NEXT_PUBLIC_ASK_ETHAN_API_URL: "https://portfolio-assistant.test",
      NEXT_PUBLIC_SITE_URL: "https://ethantrent.github.io",
    },
    timeout: 120_000,
  },
});
