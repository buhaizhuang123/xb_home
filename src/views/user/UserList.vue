<template>
  <div>


    <el-container>
      <el-header>

        <el-upload style="float: right" action="no" :http-request="uploadUserInfo" :with-credentials=true
                   accept='multipart/form-data' mutiple>

          <el-button name="file" type="primary">用户信息上传</el-button>

        </el-upload>

      </el-header>

      <el-main>

        <el-table :data="userPage.userList">
          <el-table-column label="用户姓名" prop="username"></el-table-column>
          <el-table-column label="用户密码" prop="password"></el-table-column>
          <el-table-column label="用户权限" prop="authority"></el-table-column>
          <el-table-column label="日期" prop="createTime"></el-table-column>
          <el-table-column label="是否锁定" prop="enable"></el-table-column>
        </el-table>
        <el-card>
          <el-pagination :page-size="page.pageSize" :page-count="page.pageNum" :total="userPage.total"
                         @current-change="changePageNum"
          ></el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  // 用户信息
  name: "UserList",
  data() {
    return {
      userPage: {
        userList: [],
        total: 0
      },
      page: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.findUserList();
  },
  methods: {
    findUserList() {
      this.$axios.post('/doc/user/listAllUser')
        .then(res => {
          this.userPage.userList = res.data.data
          this.userPage.total = res.data.total
        })
        .catch(err => console.log(err))
    },
    changePageNum(num) {
      this.page.pageNum = num
    },
    uploadUserInfo(data) {
      console.log(data['file'])
      this.$axios.post('/doc/upload/user', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
