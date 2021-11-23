const { async } = require("../../../lib/runtime/runtime");

// pages/my/sports/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    let db = wx.cloud.database();
    db.collection("userInfo").where({
      openid:app.globalData.openid
    })
    .get()
    .then(async res=>{
      let list = res.data[0].recordImage;
      for(const element of list){
        await wx.cloud.getTempFileURL({
          fileList: [{
            fileID: "cloud://cloud1-9gkkz7vcaee8d976.636c-cloud1-9gkkz7vcaee8d976-1306971379/"+element.url,
            maxAge: 60 * 60, // one hour
          }]
        }).then(result => {
          element.imageUrl = result.fileList[0].tempFileURL
        }).catch(error => {
          console.log(error)
        })
      }
      list.reverse();
      this.setData({
        list:list
      })
    })
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

  }
})