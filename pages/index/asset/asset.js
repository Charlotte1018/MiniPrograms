// asset.js
//获取应用实例
var consts = require('../../../constants/localConst.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Token:wx.getStorageSync(consts.Token)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      VHT: wx.getStorageSync(consts.VHT),
      ACT: wx.getStorageSync(consts.ACT),
      CPCE: wx.getStorageSync(consts.CPCE),
      Token: wx.getStorageSync(consts.Token)
    })
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
    this.setData({
      VHT: wx.getStorageSync(consts.VHT),
      ACT: wx.getStorageSync(consts.ACT),
      CPCE: wx.getStorageSync(consts.CPCE),
      Token: wx.getStorageSync(consts.Token)
    })
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

  },
  /**
   * 切换资产
   */
  VHT: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    app.storage('VHT', e.detail.value)
    this.setData({
      VHT: wx.getStorageSync(consts.VHT)
      
    })
  },
  ACT: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    app.storage('ACT', e.detail.value)
    this.setData({
      
      ACT: wx.getStorageSync(consts.ACT)
    })
  },
  CPCE: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    app.storage('CPCE', e.detail.value)
    this.setData({
      
      CPCE: wx.getStorageSync(consts.CPCE)
    })
  }
})