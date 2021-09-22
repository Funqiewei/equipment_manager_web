<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse? '64px':'200px'">
      <!-- 收缩按钮 -->
      <div class="toggle-button" @click="toggleCollapse">	&lt;&gt;</div>
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
        :default-active="activePath"
        >
        


        
        <!-- 一级菜单   -->
        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板 -->
          <template slot="title">
            <i :class="iconObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
           <!--  
            <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>-->
          <!-- 二级菜单 -->
          <el-menu-item 
          :index="'/'+subItem.path+''" 
          v-for="subItem in item.children" 
          :key="subItem.id" 
          @click="saveNavState('/'+subItem.path)">
              <!-- 二级菜单模板 -->
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
            </template>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header >
          <div >
             <img src="../assets/kylogo.png" width="60" height="60" style="vertical-align:text-bottom">
             <span >
                 预约控制台
             </span>
          </div>
          <div>
          <el-button  >支持</el-button>
          <el-button  @click="logout">退出</el-button>
          </div>
      </el-header>
      <!-- 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view>
        </router-view>
        </el-main>
      <!-- 底部 -->
      <el-footer>咱也不知道放点啥</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      menulist:[],
      iconObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse:false,
      activePath:'',
    }
  },
  created(){
   this.getMenuList();
   this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
      const { data: res}=await this.$http.get('menus')
      if(res.meta.status !==200) return this.$message.error(res.meta.data)
      this.menulist=res.data
      console.log(res)
    },
    // 折叠侧边栏
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    // 高亮保持
    saveNavState(activePath)
    {
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath=activePath
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  vertical-align:middle;
  > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 10px;
        }
      }
}
.el-main {
  background-color: #eef2f8;
}
.el-aside {
  background-color: #1d1d1e;
  border-right: none;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background: #1d1d1e;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 5px;
}
</style>