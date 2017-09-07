var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytext:'my first test'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("执行onLoad")
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
      mywallet: wx.getStorageSync('mywallet')

    })
    var res = wx.getSystemInfoSync();
    console.log(res,'我是手机信息')
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
   * 帮助
   */
  help:function(){
    var url = 'help/help';
    app.openURL(url);
  },
  /**
   * 反馈
   */
  feedback: function () {
    var url = 'feedback/feedback';
    app.openURL(url);
  },
  /**
   * 设置
   */
  sets: function () {
    var url = 'set/set';
    app.openURL(url);
  },
  /**
   * 关于
   */
  about: function () {
    var url = 'about/about';
    app.openURL(url);
  }
})