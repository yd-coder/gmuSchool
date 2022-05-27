//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
		time:[
			{ index: '1', name: '08:30\n09:10' },
			{ index: '2', name: '09:20\n10:00' },
			{ index: '3', name: '10:20\n11:00' },
			{ index: '4', name: '11:10\n11:50' },
			{ index: '5', name: '14:00\n14:40' },
			{ index: '6', name: '14:45\n15:25' },
			{ index: '7', name: '15:45\n16:25' },
      { index: '8', name: '16:30\n17:10' },
      { index: '9', name: '19:00\n19:40' },
      { index: '10', name: '19:50\n20:30' }
		],
    colorArrays: [ '#f05261', '#48a8e4', '#ffd061', '#52db9a', '#66CCFF', '#ff9800', '#3f51b5', '#9966CC', '#4adbc3'],
    // courses: [
    //   { "day": 1, "start": 1, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 1, "start": 3, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 2, "start": 1, "count": 2, "course":"高等数学@教A-301"},
    //   { "day": 2, "start": 5, "count": 4, "course": "高等数学@教A-301" },
    //   { "day": 3, "start": 1, "count": 1, "course": "高等数学@教A-301" },
    //   { "day": 3, "start": 3, "count": 1, "course": "高等数学@教A-301" },
    //   { "day": 3, "start": 5, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 4, "start": 1, "count": 4, "course": "高等数学@教A-301" },
    //   { "day": 4, "start": 5, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 5, "start": 1, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 6, "start": 3, "count": 2, "course": "高等数学@教A-301" },
    //   { "day": 7, "start": 1, "count": 2, "course": "高等数学@教A-301" },  
    // ]
    courses: []
  },

  onLoad(){
    this.getCourses()
  },

  onShow(){
    this.getCourses()
  },

  getCourses(){
    wx.cloud.database().collection('courses').get().then(res=>{
      this.setData({
        courses: res.data
      })
    })
  }
})
