// transferSuccess.js
var app = getApp();
var consts = require('../../../../constants/localConst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      mywallet: wx.getStorageSync(consts.mywallet),
      kind:options.kind,
      to: options.to,
      value: options.value,
      index: options.index
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
      address: wx.getStorageSync(consts.mywallet).address
    })
    console.log(this.data)
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
   * 查看详情
   */
  scanDetail:function(){
    var index=this.data.index;
    if(index===0){
      var len = wx.getStorageSync(consts.txinfo).length;
      if (len === 0) {
        wx.showToast({
          title: '正在加载中',
          icon: 'loading',
          duration: 1500
        })
      } else {
        var url = '../../transaction/transaction'
        app.openURL(url);
      }
    }
    if(index===1){
      var Address = wx.getStorageSync(consts.Token)[0].value;
      var len = wx.getStorageSync(consts.vhtinfo).length;
      if (len === 0) {
        wx.showToast({
          title: '正在加载中',
          icon: 'loading',
          duration: 1500
        })
      } else {
        var url = '../../transactionToken/transactionToken?tokenName=VHT&tokenAddress=' + Address + '&tokenkey=' + consts.Vhtinfo;
        app.openURL(url);
      }
    }
    if(index===2){
      var Address = wx.getStorageSync(consts.Token)[1].value;
      var len = wx.getStorageSync(consts.actinfo).length;
      if (len === 0) {
        wx.showToast({
          title: '正在加载中',
          icon: 'loading',
          duration: 1500
        })
      } else {
        var url = '../../transactionToken/transactionToken?tokenName=ACT&tokenAddress=' + Address + '&tokenkey=' + consts.Actinfo;
        app.openURL(url);
      }
    }
    if(index===3){
      var Address = wx.getStorageSync(consts.Token)[2].value;
      var len = wx.getStorageSync(consts.cpceinfo).length;
      if (len === 0) {
        wx.showToast({
          title: '正在加载中',
          icon: 'loading',
          duration: 1500
        })
      } else {
        var url = '../../transactionToken/transactionToken?tokenName=CPCE&tokenAddress=' + Address + '&tokenkey=' + consts.Cpceinfo;
        app.openURL(url);
      }
    }
    var url = '../../transaction/transaction';
    app.openURL(url);
  },
  /**
   * 交易完成
   */
  transferend: function () {
    var url = '../../index';
    app.openURL("../wallet/wallet");
    // wx.switchTab({
    //   url: '../../index'
    // })
  }
})