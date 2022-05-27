// pages/article.js
var formatDate = require('../../utils/formatDate.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    articles:[],
    isBackTop:false,
    isPublish:false,
    inputValue:'',
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.database().collection('publish').get().then(res=>{
     this.setData({
       isPublish:res.data[0].isPublish
     }) 
    })
    this.setData({
      openid:wx.getStorageSync('openid')
    })
    this.getArticle()
  },
  
  /**
   * 生命周期函数--页面显示
   */
  onShow(){
    this.setData({
      openid:wx.getStorageSync('openid'),
    })
    this.getArticle()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉刷新动作
   */
  onPullDownRefresh(e) {
    this.getArticle()
  },

  /**
   * 页面上拉触底加载事件的处理函数
   */
  onReachBottom() {
    // this.getArticle()
  },

  /**
   * 监听页面滚动处理函数 
   */
  onPageScroll(e){
    if(e.scrollTop >= 500){
      this.setData({
        isBackTop:true
      })
    }else{
      this.setData({
        isBackTop:false
      })
    }
  },


  // 获取搜索框输入值
  getInputValue(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 模糊查询
  goSearch(){
    if(this.data.inputValue === ''){
      wx.showToast({
        icon: 'error',
        title: '输入不能为空',
      })
      this.getArticle()
    }else{
        let db = wx.cloud.database()
        let _ = db.command
        db.collection('articles')
          .where(_.or([
            {//用户名
              userName: db.RegExp({ //使用正则查询，实现对搜索的模糊查询
                regexp: this.data.inputValue,
                options: 'i', //大小写不区分
              }),
            },
            {//发帖内容
              text: db.RegExp({
                regexp: this.data.inputValue,
                options: 'i',
              }),
            }
          ])).get()
          .then(res => {
            for (var n in res.data) res.data[n].time = formatDate.formatDate(new Date(res.data[n].time),'yyyy-MM-dd hh:mm:ss')
            this.setData({
              articles: res.data
            })
            console.log('查询成功', res)
          })
          .catch(res => {
            console.log('查询失败', res)
          })
    }
  },

  // 回到顶部处理函数
  backTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  // 帖子分享处理函数
  onShareAppMessage(e) {
    let index = e.target.dataset.index;
    return {
      title: this.data.articles[index].text,
      imageUrl: this.data.articles[index].images[0],
      path: '/pages/article/article',
    }
  },

  // 跳转发布页面
  goPublish(){
    if(wx.getStorageSync('nickName') && wx.getStorageSync('avatarUrl')){
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    }else{
      wx.showToast({
        icon: 'error',
        title: '还未登录',
      })
    }
  },

  // 获取发布列表数据
  getArticle(){
    let len = this.data.articles.length
    wx.cloud.callFunction({
      name: 'getArticle',
      data: {
        // len: len, // 分页开始索引参数
        pageNum: 100, // 每页请求条数
      }
    }).then(res=>{
      // 时间格式化
      for (var n in res.result.data) res.result.data[n].time = formatDate.formatDate(new Date(res.result.data[n].time),'yyyy-MM-dd hh:mm:ss')
      this.setData({
        // articles:this.data.articles.concat(res.result.data) 
        articles: res.result.data
      })
      wx.stopPullDownRefresh()
    })
  },

  // 帖子图片点击大图预览
  previewImg(e){
    wx.previewImage({
      current: "e.currentTarget.dataset.src",
      urls: this.data.articles[e.currentTarget.dataset.index].images
  });
  },

  // 帖子删除
  deleteArticle(e){
    wx.cloud.database().collection('articles').doc(e.currentTarget.dataset.id).remove({
      success: res => {
        wx.showToast({
          icon: 'success',
          title: '删除成功'
        })
        this.getArticle()
      }
    })
  },

  // 帖子点赞
  prizeAction(e){
    if(wx.getStorageSync('nickName') && wx.getStorageSync('avatarUrl')){
        wx.cloud.database().collection('articles').doc(e.currentTarget.dataset.id).get().then(res=>{
          for(let n in res.data.prizeList){
            if(res.data.prizeList[n].openid === wx.getStorageSync('openid')){
              var isPrize = res.data.prizeList[n].isPrize
            }
          }
          if(isPrize){
            let prizeList = res.data.prizeList
            for(let n in prizeList){
              if(prizeList[n].openid === wx.getStorageSync('openid')){
                prizeList.splice(n,1)
              }
            }
            wx.cloud.callFunction({
              name: 'update',
              data: {
                id: e.currentTarget.dataset.id,
                prizeList: prizeList
              }
            }).then(res => {this.getArticle()})
          }else{
            let prizeList = res.data.prizeList
            let obj = {}
            obj.nickName = wx.getStorageSync('nickName')
            obj.openid = wx.getStorageSync('openid')
            obj.isPrize = true
            prizeList = prizeList.concat(obj)
            wx.cloud.callFunction({
              name: 'update',
              data: {
                id: e.currentTarget.dataset.id,
                prizeList: prizeList
              }
            }).then(res => {this.getArticle()})
          }
        })
    }else{
      wx.showToast({
        icon: 'error',
        title: '还未登录',
      })
    }
  }
})