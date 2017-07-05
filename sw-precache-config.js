module.exports = {
  staticFileGlobs: [
    'dist/tools/**.html',
    'dist/tools/assets/images/chart/**.*',
    'dist/tools/assets/images/icons/menu/**.*',
    'dist/tools/assets/images/**.*',
    'dist/tools/assets/fonts/**.*',
    'dist/tools/assets/translation/**.json',
    'dist/tools/assets/**.css',
    'dist/tools/**.js',
    'dist/tools/**.ico',
  ],
  stripPrefix: 'dist/tools/',
  runtimeCaching: [
    {
      urlPattern: /(.*)\.js/,
      handler: 'cacheFirst',
      options: {
        name: 'js'
      }
    },
    {
      urlPattern: /(.*)\.ico/,
      handler: 'cacheFirst',
      options: {
        name: 'favicon'
      }
    },
    {
      urlPattern: /assets\/(.*)/,
      handler: 'cacheFirst',
      options: {
        name: 'assets'
      }
    },
    {
      urlPattern: /waffle-server(.*)\.gapminder(.*)\.org\/api\/ddf\/ql(.*)/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'ddfql-queries',
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 2
        }
      }
    },
    {
      urlPattern: /waffle-server(.*)\.gapminder(.*)\.org\/api\/vizabi\/(.*)/,
      handler: 'cacheFirst',
      options: {
        name: 'vizabi statics'
      }
    },
    {
      urlPattern: /cms\.gapminder\.org\/files-api\/p3media\/file\/image(.*)/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'cms.gapminder.org',
          maxAgeSeconds: 60 * 60 * 24 * 30
        }
      }
    }
  ]
};
