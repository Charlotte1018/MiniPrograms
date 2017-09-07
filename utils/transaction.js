var consts = require('../constants/localConst.js')
var app = getApp();

function getETHinfo(msg) {
  var msg = {
    url: 'gethApi/getTrasactionList/' + wx.getStorageSync(consts.mywallet).address + '?page=1&limit=3',
    // url: 'gethApi/getTrasactionList/' + wx.getStorageSync(consts.mywallet).address,    
    data: '',
    method: 'GET'
  }
  app.http(msg).then((data) => {
    console.log(data);

    var txinfo = data.data;
    app.storage(consts.txinfo, data.data);
    update(txinfo, consts.Txinfo)
  }, (reject) => {
    console.log(reject);
  });
}

function getTokeninfo(msg) {
  var msgs = {
    url: 'gethApi/getTokenTransferList?contractAddress=' + msg.Tokenaddress + '&address=' + wx.getStorageSync(consts.mywallet).address + '&page=1&limit=3',
    data: '',
    method: 'GET'
  }
  app.http(msgs).then((data) => {
    console.log(data);

    var tokeninfo = data.data;

    app.storage(msg.key, data.data);
    updateToken(tokeninfo, msg.key1)
  }, (reject) => {
    console.log(reject);
  });
}

/**
   * 修改交易详情
   */
function update(msg, key) {
  var tx = msg;
  var len = tx.length;
  var that = this;
  console.log('当前交易的数量:', len)
  if (len === 0) {
    app.storage(key, tx);
  } else {
    var date = new Date().getTime();
    console.log(date);
    var my = wx.getStorageSync(consts.mywallet).address;
    tx.forEach(function (v, k) {
      if (my == v.from) {
        // tx[k].value = '-' + v.value * Math.pow(10, -18);
        // tx[k].value = '-' + accMul(v.value,0.000000000000000001);
        tx[k].value = '-' + v.value;
        tx[k].icon = true;
      } else {
        // tx[k].value = '+' + v.value * Math.pow(10, -18);
        tx[k].value = '+' + v.value;
        // tx[k].value = accMul( 0.0005, 0.000000000000000001);
        tx[k].icon = false;
      }
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
    app.storage(key, tx);
  }
}


/**
   * 修改代币交易详情
   */
function updateToken(msg, key) {
  var tx = msg;
  var len = tx.length;
  var that = this;
  console.log('当前交易的数量:', len)
  if (len === 0) {
    app.storage(key, tx);
  } else {
    var date = new Date().getTime();
    console.log(date);
    var my = wx.getStorageSync(consts.mywallet).address;
    tx.forEach(function (v, k) {
      if (my == v.from) {
        tx[k].number = '-' + v.number;
        tx[k].icon = true;
      } else {
        tx[k].number = '+' + v.number;
        tx[k].icon = false;
      }
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
    app.storage(key, tx);
  }
}

/**
   * 修改精度
   */
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
}


module.exports.getETHinfo = getETHinfo
module.exports.getTokeninfo = getTokeninfo
module.exports.update = update