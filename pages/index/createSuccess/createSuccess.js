// createSuccess.js
var consts = require('../../../constants/localConst.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(typeof options.change);
    this.setData({
      address: options.address,
      strjson: options.strjson,
      change: options.change
    })
    if(options.change === "true"){
      this.setData({h1:'钱包导入成功'});
        wx.setNavigationBarTitle({
            title: '导入成功'
        })
    }else{
      this.setData({h1:'钱包创建成功'});
        wx.setNavigationBarTitle({
            title: '创建成功'
        })
    }
    console.log(this.data.title);
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

  },
  /**
   * 备份钱包
   */
  copy: function (e) {
    console.log(index);
    var index = e.currentTarget.dataset.index
    var walletList = wx.getStorageSync(consts.walletList)
    var keystore = walletList[walletList.length - 1].wallet.strjson;
    this.setData({
      index: walletList.length - 1,
      hiddenmodalput: !this.data.hiddenmodalput,
      keystore: keystore
    })
    console.log(keystore);
  },

  confirm: function (e) {
    var msg = {
      url: 'ethLightWallet/importWallet',
      data: {
        "strjson": this.data.keystore,
        "password": this.data.passWd
      },
      method: "POST"
    }
    app.http(msg).then((data) => {
      var keystore = this.data.index;
      console.log('现在一共创建的钱包个数', keystore);
      var url = '../keystore/keystore?keystore=' + keystore;
      app.openURL(url);
    }, (reject) => {
      var msg = {
        content: "密码错误，请核对密码",
        showCancel: false
      }
      app.Model(msg);
    });
    this.setData({
      hiddenmodalput: true
    })
  },
    cancel: function(e){
        this.setData({
            hiddenmodalput: true
        })
    },
  passWdInput:function(e){
    console.log(e)
    this.setData({
      passWd: e.detail.value
    })
  },
    copyTip:function (e) {
      app.openURL('../../static/copy/copy');
    }

})