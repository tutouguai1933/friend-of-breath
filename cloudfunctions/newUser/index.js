/*
 * @Author: your name
 * @Date: 2021-09-10 18:44:32
 * @LastEditTime: 2021-09-16 19:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\cloudfunctions\newUser\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    userInfo
  } = event;
  console.log(userInfo)
  const wxContext = cloud.getWXContext()
  cloud.database().collection("userInfo")
    .where({
      openid: wxContext.OPENID
      // openid:"123456846"
    })
    .get()
    .then(res => {
      console.log("res", res.data[0])
      if (res.data[0] != null) {
        console.log("用户已存在")
      } else {
        console.log("用户不存在")
        cloud.database().collection("userInfo")
          .add({
            data: {
              openid: wxContext.OPENID,
              user_date_log: [],
              userInfo: {}
            }
          })
        console.log("新建用户成功")
      }
    })
    .then(res => {
      //更新个人信息
      cloud.database().collection("userInfo")
        .where({
          openid: wxContext.OPENID
        })
        .update({
          data:{
            userInfo:userInfo
          }
        })
    })

}