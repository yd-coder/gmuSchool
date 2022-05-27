//app.js
App({
  globalData: {
    userInfo: null,
    meta: {}
  },
  onLaunch: function (t) {
    // 配置云开发环境id
    wx.cloud.init({
      env: 'gmuschool-5gs004vm648e6dca'
    })
  },
  
})