/*
 * @Author: your name
 * @Date: 2021-08-31 13:30:40
 * @LastEditTime: 2021-09-17 20:20:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\home\index.js
 */
// pages/home/index.js
import {
  regeneratorRuntime
} from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
   data: {
    swiperList: []
  },
  async onLoad() {
    await this.getSwiperList();
  },
  async getSwiperList(){
    await wx.cloud.database().collection("article")
      .aggregate()
      .sample({
        size: 3
      })
      .end()
      .then(res => {
        console.log(res.list)
        res.list.forEach(element => {
          let index = element.time.indexOf(" ")
          element.date = element.time.substring(0, index)
        });
        this.setData({
          swiperList: res.list
        })
      })
    let swiperList =this.data.swiperList
    for(const element of swiperList){
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
      swiperList:swiperList
    })
    console.log(this.data.swiperList)
  }
})