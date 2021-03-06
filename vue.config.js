module.exports = {
    publicPath:'/',
    // devServer: {
    //     proxy: "http://192.168.43.225/new_golpino/public/api/",
    // },

    // crossorigin:'anonymous'
  //   configureWebpack: {
  //     output: {
  //         publicPath: '/static/'
  //     }
  // }
  
  configureWebpack: {
    devServer:{
      proxy:{
        "/api/": {
        "target": 'https://golpino.com',
        "pathRewrite": { '^/api/': '/api/' },
        "changeOrigin": true,
        "secure": true
        }
      }
    }
  }
  }