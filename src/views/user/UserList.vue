<template>
  <div>


    <el-container>
      <el-header>

        <el-upload name="file" style="float: right" action="no" :http-request="uploadUserInfo" :with-credentials=true>

          <el-button name="file" type="primary">用户信息上传</el-button>
        </el-upload>
        <el-upload name="file" style="float: right" action="no" :http-request="uploadUserInfoCkError"
                   :with-credentials=true>
          <el-button name="file" type="primary">上传(预览异常)</el-button>
        </el-upload>

      </el-header>

      <div v-if="excelData">
        <!-- 在这里展示excelData的内容 -->
        <table>
          <tr v-for="(row, rowIndex) in excelData" :key="`row-${rowIndex}`">
            <td v-for="(cell, cellIndex) in row" :key="`cell-${cellIndex}`">
              {{ cell }}
            </td>
          </tr>
        </table>
      </div>

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
import * as XLSX from 'xlsx';

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
      },
      excelData: null
    }
  },
  mounted() {
    this.findUserList();
  },
  methods: {
    findUserList() {
      this.$axios.post('/doc/user/listAllUser', this.page)
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

      let formData = new FormData();
      formData.append('file', data.file)

      this.$axios.post('/doc/upload/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': true,
          'authentication': localStorage.getItem('authentication')
        },
      })
        .then(res => {
          if (res.data.code === '0000') {
            // 重新查询用户信息
            this.findUserList();
          }
        })
        .catch(err => console.log(err))
    },
    uploadUserInfoCkError(data) {
      console.log(data['file'])

      let formData = new FormData();
      formData.append('file', data.file)

      this.$axios.post('/doc/upload/batchInsertUserInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': true,
          'authentication': localStorage.getItem('authentication'),
          'responseType': 'blob'
        },
      })
        .then(res => {

          // const reader = new FileReader();
          // reader.onload = (e) => {
          //   const data = new Uint8Array(e.target['result']);
          //   const workbook = XLSX.read(data, {type: 'array'});
          //   const firstSheetName = workbook.SheetNames[0];
          //   const worksheet = workbook.Sheets[firstSheetName];
          //   this.excelData = XLSX.utils.sheet_to_json(worksheet);
          //   console.log('解析完毕')
          // };
          console.log('res', res)

          var blob = new Blob([res.data], {type: res.headers['content-type']});
          console.log('blob', blob)
          const fileURL = URL.createObjectURL(blob);

          // 创建一个临时的a标签用于下载文件
          const tempLink = document.createElement('a');
          tempLink.href = fileURL;
          tempLink.setAttribute('download', '002.xls'); // 可选：设置下载文件名

          // 触发a标签的点击事件
          tempLink.click();

          // 清除资源
          window.URL.revokeObjectURL(fileURL);
          // link.click();
          // console.log(blob)
          // reader.readAsArrayBuffer(blob);

        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
