// inputWallet.js
var app = getApp();
var consts = require('../../../constants/localConst.js')
var wallet = require('../../../utils/wallet.js')
Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      array: ["m/44'/60'/0'/0/0","m/44'/60'/0'/0","m/44'/60'/1'/0/0"],
      index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
    this.setData({
      null:''
    })
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {

  },
  submit: function (e) {
      let keystore = e.detail.value.keystore;
      let password = e.detail.value.password;
      console.log(password);
      if(keystore ==''){
          var msg = {
              content: "请输入钱包地址!",
              showCancel: false
          }
          app.Model(msg);
      }
      if(password ==''){
          var msg = {
              content: "请输入密码!",
              showCancel: false
          }
          app.Model(msg);
      }
      if(password ==''&&keystore == ''){
          var msg ={
              content: "请填写钱包地址和密码",
              showCancel: false
          }
          app.Model(msg);
      }
      if(!password ==''&&!keystore ==''){
          var imports = {
              name:new Date(),
              ok: false,
              copy: true,
              data: {
                  url: 'ethLightWallet/importWallet',
                  data: {
                      "password": password,
                      "strjson": keystore
                  },
                  method: 'POST'
              }
          }
          wallet.importCashStore(imports);
      }
    },
    import: function (e) {
      app.openURL('../../static/import/import');
    },
  submit_two: function (e) {
      let memory = e.detail.value.memory;
      let token = parseInt(e .detail.value.token);
      let path = this.data.array[token];
      let password = e.detail.value.password;
      let confirm = e.detail.value.confirm;
      console.log(path);
      if(memory === ''){
          var msg = {
              content: '请输入助记词！',
              showCancel: false
          }
          app.Model(msg);
      }else{
          if(confirm === password ){
              if(password === ''){
                  var msg = {
                      content: '请输入密码！',
                      showCancel: false
                  }
                  app.Model(msg);
              }else{
                  var memoryImport = {
                      name: new Date(),
                      ok: false,
                      copy: true,
                      data: {
                          url: 'ethLightWallet/importWalletFromSeed',
                          data: {
                              "seed": memory,
                              "path": path,
                              "password": password
                          },
                          method: "POST"
                      }
                  }
                  wallet.importMemory(memoryImport);
              }
          }else{
              var msg = {
                  content: '请重新确认密码!',
                  showCancel: false
              }
              app.Model(msg);
          }
      }
  },
  submit_three: function (e) {
        let private_key = e.detail.value.private_key;
        let password = e.detail.value.password;
        let confirm = e.detail.value.confirm;
        if(private_key == ''){
            var msg = {
                content: '请输入私钥！',
                showCancel: false
            }
            app.Model(msg);
        }else{
            if(confirm === password){
                if(password === ''){
                    var msg = {
                        content: '请输入密码！',
                        showCancel: false
                    }
                    app.Model(msg);
                }else{
                    var keyprivate = {
                        name: new Date(),
                        ok: false,
                        copy: true,
                        data: {
                            url: 'ethLightWallet/exportKeystore',
                            data: {
                                "key": private_key,
                                "password": password
                            },
                            method: 'POST'
                        }
                    }
                    wallet.importPrivateKey(keyprivate);
                    console.log('钱包导入成功！')
                }
            }else{
                var msg = {
                    content: '两次密码输入不一致！请重新确认密码！',
                    showCancel: false
                }
                app.Model(msg);

            }
        }
    },
  // submit_four: function () {
  //
  //   },
  reset: function () {
      console.log('form发生了reset事件')
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
  onShareAppMessage: function () {
  
  },
  onLoad: function() {
      var that = this;
      wx.getSystemInfo( {
          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }

      });
  },
  swichNav: function( e ) {
        console.log(e);

        var that = this;
        if( this.data.currentTab === e.currentTarget.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.currentTarget.dataset.current
            })
        }
    }
})

