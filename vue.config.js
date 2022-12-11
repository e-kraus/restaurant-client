module.exports = {
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/lotus/'
    : '/',

  pwa: {
    name: 'Lotus',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
