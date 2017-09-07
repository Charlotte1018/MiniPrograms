// wallet.js
var app = getApp();
var wallet = require('../../../utils/wallet.js')
var tx = require('../../../utils/transaction.js')
var consts = require('../../../constants/localConst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    walletList: '',
    ok: true,
    lock: false,
    modalChange: false,
    arr1: { title: "请输入密码", confirmText: "确定", cancelText: "取消" },
    arr2: { title: "您确定删除吗？", confirmText: "确定", cancelText: "取消" }
  },
  tap: function (e) {
    //检查锁
    if (this.data.lock) {
      return;
    } else {
      this.setData({ modalChange: false });
      this.switchWallet(e);
    }
  },
  touchend: function () {
    if (this.data.lock) {
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },
  longtap: function (e) {
    var index = e.currentTarget.dataset.index;
    var keystore = wx.getStorageSync(consts.walletList)[index].wallet.strjson;
    var ok = wx.getStorageSync(consts.walletList)[index].ok;
    this.setData({ lock: true, modalChange: true, hiddenmodalput: !this.data.hiddenmodalput, index: index, keystore: keystore, ok: ok });
    console.log(ok);
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
    this.setData({
      walletList: wx.getStorageSync(consts.walletList)
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
   *   创建钱包
   */
  createWallet: function () {
    var url = '../createWallet/createWallet';
    app.openURL(url);
  },
  /**
   *   导入钱包
   */
  inputWallet: function () {
    var url = '../inputWallet/inputWallet';
    app.openURL(url);
  },
  /**
   *   切换钱包
   */
  switchWallet: function (e) {
    console.log(e.target.dataset);
    app.storage(consts.mywallet, {
      'address': e.target.dataset.address,
      'name': e.target.dataset.name,
      'strjson': e.target.dataset.strjson

    })
    var index = e.target.dataset.index, walletList = this.data.walletList;
    for (var i = 0, len = walletList.length; i < len; i++) {
      if (i === index) {
        if (walletList[index].ok) {

        } else {
          walletList[i].ok = !walletList[i].ok;
        }
        // walletList[i].ok = !walletList[i].ok;
      } else {
        walletList[i].ok = false;
      }
    }
    this.setData({
      walletList: walletList
    });
    app.storage(consts.walletList, walletList);
    if (walletList[index].ok) {
      var balance = {
        address: e.target.dataset.address,
      }
      wallet.getBalance(balance);
      this.Txlist()
    }
  },
  delete: function (e) {
    var walletList = wx.getStorageSync(consts.walletList);
    walletList.splice(e, 1);
    app.storage(consts.walletList, walletList);
  },
  /**
   *   备份
   */
  modalinput: function (e) {
    var index = e.currentTarget.dataset.index;
    var keystore = wx.getStorageSync(consts.walletList)[index].wallet.strjson;
    this.setData({
      index: index,
      modalChange: false,
      hiddenmodalput: !this.data.hiddenmodalput,
      keystore: keystore
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  passWdInput: function (e) {
    this.setData({
      passWd: e.detail.value
    })
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
      if (this.data.modalChange == true) {
        if (this.data.ok == false) {
          this.delete(this.data.index);
            var msg = {
              content: "钱包删除成功",
              showCancel: false
            }
            app.Model(msg);
            this.setData({
                walletList: wx.getStorageSync(consts.walletList)
            })
        } else {
          var msg = {
            content: "当前钱包不能删除，请切换",
            showCancel: false
          }
          app.Model(msg);
        }
      } else {
          var keystore = this.data.index;
          var url = '../keystore/keystore?keystore=' + keystore;
          app.openURL(url);
      }
    }, (reject) => {
      var content='';
      console.log(this.data.passWd);
      if(this.data.passWd === undefined){
        content="请输入密码";
        console.log(0);
      }else{
        content="密码错误，请核对密码";
        console.log(1);
      }
      var msg = {
        content: content,
        showCancel: false
      }
      app.Model(msg);
    });
    this.setData({
      hiddenmodalput: true
    })
  },

  /**
 *   获取所有币种的交易详情
 */
  Txlist: function () {

    tx.getETHinfo();
    var qtum = {
      Tokenaddress: wx.getStorageSync(consts.Token)[0].value,
      key: consts.qtuminfo,
      key1: consts.Qtuminfo
    }
    var cpc = {
      Tokenaddress: wx.getStorageSync(consts.Token)[1].value,
      key: consts.cpcinfo,
      key1: consts.Cpcinfo
    }


    // setInterval(function () {

    //   tx.getETHinfo();
    //   tx.getTokeninfo(vht)
    //   tx.getTokeninfo(act)
    //   tx.getTokeninfo(cpce)


    // }, 15000);

    tx.getTokeninfo(qtum)
    tx.getTokeninfo(cpc)


  },
})