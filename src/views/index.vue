<template>
  <div class="container">
    <el-card style="max-width: 900px; margin: 0 auto;">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="_id" label="id"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handlerConfirm(scope.row)" type="danger" size="small">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取数据
    async getList() {
      const res = await this.$http.get("/getUsers");
      if (res.status === 200) {
        this.list = res.data;
      }
    },
    //确定注销用户吗
    handlerConfirm(obj) {
      this.$confirm(`确定注销 "${obj.name}" 该用户吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送注销请求
          this.deleteUser(obj._id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //注销用户
    async deleteUser(id) {
      const res = await this.$http.get(`/delete?id=${id}`)
      if(res.status === 200) {
        this.$message.success(res.data.message)
        //重新获取列表数据
        this.getList()
      }
    }
  }
};
</script>
