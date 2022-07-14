<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 10:43:55
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-14 22:47:56
-->
<template>
  <div class="adminAccount">
    <el-row class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="管理员名称">
          <el-input
            v-model="formInline.user"
            placeholder="管理员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.time"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            class="adminAccount_chaxun"
            style="background: #76c99f; border: none"
            type="primary"
            @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="adminId" label="管理员id" width="150">
        </el-table-column>
        <el-table-column prop="adminName" label="管理员名称" width="170">
        </el-table-column>
        <el-table-column prop="emil" label="邮箱" width="250">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="270">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.adminId != 10001"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div>
      <el-pagination
        class="pagination"
        style="margin-top: 50px"
        background
        @current-change="change()"
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      class="SMSdialog"
      :close-on-click-modal="false"
      title=""
      width="20%"
      :visible.sync="SMS"
    >
      <el-input v-model="SMSMA" placeholder="请输入验证码"></el-input>
      <el-button
        style="margin-top: 20px; background: #76c99f; border: none"
        type="primary"
        class="SMSdialog_el_button"
        @click="yes()"
        >确定</el-button
      >
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="管理员名称" prop="adminName">
          <el-input
            :disabled="fromDisabled"
            v-model="ruleForm.adminName"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :disabled="fromDisabled"
            type="password"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            :disabled="fromDisabled"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emil">
          <el-input
            :disabled="fromDisabled"
            v-model="ruleForm.emil"
          ></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          style="background: #76c99f; border: none"
          type="primary"
          @click="update()"
          >修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { selectAdmin, SMSverification, updateAdmin } from "../../api/user.js";
export default {
  data() {
    return {
      SMSMA: "",
      DuiMa: "",
      SMS: false,
      total: 0,
      fromDisabled: true,
      dialogVisible: false,
      tableData: [
        {
          adminId: "",
          adminName: "",
          password: "",
          emil: "",
          phone: "",
          createTime: "",
        },
      ],
      formInline: {
        user: "",
        time: "",
      },
      //查看页面表
      ruleForm: {
        adminName: "",
        password: "",
        emil: "",
        phone: "",
      },
    };
  },
  mounted() {
    selectAdmin({}).then((res) => {
      this.tableData = [];
      let list = res.data.data;
      this.total = list[0].total;
      for (let i = 0; i < list.length; i++) {
        this.tableData.push({
          adminId: list[i].adminId,
          adminName: list[i].adminName,
          emil: list[i].adminEmil,
          phone: list[i].adminPhone,
          createTime: list[i].adminCreateTime,
          password: list[i].adminPassword,
        });
      }
    });
  },
  methods: {
    change(e) {
      selectAdmin({
        adminName: this.formInline.user,
        adminCreateTime:
          this.formInline.time != null ? this.formInline.time[0] : "",
        adminEndTime:
          this.formInline.time != null ? this.formInline.time[1] : "",
        size: 5,
      }).then((res) => {
        this.tableData = [];
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          this.tableData.push({
            adminId: list[i].adminId,
            adminName: list[i].adminName,
            password: list[i].adminPassword,
            emil: list[i].adminEmil,
            phone: list[i].adminPhone,
            createTime: list[i].adminCreateTime,
            current: e,
          });
        }
      });
    },
    handleClick(row) {
      console.log(row);
      this.ruleForm = row;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log(this.formInline.time);
      selectAdmin({
        adminName: this.formInline.user,
        adminCreateTime:
          this.formInline.time != null ? this.formInline.time[0] : "",
        adminEndTime:
          this.formInline.time != null ? this.formInline.time[1] : "",
        size: 5,
      }).then((res) => {
        this.tableData = [];
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          this.tableData.push({
            adminId: list[i].adminId,
            adminName: list[i].adminName,
            password: list[i].adminPassword,
            emil: list[i].adminEmil,
            phone: list[i].adminPhone,
            createTime: list[i].adminCreateTime,
          });
        }
      });
    },
    handleClose(done) {
      done();
    },
    update() {
      if (this.fromDisabled) {
        this.DuiMa = "";
        for (let i = 0; i < 4; i++) {
          this.DuiMa += Math.floor(Math.random() * 10);
        }
        SMSverification({
          content: `【体育云平台】你的验证码是：${this.DuiMa}，3分钟内有效！`,
          mobile: this.ruleForm.phone,
        });
        this.SMS = true;
      } else {
        console.log(this.ruleForm);
        updateAdmin({
          adminId: this.ruleForm.adminId,
          adminName: this.ruleForm.adminName,
          adminPassword: this.ruleForm.password,
          adminEmil: this.ruleForm.emil,
          adminPhone: this.ruleForm.phone,
        }).then((res) => {
          this.onSubmit();
          this.$notify({
            title: "修改成功",
            type: "success",
          });
        });
        this.dialogVisible = false;
      }
    },
    yes() {
      console.log(this.DuiMa, this.SMSMA);
      if (this.DuiMa == this.SMSMA) {
        this.SMS = false;
        this.fromDisabled = false;
        this.$notify({
          title: "验证成功",
          type: "success",
        });
      } else {
        this.$notify.error({
          title: "验证码错误",
        });
      }
    },
  },
};
</script>

<style scoped>
.adminAccount {
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.top {
  min-height: 100px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.main {
  /* padding: 0px 0px; */
}
.pagination {
  bottom: 50px;
}
</style>

<style>
.SMSdialog_el_button {
  margin-top: 20px;
  background: #76c99f;
  border: none;
  width: 100%;
}
</style>
