/*
 * @Author: your name
 * @Date: 2021-09-05 23:27:55
 * @LastEditTime: 2021-09-09 20:51:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\record\index.js
 */
const app = getApp()
import {
  regeneratorRuntime
} from "../../lib/runtime/runtime"
// import {getFormatDate} from "../../components/dk-calendar/dk-calendar"
Page({
  data: {
    currSelectDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
    isShowDate: false,
    openid: "",
    user_date_log: [] //["2021-09-03","2021-09-05"]
  },
  async onLoad() {
    console.log("从云端获取数据")
    // const res = wx.getStorageSync("userDataLog").data
    const openid = await this.getOpenid()
    const log = await this.getLogFromCloud(openid)
    this.setData({
      openid,
      user_date_log: log,
      isShowDate: true
    })
  },
  //微日期组件选中日期
  onSelectDate(e) {
    console.log('点击的日期：', e.detail.currDayDetail)
    this.setData({
      currSelectDate: e.detail.currDayDetail
    })
  },
  async getOpenid() {
    // 获取openid
    // 使用云函数
    const res = await wx.cloud.callFunction({
      name: 'getOpenId',
      data: {}
    })
    return res.result.openid
  },
  async getLogFromCloud(openid) {
    //使用云函数的
    // const res = await wx.cloud.callFunction({
    //   name: "findLog",
    //   data: {
    //     openid: openid
    //   }
    // })
    // return res.result.data[0].user_date_log
    const res = await wx.cloud.database().collection("userInfo")
    .where({openid:openid})
    .get()
    return res.data[0].user_date_log
  },
  handleGetActiveDate(e) { //更新签到日志
    var user_date_log = e.detail
    this.setData({
      user_date_log
    })
    wx.cloud.callFunction({
      name: 'updateLog',
      data: {
        openid:this.data.openid,
        user_date_log:this.data.user_date_log
      }
    })
  }
})