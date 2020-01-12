<template>
  <div class="container">
    <el-card class="box-card" style="max-width: 700px; margin: 0 auto;">
      <div slot="header" class="clearfix">
        <h3>注册用户</h3>
      </div>
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户名：">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="register" size="small">注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    //注册用户
    async register() {
        if(!this.user.name){
            this.$message.error('用户名不能为空')
            return
        } else if (!this.user.password) {
            this.$message.error('密码不能为空')
            return 
        }

        const res = await this.$http.post('/register', this.user)
        if(res.status === 200) {
            this.$message.success(res.data.message)
            this.user.name = ''
            this.user.password = ''
            this.$router.push('/login')
        } else {
            this.user.name = ''
            this.user.password = ''
        }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>