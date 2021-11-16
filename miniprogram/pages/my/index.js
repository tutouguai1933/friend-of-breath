/*
 * @Author: your name
 * @Date: 2021-08-31 14:46:54
 * @LastEditTime: 2021-11-16 14:03:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\my\index.js
 */
// pages/user/index.js
Page({
  data: {
    userInfo:{},
    ifAdministrator:false,
    openid:"o4U8-4_HpKdr6jDvbc2bhdyVdU-I",
    subscribe:[],
    collect:[]
  },
  onload(){
  },
  onShow(){
    const userInfo=wx.getStorageSync("userInfo");
    // const collect=wx.getStorageSync("collect")||[];
    this.ifAdministrator()

    const db = wx.cloud.database().collection("userInfo").where({openid:this.data.openid})
    db.get()
    .then(res=>{
      this.setData({
        subscribeNums:res.data[0].subscribe.length,
        collectNums:res.data[0].collect.length
      })
    })
    
    this.setData({
      userInfo,
    });
    
    console.log(this.data.userInfo)
  },
  ifAdministrator(){
    wx.cloud.callFunction({
      name: 'getOpenId',
    }).then(res=>{
      let that=this
      console.log("openid",res.result.openid)
      this.setData({
        openid:res.result.openid
      })
      var app = getApp();
      app.globalData.openid = res.result.openid;
      wx.cloud.database().collection("administrator").get()
      .then(result=>{
        result.data.map(item=>{
          if(item.openid===res.result.openid){
            that.setData({
              ifAdministrator:true
            })
          }
        })
      })
    })
  },
  toUploadFile(){
    let str = JSON.stringify(this.data.userInfo)
    wx.navigateTo({
      url: '../uploadFile/index?userInfo='+str,
      success: (result)=>{
        console.log("成功")
      },
      fail: ()=>{
        console.log("失败")
      },
      complete: ()=>{}
    });
  },
  toCreateVote(){
    wx.navigateTo({
      url: './creatQuestion/newQues/index',
      success: (result)=>{
        console.log("成功")
      },
      fail: ()=>{
        console.log("失败")
      },
      complete: ()=>{}
    });
  }
})