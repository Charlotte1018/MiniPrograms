# urtoken_mini
urtoken小程序版本

# API List


## 1. Post /ethLightWallet/createV3

### API说明：创建钱包
### 输入参数
* password : 钱包密码
{
    "password": password
}
### example
* url:
post：106.15.62.222:3000/ethLightWallet/createV3

* input:

实际postData:
```
{
    "password":"1qaz2wsx"
}
```

* output:
```
{
    "status": 0,
    "data": {
        "strjson": "{\"version\":3,\"id\":\"eed9978d-ae99-4971-92d5-ee9ecd202301\",\"address\":\"6f3a1d4a8a4528e6d4e5cffed1d412f12a0ae647\",\"Crypto\":{\"ciphertext\":\"d8d0cb69f06d899ecb11bc4995ff6e0efabff102191635dc2191715884c295cc\",\"cipherparams\":{\"iv\":\"07dab2017e94da5e792a0e44b1b943dd\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"438885ed8fa5c4fecdd143fb8047e1e0f1e0b07381bc4edde79426691e677697\",\"n\":1024,\"r\":8,\"p\":1},\"mac\":\"bffac0c4350a16d2f93a194fb4d5c9523ce4157991101ebe4946fc6d609e5ce6\"}}",
        "address": "0x6f3a1d4a8a4528e6d4e5cffed1d412f12a0ae647"
    }
}
```

## 2. Get /gethApi/getContractAddressList
### API说明：获得合约地址列表，列在里面的都是已经发行代币的合约地址。
### example:
* input:
http://localhost:3000/gethApi/getContractAddressList
* output:
```
{
    "status": 0,
    "data": [
        {
            "name": "VHT",
            "value": "0x046A6FF757C8EdAA91Dd886Df8B60C217d99f11b"
        },
        {
            "name": "ACT",
            "value": "0x3B95634cc0321fB9B20Ba685eB36da5c7603D1cf"
        },
        {
            "name": "CPCETest",
            "value": "0x170504305f79E5373981c3F8abd0248f6a4b513B"
        }
    ]
}
```

## 3. Post /gethAPI/getBalanceAndPrice/:walletAddress

### API说明：获取某个账户的以太币余额和其他合约的余额
### 输入参数
* :id: 钱包地址
* postData : 合约地址
{
    "data": [address1, address2, ...]
}
### example
* url:
post：106.15.62.222:3000/gethAPI/getBalanceAndPrice/0xD8eDe3cc3c0B43b90E35891619Cb65573c92AFd9

* input:

注意点：
1. url中的walletAddress是钱包地址
2. data中的address是合约地址

实际postData:
```
{
	"data":["0x046A6FF757C8EdAA91Dd886Df8B60C217d99f11b", "0x3B95634cc0321fB9B20Ba685eB36da5c7603D1cf", "0x170504305f79E5373981c3F8abd0248f6a4b513B"]
}
```

* output:
```
{
    "status": 0,
    "data": [
        {
            "name": "balance",
            "valueInEth": "0.088682731",
            "ethPrice": "1393.51"
        },
        {
            "name": "0x046A6FF757C8EdAA91Dd886Df8B60C217d99f11b",
            "value": "12.5",
            "price": 0
        },
        {
            "name": "0x3B95634cc0321fB9B20Ba685eB36da5c7603D1cf",
            "value": "67",
            "price": 0
        },
        {
            "name": "0x170504305f79E5373981c3F8abd0248f6a4b513B",
            "value": "0",
            "price": 0
        }
    ]
}
```

## 4. Post /ethLightWallet/sendTx

### API说明：转移ether币
### example
106.15.62.222:3000/ethLightWallet/sendTx

* url: 
post: 106.15.62.222:3000/ethLightWallet/sendTx

* inputData:
```
{
    "chainId": 1,
    "pKey": "your own private key",
    "gasPrice": "0x04e3b29200",
    "data": "",
    "to": "0xd8ede3cc3c0b43b90e35891619cb65573c92afd9",
    "value": "0x5af3107a4000",
    "from": "0x6c2908e55f568e0aca2cf4aee2e2a5f6c3a57736",
    "gasLimit": "0x5208"
}
```

* outputData:

```
{
    "status": 0,
    "data": {
        "serializedTx": "0xf86a088504e3b2920082520894d8ede3cc3c0b43b90e35891619cb65573c92afd9865af3107a40008025a08d25d1101e96ebb8d29484eb7e5c5691af63f44917215118ece2524a15a4e3a6a05bc55d6799125e062b80f52f9861a7749771990458d0cf9c8e599856214f3b78",
        "hash": "0xa994985d8826f4a07a953c37af0ac8a429a4b12ff88044338f0d260163536914"
    }
}
```

## 5. Post /ethLightWallet/sendTokenTx

### API说明：转移token
### example
* url:
post：106.15.62.222:3000/ethLightWallet/sendTokenTx

* input:

注意点：
1. "to": 这里是合约地址，而不是sendTx中的目标用户
2. 原来sendTx中的to(目标账号)，在data.toToken中
3. 转移代币这个功能中，value必须为空，而需要转移的代币数量由data.value. 此处不需要乘以10的18次方。输入1，即转移1个代币，输入100即转移100代币。

实际postData:
```
{
    "gasPrice": "0x04e3b29200",
    "gasLimit": "0xffff",
    "to": "0x3B95634cc0321fB9B20Ba685eB36da5c7603D1cf",  
    "value": "",
    "data": {
    	"toToken": "0x43F993249652952349793f0C7B1129119609Fa57",
		"value": "1"
    },
    "chainId": 1,
    "pKey": "975061b46346b866d1018cd5cd5088fca76a8f29e5c46b9afd3d730b57069867",
    "from": "0xd8ede3cc3c0b43b90e35891619cb65573c92afd9"
}
```

* output:
```
{
    "status": 0,
        "data": {
            "serializedTx": "0xf8a9168504e3b2920082ffff943b95634cc0321fb9b20ba685eb36da5c7603d1cf80b844a9059cbb00000000000000000000000043f993249652952349793f0c7b1129119609fa570000000000000000000000000000000000000000000000000de0b6b3a764000026a091748d55326fb5b29b10494fe472d743449c1704b1a7cd2c0abd7e616c08ecf6a05eab50751c508ef53204cfd50a23a6b90a2647f748470f41cc8ff5f28e79ff0a",
            "hash": "0x46de8d2ee36c721a381089f9adb5d18a0f95860423e23190d1c4ecc16e463b17"
        }
}
```












