const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@features': path.resolve(__dirname, 'src/features/'),
      '@store': path.resolve(__dirname, 'src/store/')
    },
    configure: {
      resolve: {
        plugins: [
          new DirectoryNamedWebpackPlugin()
        ]
      }
    }
  }
}
