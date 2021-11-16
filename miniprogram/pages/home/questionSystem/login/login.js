/*
 * @Author: your name
 * @Date: 2021-11-16 16:12:30
 * @LastEditTime: 2021-11-16 19:19:49
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \呼吸之友\miniprogram\pages\home\questionSystem\login\login.js
 */
// pages/login/login.js
Page({
	navToWriter(){
		wx.navigateTo({
			url:"../../../my/creatQuestion/newQues/index"
		})
	},
	lookData(){
		wx.navigateTo({
			url:"../../../my/creatQuestion/lookData/index"
		})
	},
	navToReader() {
		wx.navigateTo({
			url:"../index/index"
		})
	},
	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})