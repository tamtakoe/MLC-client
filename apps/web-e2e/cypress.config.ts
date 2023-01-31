import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
// import setupNodeEvents from './src/plugins/index';

const cypressJsonConfig = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/web-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/web-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    // setupNodeEvents,
//     setupNodeEvents(on, config) {
//       on('before:browser:launch', (browser: any = {}, launchOptions: any) => {
//         // launchOptions.preferences.default['default.disable_3d_apis'] = false;
//         // disabled_software
//         launchOptions.args.push('--disable-gpu')
//         launchOptions.args.push('--disable-software-rasterizer')
//         launchOptions.args.push('--force_low_power_gpu')
//         //--in-process-gpu
//         //--video-capture-use-gpu-memory-buffer ⊗	Enables GpuMemoryBuffer-based buffer pool. ↪
//         /*
//         --disable-accelerated-2d-canvas ⊗	Disable gpu-accelerated 2d canvas. ↪
// --disable-accelerated-mjpeg-decode ⊗	Disable hardware acceleration of mjpeg decode for captured frame, where available. ↪
// --disable-accelerated-video-decode ⊗	Disables hardware acceleration of video decode, where available. ↪
// --disable-accelerated-video-encode ⊗	Disables hardware acceleration of video encode, where available. ↪
// --use-gpu-in-tests
//          */
//
//         console.log('++++')
//         console.log('browser', browser);
//         console.log('launchOptions', launchOptions);
//         // launchOptions.webPreferences.additionalArguments = [
//         //   ...(launchOptions.webPreferences.additionalArguments || []),
//         //   '--disable-gpu', // Disables GPU hardware acceleration. If software renderer is not in place, then the GPU process won't launch.
//         //   // '--use-gl=swiftshader', // Select which implementation of GL the GPU process should use. Options are: desktop: whatever desktop OpenGL the user has installed (Linux and Mac default). egl: whatever EGL / GLES2 the user has installed (Windows default - actually ANGLE). swiftshader: The SwiftShader software renderer.
//         //   // '--override-use-software-gl-for-tests', // Forces the use of software GL instead of hardware gpu.
//         //   '--use-gpu-in-tests', // Use hardware gpu, if available, for tests.
//         // ];
//       })
//     }
  },
});
