<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roles' }">设备总览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <p>设备状态</p>
      <el-table :data="reslist" border style="width: 100%">
        <!-- <el-table-column label="" type="index"> </el-table-column> -->
        <el-table-column prop="uuid" width="100%" label="设备编号">
        </el-table-column>
        <el-table-column prop="description" label="设备描述"> </el-table-column>
        <el-table-column prop="start" label="开始时间"> </el-table-column>
        <el-table-column prop="end" label="结束时间"> </el-table-column>
        <el-table-column prop="last" label="上次使用"> </el-table-column>
        <!-- <el-table-column prop="end" label="取消预约">
          <template slot-scope="scope">
            <el-tag type="danger" @click="cancelRes">取消预约</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reslist: [
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
        { uuid: "", description: "", last: "", start: "", end: "" },
      ],
      //showlist: [],
      appForm: {
        time: "",
        endtime: "",
        username: "",
        voltage: "",
        current: "",
        machine: "初号机",
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
      Cancel: {
        account: "Xb19610115",
        password: "123456",
        device: "1",
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
    current() {
      var timestamp = new Date().getTime();
      this.appForm1.reserves.start = timestamp + 100000;
      this.appForm1.reserves.end = timestamp + 3600000;
      // console.log(timestamp);
      // console.log(this.appForm1.reserves.start);
      //console.log(this.reserve.end);
    },
    //时间戳转时间格式
    getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
    },
    getUserlist() {
      fetch("https://ztuser.ltd/equipment_server/selectDevice", {
        method: "post",
        body: JSON.stringify({
          type: "1",
          localLike: "422.%",
        }),
      })
        .then((response) => response.json())
        // .then((data) => console.log(data));
        .then((data) => {
          let cnt = 0;
          console.log(data);
          this.reslist.reserves = data.devices[0].reserves[0];
          for (var j = 0; j < data.devices.length; j++) {
            console.log(this.reslist[j]);
            for (
              var i = 0;
              i < data.devices[j].reserves.length ||
              (data.devices[j].reserves.length == 0 && i == 0);
              i++
            ) {
              this.reslist[cnt].uuid = data.devices[j].uuid;
              this.reslist[cnt].description = data.devices[j].description;
              this.reslist[cnt].last = this.getLocalTime(data.devices[j].last);
              if (data.devices[j].last == 946656000000)
                this.reslist[cnt].last = "从未使用过";
              //	946656000000
              if (data.devices[j].reserves.length == 0) {
                this.reslist[cnt].start = "空闲";
              } else {
                this.reslist[cnt].start = this.getLocalTime(
                  data.devices[j].reserves[i].start
                );
              }

              if (data.devices[j].reserves.length == 0) {
                this.reslist[cnt].end = "空闲";
              } else {
                this.reslist[cnt].end = this.getLocalTime(
                  data.devices[j].reserves[i].end
                );
              }
              cnt++;
            }
          }

          //console.log(this.Cancel);
          //console.log(this.reslist);
        })
        .catch(console.error);
    },
  },
};
</script>



<style lang="less" scoped>
</style>