import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

(async () => {
  try {
    console.log('🧪 Simulating Render production build in a temp folder...');

    // Create a safe temp folder on Windows
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-build-'));
    console.log('Temp dir:', tempDir);

    // Copy project files, excluding node_modules, .git, and .husky
    await fs.copy(process.cwd(), tempDir, {
      filter: src =>
        !src.includes('node_modules') &&
        !src.includes('.git') &&
        !src.includes('.husky')
    });

    // Change to temp directory
    process.chdir(tempDir);

    // Load .env.production if exists
    const dotenvPath = path.join(tempDir, '.env.production');
    if (fs.existsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      console.log('🌿 Loaded environment variables from .env.production');
    }

    // Prevent Husky from running in temp folder
    process.env.SKIP_HUSKY = '1';

    // Install root dependencies
    console.log('📦 Installing root dependencies...');
    execSync('npm ci', { stdio: 'inherit', shell: true });

    // Build client safely
    const clientDir = path.join(tempDir, 'client');
    console.log('🏗 Installing client dependencies...');
    execSync('npm ci', { cwd: clientDir, stdio: 'inherit', shell: true });
    console.log('🏗 Building client...');
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit', shell: true });

    // Install server dependencies
    const serverDir = path.join(tempDir, 'server');
    console.log('📦 Installing server dependencies...');
    execSync('npm ci', { cwd: serverDir, stdio: 'inherit', shell: true });

    console.log('✅ Render build simulation PASSED!');

    // Clean up temp folder
    // After all builds complete
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      await fs.remove(tempDir);
    } catch (err) {
      console.warn('⚠️ Could not remove temp folder, leaving it for manual cleanup:', tempDir);
    }
  } catch (err) {
    console.error('❌ Pre-push build simulation failed:', err);
    process.exit(1);
  }
})();
