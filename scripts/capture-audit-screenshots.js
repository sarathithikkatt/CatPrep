import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const executablePath = fs.existsSync(EDGE_PATH)
  ? EDGE_PATH
  : fs.existsSync(CHROME_PATH)
  ? CHROME_PATH
  : null;

if (!executablePath) {
  console.error('Neither Edge nor Chrome executable found for puppeteer-core.');
  process.exit(1);
}

const passDirName = process.argv[2] || 'pass-1';
const outputDir = path.resolve(process.cwd(), 'audit', passDirName);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function startServer() {
  console.log('Building project before preview...');
  // Start vite preview on port 4173
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe'
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return server;
}

async function run() {
  const server = await startServer();
  const url = 'http://localhost:4173';

  console.log(`Connecting to browser at ${executablePath}...`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Viewport (1440x900)
    console.log('Capturing Desktop screenshots (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => localStorage.setItem('catprep_theme', 'dark'));
    await page.reload({ waitUntil: 'networkidle0' });

    // 1. Dashboard Desktop
    await page.screenshot({ path: path.join(outputDir, 'dashboard-desktop.png') });
    console.log('✓ dashboard-desktop.png');

    // 2. Planner Desktop (3-Month, 1-Month, 1-Week)
    // Click on Study Planner tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const plannerBtn = buttons.find((b) => b.textContent.includes('Study Planner'));
      if (plannerBtn) plannerBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'planner-3month-desktop.png') });
    console.log('✓ planner-3month-desktop.png');

    // Switch to 1-Month track
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const oneMonthBtn = buttons.find((b) => b.textContent.includes('1-Month Lockdown'));
      if (oneMonthBtn) oneMonthBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'planner-1month-desktop.png') });
    console.log('✓ planner-1month-desktop.png');

    // Switch to 1-Week track
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const oneWeekBtn = buttons.find((b) => b.textContent.includes('1-Week Countdown'));
      if (oneWeekBtn) oneWeekBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'planner-1week-desktop.png') });
    console.log('✓ planner-1week-desktop.png');

    // 3. Sprint Plans (Roadmaps) Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const roadmapsBtn = buttons.find((b) => b.textContent.includes('Sprint Plans'));
      if (roadmapsBtn) roadmapsBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'roadmaps-desktop.png') });
    console.log('✓ roadmaps-desktop.png');

    // 4. Syllabus Manager Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const syllabusBtn = buttons.find((b) => b.textContent.includes('Syllabus & Weightage'));
      if (syllabusBtn) syllabusBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'syllabus-desktop.png') });
    console.log('✓ syllabus-desktop.png');

    // 5. Question Practice Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const practiceBtn = buttons.find((b) => b.textContent.includes('PYQs & Solutions'));
      if (practiceBtn) practiceBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'practice-desktop.png') });
    console.log('✓ practice-desktop.png');

    // 6. Mistake Notebook Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const notebookBtn = buttons.find((b) => b.textContent.includes('Mistake Notebook'));
      if (notebookBtn) notebookBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mistakes-desktop.png') });
    console.log('✓ mistakes-desktop.png');

    // 7. Mock Scorecards Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const mocksBtn = buttons.find((b) => b.textContent.includes('Mock Scorecards'));
      if (mocksBtn) mocksBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mocks-desktop.png') });
    console.log('✓ mocks-desktop.png');

    // 8. Resources Desktop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const resBtn = buttons.find((b) => b.textContent.includes('Resources'));
      if (resBtn) resBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'resources-desktop.png') });
    console.log('✓ resources-desktop.png');

    // --- MOBILE VIEWPORT (390x844) ---
    console.log('Capturing Mobile screenshots (390x844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    // Dashboard Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const dashBtn = buttons.find((b) => b.textContent.includes('Daily Tracker'));
      if (dashBtn) dashBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'dashboard-mobile.png') });
    console.log('✓ dashboard-mobile.png');

    // Planner Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const plannerBtn = buttons.find((b) => b.textContent.includes('Study Planner'));
      if (plannerBtn) plannerBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'planner-mobile.png') });
    console.log('✓ planner-mobile.png');

    // Practice Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const practiceBtn = buttons.find((b) => b.textContent.includes('PYQs & Solutions'));
      if (practiceBtn) practiceBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'practice-mobile.png') });
    console.log('✓ practice-mobile.png');

    // Mistakes Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nbBtn = buttons.find((b) => b.textContent.includes('Mistake Notebook'));
      if (nbBtn) nbBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mistakes-mobile.png') });
    console.log('✓ mistakes-mobile.png');

    // Mocks Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const mockBtn = buttons.find((b) => b.textContent.includes('Mock Scorecards'));
      if (mockBtn) mockBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'mocks-mobile.png') });
    console.log('✓ mocks-mobile.png');

    // Syllabus Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const sylBtn = buttons.find((b) => b.textContent.includes('Syllabus & Weightage'));
      if (sylBtn) sylBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'syllabus-mobile.png') });
    console.log('✓ syllabus-mobile.png');

    // Roadmaps Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const roadmapsBtn = buttons.find((b) => b.textContent.includes('Sprint Plans'));
      if (roadmapsBtn) roadmapsBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'roadmaps-mobile.png') });
    console.log('✓ roadmaps-mobile.png');

    // Resources Mobile
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const resBtn = buttons.find((b) => b.textContent.includes('Resources'));
      if (resBtn) resBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, 'resources-mobile.png') });
    console.log('✓ resources-mobile.png');

    console.log(`\nAll screenshots successfully saved to ${outputDir}!`);
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Audit capture failed:', err);
  process.exit(1);
});
