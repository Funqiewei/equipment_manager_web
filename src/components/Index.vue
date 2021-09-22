<template>
  <el-container class="index-container">
    <el-header>
      <div>
        <img
          src="../assets/kylogo2.png"
          @click="click_logo2"
          height="90"
          style="vertical-align: text-bottom"
        />
        <span></span>
      </div>
      <div>
        <div @click="click_index">&nbsp&nbsp首页 &nbsp &nbsp</div>
        <div @click="click_help">&nbsp &nbsp支持与帮助 &nbsp &nbsp</div>
        <div @click="click_console">&nbsp &nbsp控制台 &nbsp &nbsp</div>
      </div>
    </el-header>
    <el-main>
      <div class="main_container">
        <div class="title">开启校园预约新生活</div>
        <div class="title2">物联网项目开发</div>
        <div>
          <img src="../assets/IndexBgpic.png" alt="" width="800" height="500" />
        </div>
      </div>
      <!-- 路由占位 -->
    </el-main>
    <el-footer>
      <div class="footer-container">
        <div class="footer">
          <div class="footer_left">
            <p>咨询电话:0575-82001777</p>
            <p></p>
            <p>院长书记信箱:</p>
            <p>ky@zstu.edu.cn Copyright(c)2021</p>
          </div>
          <div class="footer_center">
            <p>浙江理工大学科技与艺术学院</p>
            <p>学院地址：</p>
            <p>杭州湾上虞经济技术开发区康阳大道58号</p>
          </div>
          <div class="footer_right">
            <p>邮编:312369</p>
            <p></p>
            <p>传真:</p>
            <p>0575-82978000</p>
          </div>
        </div>
        <div class="sch_motto">—厚德致远·博学敦行 —</div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    click_logo2() {
      window.location.href = "http://www.ky.zstu.edu.cn/";
    },
    click_index() {
      this.$router.push("/Index");
    },
    click_help() {
      this.$router.push("/Help");
    },
    click_console() {
      this.$router.push("/home");
    },
  },
};
</script>


<style lang="less" scoped>
.index-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  height: 100px;
  font-size: 15px;
  vertical-align: middle;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}

.title {
  padding-top: 20px;
  font-weight: bold;
  font-size: 2rem;
}
.title2 {
  margin-top: 15px;
  font-size: 1rem;
}
.main_container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  background-color: #000;
  text-align: center;
  color: #ffffff;
}
.el-main {
  background-color: #eef2f8;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.el-footer {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.footer_left {
  text-align: center;
  width: 100%;
}
.footer_center {
  text-align: center;
  width: 100%;
}
.footer_right {
  text-align: center;
  width: 100%;
}
.footer-container {
  background: #ebebeb;
  height: 200px;
  width: 100%;
  margin: 0;
}

.footer {
  width: 100%;
  font-size: 14px;
  line-height: 30px;
  border-bottom: solid #cccc;
  display: flex;
}
.sch_motto {
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  line-height: 57px;
  color: #9c9c9c;
  display: block;
}
</style>