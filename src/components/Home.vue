<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <!-- 收缩按钮 -->
      <div class="toggle-button" @click="toggleCollapse">&lt;&gt;</div>
      <!-- 侧边栏菜单区域 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#1d1d1e"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="$route.path"
      >
        <el-menu-item index="welcome">
          <i class="el-icon-menu"></i>
          <span slot="title">Welcome</span>
        </el-menu-item>
        <el-menu-item index="appointment">
          <i class="el-icon-position"></i>
          <span slot="title">开始预约</span>
        </el-menu-item>
        <el-menu-item index="users">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>

        <el-menu-item index="roles">
          <i class="el-icon-s-operation"></i>
          <span slot="title">权限列表</span>
        </el-menu-item>
        <el-menu-item index="log">
          <i class="el-icon-loading"></i>
          <span slot="title">操作日志</span>
        </el-menu-item>
        <!--  
        <!-- 一级菜单   
        <el-submenu
          :index="item.id + ''"
          v-for="item in menulist"
          :key="item.id"
        >
          <!-- 一级菜单模板 
          <template slot="title">
            <i :class="iconObj[item.id]"></i>
            <span>{{ item.authName }}</span>
          </template>
          

          <!-- 二级菜单 -
          <el-menu-item
            :index="'/' + subItem.path + ''"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="saveNavState('/' + subItem.path)"
          >
            <!-- 二级菜单模板 -
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        -->
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div @click="pic_click">
          <img
            src="../assets/kylogo.png"
            width="60"
            height="60"
            style="vertical-align: text-bottom"
          />
          <span> 预约控制台 </span>
        </div>
        <div>
          <el-button icon="el-icon-collection" @click="help">支持</el-button>
          <el-button icon="el-icon-switch-button" @click="logout"
            >退出</el-button
          >
        </div>
      </el-header>
      <!-- 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view> </router-view>
      </el-main>
      <!-- 底部 -->
      <el-footer><img src="../assets/footer.jpeg" alt="" height="100%" width="100%" v-show="random==1">
      <img src="../assets/footer2.jpg" alt="" height="100%" width="100%" v-show="random==2"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
      activePath: "",
      
      random:1,
      temp:0,
    };
  },
 
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    this.random=Math.round(Math.random()*1)+1 ;
  },
  methods: {
    help() {
      this.$router.push("/help");
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.data);
      this.menulist = res.data;
      console.log(res);
    },
    pic_click() {
      this.$router.push("/welcome");
    },
    // 折叠侧边栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 高亮保持
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-container {
  background-color: #eef2f8;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  vertical-align: middle;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}
.el-footer {
  background-color: #ffffff;
  margin-left: 0.5px;
  height: 180px !important;
}
.el-main {
  background-color: #eef2f8;
}
.el-aside {
  background-color: #1d1d1e;
 .el-menu {
    border-right: 0px;
  }
  transition: 0.5s;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background: #1d1d1e;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 5px;
}
</style>