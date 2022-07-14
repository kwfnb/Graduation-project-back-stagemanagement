<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-18 10:43:55
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-12 14:01:59
-->
<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <div class="header-div">足球云后台管理平台</div>
        <i @click="quit()" class="el-icon-switch-button"></i>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '2', '3']" class="aside">
            <el-submenu
              :index="index + 1 + ''"
              v-for="(item, index) in menuList"
              :key="index"
            >
              <template slot="title"
                ><i :class="item.icon"></i>{{ item.title }}</template
              >
              <el-menu-item
                :index="item1.index"
                v-for="(item1, index1) in item.menuItem"
                :key="index1"
                @click="menuItemClick(item1.path, index)"
                >{{ item1.title }}</el-menu-item
              >
            </el-submenu>
          </el-menu></el-aside
        >
        <el-main class="Main"
          ><div class="content"><router-view></router-view></div
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menuList: [
        {
          menuItem: [
            {
              title: "管理员账号",
              index: "1-1",
              path: "/adminAccount",
            },
            {
              title: "用户账号",
              index: "1-2",
              path: "/userAccount",
            },
          ],
          icon: "el-icon-s-custom",
          title: "账号管理",
        },
        {
          menuItem: [
            {
              title: "动态",
              index: "2-1",
              path: "/dynamic",
            },
            {
              title: "系统消息",
              index: "2-2",
              path: "/systemMessage",
            },
            {
              title: "举报管理",
              index: "2-3",
              path: "/report",
            },
          ],
          icon: "el-icon-s-promotion",
          title: "消息管理",
        },
        /* {
          menuItem: [
            {
              title: "联赛数据",
              index: "3-1",
              path: "/adminAccount",
            },
            {
              title: "比赛数据",
              index: "3-2",
              path: "/adminAccount",
            },
          ],
          icon: "el-icon-s-data",
          title: "数据管理",
        }, */
      ],
    };
  },
  methods: {
    menuItemClick(path) {
      if (localStorage.getItem("path") == path) {
      } else {
        localStorage.setItem("path", path);
        this.$router.push({
          path: path,
        });
      }
    },
    quit() {
      localStorage.setItem("isLogin", 0);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0;
}
.header {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  border-bottom: 2px #eee solid;
  background: #76c99f;
}
.header-div {
  font-size: 32px;
  font-family: STHupo;
  color: #fff;
}
.content {
  min-height: 100%;
  max-height: 100%;
  padding: 0px 10px;
}
.aside {
  background: #aed88a;
  height: 660px;
}
.home {
  width: 100%;
}
.Main {
  background: #6ec3c8;
}
.content {
  background: #fff;
  border-radius: 5px;
}
.el-icon-switch-button {
  color: #fff;
  font-size: 30px;
  position: absolute;
  right: 30px;
}
</style>
