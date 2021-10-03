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
          v-model="appForm.time"
          :picker-options="{
            start: '08:30',
            step: '00:60',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
        <el-button type="primary" @click="clickapp">预约</el-button>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="预约表单"
      :visible.sync="appdialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="appDialogClosed"
    >
      <!--主体 -->
      <el-form
        ref="appFormRef"
        :model="appForm"
        label-width="80px"
      >
        <!-- <el-form-item label="用户名" prop="username">
          <el-input v-model="appForm.username" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="序列号" prop="machine">
          <el-input v-model="appForm.machine" disabled></el-input>
        </el-form-item>
        <el-form-item label="预约时间" prop="time">
          <el-input v-model="appForm.time" disabled></el-input>
        </el-form-item>

        <!-- <el-form-item label="电压(V)" prop="voltage" 
        :rules="[{ required: true, message: '请输入电压', trigger: 'blur' },
        { type: 'number', message: '请输入正确的电压', trigger: ['blur', 'change'] }]">
          <el-input v-model="appForm.voltage"></el-input>
        </el-form-item>
        <el-form-item label="电流(A)" prop="current"
        :rules="[{ required: true, message: '请输入电流', trigger: 'blur' },
        { type: 'number', message: '请输入正确的电流', trigger: ['blur', 'change'] }]">
          <el-input v-model="appForm.current"></el-input>
        </el-form-item> -->
      </el-form>

      <!-- 对话框按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="appdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="appDialogclick">确 定</el-button>
      </span>
    </el-dialog>

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
      rightslist: [],
      appForm: {
        time: "",
        username: "",
        voltage: "",
        current: "",
        machine:"初号机",
      },
      appdialogVisible: false,
    };
  },
  methods: {
    clickapp(){
      if(this.appForm.time){
        this.appdialogVisible=true;
      }else{
        this.$message.error({ message: "选择预约时间" });
      }
    },
    appDialogClosed() {
      this.$refs.appFormRef.resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    appDialogclick() {
      // 对话框确定
      this.$refs.appFormRef.validate(async (value) => {
        if (!value) return;
        console.log(this.appForm.time);
      });
      
    },
    appDialogClosed() {
      this.$refs.appFormRef.resetFields();
    },
  },
};
</script>




<style lang="less" scoped>
.time_select {
  > a {
    margin-right: 20px;
  }
}
</style>