// transactionToken.js
var app = getApp();
var consts = require('../../../constants/localConst.js')
var tx = require('../../../utils/transaction.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qtum: wx.getStorageSync(consts.qtumBL).value,
    cpc: wx.getStorageSync(consts.cpcBL).value,
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      tokenAddress: options.tokenAddress,
      tokenName: options.tokenName,
      address: wx.getStorageSync(consts.mywallet).address,
      tokenkey: options.tokenkey,
      Txinfo: wx.getStorageSync(options.tokenkey)
    })
    this.setData({
      Txinfo: wx.getStorageSync(this.data.tokenkey)
      // Txinfo: wx.getStorageSync(consts.Actinfo)
    })
    console.log(this.data);
    switch (options.tokenName) {
      case "Qtum":
        this.setData({
          balance: this.data.qtum
        })
        break;
      case "CPC":
        this.setData({
          balance: this.data.cpc
        })
        break;
      default:
        this.setData({
          balance: this.data.qtum
        })

    }
    // if (options.tokenName==="ACT"){
    //   this.setData({
    //     balance:wx.getStorageSync(consts.actBL).value
    //   })
    // }
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
      tmptokenTrans: wx.getStorageSync(consts.tmptokenTrans)
    })
    var that=this;
    setInterval(function () {   
      that.transit();
    }, 15000);
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
    this.setData({

      address: wx.getStorageSync(consts.mywallet).address,

      Txinfo: wx.getStorageSync(this.data.tokenkey)
    })
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
   * 转账
   */
  transfer: function () {
    var url = '../transfer/transfer';
    app.openURL(url);
  },
  /**
   * 收款
   */
  paycode: function () {
    var url = '../payCode/payCode';
    app.openURL(url);
  },
  /**
   * 交易详情
   */
  transaction: function (e) {
    console.log(e.currentTarget.dataset);
    var index = e.currentTarget.dataset.index;
    var tokenkey = e.currentTarget.dataset.tokenkey;
    var tokenname = e.currentTarget.dataset.tokenname;
    var url = '../transTokendetail/transTokendetail?index=' + index + '&tokenkey=' + tokenkey + '&tokenName=' + tokenname
    app.openURL(url);
  },
  /**
     *   处理过度期
     */
  transit: function () {
    var tmptokenTrans = wx.getStorageSync(consts.tmptokenTrans)

    if (tmptokenTrans !== '') {
      var tmpTransHash = wx.getStorageSync(consts.tmptokenTrans).hash;
      var tmpTranstimeStamp = wx.getStorageSync(consts.tmptokenTrans).timeStamp;
      var date = new Date().getTime();
      var leftTime = date - tmpTranstimeStamp;
      var m = Math.floor(leftTime / 1000 / 60 % 60);
      var s = Math.floor(leftTime / 1000 % 60);
      this.setData({
        timeStamp: m + '分' + s + '秒前'
      })
      var TxinfoHash = wx.getStorageSync(this.data.tokenkey)[0].hash;
      // this.setData({
      //   TxinfoHash
      // })
      if (tmpTransHash === TxinfoHash) {
        this.setData({
          hashequal: false
        })
        app.storage(consts.tmptokenTrans, '');
        console.log(this.data.hashequal)
      } else {
        this.setData({
          hashequal: true
        })
      }
    } else {
      this.setData({
        hashequal: false
      })
    }


  }

})