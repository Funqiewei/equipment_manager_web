<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <h3>Weclome!! 超伟，现在是{{ nowDate }}</h3>
      <div>使用说明：<br>
        欢迎使用物联网预约系统<br>
        [开始预约]中选择启动时间和结束时间进行对设备的预约<br>
        [设备总览]中查看当前实验室设备的使用情况<br>
        warning!!!<br>
        本项目还在探索开发阶段！！！<br>
        在左栏进行功能操作吧-V- <br>
        <a style="text-decoration:line-through">如有Bug概不负责</a><br>
        球球了过来修<br>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowDate: "loading",
    };
  },
  created() {
    setInterval(() => {
      this.current();
    }, 1000);
  },
  methods: {
    current() {
      this.nowDate = "";
      let d = new Date();
      this.nowDate += d.getFullYear() + "年"; //获取当前年份
      this.nowDate += d.getMonth() + 1 + "月"; //获取当前月份（0——11）
      this.nowDate += d.getDate() + "日 ";
      this.nowDate += d.getHours() + "时";
      this.nowDate += d.getMinutes() + "分";
      this.nowDate += d.getSeconds() + "秒";
    },
  },
};
</script>



<style lang="less" scoped>

</style>