<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card" shadow="hover">
      <div></div>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入搜索的用户名"
              class="input-with-select"
              v-model="queryInfo.query"
              clearable
              @clear="getUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserInfo"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <!-- 添加用户按钮 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="dialogVisible = true">
              添加用户
            </el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userlist" stripe style="width: 100%" border>
        <el-table-column type="index" label="⭐"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="身份"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <!-- 作用域插槽 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="修改用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="删除用户"
              placement="top"
              :enterable="false"  
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配权限 -->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码条 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="addDialogClosed"
    >
      <!--主体 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      userlist: [],
      total: 0,
      // 对话框是否显示
      dialogVisible: false,
      // 修改用户对话框是否显示
      editDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        mobile: "",
        email: "",
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        username: "",
        mobile: "",
        email: "",
      },
      // 修改表单的验证规则对象
      editFormRules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            pattern: /^1[3-9]\d{9}$/,
            required: true,
            message: "手机号格式不对",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      // const { data: res } = await this.$http.get("/bpi/users", {
      //   params: this.queryInfo,
        
      // });
      // console.log(res);
      // if (res.meta.status != 200) {
      //   return this.$message.error("获取用户列表失败");
      // }
      // this.userlist = res.data.users;
      // this.total = res.data.total;
      // console.log(res);
    },

    getUserInfo() {
      // this.queryInfo.pagenum = 1;
      // this.getUserList();
    },
    handleSizeChange(newSize) {
      // this.queryInfo.pagesize = newSize;
      // this.getUserList();
    },
    handleCurrentChange(newPage) {
      // this.queryInfo.pagenum = newPage;
      // this.getUserList();
    },
    async userStateChange(userinfo) {
      // console.log(userinfo);
      // // 不用单引号用反引号修改为模板字符串 用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
      // const { data: res } = await this.$http.put(
      //   `/bpi/users/${userinfo.id}/state/${userinfo.mg_state}`
      // );
      // if (res.meta.status !== 200) {
      //   userinfo.mg_state = !userinfo.mg_state;
      //   return this.$message.error("更新失败");
      // }

      // this.$message.success("更新成功");
    },

    // 重置对话框
    addDialogClosed() {
      // this.$refs.addFormRef.resetFields();
    },
    editDialogClosed() {
      // this.$refs.addFormRef.resetFields();
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
    },
    addUser() {
      // // 预校验
      // this.$refs.addFormRef.validate(async (value) => {
      //   if (!value) return;
      //   // 发送网络请求
      //   const { data: res } = await this.$http.post("/bpi/users", this.addForm);
      //   if (res.meta.status !== 201) {
      //     return this.$message.error("用户添加失败！");
      //   }
      //   this.$message.success("用户添加成功!");
      //   // 添加后关闭对话框
      //   this.dialogVisible = false;
      //   // 添加完之后再刷新一次用户列表
      //   this.getUserList();
      // });
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // this.editDialogVisible = true;
      // const { data: res } = await this.$http.get(`/bpi/users/${id}`);
      // if (res.meta.status !== 200) return this.$message.error("修改出错了！");
      // this.editForm = res.data;
    },
    editDialogClosed() {
      // this.$refs.editFormRef.resetFields();
    },
    editUser() {
      // this.$refs.editFormRef.validate(async (vaild) => {
      //   const { data: res } = await this.$http.put(
      //     `/bpi/users/${this.editForm.id}`,
      //     {
      //       email: this.editForm.email,
      //       mobile: this.editForm.mobile,
      //     }
      //   );
      //   if (res.meta.status !== 200) {
      //     return this.$message.error("修改用户信息失败!!!");
      //   }
      //   // 关闭对话框
      //   this.editDialogVisible = false;
      //   // 刷新用户信息
      //   this.getUserList();
      //   // 提示修改成功
      //   this.$message.success("修改用户信息成功~");
      // });
    },
      // 删除用户
    async removeUser(id) {
      // // 弹框询问
      // const confirmRes = await this.$confirm(
      //   '此操作将永久删除该用户, 是否继续?',
      //   '提示',
      //   {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // )
      //   .then(async () => {
      //     const { data: res } = await this.$http.delete(`/users/${id}`)
      //     // 防止误删管理员
      //     if (id === 500) { return this.$message.error('这是管理员啊！你想删了干甚么？！') }
      //     if (res.meta.status !== 200) return this.$message.error('删除失败！')
      //     this.$message.success('删除成功~')
      //     this.getUserList()
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 15px;
}
</style>