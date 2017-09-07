// transfer.js
var app = getApp();
var consts = require('../../../constants/localConst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['ETH', 'Qtum', 'CPC'],
    index: 0,
    switchs: false,
    TokenAddress: [
      '',
      '0x9a642d6b3368ddc662CA244bAdf32cDA716005BC',
      '0x9f1b9ea49eeab4bee2a2ce780fb9996dab384f3f'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log("监听页面加载");
    this.setData({
      address: options.address
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
      mywallet: wx.getStorageSync(consts.mywallet)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      address: '',
      value: '',
      password: '',
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
  highLight4: function () {
    this.setData({
      open4: true
    })
    console.log(this.data.open);
  },
  highLight5: function () {
    this.setData({
      open5: true
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
  },
  cancle_hl3: function () {
    this.setData({
      open3: false
    })
    console.log(this.data.open);
  },
  cancle_hl4: function () {
    this.setData({
      open4: false
    })
    console.log(this.data.open);
  },
  cancle_hl5: function () {
    this.setData({
      open5: false
    })
    console.log(this.data.open);
  },
  /**
   * 选择框
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 确认转账
   */
  submit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var gasPrice = this.gasPrice(e.detail.value.gasPrice);
    var gasLimit = this.gasLimit(e.detail.value.gasLimit);
    var to = e.detail.value.to;
    var value = Number(e.detail.value.value);
    var mywallet = this.data.mywallet;
    var strjson = mywallet.strjson;
    var password = e.detail.value.password;
    var token = Number(e.detail.value.token);
    var asset = this.data.array[token];
    console.log(asset);
    if (password === '' || to === '' || value === '') {
      var msg = {
        content: "转账地址或转账金额或密码不能为空!",
        showCancel: false
      }
      app.Model(msg);
    } else if (value === 0) {
      var msg = {
        content: "转账金额0请输入有效值",
        showCancel: false
      }
      app.Model(msg);
    } else {
      // app.toastLoading()
      var msg = {
        url: "ethLightWallet/importWallet",
        data: {
          "strjson": strjson,
          "password": password
        },
        method: "POST"
      }
      app.http(msg).then((data) => {
        app.toastLoading()
        console.log(data);
        return data;
      }, (reject) => {
        console.log(reject);
        var msg = {
          content: "密码错误，请重新确认!",
          showCancel: false
        }
        app.Model(msg);
        return reject;
      }).then((data) => {
        if (data.status === 0) {
          var wallet = data.data.wallet;
          console.log('钱包私钥等信息', wallet);
          if (token === 0) {
            var data = {
              "chainId": 1,
              "pKey": wallet.privKey,
              "gasPrice": gasPrice,
              "data": "",
              "to": to,
              "value": value,
              "from": wallet.address,
              "gasLimit": gasLimit
            }
            console.log('发送ETH的data', data);

            //以太币转账
            var msg = {
              url: "ethLightWallet/sendTx",
              data: data,
              method: "POST"
            }
            return app.http(msg);
          } else {
            var data = {
              "chainId": 1,
              "pKey": wallet.privKey,
              "gasPrice": gasPrice,
              "data": {
                "toToken": to,
                "value": value
              },
              "to": this.data.TokenAddress[token],
              "value": "",
              "from": wallet.address,
              "gasLimit": gasLimit
            }
            console.log('发送代币的data', data);

            // 代币转账
            var msg = {
              url: "ethLightWallet/sendTokenTx",
              data: data,
              method: "POST"
            }
            return app.http(msg);
          }
        } else {
          return data = 2;
        }

      }

        ).then((data) => {
          if (data === 2) { } else {
            console.log(data);
            if (token === 0) {

              var hash = data.data.hash
              var tmpTrans = {
                'hash': hash,
                'from': mywallet.address,
                'icon': true,
                "value": '-' + Number(value),
                'timeStamp': new Date().getTime(),
                'status': '等待打包'
              }
              app.storage(consts.tmpTrans, tmpTrans)
              // var url = 'transferSuccess/transferSuccess?kind=' + asset + '&to=' + to + '&value=' + value + '&index=' + this.data.index;
              var url = '../transaction/transaction'
              app.openURL(url);
              return hash;
            } else {
              var tokenhash = data.data.hash
              var tmptokenTrans = {
                'hash': hash,
                'from': mywallet.address,
                'icon': true,
                "value": '-' + Number(value),
                'timeStamp': new Date().getTime(),
                'status': '等待打包'
              }
              app.storage(consts.tmptokenTrans, tmptokenTrans)

              var Address = wx.getStorageSync(consts.Token)[token - 1].value;

              if (asset === 'Qtum') {
                var tokenkey = consts.Qtuminfo;
              } else {
                var tokenkey = consts.Cpcinfo;
              }

              // var url = 'transferSuccess/transferSuccess?kind=' + asset + '&to=' + to + '&value=' + value + '&index=' + this.data.index;
              var url = '../transactionToken/transactionToken?tokenName=' + asset + '&tokenAddress=' + Address + '&tokenkey=' + tokenkey;

              app.openURL(url);
            }
          }
        }, (reject) => {
          if (reject === 2) { } else {
            console.log(reject);
            var message = reject.message
            if (token === 0) {
              var url = 'transferFail/transferFail?kind=' + asset + '&to=' + to + '&value=' + value + '&message=' + message;
              console.log(to, '转账出去')
              app.openURL(url);
            } else {
              var url = 'transferFail/transferFail?kind=' + asset + '&to=' + to + '&value=' + value + '&message=' + message;
              app.openURL(url);
            }
          }

        })

    }
    
  },
  /**
   * 重置
   */
  reset: function () {
    console.log('form发生了reset事件');
  },
  /**
   * gasPrice转换
   */
  gasPrice: function (e) {
    var a = e * Math.pow(10, 9);
    var b = '0x' + (a).toString(16);
    return b;
  }
  ,
  /**
   * gasLimit转换
   */
  gasLimit: function (e) {
    var b = '0x' + Number(e).toString(16);
    return b;
  },
  /**
   * 高级选项
   */
  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      switchs: e.detail.value
    })
  }
})