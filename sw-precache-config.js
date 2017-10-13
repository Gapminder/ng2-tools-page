module.exports = {
  staticFileGlobs: [
    'dist/tools/**.html',
    'dist/tools/**.js',
    'dist/tools/assets/**/**.*',
    'dist/tools/**.ico',
  ],
  maximumFileSizeToCacheInBytes: 10485760, // set maximum size 10Mb for one file that will be cached
  stripPrefix: 'dist/tools/',
  runtimeCaching: [
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
      urlPattern: /tools\/(.*)\.html/,
      handler: 'cacheFirst',
      options: {
        name: 'indexhtml'
      }
    },
    {
      urlPattern: /tools\/(.*)\.js/,
      handler: 'cacheFirst',
      options: {
        name: 'js'
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
    }
  ]
};
