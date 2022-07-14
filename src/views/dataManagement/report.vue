<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-07 15:01:57
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-14 23:10:11
-->
<template>
  <div class="report">
    <div class="asize">
      <b
        ><div style="color: #555">
          未处理的举报:<span style="font-size: 46px; color: red">{{
            totalNum
          }}</span>
        </div></b
      >
      <div style="width: 100%; height: 300px">
        <bar
          :title="'近三天的举报信息总量'"
          :id="'report'"
          :opData="opData"
        ></bar>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%; height: 500px">
        <el-table-column prop="id" label="举报动态id" width="150">
        </el-table-column>
        <el-table-column
          prop="type"
          label="举报类型"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="举报描述"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="举报时间"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.id)"
              type="text"
              size="small"
              >预览</el-button
            >
            <el-button @click="handleChange(scope.row)" type="text" size="small"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <mediaDialog
      class="mediaDialog"
      :dialogVisible="dialogVisible"
      :mediaType="mediaType"
      :mediaUrl="mediaUrl"
      :mediaText="mediaText"
      @close="close"
    ></mediaDialog>
    <el-dialog width="30%" :visible="visible" :before-close="handleClose">
      <div class="dialogContent">
        <span>举报ID：{{ tempList.reportId }}</span>
        <span>动态ID：{{ tempList.id }}</span>
        <span>举报类型：{{ tempList.type }}</span>
        <span>举报描述：{{ tempList.content }}</span>
        <span>举报时间：{{ tempList.time }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tijiao(0)">无效</el-button>
        <el-button @click="tijiao(1)" type="primary">有效</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bar from "../../components/echarts/bar.vue";
import {
  selectReport,
  selectDynamic,
  deleteReport,
  deleteDynamic,
} from "../../api/dynamic.js";
import { insertSystemMessage } from "../../api/user";
import mediaDialog from "../../components/mediaDialog.vue";
export default {
  components: {
    bar,
    mediaDialog,
  },
  data() {
    return {
      totalNum: 0,
      visible: false,
      mediaText: "",
      mediaType: "0",
      mediaUrl: "",
      dialogVisible: false,
      tempList: {
        id: "",
        reportId: "",
        content: "",
        type: "",
        time: "",
        username: "",
      },
      opData: {
        xData: ["前天", "昨天", "今天"],
        list: [
          {
            data: [12, 18, 32],
            name: "举报量",
            color: "red",
            /* realtimeSort: true, */
            /* label: true, */
          },
        ],
      },
      tableData: [
        {
          id: 0,
          type: 0,
          content: "",
          time: "",
        },
      ],
    };
  },
  mounted() {
    this.selectReport();
  },
  methods: {
    selectReport() {
      selectReport().then((res) => {
        this.tableData = [];
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          this.tableData.push({
            reportId: list[i].reportId,
            id: list[i].dynamicId,
            type: this.typeof(list[i].reportType),
            content: list[i].reportContent,
            time: list[i].createTime,
            username: list[i].userName,
          });
        }
        this.totalNum = this.tableData.length;
      });
    },
    typeof(str) {
      let temp = ["涉黄暴", "引战", "违法广告", "垃圾内容", "辱骂他人", "其他"];
      for (let i = 0; i < temp.length; i++) {
        str = str.replaceAll(`${i + 1}`, temp[i]);
      }
      str = str.replaceAll(",", "，");
      return str;
    },
    handleClick(id) {
      selectDynamic({
        dynamicId: id,
      }).then((res) => {
        console.log(res);
        this.mediaType = 0;
        this.mediaUrl = res.data.data[0].dynamicUrl;
        this.dialogVisible = true;
        this.mediaText = res.data.data[0].dynamicContent;
      });
    },
    close() {
      this.dialogVisible = false;
    },
    handleChange(text) {
      console.log(text);
      this.visible = true;
      this.tempList = text;
    },
    handleClose() {
      this.visible = false;
    },
    tijiao(p) {
      if (p) {
        deleteDynamic({ dynamicId: this.tempList.id }).then((r) => {
          deleteReport({ dynamicId: this.tempList.id }).then((res) => {
            insertSystemMessage({
              title: "举报反馈",
              content: `您关于id：${this.tempList.id}的举报成功了`,
              footer: "体育云平台",
              userName: this.tempList.username,
            });
            this.visible = false;
            this.selectReport();
          });
        });
      } else {
        deleteReport({ reportId: this.tempList.reportId }).then((r) => {
          insertSystemMessage({
            title: "举报反馈",
            content: `您关于id：${this.tempList.id}的举报失败了,已将举报信息退回。`,
            footer: "体育云平台",
            userName: this.tempList.username,
          });
          this.visible = false;
          this.selectReport();
        });
      }
    },
  },
};
</script>

<style scoped>
.report {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100%;
  height: 612px;
}
.asize {
  border: 1px #eee solid;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 28px;
}
.content {
  flex: 1;
  margin-left: 30px;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dialogContent {
  display: flex;
  flex-direction: column;
}
.dialogContent span {
  margin-top: 10px;
}
</style>
