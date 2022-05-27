// pages/me/me.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('nickName') && wx.getStorageSync('avatarUrl')){
      this.setData({
        hasUserInfo:true,
        nickName : wx.getStorageSync('nickName'),
        avatarUrl : wx.getStorageSync('avatarUrl')
      })
    }else{
      this.setData({
        hasUserInfo:false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  // 获取用户头像昵称
  getUserProfile(){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.cloud.callFunction({
          name: 'logins',	//	logins 云函数名字
          success: res => {
            wx.setStorageSync('openid', res.result.openid) 
          }
        })
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
        wx.setStorageSync('nickName', res.userInfo.nickName)
        wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
      }
    })
  },

  // 退出登录
  logout(){
    wx.showModal({
      title: '提示',
      content: '是否要退出登录',
      success: res=> {
        if (res.confirm) {
          wx.removeStorageSync('nickName')
          wx.removeStorageSync('avatarUrl')
          wx.removeStorageSync('openid')
          this.setData({
            nickName: '',
            avatarUrl: '',
            hasUserInfo: false
          })
        }
      }
    })
  }
})