<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 22:02:45
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-11 15:16:12
-->
<template>
  <div>
    <div class="login">
      <div class="top"></div>
      <div class="bottom">
        <div style="margin-bottom: 10px">
          @18物联3班孔维烽制作 贺州学院人工智能学院 本科毕业设计
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-top">体育云后台管理平台</div>
      <el-form ref="form" :model="form" label-width="auto" label-position="top">
        <el-form-item size="mini" style="width: 250px" label="登录名:">
          <el-input v-model="form.username"></el-input> </el-form-item
        ><el-form-item size="mini" style="width: 250px" label="密码:">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { selectAdmin } from "../../api/user";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      selectAdmin({
        adminName: this.form.username,
      })
        .then((res) => {
          let list = res.data.data;
          console.log(list);
          if (list[0].adminPassword == this.form.password) {
            this.$router.push({ path: "/adminAccount" });
            localStorage.setItem("isLogin", 1);
            this.$notify({
              title: "登录成功",
              type: "success",
            });
          } else {
            this.$notify.error({
              title: "密码错误",
            });
          }
        })
        .catch((e) => {
          this.$notify.error({
            title: "无此账号",
          });
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 720px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 400px;
  height: 280px;
  top: 30%;
  left: 35%;
  background: #fff;
  /* border: 2px; */
  border-radius: 8px;
  padding: 30px;
}
.main-top {
  font-family: YouYuan;
  position: fixed;
  font-size: 42px;
  top: 200px;
  color: #222;
}
.top {
  width: 100%;
  height: 400px;
  background: #e7f1d7;
}
.bottom {
  width: 100%;
  flex: 1;
  background: #76c99f;
  color: #eee;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
}
.loginBtn {
}
</style>
<style>
.loginBtn {
  background: #76c99f;
  border: none;
  width: 100%;
  margin-top: 15px;
}
.loginBtn:hover {
  background: #76c99f;
  border: none;
}
.loginBtn:active {
  background: #76c99f;
  border: none;
  content: "!!";
}
</style>
