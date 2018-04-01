module.exports = {
  staticFileGlobs: [
//    'dist/tools/**.html',
    'dist/tools/**.js',
    'dist/tools/assets/**/**.*',
    'dist/tools/**.ico',
  ],
  maximumFileSizeToCacheInBytes: 10485760, // set maximum size 10Mb for one file that will be cached (for development environment only)
  stripPrefix: 'dist/tools/',
  runtimeCaching: [
    {
      urlPattern: /waffle-server(.*)\.gapminder(.*)\.org\/api\/ddf\/ql(.*)/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'ddfql-queries',
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 2
        }
      }
    },
    {
      urlPattern: /waffle-server(.*)\.gapminder(.*)\.org\/api\/ddf\/assets(.*)/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'ddfql-assets',
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 2
        }
      }
    },
    {
      urlPattern: /waffle-server(.*)\.gapminder(.*)\.org\/api\/vizabi\/(.*)/,
      handler: 'networkFirst',
      options: {
        name: 'vizabi statics'
      }
    },
//    {
//      urlPattern: /^(http(s)?)\:\/\/(.*)/,
//      handler: 'networkFirst',
//      options: {
//        name: 'other'
//      }
//    }
  ]
};
