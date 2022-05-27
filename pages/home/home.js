// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    rotationList:[
      'https://i.loli.net/2021/05/16/7P2la8DwiKVLjqM.jpg',
      'https://i.loli.net/2021/05/16/oSYXhs6wKG5Wq3u.jpg',
      'https://i.loli.net/2021/05/16/Lsx8PobdcAu5pvY.jpg',
      'https://i.loli.net/2021/05/16/5fjAtRqTuS3Eca7.jpg',      
    ],
    swiperCurrent: 0,

    sortList:[
      {
        icon: "../../assets/images/sort/timetable.png",
        sortid: 2,
        text:"我的课表"
      },{
        icon: "../../assets/images/sort/calendar.png",
        sortid: 3,
        text:"校历查询"
      },{
        icon: "../../assets/images/sort/achievement.png",
        sortid: 4,
        text:"成绩查询"
      },{
        icon: "../../assets/images/sort/pay.png",
        sortid: 5,
        text:"缴费大厅"
      },{
        icon: "../../assets/images/sort/repair.png",
        sortid: 6,
        text:"寝室报修"
      },{
        icon: "../../assets/images/sort/46ji.png",
        sortid: 7,
        text:"四级查询"
      },{
        icon: "../../assets/images/sort/other.png",
        sortid: 8,
        text:"更多"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //轮播图改变事件
  swiperChange: function (e) {
    if (e.detail.source === 'touch'){
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },

  itemClick(){
    wx.showToast({
      icon: 'none',
      title: '敬请期待',
    })
  }
})