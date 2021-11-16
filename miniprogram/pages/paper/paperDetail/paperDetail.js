/*
 * @Author: your name
 * @Date: 2021-09-14 21:41:45
 * @LastEditTime: 2021-11-16 11:07:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\paper\paperDetail.js
 */
// pages/paper/index.js
// import { userInfo } from "os";
import {
  async,
  regeneratorRuntime
} from "../../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    article: {},
    ifCollect: false,
    ifSubscribe: false,
    userAllInfo: {}
  },
  async onLoad(option) {
    var appInst = getApp();
    await wx.cloud.database().collection("userInfo") //获取当前用户的全部信息
      .where({
        openid: appInst.globalData.openid
      })
      .get()
      .then(res => {
        let userAllInfo = res.data[0];
        this.setData({
          userAllInfo
        })
      })
    await wx.cloud.database().collection("article") //获取当前文章的全部信息
      .doc(option._id)
      .get()
      .then(async res => {
        await wx.cloud.getTempFileURL({
          fileList: [{
            fileID: "cloud://cloud1-9gkkz7vcaee8d976.636c-cloud1-9gkkz7vcaee8d976-1306971379/articleImage/" +
              res.data._id + res.data.imgFormat,
            maxAge: 60 * 60, // one hour
          }]
        }).then(result => {
          console.log(result.fileList[0].tempFileURL)
          res.data.imageUrl = result.fileList[0].tempFileURL
        }).catch(error => {
          console.log(error)
        })
        this.setData({
          article: res.data,
          openid: appInst.globalData.openid
        })
      })
    let ifCollect = false;
    let ifSubscribe = false;
    this.data.userAllInfo.collect.forEach(element => {
      if(element ===this.data.article._id){
        ifCollect=true;
      }
    });
    console.log("asdasdasd",this.data.article._openid)
    this.data.userAllInfo.subscribe.forEach(element => {
      if(element ===this.data.article._openid){
        ifSubscribe=true;
      }
    });
    this.setData({
      ifCollect:ifCollect,
      ifSubscribe:ifSubscribe
    })
  },
  onShow() {

  },
  getCollect() {
    let ifCollect;
    if (this.data.ifCollect) {
      ifCollect = false;
    } else {
      ifCollect = true;
      wx.cloud.callFunction({
        name: 'update',
        // 传给云函数的参数
        data: {
          table: "userInfo",
          where: {
            openid: this.data.openid
          },
          name: "collect",
          data: [...this.data.userAllInfo.collect, this.data.article._id]
        },
        success: function (res) {
          console.log("添加收藏成功")
        },
        fail: console.error
      })
    }
    this.setData({
      ifCollect
    })
  },
  getSubscribe() {
    let ifSubscribe;
    if (this.data.ifSubscribe) {
      ifSubscribe = false;
    } else {
      ifSubscribe = true;
      wx.cloud.callFunction({
        name: 'update',
        // 传给云函数的参数
        data: {
          table: "userInfo",
          where: {
            openid: this.data.openid
          },
          name: "subscribe",
          data: [...this.data.userAllInfo.subscribe, this.data.article._openid]
        },
        success: function (res) {
          console.log("添加关注成功")
        },
        fail: console.error
      })
    }
    this.setData({
      ifSubscribe
    })
  }
})