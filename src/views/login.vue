<template>
  <div class="container">
    <el-card class="box-card" style="max-width: 700px; margin: 0 auto;">
      <div slot="header" class="clearfix">
        <h3>登录</h3>
      </div>
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户名：">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login" size="small">登录</el-button>
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
    //用户登录
    async login() {
      const res = await this.$http.post('/login', this.user)
      if(!res) return;
      //token信息存入 sessionStorage
      sessionStorage.token = res.data.token
      this.$router.push('/index')
      this.$message.success({message: '登录成功！'})
    }
  }
};
</script>
