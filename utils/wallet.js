var consts = require('../constants/localConst.js')
var app = getApp();

function createWallet(msg) {
  console.log(msg);
  var name = msg.name;
  var ok = msg.ok;
  var copy = msg.copy;
  app.http(msg.data).then((data) => {
    console.log(data);
    if (data.status === 0) {
      console.log(ok, copy);
      var walletList = wx.getStorageSync(consts.walletList) || [];
      var address = {
        address: data.data.address
      }
      if (walletList.length === 0) {
        var list = {
          name: name,
          ok: true,
          copy: copy,
          wallet: data.data
        }
        walletList.push(list);
        getBalance(address);
        console.log(walletList);
        app.storage(consts.walletList, walletList);
        app.storage(consts.mywallet, {
          'address': address.address,
          'name': name,
          'strjson': data.data.strjson
        })
        app.openURL("../createSuccess/createSuccess?address=" + data.data.address);
      } else {
        var list = {
          name: name,
          ok: ok,
          copy: copy,
          wallet: data.data
        }
        console.log("list", list);
        walletList.push(list);
        console.log(walletList);
        app.storage(consts.walletList, walletList);
        app.openURL("../createSuccess/createSuccess?address=" + data.data.address + "&strjson=" + data.data.strjson);
      }

    }
    else {
      app.toastSuccess('创建失败!');
    }
  })
}
//导入钱包
function importCashStore (msg) {
    console.log(msg);
    var name = msg.name;
    var keystore = msg.data.data.strjson;
    var ok = msg.ok;
    var copy = msg.copy;
    var beforepush = 0;
    var afterpush = 0;
    app.http(msg.data).then((data) => {
        console.log(data);
        if(data.status === 0){
            var walletList = wx.getStorageSync(consts.walletList) || [];
            if(walletList.length === 0){
                var address = {
                    address: data.data.wallet.address
                }
                var list = {
                    name: name,
                    ok: true,
                    copy: copy,
                    wallet: {
                        'strjson': keystore,
                        'address': data.data.wallet.address
                    }
                }
                walletList.push(list);
                getBalance(address);
                app.storage(consts.walletList, walletList);
                app.storage(consts.mywallet, {
                    'address': address.address,
                    'name': name,
                    'strjson': keystore
                })
                var msg = {
                    content: '钱包导入成功！',
                    showCancel: false
                }
                app.Model(msg).then((data)=>{
                    console.log(data);
                    app.openURL("../createSuccess/createSuccess?change="+true);
            });
            }else{
                var list = {
                    name: name,
                    ok: ok,
                    copy: copy,
                    wallet: {
                        'strjson': keystore,
                        'address': data.data.wallet.address
                    }
                }
                walletList.push(list);
                beforepush = walletList.length;
                var newList = uniqueTwo(walletList);
                afterpush = newList.length;
                if(beforepush !== afterpush){
                     var msg = {
                        content: "对不起，您已经导入过该钱包!",
                        showCancel: false
                    }
                    app.Model(msg);
                }else{
                    app.storage(consts.walletList,newList);
                    var msg = {
                        content: "导入钱包成功！",
                        showCancel: false
                    }
                    app.Model(msg).then((data)=>{
                        console.log(data);
                        app.openURL("../createSuccess/createSuccess?change="+true);
                    })
                }
            }
        }else{
            alert(1);
        }
    },(reject) => {
        var content = reject.message;
        var msg = {
            content: content,
            showCancel: false
        }
        app.Model(msg);
    })
}

function importMemory (msg) {
    var name= msg.name;
    var ok = msg.ok;
    var copy = msg.copy;
    var beforepush = 0;
    var afterpush = 0;
    app.http(msg.data).then((data) => {
        if(data.status ===0){
            var walletList = wx.getStorageSync(consts.walletList) || [];
            if(walletList.length === 0){
                var address = {
                    address: data.data.wallet.address
                }
                var list = {
                    name: name,
                    ok: true,
                    copy: copy,
                    wallet: {
                        'strjson' :data.data.strjson,
                        'address' :address.address
                    }
                }
                walletList.push(list);
                getBalance(address);
                app.storage(consts.walletList, walletList);
                app.storage(consts.mywallet, {
                    'address': address.address,
                    'name': name,
                    'strjson': data.data.strjson
                })
            }else{
                var list = {
                    name: name,
                    ok: ok,
                    copy: copy,
                    wallet: {
                        'strjson': data.data.strjson,
                        'address': data.data.wallet.address
                    }
                }
                walletList.push(list);
                beforepush = walletList.length;
                var newlist = uniqueThree(walletList);
                afterpush = newlist.length;
                if(beforepush !== afterpush){
                    var msg ={
                        content: "您已经导入过这个钱包！",
                        showCancel: false
                    }
                    app.Model(msg);
                }else{
                    console.log('导入成功');
                }
                app.storage(consts.walletList, newlist);
            }
    }
    },(reject) => {
        var content = reject.message;
        var msg = {
            content: content,
            showCancel: false
        }
        app.Model(msg);
    })
}


function importPrivateKey (msg) {
    var name = msg.name;
    var ok = msg.ok;
    var copy = msg.copy;
    var beforepush = 0;
    var afterpush = 0;
    app.http(msg.data).then((data) => {
        if(data.status ===0){
        var walletList = wx.getStorageSync(consts.walletList) || [];
        if(walletList.length ===0){
            var address = {
                address: data.data.address
            }
            var list = {
                name: name,
                ok: true,
                copy: copy,
                wallet: {
                    'strjson': data.data.strjson,
                    'address': data.data.address
                }
            }
            walletList.push(list);
            getBalance(address);
            app.storage(consts.walletList, walletList);
            app.storage(consts.mywallet, {
                'address': address.address,
                'name': name,
                'strjson': data.data.strjson
            })
        }else{
            var list = {
                name: name,
                ok: ok,
                copy: copy,
                wallet: {
                    'strjson': data.data.strjson,
                    'address': data.data.address
                }
            }
            walletList.push(list);
            beforepush = walletList.length;
            console.log(beforepush);
            var newList = uniqueThree(walletList);
            afterpush = newList.length;
            console.log(newList.length);
            if(beforepush !== afterpush){
                var msg = {
                    content: "对不起，您已经导入过该钱包!",
                    showCancel: false
                }
                app.Model(msg);
            }else{
                console.log(66666);
            }
            app.storage(consts.walletList,newList);
        }
    }
    },(reject) => {
        var content = reject.message;
        var msg = {
            content: content,
            showCancel: false
        }
        app.Model(msg)
    })
}


//数组去重方法：
function uniqueTwo(arr) {
    var res = [];
    var json ={};
    for(var j = 0;j<arr.length;j++){
        if(!json[arr[j].wallet.strjson]){
            res.push(arr[j]);
            json[arr[j].wallet.strjson] = 1;
        }
    }
    return res;
}

function uniqueThree(arr) {
    var res = [];
    var json ={};
    for(var j = 0;j<arr.length;j++){
        if(!json[arr[j].wallet.address]){
            res.push(arr[j]);
            json[arr[j].wallet.address] = 1;
        }
    }
    return res;
}


//获取余额
function getBalance(msg) {
  var Token = wx.getStorageSync('Token');
  var token = [];
  for (var i = 0; i < 1; i++) {
    token.push(Token[i].value)
  }
  console.log(token);
  //以太币
  var eth = {
    url: 'gethApi/getBalance/' + msg.address,
    data: '',
    method: 'GET'
  }
  var price = {
    url: 'gethApi/ethPrice',
    data: '',
    method: 'GET'
  }
  var p1 = app.http(eth);
  var p2 = app.http(price);
  Promise.all([p1, p2]).then((data) => {

    console.log(data);
    var ethBL = data[0].data.valueInEth;
    var price = data[1].data.value;
    var ethCH = ethBL * price;
    app.storage(consts.ethCH, ethCH)
    app.storage(consts.ethBL, ethBL)
  })
  //代币
  getTokenbalance(msg.address)
  //所有信息一起获取
  var info = {
    url: 'gethAPI/getBalanceAndPrice/' + msg.address,
    data: { "data": token },
    method: 'POST'
  }
  app.http(info).then((data) => {
    console.log(data);
    var eth = data.data[0];
    var qtum = data.data[1];
    var cpc = data.data[1];
    var ethBL = eth.value;
    var ethCH = eth.price * eth.value;
    var qtumCH = qtum.value * qtum.price;
    var cpcCH = cpc.value * cpc.price;
    // app.storage(consts.qtumCH, qtumCH)
    app.storage(consts.cpcCH, cpcCH)
    app.storage(consts.mywalletinfo, data.data)
  })


}

function getTokenbalance(address){
  // var qtum = wx.getStorageSync(consts.Token)[0].value;
  var cpc = wx.getStorageSync(consts.Token)[0].value;
  // var cpce = wx.getStorageSync(consts.Token)[2].value;
  var token1={
    url: 'gethApi/getTokens/' + address,
    data: { "contractAddress": cpc },
    method: 'POST'
  }
  app.http(token1).then((data)=>{
    console.log(data);
    app.storage(consts.cpcBL, data.data)
  })
  // var token2 = {
  //   url: 'gethApi/getTokens/' + address,
  //   data: { "contractAddress": cpc },
  //   method: 'POST'
  // }
  // app.http(token2).then((data) => {
  //   console.log(data);
  //   app.storage(consts.cpcBL, data.data)
  // })
  // var token3 = {
  //   url: 'gethApi/getTokens/' + address,
  //   data: { "contractAddress": cpce },
  //   method: 'POST'
  // }
  // app.http(token3).then((data) => {
  //   console.log(data);
  //   app.storage(consts.cpceBL, data.data)
  // })
}
module.exports.createWallet = createWallet
module.exports.getBalance = getBalance
module.exports.importCashStore = importCashStore
module.exports.importPrivateKey = importPrivateKey
module.exports.importMemory = importMemory