var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接Mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
})
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
})
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
})
/* GET users listing. */
router.get('/', function (req, res, next) {
    //分页设置
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page - 1) * pageSize;
    let params = {};
    //.skip(skip).limit(pageSize);跳过多少条信息（索引）
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
module.exports = router;
