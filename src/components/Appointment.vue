<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="time_select">
        <a>选择机器编号</a>
        <el-select v-model="value" filterable placeholder="请选择机器编号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <a>&nbsp开始时间</a>
        <el-time-select
          v-model="appForm.time"
          :picker-options="{
            start: '08:30',
            step: '00:60',
            end: '22:30',
          }"
          value-format="timestamp"
          placeholder="选择时间"
        >
        </el-time-select>
        <a> &nbsp结束时间</a>
        <el-time-select
          v-model="appForm.endtime"
          :picker-options="{
            start: '08:30',
            step: '00:60',
            end: '22:30',
          }"
          value-format="timestamp"
          placeholder="选择时间"
        >
        </el-time-select>
        &nbsp
        <el-button type="primary" @click="clickapp"> 预约 </el-button>
        <el-button type="primary" plain @click="useNow"> 现在就用 </el-button>
        <!-- 添加用户对话框 -->
        <el-dialog
          title="预约表单"
          ref="appFormRef"
          :visible.sync="appdialogVisible"
          width="30%"
          :before-close="handleClose"
          :append-to-body="true"
        >
          <el-form :model="appForm">
            <el-form-item label="机器编号">
              <el-input v-model="appForm.machine" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input v-model="appForm.time" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input v-model="appForm.endtime" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="appdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="appointClick">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
    <el-card>
      <p>预约列表</p>
      <el-table :data="reslist" border style="width: 100%">
        <!-- <el-table-column label="" type="index"> </el-table-column> -->
        <el-table-column
          prop="uuid"
          width="100%"
          label="设备编号"
        ></el-table-column>
        <el-table-column prop="startTime" label="开始时间"> </el-table-column>
        <el-table-column prop="endTime" label="结束时间"> </el-table-column>
        <el-table-column label="取消预约">
          <template slot-scope="scope">
            <el-tag
              type="danger"
              @click="cancelRes(scope.row.start, scope.row.end, scope.row.uuid)"
              >取消预约</el-tag
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-table :data="reslist" style="width: 100%" border stripe>
        <el-table-column label="⭐" type="index"> </el-table-column>
        <el-table-column prop=reslist.start label="开始时间"> </el-table-column>
        <el-table-column prop=reslist.end label="结束时间"> </el-table-column>
         <el-table-column prop="path" label="操作"> </el-table-column> 
           <template slot-scope="scope">
            <el-tag v-show="scope.row.level==0"type="success">一级权限 </el-tag>
            <el-tag v-show="scope.row.level==1" type="">二级权限</el-tag>
            <el-tag v-show="scope.row.level==2"type="danger">三级权限 </el-tag>
          </template> 
        </el-table-column> 
      </el-table> -->
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      reslist: [],
      //showlist: [],
      appForm: {
        time: "",
        endtime: "",
        username: "",
        voltage: "",
        current: "",
        machine: "1",
      },
      appForm1: {
        account: "Xb19610115",
        password: "123456",
        reserves: {
          type: 1,
          start: 1,
          end: 1,
          devices: [1],
        },
      },
      options: [
        {
          value: "1",
          label: "编号1",
        },
        {
          value: "2",
          label: "编号2",
        },
      ],
      value: "",
      Cancel: {
        account: "Xb19610115",
        password: "123456",
        device: "2",
        start: "1638086794814",
        end: "1638090393814",
      },
      timestamp: "1638090393814",
      appdialogVisible: false,
    };
  },
  created() {
    this.getUserlist();
    setInterval(() => {
      this.current();
    }, 1000);
  },
  methods: {
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/年|月/g, "-")
        .replace(/日/g, " ");
    },
    getUserlist() {
      fetch("https://ztuser.ltd/equipment_server/userGetReserve", {
        method: "post",
        body: JSON.stringify({
          account: "Xb19610115",
          password: "123456",
        }),
      })
        .then((response) => response.json())
        // .then((data) => console.log(data));

        .then((data) => {
          console.log(data);
          this.reslist = data.reserved.set;
          for (let i = 0; i < data.reserved.set.length; i++) {
            this.reslist[i].uuid = data.reserved.set[i].devices[0];
            this.reslist[i].startTime = this.getLocalTime(
              data.reserved.set[i].start
            );
            this.reslist[i].endTime = this.getLocalTime(
              data.reserved.set[i].end
            );
          }

          //console.log(this.reslist);
          // this.reslist.start=this.getLocalTime(this.reslist.start);
          // this.reslist.end=this.getLocalTime(this.reslist.end);
        })
        .catch(console.error);
    },
    //时间戳转时间格式
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
    },

    current() {
      var timestamp = new Date().getTime();
      this.appForm1.reserves.start = timestamp;
      this.appForm1.reserves.end = timestamp + 100000;
      // console.log(timestamp);
      // console.log(this.appForm1.reserves.start);
      //console.log(this.reserve.end);
    },
    useNow() {
      //快捷按钮
      fetch("https://ztuser.ltd/equipment_server/userReserveDevice", {
        method: "post",
        body: JSON.stringify(this.appForm1),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data.code == 1) {
            this.$message.error({ message: "服务器繁忙稍后再试" });
          } else if (data.code == 0) {
            this.$message.success("预约成功");
            setTimeout(() => {
              this.$router.go(0);
            }, 500);
          } else if (data.code == 4) {
            this.$message.error("不要重复预约");
          }else{
            this.$message.error("预约失败");
            console.log(data);
          }
        });

      //this.getUserlist();
      //this.$router.go(0);
      // this.$http.post('/api/user/userReserveDevice', qs.stringify(this.appForm1))
      // .then( (response)=> {
      //       console.log(response);
      //       // let allCookies = document.cookie
      //       //  console.log(allCookies);
      //     })
      //     .catch(function (error) {console.log(error)});
    },
    clickapp() {
      //console.log(this.value);
      if (this.value != "") this.appForm.machine = this.value;
      if (this.value == 1) this.appForm1.reserves.devices = [1];
      else if (this.value == 2) this.appForm1.reserves.devices = [2];
      var c = new Date().getTime();
      var a = new Date(
        new Date().toDateString() + " " + this.appForm.time + ":00"
      ).getTime();
      var b = new Date(
        new Date().toDateString() + " " + this.appForm.endtime + ":00"
      ).getTime();
      if (a < c) {
        this.$message.error("预约失败:开始时间晚于当前时间");
      } else if (a < b) {
        this.appdialogVisible = true;
      } else if (a >= b) {
        this.$message.error("预约失败:开始时间晚于结束时间");
      }
      if (!this.appForm.time || !this.appForm.endtime) {
        this.$message.error({ message: "选择预约时间" });
      }
    },
    appointClick() {
      //预约按钮
      var c = new Date().getTime();
      var a = new Date(
        new Date().toDateString() + " " + this.appForm.time + ":00"
      ).getTime();
      var b = new Date(
        new Date().toDateString() + " " + this.appForm.endtime + ":00"
      ).getTime();
      if (a < c) {
        this.$message.error("预约失败:开始时间过晚");
      } else if (a < b) {
        this.appForm1.reserves.start = a;
        this.appForm1.reserves.end = b;
        fetch("https://ztuser.ltd/equipment_server/userReserveDevice", {
          method: "post",
          body: JSON.stringify(this.appForm1),
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            if (data.code == 4) {
              this.$message.error({ message: "时段冲突：此时时段已被预约！" });
            } else if (data.code == 0) {
              this.$message.success("预约成功");
              setTimeout(() => {
                this.$router.go(0);
              }, 500);
            }
          });
      } else if (a >= b) {
        this.$message.error("预约失败:开始时间晚于结束时间");
      }
      this.appdialogVisible = false;
      // console.log(a);
      // console.log(b);
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
        //console.log(this.appForm.time);
      });
    },
    cancelRes(start, end, uuid) {
      //取消预约
      //console.log(start);
      //console.log(end);
      // console.log(uuid);
      this.Cancel.start = start;
      this.Cancel.end = end;
      this.Cancel.device = uuid;
      //console.log(this.Cancel);
      fetch("https://ztuser.ltd/equipment_server/userStopReserve", {
        method: "post",
        body: JSON.stringify(this.Cancel),
      })
        .then((response) => response.json())
        .then((data) => {
          //  console.log(data);
          if (data.code == 4) {
            this.$message.error("取消预约失败");
          }
          if (data.code == 0) {
            this.$message.success("取消预约成功");
            setTimeout(() => {
              this.$router.go(0);
            }, 200);
          }
        });

      this.timestamp = new Date().getTime();
      //this.getUserlist();
      //this.$router.go(0);
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