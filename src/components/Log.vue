<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/log' }">操作日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      图表区
    </el-card>
    <el-card> 
      <el-table :data="rightslist" style="width: 100%" border stripe>
        <el-table-column label="⭐" type="index"> </el-table-column>
        <el-table-column prop="authName" label="操作人"> </el-table-column>
        <el-table-column prop="authName" label="时间"> </el-table-column>
        <el-table-column prop="path" label="操作记录"> </el-table-column>
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
     rightslist: [],
    };
  },
};
</script>



<style lang="less" scoped>
</style>