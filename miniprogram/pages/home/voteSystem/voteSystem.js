//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    icon60: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==',

    votelist: "",
    //最后刷新时间
    refreshtime: "",
  },
  toVoteDetail: function (e) {
    //跳转投票详情页
    var _id = e.currentTarget._id;
    wx.navigateTo({
      url: '../detail/detail?id=' + _id,
    })
  },
  setRefrashTime: function () {
    //获取当前时间-最后刷新时间显示
    var date = new Date().toTimeString();
    date = date.replace(/\s.*/, "")
    console.log(date);

    this.setData({
      refreshtime: date
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setRefrashTime();
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.database().collection("vote")
      .get()
      .then(res => {
        var votelist = res.data.map(item=>{
          let back = item.voteInfo;
          back._id = item._id;
          return back
        })
        for (var i = 0; i < votelist.length; i++) {
          //如何结束时间到了  设置结束
          if (votelist[i].end == 1) {
            if (new Date(Date.parse(votelist[i].endtime)) < new Date()) {
              that.setData({
                'votemain.end': 2,
              })
            }
          }
          votelist[i].startTime = this.processTime(votelist[i].startTime);
          votelist[i].endTime = this.processTime(votelist[i].endTime);
        }
        this.setData({
          votelist
        })
      })
      .catch(res => {
        wx.showModal({
          title: '提示',
          content: '系统错误!',
        })
      })
      .finally(res => {
        wx.hideLoading();
      })
  },

  onPullDownRefresh: function () {
    var that = this;
    wx.showLoading({
      title: '刷新中...',
    })
    //获取投票列表
    wx.request({
      url: app.globalData.host + "/wx_graduation_voteforyou/",
      data: {
        "scene": "get_vote_list"
      },
      success: function (res) {
        //console.log(res.data);
        //处理时间
        var votelist = res.data;

        for (var i = 0; i < votelist.length; i++) {
          //如何结束时间到了  设置结束
          if (votelist[i].end == 1) {
            if (new Date(Date.parse(votelist[i].endtime)) < new Date()) {
              wx.request({
                url: app.globalData.host + "/wx_graduation_voteforyou/",
                data: {
                  "scene": "endvote",
                  "id": votelist[i].id
                },
                success: function (e) {
                  that.setData({
                    'votemain.end': 2,
                  })
                }
              })
            }
          }

          votelist[i].starttime = this.processTime(votelist[i].starttime);
          votelist[i].endtime = this.processTime(votelist[i].endtime);
        }

        that.setData({
          votelist: votelist,
        })
        that.setRefrashTime();
        wx.stopPullDownRefresh(); //停止下拉刷新

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading();
      }

    })
  },
  processTime: function (e) {
    var time = new Date(e).toLocaleString().replace(/:\d{1,2}$/, " ");
    time = time.replace(/^\d{4}\//, " ");
    time = time.replace(/\//, "-");
    // console.log(time);
    return time;
  },
})