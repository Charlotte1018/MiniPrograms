var app = getApp();
var consts = require('../../../constants/localConst.js')
var tx = require('../../../utils/transaction.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Txinfo: wx.getStorageSync(consts.Txinfo),


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ETH: wx.getStorageSync(consts.ethBL),
        Txinfo: wx.getStorageSync(consts.Txinfo),
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

    console.log(this.data);
    var myaddress = wx.getStorageSync(consts.mywallet).address;

    this.setData({
      myaddress,
      tmpTrans: wx.getStorageSync(consts.tmpTrans),
        Txinfo: wx.getStorageSync(consts.Txinfo),
    })
    this.refresh();
    this.Txlist();
    this.transit();

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
   * 修改交易详情
   */
  updata: function () {
    var tx = wx.getStorageSync(consts.txinfo);
    var len = tx.length;
    var that = this;
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
          var value = [];
          value.push(tx[k].value)
          that.setData({
            value: value
          })
        } else {
          tx[k].value = '+' + v.value * Math.pow(10, -18);
          var value = [];
          value.push(tx[k].value)
          that.setData({
            value1: value
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
      console.log('66666666666666666666666666',this.data.value1);
      app.storage(consts.Txinfo, tx);
      // app.storage(consts.txinfo, txinfo);
      this.setData({
        Txinfo: tx
      })
    }

  },
  /**
   * 交易详情
   */
  transaction: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var url = '../transDetail/transDetail?index=' + index
    app.openURL(url);
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
  refresh: function () {
    var that = this;
    setInterval(function () {
      that.setData({
        Txinfo: wx.getStorageSync(consts.Txinfo)
      })
    }, 15000)

  },
  /**
   *   获取所有币种的交易详情
   */
  Txlist: function () {
    var that=this;
    var time1 = setInterval(function () {
      tx.getETHinfo();
      that.transit();
    }, 15000);
    var that = this;
    var Txinfo = that.data.Txinfo;
    tx.getETHinfo();
    // for(var i=0;i<3;i++){
    //   var confirmations = Txinfo[i].confirmations;
    //   if (confirmations>12){
    //     // clearInterval(time1);
    //   }
    // }

    // var time1=setInterval(function () {
    //   tx.getETHinfo();
    // }, 15000);


  },
  /**
     *   处理过度期
     */
  transit: function () {
    var tmpTrans = wx.getStorageSync(consts.tmpTrans)

    if (tmpTrans !== '') {
      var tmpTransHash = wx.getStorageSync(consts.tmpTrans).hash;
      var tmpTranstimeStamp = wx.getStorageSync(consts.tmpTrans).timeStamp;
      var date = new Date().getTime();
      var leftTime = date - tmpTranstimeStamp;
      var m = Math.floor(leftTime / 1000 / 60 % 60);
      var s = Math.floor(leftTime / 1000 % 60);
      this.setData({
        timeStamp: m+'分'+s+'秒前'
      })




      var TxinfoHash = wx.getStorageSync(consts.Txinfo)[0].hash;
      // this.setData({
      //   TxinfoHash
      // })
      if (tmpTransHash === TxinfoHash) {
        this.setData({
          hashequal: false
        })
        app.storage(consts.tmpTrans, '');
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