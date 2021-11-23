/*
 * @Author: your name
 * @Date: 2021-08-31 12:41:04
 * @LastEditTime: 2021-11-17 13:13:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\uploadFile\index.js
 */
/*
 * @Author: your name
 * @Date: 2021-08-31 12:41:04
 * @LastEditTime: 2021-09-14 16:59:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\pages\uploadFile\index.js
 */
import {
  regeneratorRuntime
} from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: '',
    articleTitle: "",
    articleContent: "",
    ifSubmit:false,
    imgFormat:""
  },

  onLoad(options) {
    let userInfo = JSON.parse(options.userInfo)
    this.setData({
      envId: options.envId,
      userInfo
    })
  },
  uploadImg() {
    wx.showLoading({
      title: '',
    })
    // 让用户选择一张图片
    let time = new Date().toLocaleString()
    console.log(time)
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        console.log("chooseResult",chooseResult)
        let index = chooseResult.tempFilePaths[0].lastIndexOf(".")
        let imgFormat=chooseResult.tempFilePaths[0].substr(index)
        this.setData({
          imgSrc: chooseResult.tempFilePaths[0],
          haveGetImgSrc: true,
          imgFormat
        })
        wx.hideLoading()
      },
      fail: res => {
        wx.hideLoading()
      }
    })
  },
  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    })
  },
  getArticleTitle(e) {
    this.setData({
      articleTitle: e.detail.value
    })
  },
  getArticleContent(e) {
    console.log(e.detail.value)
    this.setData({
      articleContent: e.detail.value
    })
  },
  async submit() {
    console.log(this.data.userInfo.nickName)
    console.log(this.data.articleTitle)
    console.log(this.data.articleContent)
    wx.showLoading({
      title: "正在上传",
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    await wx.cloud.database().collection("article")
      .add({
        data: {
          nickName: this.data.userInfo.nickName,
          avatarUrl: this.data.userInfo.avatarUrl,
          articleTitle: this.data.articleTitle,
          articleContent: this.data.articleContent,
          time: new Date().toLocaleString(),
          imageUrl: '',
          imgFormat:this.data.imgFormat
        }
      })
      .then(res => {
        console.log("submit成功", res)
        console.log("文章的唯一标识符_id", res._id)
        wx.cloud.uploadFile({
          cloudPath: "articleImage/" + res._id+this.data.imgFormat,
          filePath: this.data.imgSrc,
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res)
          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
          this.setData({
            ifSubmit:true
          })
        }).catch((e) => {
          console.log(e)
          wx.hideLoading()
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
          this.setData({
            ifSubmit:true
          })
        })
      })
      .catch(res => {
        console.log("submit失败", res)
      })
  },
  goBack(){
    wx.navigateBack({
      delta: 1
    });
  }
})