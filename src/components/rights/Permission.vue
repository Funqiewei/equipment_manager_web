<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/rights' }"
        >权限列表</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card>
      <el-table :data="rightslist" style="width: 100%" border stripe>
        <el-table-column label="⭐" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="所需权限等级">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.level==0"type="success">一级权限 </el-tag>
            <el-tag v-show="scope.row.level==1" type="">二级权限</el-tag>
            <el-tag v-show="scope.row.level==2"type="danger">三级权限 </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 所有权限
      rightslist: [],
    };
  },
  created() {
    this.getRightslist();
  },
  methods: {
    async getRightslist() {
      const { data: res } = await this.$http.get("http://47.96.116.218:8889/api/private/v1/rights/list");
      if (res.meta.status !== 200) {
        return console.log("获取权限列表失败");
      }
      this.rightslist = res.data;
      console.log(this.rightslist);
    },
  },
};
</script>



<style lang="less" scoped>
</style>