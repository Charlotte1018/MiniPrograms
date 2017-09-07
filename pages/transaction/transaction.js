var app = getApp();
var consts = require('../../constants/localConst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Txinfo: wx.getStorageSync(consts.Txinfo)
    to:true,
    inn:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var msg = {
    //   url: 'gethApi/getTrasactionList/0x7f9d3ec406a8fb2c0a6bbd2d1d7b95415b81f1e0',
    //   // url: 'gethApi/getTrasactionList/' + wx.getStorageSync(consts.mywallet).address,
    //   data: '',
    //   method: 'GET'
    // }
    // app.http(msg).then((data) => {
    //   console.log(data);
    //   var txinfo = [];
    //   if (data.data.length > 3) {
    //     for (var i = 0; i < 3; i++) {
    //       txinfo.push(data.data[i]);
    //     }
    //     app.storage(consts.txinfo, txinfo);
    //   } else {
    //     txinfo = data.data;
    //     app.storage(consts.txinfo, txinfo);
    //   }
    // }, (reject) => {
    //   console.log(reject);
    // });
    console.log(this.data);
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
    // var msg = {
    //   // url: 'gethApi/getTrasactionList/0x7f9d3ec406a8fb2c0a6bbd2d1d7b95415b81f1e0',
    //   url: 'gethApi/getTrasactionList/' + wx.getStorageSync(consts.mywallet).address,
    //   data: '',
    //   method: 'GET'
    // }
    // app.http(msg).then((data) => {
    //   console.log(data);
    //   var txinfo = [];
    //   if (data.data.length > 3) {
    //     for (var i = 0; i < 3; i++) {
    //       txinfo.push(data.data[i]);
    //     }
    //     app.storage(consts.txinfo, txinfo);
    //     this.setData({
    //       txinfo
    //     })
    //   } else {
    //     txinfo = data.data;
    //     app.storage(consts.txinfo, txinfo);
    //     this.setData({
    //       txinfo
    //     })
    //   }
    // }, (reject) => {
    //   console.log(reject);
    // });
    console.log(this.data);
    var myaddress = wx.getStorageSync(consts.mywallet).address;
    this.setData({
      myaddress
    })
    this.updata();

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
    this.updata();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 修改交易详情
   */
  updata: function () {
    var tx = wx.getStorageSync(consts.txinfo);
    var len = tx.length;
    var that=this;
    console.log('当前交易的数量:', len)
    if (len === 0) {
      this.setData({
        Txinfo: tx
      })
      app.storage(consts.Txinfo, tx);
    } else {
      var date = new Date().getTime();
      // console.log(date);
      var my = wx.getStorageSync(consts.mywallet).address;
      tx.forEach(function (v, k) {
        if (my == v.from) {
          tx[k].value = '-' + v.value * Math.pow(10, -18);
          that.setData({
            inn:false,
            to: true
          })
        } else {
          tx[k].value = '+' + v.value * Math.pow(10, -18);
          that.setData({
            inn: true,
            to: false
          })
        }
        // tx[k].value = v.value * Math.pow(10, -18);
        var leftTime = date - tx[k].timeStamp * 1000;
        var d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        var h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        var m = Math.floor(leftTime / 1000 / 60 % 60);
        var s = Math.floor(leftTime / 1000 % 60);
        console.log('时间', d, h, m, s);
        if (d === 0) {
          tx[k].timeStamp = h + '时' + ' ' + m + '分钟前';
        } else {
          tx[k].timeStamp = d + '天' + ' ' + h + '小时' + m + '分钟前';
        }
      })
      console.log(tx);
      app.storage(consts.Txinfo, tx);
      // app.storage(consts.txinfo, txinfo);
      this.setData({
        Txinfo: tx
      })
    }



  }
})