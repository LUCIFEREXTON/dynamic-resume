const esbuild = require('esbuild');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const {
  PROJECT_CONFIG,
  BUILD_CONFIG,
  APPS,
  createNginxHtmlContent,
  createAppHtmlContent,
} = require('./esbuild.config');

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
    //execSync(`chown -R www-data:www-data ${dirPath}`);
    //execSync(`chmod -R 755 ${dirPath}`);
  } catch (err) {
    console.error(`Failed to create directory: ${dirPath}`, err);
    throw err;
  }
}

async function createNginxIndexHtml(dir, app) {
  try {
    const htmlContent = createNginxHtmlContent(app, PROJECT_CONFIG.name);
    await fs.writeFile(path.join(dir, 'index.html'), htmlContent, 'utf8');
    console.log(`index.html created in ${dir}`);
  } catch (err) {
    console.error(`Failed to create index.html in ${dir}:`, err);
    throw err;
  }
}

async function createAppIndexHtml(app) {
  try {
    const htmlContent = createAppHtmlContent(app, PROJECT_CONFIG.name);
    const appBuildDir = path.join(PROJECT_CONFIG.buildDir, app.buildDir);
    await fs.writeFile(path.join(appBuildDir, 'index.html'), htmlContent, 'utf8');
    console.log(`index.html created in ${appBuildDir}`);
  } catch (err) {
    console.error(`Failed to create index.html in ${appBuildDir}:`, err);
    throw err;
  }
}

async function copyAppFiles(buildDir, app) {
  //const targetDir = path.join(PROJECT_CONFIG.sandboxDir, app.targetDir);
  //await ensureDirectoryExists(targetDir);

  try {
    /*
    await Promise.all([
      fs.copyFile(
        path.join(buildDir, app.buildDir, `${app.outputName}.js`),
        path.join(targetDir, `${app.outputName}.js`)
      ),
      fs.copyFile(
        path.join(buildDir, app.buildDir,`${app.outputName}.js.map`),
        path.join(targetDir, `${app.outputName}.js.map`)
      )
    ]);

    execSync(`chown -R www-data:www-data ${targetDir}`);
    execSync(`chmod -R 755 ${targetDir}`);

    await createNginxIndexHtml(targetDir, app);
    */
    await createAppIndexHtml(app);


    //console.log(`Files copied for ${app.name} to ${targetDir}`);
  } catch (err) {
    console.error(`Error copying files for ${app.name}:`, err);
    throw err;
  }
}

async function handlePostBuild(buildDir) {
  //await ensureDirectoryExists(PROJECT_CONFIG.sandboxDir);
  await Promise.all(APPS.map(app => copyAppFiles(buildDir, app)));
}

async function buildBundles() {
  const startTime = Date.now();

  try {
    await ensureDirectoryExists(PROJECT_CONFIG.buildDir);

    // Create build configurations for each app
    const buildTasks = APPS.map(app => ({
      ...BUILD_CONFIG,
      entryPoints: [app.entryPoint],
      outfile: path.join(PROJECT_CONFIG.buildDir, app.buildDir, `${app.outputName}.js`)
    }));

    // Build all bundles in parallel
    await Promise.all(
      buildTasks.map(config => esbuild.build(config))
    );

    const buildEndTime = Date.now();
    console.log(`Build process completed in ${(buildEndTime - startTime) / 1000} seconds.`);

    // Handle post-build operations
    await handlePostBuild(PROJECT_CONFIG.buildDir);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildBundles();

