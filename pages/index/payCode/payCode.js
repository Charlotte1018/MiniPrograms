// payCode.js
var consts = require('../../../constants/localConst.js')
var QR = require("../../../utils/qrcode.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mywallet: wx.getStorageSync(consts.mywallet)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mywallet: wx.getStorageSync(consts.mywallet)

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.mywallet.address;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   placeholder: this.data.mywallet.address//默认二维码生成文本

    // })
    console.log(this.data);
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
   * 适配不同屏幕大小的canvas
   */
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 600;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  /**
   * 绘制二维码图片
   */
  createQrCode: function (url, canvasId, cavW, cavH) {
    QR.qrApi.draw(url, canvasId, cavW, cavH);

  },
  /**
   * 复制信息到剪贴板
   */
  copyaddress: function () {
    wx.setClipboardData({
      data: this.data.mywallet.address,
      success: function (res) {
        // wx.getClipboardData({
        //   success: function (res) {
        //     console.log(res.data) // data
        //   }
        // })
        app.toastSuccess('复制成功');
      }
    })
  }
})