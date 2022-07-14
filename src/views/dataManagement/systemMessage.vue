<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-22 15:32:53
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 01:20:43
-->
<template>
  <div class="systemMessage">
    <div class="top">
      <el-steps
        style="width: 400px"
        :active="action"
        simple
        finish-status="success"
      >
        <el-step title="发送类型"></el-step>
        <el-step title="发送消息"></el-step>
        <el-step title="发送对象"></el-step>
      </el-steps>
    </div>
    <div class="title">{{ titleType }}</div>
    <div class="main">
      <!-- <router-view></router-view> -->
      <div v-if="action == 0" class="main-content">
        <el-radio-group v-model="radio1">
          <el-radio-button label="维护消息"></el-radio-button>
          <el-radio-button label="活动消息"></el-radio-button>
          <el-radio-button label="违规消息"></el-radio-button>
          <el-radio-button label="自定义消息"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          style="margin-top: 20px"
          v-model="value1"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          :start-placeholder="
            radio1 == '维护消息' ? '维护开始日期' : '活动开始日期'
          "
          :end-placeholder="
            radio1 == '维护消息' ? '维护结束日期' : '活动结束日期'
          "
          v-if="radio1 == '维护消息' || radio1 == '活动消息'"
        >
        </el-date-picker>
      </div>
      <div v-if="action == 1">
        <div style="margin-bottom: 10px">{{ title }}：</div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="text"
          maxlength="70"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 5 }"
          style="margin-bottom: 10px"
        >
        </el-input>
        <div>{{ footer }}</div>
      </div>
      <div v-if="action == 2" class="main-content">
        <el-radio-group v-model="radio2">
          <el-radio-button label="特定对象"></el-radio-button>
          <el-radio-button label="全体用户"></el-radio-button>
        </el-radio-group>
        <el-input v-if="radio2 == '特定对象'" v-model="username"></el-input>
      </div>
      <div v-if="action == 3">
        <el-result icon="success" title="成功提示">
          <template slot="extra">
            <el-button @click="back()" type="primary" size="medium"
              >返回</el-button
            >
          </template>
        </el-result>
      </div>
    </div>
    <div class="footer">
      <el-button v-if="action != 0 && action != 3" @click="up()"
        >上一步</el-button
      >
      <el-button v-if="action != 3" @click="next()">{{
        action == 2 ? "完成" : "下一步"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { insertSystemMessage } from "../../api/user.js";
export default {
  data() {
    return {
      duixiang: "",
      action: 0,
      radio1: "",
      radio2: "",
      value1: "",
      title: "",
      text: "",
      username: "",
      footer: "体育云平台管理员",
      titleType: "请选择系统消息类型并输入格式项",
      titleList: [
        "请选择系统消息类型并输入格式项",
        "请输入系统消息主内容",
        "请选择系统消息发送对象",
      ],
    };
  },
  methods: {
    next() {
      if (this.action == 3) {
        return;
      }
      if (this.radio1 == "") {
        return;
      }
      if (this.action == 0) {
        this.text = this.mode();
      }
      if (this.action == 2) {
        insertSystemMessage({
          title: this.title,
          content: this.text,
          footer: "体育云平台管理员",
          userName: this.username == "全体用户" ? "" : this.username,
        });
      }
      this.action += 1;
      if (this.radio1 != "自定义消息") {
        this.title = this.radio1;
      } else {
        this.title = "尊敬的用户你好";
      }

      this.titleType = this.titleList[this.action];
    },
    up() {
      if (this.action == 0) {
        return;
      }
      this.action -= 1;

      this.titleType = this.titleList[this.action];
    },
    back() {
      this.action = 0;
      this.radio1 = "";
      this.value1 = "";
      this.titleType = this.titleList[0];
    },
    mode() {
      switch (this.radio1) {
        case "维护消息":
          return `您好，本app将于${this.value1[0]}至${this.value1[1]}，进行必要的系统维护，请您尽心等待`;
        case "活动消息":
          return `您好，本app将于${this.value1[0]}至${this.value1[1]}，进行活动，欢迎广大用户积极参与`;
        case "违规消息":
          return `您好，您近期存在违规处理，管理给予警告一次，请及时改正`;
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.systemMessage {
  border: 1px #000 solid;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .top {
    width: 800px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
    }
  }
  .footer {
    height: 80px;
    width: 800px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    font-family: Hanzipen SC;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
