// createWallet.js
var app = getApp();
var wallet = require('../../../utils/wallet.js')
var consts = require('../../../constants/localConst.js')
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
    this.setData({
      name: '',
      password: '',
      confirm: ''
    })
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
   * 输入框获得焦点
   */
  highLight: function () {
    this.setData({
      open: true
    })
    console.log(this.data.open);
  },
  highLight2: function () {
    this.setData({
      open2: true
    })
    console.log(this.data.open);
  },
  highLight3: function () {
    this.setData({
      open3: true
    })
    console.log(this.data.open);
  },
  /**
   * 输入框失去焦点
   */
  cancle_hl: function () {
    this.setData({
      open: false
    })
    console.log(this.data.open);
  },
  cancle_hl2: function () {
    this.setData({
      open2: false
    })
    console.log(this.data.open);
  }
  ,
  cancle_hl3: function () {
    this.setData({
      open3: false
    })
    console.log(this.data.open);
  },
  /**
  * 创建钱包
  */
  submit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var name = e.detail.value.name;
    var password = e.detail.value.password;
    var confirm = e.detail.value.confirm;
    console.log(password.length)
    if (password.length<6){
      this.setData({
        passworldLength: password.length
      })
    }else{
      this.setData({
        passworldLength: password.length
      })
    
    if (name === '') {
      var msg = {
        content: "请输入钱包名称!",
        showCancel: false
      }
      app.Model(msg);
    } else {
      if (password === confirm) {
        if (password === '') {
          var msg = {
            content: "密码不能为空!",
            showCancel: false
          }
          app.Model(msg);
        } else {
          console.log("密码确认成功,成功注册钱包");
          var create = {
            url: "ethLightWallet/createV3",
            data: {
              "password": password
            },
            method: "POST"
          }

          var info = {
            name: name,
            ok: false,
            copy: true,
            data: {
              url: "ethLightWallet/createV3",
              data: {
                "password": password
              },
              method: "POST"
            }

          }
          console.log(create);
          wallet.createWallet(info);
          
        }
      } else {
        var msg = {
          content: "您两次输入的密码不一致,请重新确认!",
          showCancel: false
        }
        app.Model(msg);
      }
    }
    }
  },
  /**
 * reset表单
 */
  reset: function () {
    console.log('form发生了reset事件');
  }
})