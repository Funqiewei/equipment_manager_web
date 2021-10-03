<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      
      <div class="time_select">
        <a>预约设备</a>
        <el-time-select
          v-model="value"
          :picker-options="{
            start: '08:30',
            step: '00:60',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
        <el-button type="primary" @click="appoint">预约</el-button>
        
      </div>
    </el-card>
    <el-card>
      <p>我的预约列表</p>
      <el-table :data="rightslist" style="width: 100%" border stripe>
        <el-table-column label="⭐" type="index"> </el-table-column>
        <el-table-column prop="authName" label="预约信息"> </el-table-column>
        <el-table-column prop="authName" label="预约时间"> </el-table-column>
        <el-table-column prop="path" label="操作"> </el-table-column>
        
          <!-- <template slot-scope="scope">
            <el-tag v-show="scope.row.level==0"type="success">一级权限 </el-tag>
            <el-tag v-show="scope.row.level==1" type="">二级权限</el-tag>
            <el-tag v-show="scope.row.level==2"type="danger">三级权限 </el-tag>
          </template> -->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      rightslist:[],
    };
  },
  methods:{
    appoint(){
      console.log(this.value);
    },
  }
};
</script>




<style lang="less" scoped>
.time_select{
  >a{
    margin-right: 20px;
  }
}
</style>