//app.js
App({
  /**
   * 页面的初始数据
   */
  globalData: {
    // asset: { ETH: '', MKR: '', DGD: '' }
      appVersion: "1.0.0"
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
      Date.prototype.Format = function (fmt) { //author: meizz
          var o = {
              "M+": this.getMonth() + 1, //月份
              "d+": this.getDate(), //日
              "H+": this.getHours(), //小时
              "m+": this.getMinutes(), //分
              "s+": this.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
      }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  /**
   * POST方法
   */
  http: function (msg) {
    return new Promise((resolve, reject) => {
      wx.request({
        // url: 'http://106.15.62.222:3000/' + msg.url,
        url: 'https://www.aethercoder.com:3000/' + msg.url,
        data: msg.data,
        header: { 'client-language': 'zh' },
        method: msg.method,
        success: function (res) {
          if (res.data.status === 0) resolve(res.data);
          else reject(res.data);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    })
  },
    /**
     * POST方法
     */
    Http: function (msg) {
        return new Promise((resolve, reject) => {
            wx.request({
            // url: 'http://106.15.62.222:3000/' + msg.url,
            url: 'https://www.aethercoder.com:3002/' + msg.url,
            data: msg.data,
            header: { 'client-language': 'zh' },
            method: msg.method,
            success: function (res) {
                if (res.data.status === 0) resolve(res.data);
                else reject(res.data);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    })
    },
    /**
     * 数据上报方法
     */
    data: function (msg) {
        return new Promise((resolve, reject) => {
            wx.request({
            // url: 'http://106.15.62.222:3000/' + msg.url,
            url:  msg,
            data: {
                "begin_date" : "20170820",
                "end_date" : "20170823"
            },

            method: "post",
            success: function (res) {
                if (res.data.status === 0) resolve(res.data);
                else reject(res.data);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    })
    },
  /**
   * toast成功的弹出框方法
   */
  toastSuccess: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500
    })
  },
  /**
   * toast加载的弹出框方法
   */
  toastLoading: function (msg) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 15000
    })
  },
  /**
   * 模态弹出框方法
   */
  Model: function (msg) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: msg.content,
        showCancel: msg.showCancel,
        confirmColor: "#3399ff",
        success: function (res) {
          resolve(res.confirm);
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },
  /**
   * 底部弹出框方法
   */
  actionSheet: function () {
    return new Promise((resolve,reject) => {
      wx.showActionSheet({
        itemList: ['显示在聊天顶部', '关于以太宝'],
        success: function (res) {
          resolve(res.tapIndex);
          console.log(res.tapIndex)
        },
        fail: function (res) {
          resolve(res.errMsg);
          console.log(res.errMsg)
        }
      })
    })
  },
  /**
  *   跳转页面
  */
  openURL: function (url) {
    wx.navigateTo({
      url: url
    })
  },
  homePage: function (url) {
      wx.switchTab({
          url: url
      })
  },
  /**
  *   本地存储
  */
  storage: function (key, value) {
    wx.setStorageSync(key, value);
    console.log(key);
  },
  /**
  *   获取本地数据
  */
  getStorage: function (msg) {
    return new Promise((resolve,reject) => {
      wx.getStorage({
        key: msg,
        success: function (res) {
          //console.log(res.data)
          resolve(res.data);
        }
      })
    })
  },
    /**
     *   获取网络类型
     */
    getNetworkType: function () {
        return new Promise((resolve, reject) => {
            wx.getNetworkType({
            success: function (res) {
                // 返回网络类型, 有效值：
                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                var networkType = res.networkType
                resolve(networkType);
            }
        })
    })
    },
    /**
     *   获取经纬度
     */
    getLocation: function () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                resolve(res);
            }
        })
    })
    },
    /**
     *   获取userID
     */
    userID:function(){
        return new Promise((resolve,reject)=>{
            wx.login({
            success: function(res) {
                if (res.code) {
                    resolve(res.code)
                    console.log(res);
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    })
    }
})

