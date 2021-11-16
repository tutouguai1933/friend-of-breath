/*
 * @Author: your name
 * @Date: 2021-08-31 17:36:41
 * @LastEditTime: 2021-11-03 17:05:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\login\index.js
 */
Page({
  handleGetUserInfo(e){
    console.log(e);
    const{userInfo}=e.detail;
    wx.setStorageSync("userInfo",userInfo);
    wx.cloud.callFunction({
      name: 'newUser',
      data:{
        userInfo:userInfo
      }
    })
    wx.navigateBack({
      delta: 1
    });
    var app =  getApp();
    app.globalData.hasLogin = true;
  }
})