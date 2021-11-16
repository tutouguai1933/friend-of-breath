/*
 * @Author: your name
 * @Date: 2021-08-31 14:28:55
 * @LastEditTime: 2021-09-17 19:43:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\paper\index.js
 */
// pages/paper/index.js
import {
  regeneratorRuntime
} from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  async onLoad() {
    await wx.cloud.database().collection("article")
      .get()
      .then(res => {
        res.data.forEach(element => {
          let index = element.time.indexOf(" ")
          element.date = element.time.substring(0, index)
        });
        this.setData({
          list: res.data
        })
      })
    let list =this.data.list
    for(const element of list){
      await wx.cloud.getTempFileURL({
        fileList: [{
          fileID: "cloud://cloud1-9gkkz7vcaee8d976.636c-cloud1-9gkkz7vcaee8d976-1306971379/articleImage/" 
          + element._id + element.imgFormat,
          maxAge: 60 * 60, // one hour
        }]
      }).then(result => {
        console.log(result.fileList[0].tempFileURL)
        element.imageUrl = result.fileList[0].tempFileURL
      }).catch(error => {
        console.log(error)
      })
    }
    this.setData({
      list
    })
    console.log(this.data.list)
  }
})