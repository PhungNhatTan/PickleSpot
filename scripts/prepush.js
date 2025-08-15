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

    // Copy project files
    await fs.copy(process.cwd(), tempDir, {
      filter: src => !src.includes('node_modules') && !src.includes('.git') && !src.includes('.husky'),
    });

    process.chdir(tempDir);

    // Load env
    const dotenvPath = path.join(tempDir, '.env.production');
    if (fs.existsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      console.log('🌿 Loaded environment variables from .env.production');
    }

    console.log('📦 Installing root dependencies...');
    execSync('npm ci', { stdio: 'inherit', shell: true });

    // Build client safely
    const clientDir = path.join(tempDir, 'client');
    execSync('npm ci', { cwd: clientDir, stdio: 'inherit', shell: true });
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit', shell: true });

    // Install server dependencies
    const serverDir = path.join(tempDir, 'server');
    execSync('npm ci', { cwd: serverDir, stdio: 'inherit', shell: true });

    console.log('✅ Render build simulation PASSED!');

    await fs.remove(tempDir);
  } catch (err) {
    console.error('❌ Pre-push build simulation failed:', err);
    process.exit(1);
  }
})();