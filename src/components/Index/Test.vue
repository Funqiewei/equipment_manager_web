<template>
  <div>
    <div class="placed">
      <el-button @click="testevent"> test </el-button>
      <el-button @click="testevent2"> test2 </el-button>
      <el-button @click="testevent3"> 测试3 </el-button>
      <el-button @click="testevent4"> 获取设备列表 </el-button>
      <el-button @click="testevent5"> 取消预约 </el-button>
      <el-button @click="testevent6"> 获取用户数据 </el-button>
      <el-button @click="testevent7"> 获取已预约设备 </el-button>
      <el-button @click="testevent8"> 更改头像 </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      //https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eonj66CuX79c1ho9EgIicoeP9EmXtzpIjIS0bmWAbHchheDOJI9O3Lm90UiaTCvEiaYX7vfq8rLURu3A/132
      // 这是登录表单的数据绑定对象
      loginForm: {
        account: "Xb19610115",
        password: "123456",
      },
      ReserveDevice: {
        account: "Xb19610115",
        password: "123456",
        type: "1",
        device: "1",
        start: "1634435386878",
        end: "1634437604000",
      },
      Cancel: {
        account: "Xb19610115",
        password: "123456",
        type: "1",
        device: "2",
        start: "1639143000000",
        end: "1639146600000",
      },
      getUser: {
        account: "Xb19610115",
        password: "123456",
        device: "1",
        control: "我是伞兵",
      },
    };
  },
  methods: {
    testevent() {
      fetch("http://iwenwiki.com/api/blueberrypai/getBlueBerryJamInfo.php")
        .then((response) => response.json())
        .then((data) => console.log(data));
    },

    async testevent2() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      this.$http
        .post("/api/userLogin", qs.stringify(this.loginForm))
        .then((response) => {
          console.log(response);
        });
    },
    async testevent3() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/userLogin", {
        method: "post",
        body: JSON.stringify({
          account: "Xb19610115",
          password: "123456",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    async testevent4() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/selectDevice", {
        method: "post",
        body: JSON.stringify({
          type: "1",
          localLike: "422.%",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    async testevent5() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/userStopReserve", {
        method: "post",
        body: JSON.stringify(this.Cancel),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    async testevent6() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/userControlDevice", {
        method: "post",
        body: JSON.stringify(this.getUser),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    async testevent7() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/userGetReserve", {
        method: "post",
        body: JSON.stringify({
          account: "Xb19610115",
          password: "123456",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    async testevent8() {
      // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
      // .then((response) => response.json())
      // .then((data) => {console.log(data.time)})
      // .catch(console.error);
      fetch("https://ztuser.ltd/equipment_server/userChangeImage", {
        method: "post",
        body: JSON.stringify({
          account: "Xb19610115",
          password: "123456",
          image:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eonj66CuX79c1ho9EgIicoeP9EmXtzpIjIS0bmWAbHchheDOJI9O3Lm90UiaTCvEiaYX7vfq8rLURu3A/46"
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
};
</script>

<style lang="less" scoped>
.placed {
  text-align: center;
}
.flip-in-hor-bottom {
  -webkit-animation: flip-in-hor-bottom 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: flip-in-hor-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2021-12-5 14:39:15
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation flip-in-hor-bottom
 * ----------------------------------------
 */
@-webkit-keyframes flip-in-hor-bottom {
  0% {
    -webkit-transform: rotateX(80deg);
    transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
    opacity: 1;
  }
}
@keyframes flip-in-hor-bottom {
  0% {
    -webkit-transform: rotateX(80deg);
    transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
    opacity: 1;
  }
}
</style>