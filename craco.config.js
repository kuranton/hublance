const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/'),
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
