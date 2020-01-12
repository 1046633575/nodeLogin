const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


require('./model/index')
const User = require('./model/user')

//设置常量
app.set('secret', 'isdaofaj214o1j2k0j349jds')

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type, Authorization");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next()
})
//获取POST参数的模块
const bodyParser = require('body-parser')
//获取POST请求参数  使用 querystring 处理数据
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


//校验用户登录的中间件
const auth = async (req, res, next) => {
    const token = req.headers.authorization || ''
    if(!token){
        res.status(401).send({message: '请先登录'})
    }
    const {id} = jwt.verify(token, app.get('secret'))
    if(!id){
        res.status(401).send({message: '请先登录'})
    }
    req.user = await User.findById(id)
    if(!req.user) {
        res.status(401).send({message:'请先登录'})
    }
    await next()
}

//注册用户
app.post('/register', async (req, res) => {
    const result = await User.create(req.body)
    console.log(req.body)
    if (result) {
        res.send({
            message: '注册成功！'
        })
    } else {
        res.status(430).send({
            message: '注册失败，请稍后重试！'
        })
    }
})

//登录并返回token
app.post('/login', async (req, res, next) => {
    //校验用户存在
    const result = await User.findOne({
        name: req.body.name
    })
    if (!result) {
        res.status(430).send({
            message: '用户名不存在'
        })
    }
    //校验密码
    const isValid = require('bcryptjs').compareSync(req.body.password, result.password)
    if (!isValid) {
        res.status(430).send({
            message: '密码不正确'
        })
    }
    //返回token
    const token = jwt.sign({
        id: result._id
    }, app.get('secret'))

    res.send({
        token
    })
})

//主页
app.get('/getUsers', auth, async (req, res) => {
    const result = await User.find()
    if (result) {
        res.send(result)
    } else {
        res.status(430).send({
            message: '用户列表没有数据'
        })
    }
})

//注销用户
app.get('/delete', (req, res) => {
    User.deleteOne({
            _id: req.query.id
        })
        .then(() => {
            res.send({
                message: '注销成功！'
            })
        })
        .catch((err) => {
            res.status(430).send({
                message: '注销失败，未知错误！'
            })
        })
})

app.listen(3001, () => {
    console.log('服务已启动 http://localhost:3001')
})