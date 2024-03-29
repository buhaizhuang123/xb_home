<template>
  <div id="app">
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import home from "@/views/homePage/index";

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
