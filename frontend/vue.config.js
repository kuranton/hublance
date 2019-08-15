module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 4000,
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/styles.scss";
        `,
      },
    },
  },
};
