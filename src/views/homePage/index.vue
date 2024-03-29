<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col>
            <el-menu style="width: auto" :default-active="$route.path" :router="true" mode="horizontal">
              <el-menu-item index="/default">
                <template slot="title">
                  首页
                </template>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户信息管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/userList">
                    用户信息
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>

          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
