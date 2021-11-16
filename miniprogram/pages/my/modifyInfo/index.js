/*
 * @Author: your name
 * @Date: 2021-09-16 19:23:17
 * @LastEditTime: 2021-11-03 18:00:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\my\modifyInfo\index.js
 */
let age
let motto
let medicalHistory
let healthCondition
Page({
  data: {
    openid:"",
    userInfo:{},
    modifiableInfo:{},
    ifSubmit:false
  },
  onLoad: function (options) {
    this.setData({
      openid:options.openid
    })
    const db = wx.cloud.database().collection("userInfo").where({openid:options.openid})
    db.get()
    .then(res=>{
      this.setData({
        userInfo:res.data[0].userInfo,
        modifiableInfo:res.data[0].modifiableInfo
      })
    })
  },
  handleAge(e){
    console.log(e.detail.value)
    age=e.detail.value
  },
  handleMotto(e){
    console.log(e.detail.value)
    motto=e.detail.value
  },
  handleMedicalHistory(e){
    console.log(e.detail.value)
    medicalHistory=e.detail.value
  },
  handleHealthCondition(e){
    console.log(e.detail.value)
    healthCondition=e.detail.value
  },
  submit(){
    let modifiableInfo={};
    modifiableInfo.age= age;
    modifiableInfo.motto=motto;
    modifiableInfo.medicalHistory=medicalHistory;
    modifiableInfo.healthCondition=healthCondition;
    wx.cloud.callFunction({
      name:"update",
      data:{
        table:"userInfo",
        where:{
          openid:this.data.openid
        },
        data:modifiableInfo,
        name:"modifiableInfo"
      }
    })
    .then(res=>{
      console.log("使用云函数成功",res)
    })
    .catch(res=>{
      console.log("使用云函数失败",res)
    })
    this.setData({
      ifSubmit:true
    })
  }
})