//index.js
//获取应用实例
var consts = require('../../constants/localConst.js')
var wallet = require('../../utils/wallet.js')
var tx = require('../../utils/transaction.js')
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        VHT: wx.getStorageSync(consts.VHT),
        ACT: wx.getStorageSync(consts.ACT),
        CPCE: wx.getStorageSync(consts.CPCE),
        Token: wx.getStorageSync(consts.Token)
        // allBalance: wx.getStorageSync(consts.allBalance)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.storage(consts.VHT, false)
        app.storage(consts.ACT, false)
        app.storage(consts.CPCE, false)
        this.setData({
            ethCH: wx.getStorageSync(consts.ethCH),
            ethBL: wx.getStorageSync(consts.ethBL),
            qtum: wx.getStorageSync(consts.qtumBL),
            cpc: wx.getStorageSync(consts.cpcBL),
            qtumCH: wx.getStorageSync(consts.qtumCH),
            cpcCH: wx.getStorageSync(consts.cpcCH),
            Token: wx.getStorageSync(consts.Token)

        })
        var walletList = wx.getStorageSync(consts.walletList) || [];
        if (walletList.length === 0) {
            this.setData({
                show: false
            })
        } else {
            this.setData({
                show: true
            })
        }
        var create = {
            url: "gethApi/getContractAddressList",
            data: '',
            method: "GET"
        }
        app.http(create).then((data) => {
            console.log(data);
            if (data.status === 0) {
                console.log(data.data);
                console.log(data.data.length);
                app.storage(consts.Token, data.data);
            } else {
                app.toastSuccess('创建失败!');
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onLaunch: function () {


    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            VHT: wx.getStorageSync(consts.VHT),
            ACT: wx.getStorageSync(consts.ACT),
            CPCE: wx.getStorageSync(consts.CPCE),
            ethCH: wx.getStorageSync(consts.ethCH),
            ethBL: wx.getStorageSync(consts.ethBL),
            qtum: wx.getStorageSync(consts.qtumBL),
            cpc: wx.getStorageSync(consts.cpcBL),
            qtumCH: wx.getStorageSync(consts.qtumCH),
            cpcCH: wx.getStorageSync(consts.cpcCH),
            Token: wx.getStorageSync(consts.Token)
        })
        this.setData({
            mywallet: wx.getStorageSync(consts.mywallet)

        })
        var walletList = wx.getStorageSync(consts.walletList) || [];
        if (walletList.length === 0) {
            this.setData({
                show: false
            })
        } else {
            this.setData({
                show: true
            })
        }
        this.Txlist()
        this.getBalance()
        var dataReport = wx.getSystemInfoSync();
        this.DataReport()
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
        console.log("下拉刷新")
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 500
        })
        this.getBalance();
        this.setData({
            ethCH: wx.getStorageSync(consts.ethCH),
            ethBL: wx.getStorageSync(consts.ethBL),
            qtum: wx.getStorageSync(consts.qtumBL),
            cpc: wx.getStorageSync(consts.cpcBL),
            qtumCH: wx.getStorageSync(consts.qtumCH),
            cpcCH: wx.getStorageSync(consts.cpcCH),
            Token: wx.getStorageSync(consts.Token)
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
     *   扫一扫
     */
    scan: function () {
        var walletList = wx.getStorageSync(consts.walletList) || [];
        if (walletList.length === 0) {
            var msg = {
                content: "您还没有钱包!",
                showCancel: false
            }
            app.Model(msg);
        } else {
            wx.scanCode({
                success: (res) => {
                    console.log(res)
                    wx.navigateTo({
                        url: 'transfer/transfer?address=' + res.result

                    })
                }
            })
        }

    },
    /**
     *   付款码
     */
    payCode: function () {
        var walletList = wx.getStorageSync(consts.walletList) || [];
        if (walletList.length === 0) {
            var msg = {
                content: "您还没有钱包!",
                showCancel: false
            }
            app.Model(msg);
        } else {
            var url = 'payCode/payCode';
            app.openURL(url);
        }

    },
    /**
     *   转账
     */
    transfer: function () {
        var url = 'transfer/transfer';
        app.openURL(url);
    },
    /**
     *   添加资产
     */
    asset: function () {
        var url = 'asset/asset';
        app.openURL(url);
    },
    /**
     *   进入钱包
     */
    wallet: function () {
        var url = 'wallet/wallet';
        app.openURL(url);
    },
    /**
     *   创建钱包
     */
    createWallet: function () {
        var url = 'createWallet/createWallet';
        app.openURL(url);
    },
    /**
     *   导入钱包
     */
    inputWallet: function () {
        var url = 'inputWallet/inputWallet';
        app.openURL(url);
    },
    /**
     *   获取所有币种的交易详情
     */
    Txlist: function () {

        tx.getETHinfo();
        // var qtum = {
        //   Tokenaddress: wx.getStorageSync(consts.Token)[0].value,
        //   key: consts.qtuminfo,
        //   key1: consts.Qtuminfo
        // }
        var cpc = {
            Tokenaddress: wx.getStorageSync(consts.Token)[0].value,
            key: consts.cpcinfo,
            key1: consts.Cpcinfo
        }

        tx.getTokeninfo(cpc)


    },
    /**
     *   交易详情
     */
    transactioninfo: function () {
        var len = wx.getStorageSync(consts.txinfo).length;
        if (len === 0) {
            var msg = {
                content: "您还没有交易记录!",
                showCancel: false
            }
            app.Model(msg);
        } else {
            var url = 'transaction/transaction'
            app.openURL(url);
        }
    },
    /**
     *   获取余额
     */
    getBalance: function () {
        var balance = {
            address: wx.getStorageSync(consts.mywallet).address,
        }
        wallet.getBalance(balance);
    },
    /**
     *   Qtum交易详情
     */
    qtumTrans: function () {
        var Address = wx.getStorageSync(consts.Token)[0].value;
        var tokenName = wx.getStorageSync(consts.Token)[0].name;
        var len = wx.getStorageSync(consts.qtuminfo).length;
        if (len === 0) {
            var msg = {
                content: "您还没有交易记录!",
                showCancel: false
            }
            app.Model(msg);
        } else {
            var url = 'transactionToken/transactionToken?tokenName=' + tokenName + '&tokenAddress=' + Address + '&tokenkey=' + consts.Qtuminfo;
            app.openURL(url);
        }
    },
    // /**
    //  *   VHT交易详情
    //  */
    // vhtTrans: function () {
    //   var Address = wx.getStorageSync(consts.Token)[0].value;
    //   var len = wx.getStorageSync(consts.vhtinfo).length;
    //   if (len === 0) {
    //     var msg = {
    //       content: "您还没有交易记录!",
    //       showCancel: false
    //     }
    //     app.Model(msg);
    //   } else {
    //     var url = 'transactionToken/transactionToken?tokenName=VHT&tokenAddress=' + Address + '&tokenkey=' + consts.Vhtinfo;
    //     app.openURL(url);
    //   }
    // },
    /**
     *   CPCE交易详情
     */
    cpcTrans: function () {
        var Address = wx.getStorageSync(consts.Token)[0].value;
        var tokenName = wx.getStorageSync(consts.Token)[0].name;
        var len = wx.getStorageSync(consts.cpcinfo).length;
        if (len === 0) {
            var msg = {
                content: "您还没有交易记录!",
                showCancel: false
            }
            app.Model(msg);
        } else {
            var url = 'transactionToken/transactionToken?tokenName=' + tokenName + '&tokenAddress=' + Address + '&tokenkey=' + consts.Cpcinfo;
            app.openURL(url);
        }
    },
    DataReport: function () {
        var _this = this;
        // wx.onNetworkStatusChange(function (res) {
        //     _this.setData({
        //         networkType: res.networkType
        //     })
        // });
        var dataReport = wx.getSystemInfoSync();
        app.getNetworkType().then((data) => {
            var networkType = data;
            _this.setData({
                networkType: data
            })
        })
            .then(() => app.getLocation())
            .then(data => _this.setData({
                latitude: data.latitude,
                longitude: data.longitude
            }))
            .then(() => app.userID())
            .then(data => _this.setData({
                userId: this.data.mywallet.address,
                imei: data,
            }))
            .then(() => {
                var DataReport = {
                    "runTime": new Date().Format("yyyy-MM-dd HH:mm:ss"),
                    "platformId": 1,
                    "platformName": "urtoken",
                    "appLanguage": dataReport.language,
                    "appVersion": app.globalData.appVersion,
                    "os": 1,
                    "osVersion": dataReport.system,
                    "phoneType": dataReport.model,
                    "screenWidth": dataReport.screenWidth,
                    "screenHeight": dataReport.screenHeight,
                    "networkType": _this.data.networkType,
                    "userId": _this.data.userId,
                    "latitude": _this.data.latitude,
                    "longitude": _this.data.longitude
                }
                var msg={
                    url:'log/create',
                    data:DataReport,
                    method:'POST'
                }
                app.Http(msg);
                console.log("0000000000000000", _this.data);

                console.log("dsgsgddsgshdfgfd", DataReport);
            })


        /*then(() => {
            app.getLocation().then((data) => {
                console.log('经纬度', data)
                _this.setData({
                    latitude: data.latitude,
                    longitude: data.longitude,
                })
            })
        }).then(()=> {
            app.userID().then((data) => {
                console.log('code', data);
                _this.setData({
                    userId: this.data.mywallet.address,
                    imei: data,
                })
            })
        }).then(() => {
            debugger;
            var DataReport = {
                "runTime": new Date().Format("yyyy-MM-dd HH:mm:ss"),
                "platformId": 1,
                "platformName": "urtoken",
                "appLanguage": dataReport.language,
                "appVersion": app.globalData.appVersion,
                "os": 1,
                "osVersion": dataReport.system,
                "phoneType": dataReport.model,
                "screenWidth": dataReport.screenWidth,
                "screenHeight": dataReport.screenHeight,
                "networkType": _this.data.networkType,
                "userId": _this.data.userId,
                "latitude": _this.data.latitude,
                "longitude": _this.data.longitude
            }
            console.log("0000000000000000",_this.data);

            console.log("dsgsgddsgshdfgfd", DataReport);

        });*/


    },


    // var url = 'transactionToken/transactionToken?tokenName=CPCE&tokenAddress=' + Address + '&tokenkey=' + consts.Cpceinfo;
    // app.openURL(url);
    // },


    // test:function(){
    //   // var url = 'createSuccess/createSuccess';
    //   var url = 'transfer/transferSuccess/transferSuccess';
    //   // app.openURL(url);
    //     var msg = {
    //         content: '钱包导入成功！',
    //         showCancel: false
    //     }
    //   app.Model(msg).then((data)=>{
    //     console.log('你的魔胎数据',data);
    //   })
})
