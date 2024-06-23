/** @type {import('next').NextConfig} */

const whenDev = process.env.NODE_ENV === 'development';

const getDevNextConfig = () => {
  let mountPoint = process.env.BLOCKLET_DEV_MOUNT_POINT || '';

  let appUrl = process.env.BLOCKLET_APP_URL || '';

  let assetPrefix = `${appUrl}${mountPoint}`.replace('http://', 'https://');

  let devWithBlockletServer = process.env.hasOwnProperty('BLOCKLET_DEV_MOUNT_POINT');

  return whenDev && devWithBlockletServer
    ? {
        assetPrefix: assetPrefix, // When the dev mode as component, this line required
        basePath: '',
      }
    : {};
};

const nextConfig = {
  reactStrictMode: false,
  assetPrefix: '.',
  transpilePackages: ['mui-tel-input'],
  env: {
    // API_BASE_URL: "/arcblock-lban-profile",
    API_BASE_URL: '',
  },
  ...getDevNextConfig(),
};

module.exports = nextConfig;
