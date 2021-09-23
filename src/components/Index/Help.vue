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
        <h3>如何使用</h3>
        <p>巴拉巴拉</p>
        <h3>为什么巴拉巴拉？</h3>
        <p>
          我们鼓励你反馈任何问题或者建议，正是这些反馈推动我们不断进步。任何问题，请与我们联系。
        </p>
        <h3>更多帮助</h3>
        <li>CHZ</li>
        <li>QSH</li>
        <li>FCW</li>
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
  padding-left:60px;
  padding-right: 20px;
  >h3{
    font-size: 18px;
    font-weight: 500;
    line-height: 19.8px;
    color: #333333;
    margin: 20px 0 10px 0;
  }
  >p{
    font-size: 14px;
  }
  > li {
    margin: 14px 0;
    padding-left: 40px;
    list-style-type: disc;
    list-style-position: outside;
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
.help_body {
  font-size: 18px;
  font-weight: 500;
  line-height: 19.8px;
  color: #333333;
  margin: 20px 0 10px 0;
  padding-left: 20px;
  padding-right: 20px;
  > h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 19.8px;
    color: #333333;
    margin: 20px 0 10px 0;
  }
}
</style>