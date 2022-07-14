<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 21:56:49
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 13:54:10
-->
<template>
  <div class="userAccount">
    <el-row class="top">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="用户Id">
          <el-input v-model="formInline.id" placeholder="用户Id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="formInline.user" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input
            v-model="formInline.level"
            placeholder="用户等级"
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
            @click="onSubmit(1)"
            >查询</el-button
          >
          <el-button @click="onSubmit(0)">清空</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="main">
      <el-table :data="tableData" border style="width: 100%; min-height: 350px">
        <el-table-column fixed type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="id" label="用户id" width="140">
        </el-table-column>
        <el-table-column label="用户" width="180" show-overflow-tooltips>
          <template slot-scope="scope">
            <div class="column">
              <el-avatar :size="35" :src="scope.row.userPort"></el-avatar>
              {{ scope.row.userName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="emil" label="邮箱" width="240">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150">
        </el-table-column>
        <el-table-column prop="userLevel" label="用户等级" width="150">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >重置</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </el-row>
    <div>
      <el-pagination
        class="pagination"
        style="margin-top: 50px"
        background
        @current-change="change"
        layout="total,prev, pager, next"
        :total="total"
        :page-size="5"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectUser, updateUser } from "../../api/user.js";
export default {
  data() {
    return {
      dialogVisible: false,
      total: 0,
      tableData: [
        {
          id: "",
          userName: "",
          emil: "",
          phone: "",
          createTime: "",
          userLevel: "",
          userPort: "",
        },
      ],
      formInline: {
        id: "",
        user: "",
        time: [],
        phone: "",
        level: "",
      },
    };
  },
  mounted() {
    this.onSubmit(1, 1);
  },
  methods: {
    handleClick(e) {
      console.log(e);
      updateUser({
        userId: e.id,
        userPhone: "",
      }).then((res) => {
        this.$notify({
          title: "重置成功",
          type: "success",
        });
      });
      this.dialogVisible = true;
    },
    onSubmit(i, current) {
      if (i) {
        if (this.formInline.time == null) {
          this.formInline.time = [];
        }
        selectUser({
          userId: this.formInline.id,
          userName: this.formInline.user,
          userPhone: this.formInline.phone,
          userLevel: this.formInline.level,
          userCreateTime: this.formInline.time[0],
          userEndTime: this.formInline.time[1],
          size: 5,
          current: current,
        })
          .then((res) => {
            let list = res.data.data;
            this.tableData = [];
            this.total = list[0].total;
            for (let i = 0; i < list.length; i++) {
              this.tableData.push({
                id: list[i].userId,
                userName: list[i].userName,
                emil: list[i].userEmil,
                phone: list[i].userPhone,
                createTime: list[i].userCreateTime,
                userLevel: list[i].userLevel,
                userPort: list[i].userPort,
              });
            }
          })
          .catch((e) => {
            this.tableData = [];
          });
      } else {
        this.formInline = {
          id: "",
          user: "",
          time: [],
          phone: "",
          level: "",
        };
      }
    },
    change(val) {
      console.log(val);
      this.onSubmit(1, val);
    },
  },
};
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.userAccount {
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.top {
  /* min-height: 100px; */
  flex: 1;
  margin-top: 20px;
  margin-left: 80px;
}
.main {
  /* padding: 0px 100px; */
}
</style>

<style>
.adminAccount_chaxun {
  background: #76c99f;
  border: none;
}
</style>
