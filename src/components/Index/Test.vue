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
        axios.get('api/blueberrypai/getBlueBerryJamInfo.php')
        .then(_d=>{
            console.log(_d);
        })
    },
    testevent2(){
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