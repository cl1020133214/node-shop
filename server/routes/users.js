var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* GET users listing. */
router.get('/test', function (req, res, next) {
    res.send('test');
});

router.post("/login", function (req, res, next) {
    let User = require('../models/user');
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd,
    }
    User.findOne(param,function (err,doc) {
        if(err){
            res.json({
                status:"1"
            })
        }else {
            if(doc){
                res.cookie("userId",doc.userId,{
                    path:'/',
                    maxAge:1000*60*60,//cookie的最大生命周期
                });
                // req.session.user = doc;
                res.json({
                    status:"0",
                    msg:'',
                    result: {
                        nickName: doc.nickName,
                    }
                })
            }else{
                res.json({
                    status:"2",
                    msg:'账号密码有误，请重试'
                })
            }
        }
    })
})
module.exports = router;
