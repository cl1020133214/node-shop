var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let Goods = require('../models/goods');

//链接Mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo');
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
})
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
})
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
})
/* 查询商品列表数据 */
router.get('/', function (req, res, next) {
    //分页设置
    //设置传参
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let priceGt = req.param("priceGt");
    let priceLte = req.param("priceLte");


    let skip = (page - 1) * pageSize;
    let params = {};
    //设置区间
    if (priceGt != -1) {
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    //.skip(skip).limit(pageSize);跳过多少条信息（索引）分页处理
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    //进行排序，对数据库字段为salePrice进行排序；1升序，-1降序
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            res.json({
                status: "0",
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});
/* 加入到购物车 */
router.post('/addCart', function (req, res, next) {
    let userId = '100000077', productId = req.body.productId;//默认已经登录
    let User = require('../models/user');

    let usersModel = User.findOne({
        userId: userId
    });
    usersModel.exec(function (usererr, userDoc) {
        if (usererr) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            console.log("userDoc:" + userDoc);
            if (userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach((item, index) => {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if (goodsItem) {
                    save()
                } else {
                    Goods.findOne({
                        productId: productId
                    }, function (err, doc) {
                        if (err) {
                            res.json({
                                status: "1",
                                msg: err.message
                            })
                        } else {
                            if (doc) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                save()
                            }
                        }
                    });
                }

                function save() {
                    userDoc.save(function (err2, doc2) {
                        if (err2) {
                            res.json({
                                status: "1",
                                msg: err2.message
                            })
                        } else {
                            res.json({
                                status: "0",
                                msg: "",
                                result: "success"
                            })
                        }
                    })
                }
            }
        }
    })
})
module.exports = router;
