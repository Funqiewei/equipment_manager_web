<template>
  <div class="help_container">
    <div class="colorful">
      <div class="help_pic">
        <img src="~@/assets/question.png" width="80px" alt="帮助" />
        <p>寻求帮助吗？在这里查看常见使用问题的解答</p>
      </div>
    </div>
    <div class="help_body">
      <div class="help_title">科艺控制台网站使用帮助</div>
      <div class="help_main">
        <a  @click="gotoDocu" style="font-size:28px;font-weight:bold;"
          >访问接口文档链接：http://ztuser.ltd/equipment_server/doc/3.html</a
        >

        <h2>如何使用</h2>
        <h4>1.预约管理</h4>
        <p>
          操作流程：登录web控制台 -【开始预约】-【选择时间】-进行使用；
          通过该功能模块，可以直观看出预约情况而且支持手动取消预约。
          <img src="~@/assets/HelpImg1.png" width="1080px" alt="新增预约" />
        </p>
        <h4>2.新建预约</h4>
        <p>点击新增预约，可以选择时间、机型，并且系统到时会自动打开设备。</p>
        <img src="~@/assets/HelpImg2.png" width="1080px" alt="手动取消" />
        <h4>
          我们鼓励你反馈任何问题或者建议，正是这些反馈推动我们不断进步。任何问题，请与我们联系。
        </h4>
        <h4>3.更多帮助：</h4>
        <div>
          <div class="show">
            <li>陈豪佐：硬件</li>
            <img
              src="~@/assets/github.png"
              onclick="javascript:location.href='https://github.com/Zuoges'"
              alt="github"
              width="50"
              height="50"
            />
          </div>
          <div class="show">
            <li>邱仕洪：后端</li>
            <img
              src="~@/assets/github.png"
              onclick="javascript:location.href='https://github.com/823984418'"
              alt="github"
              width="50"
              height="50"
            />
          </div>
          <div class="show">
            <li>方超伟：前端</li>
            <img
              src="~@/assets/github.png"
              onclick="javascript:location.href='https://github.com/Funqiewei'"
              alt="github"
              width="50"
              height="50"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    pic_click() {
      this.$router.push("/Index");
    },
    gotoDocu() {
      window.location.href = "http://ztuser.ltd/equipment_server/doc/3.html";
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: #000;
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
.help_container {
  width: 100%;
}
.help_pic {
  display: block;
  padding-top: 10px;
  > p {
    color: #fff;
    line-height: 28px;
    letter-spacing: 0.2px;
    padding-bottom: 50px;
    font-size: 20px;
    font-weight: bold;
  }
}
.help_title {
  margin: 80px 0 40px 0;
  font-size: 36px;
  font-weight: 500;
  line-height: 39.6px;
  color: #333333;
  text-align: center;
}
.help_main {
  max-width: 1040px;
  padding-left: 60px;
  padding-right: 20px;
  > h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 19.8px;
    color: #333333;
    margin: 20px 0 10px 0;
  }
  > p {
    font-size: 14px;
  }
  > li {
    margin: 14px 0;
    padding-left: 40px;
    list-style-type: disc;
    list-style-position: outside;
  }
  > h3 {
    font-size: 23px;
    font-weight: 500;
    line-height: 19.8px;
    color: #333333;
    margin: 20px 0 10px 0;
  }
}
.colorful {
  background: linear-gradient(to right, #5a9cbe, #7482a9, #694f97);
  background-color: #7482a9;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.show {
  display: flex;
  margin-top: 20px;
  vertical-align: middle;
  align-items: center;
  > img {
    margin-left: 20px;
  }
  > li {
    margin-left: 20px;
  }
}
.help_body {
  font-size: 18px;
  font-weight: 500;
  line-height: 19.8px;
  color: #333333;
  margin: 20px 0 10px 0;
  padding-left: 20px;
  padding-right: 20px;
}

a:hover {
  font-weight: bold;
  border-bottom: 2px solid;
}
</style>