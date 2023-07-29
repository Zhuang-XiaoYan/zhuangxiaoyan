---
lang: zh-CN
sidebarDepth: 2
---

# Vue-Mall-Front服务接口文档

## 一、接口公共参数设置

### 1.1代理服务器地址
```js
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        proxy: {
            '/api': {
                //vue-mall 后端服务地址
                target: "http://sph-h5-api.atguigu.cn",
                ws:true,
                changeOrigin:true,
            },
        },
    },
    productionSourceMap: false,
})
```

### 1.2公共请求参数

|参数名称 | 类型  |  是否必选  | 描述 |
|:---: | :---:| :---:|:-----:|
|token|	String	|Y	|登录的token|
|userTempId|	String(通过uuidjs生成)|	Y	|未登陆用户生成的临时ID|

每个接口需要的Header参数值（登录接口不需要)例如：
- token: d90aa16f24d04c7d882051412f9ec45b   后台生成
- userTempId: b2f79046-7ee6-4dbf-88d0-725b1045460b 前台生成

## 二、级分类接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/product/getBaseCategoryList| 	GET	 |  无	  | 如下 |

```json
{
  "code": 200,
  "message": "成功",
  "data": [
    {
      "categoryChild": [
        {
          "categoryChild": [
            {
              "categoryName": "电子书",
              "categoryId": 1
            }
          ],
          "categoryName": "电子书刊",
          "categoryId": 1
        }
      ],
      "categoryName": "图书、音像、电子书刊",
      "categoryId": 1
    }
  ],
  "ok": true
}
```

## 三、搜索商品接口

|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/list| 	POST	 | 如下	  | 如下 |

请求参数说明

|参数名称 | 参数类型  | 是否必选 |  描述  |
|:---: |:-----:|:----:|:----:|
|category1Id| 	string	 |  N	  | 一级分类ID |
|category2Id| 	string	 |  N	  | 二级分类ID |
|category3Id| 	string	 |  N	  | 三级分类ID	 |
|categoryName| 	string	 |  N	  | 分类名称 |
|keyword| 	string	 |  N	  | 搜索关键字 |
|props| 	Array	 |  N	  | 商品属性的数组: ["属性ID:属性值:属性名"] |

请求参数示例
```json
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
```

返回参数示例
```json
{
    "code": 200,
    "message": "成功",
    "data": {
        "trademarkList": [
            {
                "tmId": 1,
                "tmName": "苹果"
            }
        ],
        "attrsList": [
            {
                "attrId": 1,
                "attrValueList": [
                    "4500-11999",
                    "2800-4499"
                ],
                "attrName": "价格"
            }
        ],
        "goodsList": [
            {
                "id": 2,
                "defaultImg": "http://192.168.200.128:8080/xxx.jpg",
                "title": "Apple iPhone 11 (A2223)",
                "price": 5499,
                "createTime": null,
                "tmId": null,
                "tmName": null,
                "category1Id": null,
                "category1Name": null,
                "category2Id": null,
                "category2Name": null,
                "category3Id": null,
                "category3Name": null,
                "hotScore": 0,
                "attrs": null
            }
        ],
        "total": 8,
        "pageSize": 2,
        "pageNo": 1,
        "totalPages": 4
    },
    "ok": true
}
```

## 四、获取商品详情接口

|请求地址 | 请求方式  |      请求参数      | 返回示例 |
|:---: |:-----:|:--------------:|:----:|
|/api/item/{skuId}| 	GET	 | skuId(string)	 | 如下 |

请求参数说明

|参数名称 | 参数类型  | 是否必选 |  描述  |
|:---: |:-----:|:----:|:----:|
|skuId| 	string	 |  Y	  | 商品ID |


请求参数示例
```text
http://sph-h5-api.atguigu.cn/api/item/13
```

参数返回实例
```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "valuesSkuJson": "{\"3|5|7\":6,\"3|4|7\":2,\"2|4|7\":3,\"1|5|7\":5,\"1|4|7\":1,\"2|5|7\":4}",
    "price": 5499,
    "categoryView": {
      "id": 61,
      "category1Id": 2,
      "category1Name": "手机",
      "category2Id": 13,
      "category2Name": "手机通讯",
      "category3Id": 61,
      "category3Name": "手机"
    },
    "spuSaleAttrList": [
      {
        "id": 1,
        "spuId": 1,
        "baseSaleAttrId": 1,
        "saleAttrName": "选择颜色",
        "spuSaleAttrValueList": [
          {
            "id": 1,
            "spuId": 1,
            "baseSaleAttrId": 1,
            "saleAttrValueName": "黑色",
            "saleAttrName": "选择颜色",
            "isChecked": "0"
          }
        ]
      },
      {
        "id": 2,
        "spuId": 1,
        "baseSaleAttrId": 2,
        "saleAttrName": "选择版本",
        "spuSaleAttrValueList": [
          {
            "id": 4,
            "spuId": 1,
            "baseSaleAttrId": 2,
            "saleAttrValueName": "64GB",
            "saleAttrName": "选择版本",
            "isChecked": "1"
          }
        ]
      },
      {
        "id": 3,
        "spuId": 1,
        "baseSaleAttrId": 3,
        "saleAttrName": "选择套装",
        "spuSaleAttrValueList": [
          {
            "id": 7,
            "spuId": 1,
            "baseSaleAttrId": 3,
            "saleAttrValueName": " 官方标配",
            "saleAttrName": "选择套装",
            "isChecked": "1"
          }
        ]
      }
    ],
    "skuInfo": {
      "id": 2,
      "spuId": 1,
      "price": 5499,
      "skuName": "Apple iPhone 11 (A2223) 64GB 红色 移动联通电信双卡双待",
      "skuDesc": "主体\n入网型号\nA2223\n品牌\nApple\n产品名称\niPhone 11\n上市年份\n2019年\n上市月份\n9月\n基本信息\n机身颜色\n红色\n机身长度（mm）\n150.9\n机身重量（g）\n194\n机身材质工艺\n以官网信息为准\n机身宽度（mm）\n75.7\n机身材质分类\n玻璃后盖\n机身厚度（mm）\n8.3\n运营商标志或内容\n无",
      "weight": "0.47",
      "tmId": 1,
      "category3Id": 61,
      "skuDefaultImg": "http://192.168.200.128:8080/xxxx.jpg",
      "isSale": 1,
      "skuImageList": [
        {
          "id": 6,
          "skuId": 2,
          "imgName": "63e862164165f483.jpg",
          "imgUrl": "http://192.168.200.128:8080/group1/M00/00/00/wKjIgF42RLOAd5YSAANTQTjaVjQ819.jpg",
          "spuImgId": 2,
          "isDefault": "0"
        }
      ],
      "skuAttrValueList": [
        {
          "id": 6,
          "attrId": 1,
          "valueId": 6,
          "skuId": 2
        }
      ],
      "skuSaleAttrValueList": null
    }
  },
  "ok": true
}
```

## 五、获取购物车列表接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/cart/cartlist| 	GET	 |  无   | 如下 |

参数返回实例

```json
{
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": 61,
      "userId": "2",
      "skuId": 4,
      "cartPrice": 5999,
      "skuNum": 4,
      "imgUrl": "http://192.168.200.128:8080xxx.jpg",
      "skuName": "Apple iPhone 11 (A2223) ",
      "isChecked": 1,
      "skuPrice": 5999
    },
    {
      "id": 62,
      "userId": "2",
      "skuId": 2,
      "cartPrice": 5499,
      "skuNum": 1,
      "imgUrl": "http://192.168.200.128:8080/yyyy.jpg",
      "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
      "isChecked": 0,
      "skuPrice": 5499
    }
  ],
  "ok": true
}
```

## 六、添加到购物车接口
|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/cart/addToCart/{skuId}/{skuNum}| 	POST	 | 如下	  | 如下 |

请求参数说明

|参数名称 | 参数类型  | 是否必选 |  描述  |
|:---: |:-----:|:----:|:----:|
|skuId| 	string	 |  Y	  | 商品Id |
|skuNum| 	string	 |  Y	  | 商品数量 |


```text
// 增加商品数量
http://sph-h5-api.atguigu.cn/api/cart/addToCart/3/4
// 减少商品数量
http://sph-h5-api.atguigu.cn/api/cart/addToCart/3/-2
```

返回参数示例
```json
{
  "code": 200,
  "message": "成功",
  "data": null,
  "ok": true
}
```

## 七、切换商品选中状态接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/cart/checkCart/{skuId}/{isChecked}| 	GET	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |        描述         |
|:---: |:-----:|:----:|:-----------------:|
|skuId| 	string	 |  Y	  |       商品Id        |
|isChecked| 	string	 |  Y	  | 是否被选中0 代表曲线，1代表选中 |

返回参数示例
```json
{
  "code": 200,
  "message": "成功",
  "data": null,
  "ok": true
}
```

## 八、删除购物车商品接口
|请求地址 |   请求方式   | 请求参数 | 返回示例 |
|:---: |:--------:|:----:|:----:|
|/api/cart/deleteCart/{skudId}| 	DELETE	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |        描述         |
|:---: |:-----:|:----:|:-----------------:|
|skuId| 	string	 |  Y	  |       商品Id        |

返回参数示例
```json
{
  "code": 200,
  "message": "成功",
  "data": null,
  "ok": true
}
```

## 九、获取订单交易页信息接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/order/auth/trade| 	GET	 |  无	  | 如下 |

返回参数示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "totalAmount": 23996,
    "userAddressList": [
      {
        "id": 2,
        "userAddress": "北京市昌平区2",
        "userId": 2,
        "consignee": "admin",
        "phoneNum": "15011111111",
        "isDefault": "1"
      }
    ],
    "tradeNo": "1b23c1efc8144bfc83e51807f4e71d3a",
    "totalNum": 1,
    "detailArrayList": [
      {
        "id": null,
        "orderId": null,
        "skuId": 4,
        "skuName": "Apple iPhone 11 移动联通电信4G手机 双卡双待",
        "imgUrl": "http://192.168.200.128:8080/RLOAElEmAATrIT-1J9Q110.jpg",
        "orderPrice": 5999,
        "skuNum": 4,
        "hasStock": null
      }
    ]
  },
  "ok": true
}
```

## 十、获取我的订单列表接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/order/auth/{page}/{limit}| 	GET	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |    描述    |
|:---: |:-----:|:----:|:--------:|
|page| 	string	 |  Y	  |    页码    |
|limit| 	string	 |  Y	  | 每一页显示的数量 |

返回参数示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "records": [
      {
        "id": 70,
        "consignee": "admin",
        "consigneeTel": "15011111111",
        "totalAmount": 29495,
        "orderStatus": "UNPAID",
        "userId": 2,
        "paymentWay": "ONLINE",
        "deliveryAddress": "北京市昌平区2",
        "orderComment": "",
        "outTradeNo": "ATGUIGU1584247289311481",
        "tradeBody": "Apple iPhone 11 (A2223) 128GB手机 双卡双待 A",
        "createTime": "2020-03-15 12:41:29",
        "expireTime": "2020-03-16 12:41:29",
        "processStatus": "UNPAID",
        "trackingNo": null,
        "parentOrderId": null,
        "imgUrl": null,
        "orderDetailList": [
          {
            "id": 81,
            "orderId": 70,
            "skuId": 2,
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
            "imgUrl": "http://192.168.200.128:8080/xxx.jpg",
            "orderPrice": 5499,
            "skuNum": 1,
            "hasStock": null
          }
        ],
        "orderStatusName": "未支付",
        "wareId": null
      }
    ],
    "total": 41,
    "size": 2,
    "current": 1,
    "pages": 21
  },
  "ok": true
}
```

## 十一、提交订单接口

|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/order/auth/submitOrder?tradeNo={tradeNo}| 	POST	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |    描述    |
|:---: |:-----:|:----:|:--------:|
|traderNo| 	string	 |  Y	  |    交易编号(拼接在路径中)    |
|consignee| 	string	 |  Y	  | 收件人姓名 |
|consigneeTel| 	string	 |  Y	  | 收件人电话 |
|deliveryAddress| 	string	 |  Y	  | 收件地址 |
|paymentWay| 	string	 |  Y	  | 支付方式(ONLINE代表在线) |
|orderComment| 	string	 |  Y	  | 订单备注 |
|orderDetailList| 	string	 |  Y	  | 存储多个商品对象的数组 |

请求参数示例

```json
{
  "consignee": "admin",
  "consigneeTel": "15011111111",
  "deliveryAddress": "北京市昌平区2",
  "paymentWay": "ONLINE",
  "orderComment": "xxx",
  "orderDetailList": [
    {
      "id": null,
      "orderId": null,
      "skuId": 6,
      "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",
      "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",
      "orderPrice": 4343,
      "skuNum": 2,
      "hasStock": null
    },
    {
      "id": null,
      "orderId": null,
      "skuId": 4,
      "skuName": "Apple iPhone 11 (A2223) 128GB 红色",
      "imgUrl": "http://182.92.128.115:80800/rBFUDF6VzaeANzIOAAL1X4gVWEE035.png",
      "orderPrice": 5999,
      "skuNum": 1,
      "hasStock": null
    }
  ]
}
```

返回参数示例
```json
{
  "code": 200,
  "message": "成功",
  "data": "SN1234251353",
  "ok": true
}
```

## 十二、获取订单支付信息接口
|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/payment/weixin/createnative/{orderId}| 	GET	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |  描述   |
|:---: |:-----:|:----:|:-----:|
|orderId| 	string	 |  Y	  | 支付订单号 |

返回参数示例
```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
    "orderId": 71,
    "totalFee": 23996,
    "resultCode": "SUCCESS"
  },
  "ok": true
}
```

## 十三、查询支付订单状态接口
|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/payment/weixin/queryPayStatus/{orderId}| 	GTET	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |  描述   |
|:---: |:-----:|:----:|:-----:|
|orderId| 	string	 |  Y	  | 支付订单号 |

返回参数示例
```json
{
  "code": 205,
  "message": "支付中",
  "data": null,
  "ok": false
}
```

## 十四、获取注册验证码接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/user/passport/sendCode/{phone}| 	GET	 | 如下	  | 如下 |

请求参数

| 参数名称  | 参数类型 | 是否必选  | 描述 |
|:-----:|:--------:| :-----:|:----:|
| phone |  string  | $1600 | Y  | 注册的电话号码 |


返回参数示例
```json
{
  "code": 205,
  "message": "success",
  "data": 346776,
  "ok": false
}
```

## 十五、用户登陆接口

|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/user/passport/login| 	POST	 | 如下	  | 如下 |

请求参数

|参数名称 | 参数类型  | 是否必选 |   描述    |
|:---: |:-----:|:----:|:-------:|
|phone| 	string	 |  Y	  | 注册的电话号码 |
|password| 	string	 |  Y	  |  注册的密码  |

返回参数示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "dafadgatetwr4123425151"
  },
  "ok": false
}
```

```json
{
  "code": 204,
  "message": "failed",
  "data": {
    "token": null
  },
  "ok": false
}
```

## 十六、注册用户接口
|请求地址 |  请求方式  | 请求参数 | 返回示例 |
|:---: |:------:|:----:|:----:|
|/api/user/passport/regeiser| 	POST	 | 如下	  | 如下 |

请求参数

| 参数名称 | 参数类型  | 是否必选 |   描述    |
| ---: |:-----:|:----:|:-------:|
| phone| 	string	 |  Y	  | 注册的电话号码 |
| password| 	string	 |  Y	  |   密码    |
| code| 	string	 |  Y	  |   验证码   |

返回参数示例
```json
{
  "code": 205,
  "message": "success",
  "data": null,
  "ok": false
}
```

## 十七、退出登陆接口
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/user/passport/logout| 	GET	 |  无	  | 如下 |

返回参数示例
```json
{
  "code": 205,
  "message": "success",
  "data": null,
  "ok": false
}
```

## 十八、获取用户地址
|请求地址 | 请求方式  | 请求参数 | 返回示例 |
|:---: |:-----:|:----:|:----:|
|/api/user/userAddress/auth/findUserAddressList| 	GET	 |  无	  | 如下 |

返回参数示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "address": {
      "address1":"上海",
      "address2":"北京"
    }
  },
  "ok": false
}
```