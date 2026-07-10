import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser, type LaunchOptions } from "puppeteer-core";

const LOCAL_CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter((value): value is string => Boolean(value));

const PDF_VIEWPORT = {
  deviceScaleFactor: 1,
  hasTouch: false,
  height: 1123,
  isLandscape: false,
  isMobile: false,
  width: 794,
} as const;

async function resolveLocalExecutablePath(): Promise<string> {
  for (const candidate of LOCAL_CHROME_CANDIDATES) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return chromium.executablePath();
}

async function launchOptions(): Promise<LaunchOptions> {
  if (process.env.VERCEL === "1") {
    return {
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
      defaultViewport: PDF_VIEWPORT,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    };
  }

  return {
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    defaultViewport: PDF_VIEWPORT,
    executablePath: await resolveLocalExecutablePath(),
    headless: true,
  };
}

/** Launches a headless Chromium instance for PDF rendering. */
export async function launchBrowser(): Promise<Browser> {
  return puppeteer.launch(await launchOptions());
}
