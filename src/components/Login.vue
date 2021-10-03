<template>
  <div class="login_container">
    
    <canvas id="startrack">
    </canvas>

    <p class="out" @click="out">🏃‍♀️退出</p>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/kylogo.png" alt="" onclick="window.location.href = 'http://www.ky.zstu.edu.cn/'" >
      </div >
       <div class=login_font>
       登录 
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="chara_form">
          <span>
          ⭐科创小项目Test
        </span>
    </div> 
      
    
      <p id="hitokoto" class="encourage">{{ hitokotoText}}</p> 
    </div> 
    

</template>

<script>
import { onMounted } from "vue";
export default {
  data() {
    return {
      hitokotoText: "loading...",
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    out(){
      this.$router.push("/index");

    },
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("http://47.96.116.218:8889/api/private/v1/login", this.loginForm);

        if (res.meta.status !== 200)
          return this.$message.error({ message: "账号或密码错误" });
        this.$message.success({ message: "登录成功" });
        console.log(res);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");      
      });
    },
    setup() {
      // mounted
        fetch("https://v1.hitokoto.cn/?c=k")
        .then((response) => response.json())
        .then((data) => {
          this.hitokotoText = data.hitokoto;
        })
        .catch(console.error);
    },
  },
  created() {
    // const s = document.createElement("script");
    // s.type = "text/JavaScript";
    // s.src = "https://api.amogu.cn/public/static/index/js/page.js";
    // document.body.appendChild(s);
  },

  mounted() {
    this.setup();
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #000000;
  height: 100%;
}
#startrack {
  height: 100%;
  width: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_font {
  font-size: 25px;
  margin-left: 30px;
  margin-top: 60px;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.chara_form {
  position: absolute;
  bottom: 0;
  display: flex;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.5em;
  opacity: 0.9;
  font-weight: 600;
}
.background-picture {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.btns {
  display: flex;
  justify-content: center;
}
.encourage {
  position: absolute;
  bottom: 40px;
  left: 50%;
  color: #fff;
  transform: translate(-45%, 0);
  font-size: 15px;
  letter-spacing: 0.5em;
  opacity: 0.9;
  font-weight: 600;
}
.out {
  height: 25px;
  width: 80px;
  background-color: #000;
  position: absolute;
  top: 0px;
  right: 8px;
  color: #fff;
  transform: translate(10%, -40%);
  font-size: 20px;
  opacity: 0.9;
  font-weight: 600;
}
p:hover {
  font-weight: bold;
  border-bottom: 3px solid;
}
</style>
