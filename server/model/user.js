const mongoose = require('mongoose')

//创建集合规则
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})

//创建集合
const user = mongoose.model('User', userSchema)

module.exports = user