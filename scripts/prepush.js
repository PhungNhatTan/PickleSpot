/* eslint-env node */
/* eslint-disable no-console */


import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

(async () => {
  try {
    console.log('🧪 Simulating Render production build in a temp folder...');

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-build-'));
    console.log('Temp dir:', tempDir);

    await fs.copy(process.cwd(), tempDir, {
      filter: src => !src.includes('node_modules') && !src.includes('.git') && !src.includes('.husky'),
    });

    process.chdir(tempDir);

    const dotenvPath = path.join(tempDir, '.env.production');
    if (fs.existsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      console.log('🌿 Loaded environment variables from .env.production');
    }

    console.log('📦 Installing root dependencies...');
    execSync('npm ci', { stdio: 'inherit', shell: true });

    console.log('🏗 Building client...');
    execSync('cd client && npm ci && npm run build', { stdio: 'inherit', shell: true });

    console.log('📦 Installing server dependencies...');
    execSync('cd server && npm ci', { stdio: 'inherit', shell: true });

    console.log('🛠 Server startup check skipped (Windows safe)');
    console.log('✅ Render build simulation PASSED!');

    await fs.remove(tempDir);
  } catch (err) {
    console.error('❌ Pre-push build simulation failed:', err);
    process.exit(1);
  }
})();
