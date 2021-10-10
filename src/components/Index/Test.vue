<template>
  <div>
      <div class="placed" >
          <el-button  @click="testevent">
          test
      </el-button> 
      <el-button  @click="testevent2">
          test2
      </el-button> 
    
      </div>
     


  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
 data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        account: "test1",
        password: "123456",
      },
    };
  },   
methods:{
    testevent(){
        fetch("http://iwenwiki.com/api/blueberrypai/getBlueBerryJamInfo.php")
        .then(response => response.json() )
        .then(data => console.log(data))
    },
    
        async testevent2(){
        // fetch("https://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
        // .then((response) => response.json())
        // .then((data) => {console.log(data.time)})
        // .catch(console.error);
            this.$http.post('/api/user/login', qs.stringify(this.loginForm))
            .then( (response)=> {console.log(response);})
        }
}
}
</script>

<style lang="less" scoped>
.placed{
    text-align: center;
}
</style>