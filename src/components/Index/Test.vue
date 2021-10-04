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
export default {
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
         const { data: res } = await this.$http.post("http://ztuser.ltd/equipment_server/device1/link?uuid=1&password=0")
         if (res.meta.status !== 200) return this.$message.error(res.meta.data);
            console.log(res);
         axios.get('api/FingerUnion/data.json')
         .then(_d=>{
            console.log(_d);
        })
    }
}
}
</script>

<style lang="less" scoped>
.placed{
    text-align: center;
}
</style>